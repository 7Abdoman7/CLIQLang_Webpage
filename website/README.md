# CLIQLang Website

A modern, quantum-themed static website for CLIQLang - the quantum programming language.

## Features

- 🎨 **Modern Quantum Design**: Dark theme with cyan/blue quantum colors
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Interactive Elements**: Smooth animations and hover effects
- 🚀 **Performance Optimized**: Fast loading and smooth scrolling
- 🎮 **Easter Eggs**: Hidden features for curious users
- 📋 **Copy Code Blocks**: Easy code copying functionality
- 🌟 **Professional Layout**: Complete with all sections

## Sections

1. **Hero Section**: Eye-catching introduction with quantum circuit animation
2. **About**: Overview of CLIQLang with statistics
3. **Features**: Detailed feature showcase with code examples
4. **Documentation**: Getting started guide and requirements
5. **Examples**: Quantum algorithm examples (Bell State, Grover's Algorithm)
6. **Download**: Latest release information and installation guide
7. **Developer**: About Abdelrahman Elsayed Ahmed
8. **Contact**: Contact information and message form
9. **Footer**: Links and additional information

## Files Structure

```
website/
├── index.html                    # Main HTML file
├── styles.css                    # Complete CSS with quantum theme
├── scripts.js                    # JavaScript for interactivity
├── logo.svg                      # Full CLIQLang logo with quantum circuit
├── logo-icon.svg                 # Compact icon version for navigation
├── logo-horizontal.svg           # Horizontal logo for headers
├── favicon.png                   # Website favicon (32x32)
├── Abdelrahman.jpeg             # Developer photo
├── Abdelrahman_Elsayed_Ahmed.pdf # Resume
├── LICENSE                      # MIT License
├── deploy.sh                    # Deployment script
└── README.md                    # This file
```

## Deployment to GitHub Pages

1. **Create a new repository** on GitHub (e.g., `cliqlang-website`)

2. **Upload files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CLIQLang website"
   git branch -M main
   git remote add origin https://github.com/7Abdoman7/cliqlang-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your website will be available at**:
   `https://7Abdoman7.github.io/cliqlang-website/`

## Local Development

To run locally, simply open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Customization

### Colors
All colors are defined as CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #7b68ee;
    --accent-color: #ff6b6b;
    /* ... */
}
```

### Content
- Edit `index.html` to modify content
- Update contact information, links, etc.
- Add or remove sections as needed

### Animations
- Quantum particle effects
- Typing animation for hero subtitle
- Scroll-triggered animations
- Interactive quantum circuit

## Easter Eggs

- **Konami Code**: ↑↑↓↓←→←→BA for rainbow mode
- **Ctrl+Shift+Q**: Toggle quantum color mode
- **Code Block Hover**: Copy buttons appear
- **Quantum Circuit**: Interactive hover effects

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 80+

## Performance

- Optimized animations using CSS transforms
- Intersection Observer for scroll animations
- Lazy loading for images
- Efficient JavaScript with minimal DOM manipulation

## Credits

**Developer**: Abdelrahman Elsayed Ahmed
**Project**: CLIQLang Quantum Programming Language
**Design**: Modern quantum-themed UI
**License**: MIT

---

Made with ⚛️ quantum computing passion
