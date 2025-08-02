#!/bin/bash

# CLIQLang Website Deployment Script
# This script helps deploy the website to GitHub Pages

echo "🚀 CLIQLang Website Deployment Script"
echo "======================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    
    echo "📝 Creating .gitignore..."
    cat > .gitignore << EOF
# System files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Temporary files
*.tmp
*.temp

# Node modules (if using npm)
node_modules/

# Logs
*.log
EOF
fi

echo "📋 Adding files to Git..."
git add .

echo "💾 Creating commit..."
read -p "Enter commit message (default: 'Deploy CLIQLang website'): " commit_message
commit_message=${commit_message:-"Deploy CLIQLang website"}
git commit -m "$commit_message"

# Check if main branch exists
if git show-ref --verify --quiet refs/heads/main; then
    echo "✅ Already on main branch"
else
    echo "🔄 Creating main branch..."
    git branch -M main
fi

# Ask for repository URL if remote doesn't exist
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Setting up remote repository..."
    echo "Please create a new repository on GitHub first!"
    echo "Suggested name: cliqlang-website"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ Repository URL is required!"
        exit 1
    fi
    
    git remote add origin "$repo_url"
fi

echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'Deploy from a branch'"
echo "5. Choose 'main' branch and '/ (root)' folder"
echo "6. Click 'Save'"
echo ""
echo "🌐 Your website will be available at:"
echo "   https://7Abdoman7.github.io/[repository-name]/"
echo ""
echo "⚡ It may take a few minutes for the site to be live!"

# Check if Python is available for local testing
if command -v python3 &> /dev/null; then
    echo ""
    read -p "🔍 Would you like to test the website locally? (y/n): " test_local
    if [ "$test_local" = "y" ] || [ "$test_local" = "Y" ]; then
        echo "🌐 Starting local server at http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        python3 -m http.server 8000
    fi
fi
