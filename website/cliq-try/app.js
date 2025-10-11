// API Configuration
const API_URL = 'http://localhost:8080/api';

// Initialize CodeMirror editor
let editor;
document.addEventListener('DOMContentLoaded', function() {
    editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'python',  // Using Python mode as fallback for syntax highlighting
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true
    });

    // Check server status on load
    checkServerStatus();
    
    // Load a default example
    loadExample('hello');
});

// Example CLIQ programs
const examples = {
    hello: {
        name: 'Hello Quantum',
        code: `# Hello Quantum World!
# Apply Hadamard to qubit 0
H [] [0]

# Measure the qubits
! [0]
! [1]

# Display state
P "Quantum state measured!"`
    },
    gates: {
        name: 'Quantum Gates',
        code: `# Demonstrate common quantum gates

# Pauli-X (NOT) gate on qubit 0
X [] [0]

# Hadamard gate for superposition on qubit 1
H [] [1]

# Pauli-Y gate on qubit 2
Y [] [2]

# Measure all qubits
! [0]
! [1]
! [2]

P "Gates applied and measured"`
    },
    superposition: {
        name: 'Superposition',
        code: `# Create superposition state

# Put both qubits in superposition
H [] [0]
H [] [1]

# Measure to collapse the superposition
! [0]
! [1]

P "Superposition collapsed"`
    },
    entanglement: {
        name: 'Entanglement',
        code: `# Create entangled qubits (Bell State)

# Create superposition on first qubit
H [] [0]

# Entangle with CNOT gate
X [0] [1]

# Measure both qubits
! [0]
! [1]

P "Entangled qubits measured"`
    },
    basic: {
        name: 'Basic Example',
        code: `# Basic CLIQ Program

# Put qubit 0 in superposition
H [] [0]

# Measure the qubit
! [0]

P "Measurement complete"`
    }
};

// Load example into editor
function loadExample(exampleKey) {
    const example = examples[exampleKey];
    if (example && editor) {
        editor.setValue(example.code);
        clearOutput();
        addOutputLine(`Loaded example: ${example.name}`, 'info');
    }
}

// Clear the code editor
function clearCode() {
    if (editor) {
        editor.setValue('');
        editor.focus();
    }
}

// Clear the output
function clearOutput() {
    const output = document.getElementById('output');
    output.innerHTML = '<div class="output-placeholder">Run your code to see the output here...</div>';
    output.classList.remove('has-content');
}

// Add a line to the output
function addOutputLine(text, type = 'normal') {
    const output = document.getElementById('output');
    
    // Remove placeholder if it exists
    const placeholder = output.querySelector('.output-placeholder');
    if (placeholder) {
        placeholder.remove();
        output.classList.add('has-content');
    }
    
    // Add new line
    const line = document.createElement('div');
    line.textContent = text;
    
    if (type === 'error') {
        line.className = 'error-output';
    } else if (type === 'success') {
        line.className = 'success-output';
    }
    
    output.appendChild(line);
    
    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

// Run the CLIQ code
async function runCode() {
    const code = editor.getValue();
    
    if (!code.trim()) {
        addOutputLine('Error: No code to execute', 'error');
        return;
    }
    
    // Show loading state
    const runButton = document.querySelector('.btn-primary');
    const runText = document.getElementById('runText');
    const spinner = document.getElementById('loadingSpinner');
    
    runButton.disabled = true;
    runText.textContent = 'Running...';
    spinner.style.display = 'inline-block';
    
    // Clear previous output
    clearOutput();
    addOutputLine('Executing CLIQ code...', 'info');
    
    try {
        const response = await fetch(`${API_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });
        
        const result = await response.json();
        
        if (result.success) {
            addOutputLine('=== Execution Result ===', 'success');
            if (result.output) {
                // Split output by lines and add each line
                const lines = result.output.split('\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        addOutputLine(line);
                    }
                });
            } else {
                addOutputLine('Program executed successfully (no output)', 'success');
            }
        } else {
            addOutputLine('=== Execution Error ===', 'error');
            addOutputLine(result.error || 'Unknown error occurred', 'error');
        }
    } catch (error) {
        addOutputLine('=== Connection Error ===', 'error');
        addOutputLine(`Failed to connect to server: ${error.message}`, 'error');
        addOutputLine('Make sure the CLIQ server is running on port 8080', 'error');
        updateServerStatus('offline');
    } finally {
        // Reset button state
        runButton.disabled = false;
        runText.textContent = 'Run Code';
        spinner.style.display = 'none';
    }
}

// Check server status
async function checkServerStatus() {
    const statusElement = document.getElementById('serverStatus');
    statusElement.textContent = 'Checking...';
    statusElement.className = 'status-indicator checking';
    
    try {
        const response = await fetch(`${API_URL}/health`, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            updateServerStatus('online');
        } else {
            updateServerStatus('offline');
        }
    } catch (error) {
        updateServerStatus('offline');
    }
}

// Update server status indicator
function updateServerStatus(status) {
    const statusElement = document.getElementById('serverStatus');
    
    if (status === 'online') {
        statusElement.textContent = 'Online';
        statusElement.className = 'status-indicator online';
    } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'status-indicator offline';
    }
}

// Add keyboard shortcut for running code
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to run code
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        runCode();
    }
});

// Periodically check server status
setInterval(checkServerStatus, 30000); // Check every 30 seconds