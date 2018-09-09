# a-maze-image

Utility for A-Maze-Thing to create leaderboard images.

# Notes
- Windows: **Very finicky.** windows build tools required for, you guessed it, windows: npm install --global --production windows-build-tools
- Ubuntu: **Ubuntu, recommended.** sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# Usage
node src/index.js {image_name.ext} {font_name.ext} {font_size} {font_color_hex} {font_weight}

- image_name.ext -> image name with extension in the images folder
- font_name.ext -> font name with extension in the fonts folder
- font_size -> integer font size, later used as px
- font_color_hex -> "#000000" "#ffffff"
- font_weight -> normal, bold, italic

# Font naming
Expects such a naming convention:

- normal -> {fontName}
- bold -> {fontName}-bold
- italic -> {fontName}-italic

# Example command
node src/index.js test.jpg junegull.ttf 330 "#538720"