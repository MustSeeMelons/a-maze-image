# a-maze-image

# Requirements

- Node 9.x

Utility for A-Maze-Thing to create leaderboard images.

# Notes
- Windows: **Very finicky.** windows build tools required for, you guessed it, windows: npm install --global --production windows-build-tools
- Ubuntu: **Ubuntu, recommended.** sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# Usage
node src/index.js {image_name.ext} {font_name.ext} {font_size} {font_color_hex} {font_weight} {x_offset} {y_offset} {start_num} {end_num}

- image_name.ext -> image name with extension in the images folder
- font_name.ext -> font name with extension in the fonts folder
- font_size -> integer font size, later used as px
- font_color_hex -> "#000000" "#ffffff"
- font_weight -> normal, bold, italic
- x_offset -> float number to center horizontaly
- y_offset -> float number to center vertically
- start_num -> starting number for icon, start at 0
- end_num -> end number for icon, excluding

# Font naming
Expects such a naming convention:

- normal -> {fontName}
- bold -> {fontName}-bold
- italic -> {fontName}-italic

# Example command
node src/index.js test.jpg junegull.ttf "#538720" 330
node src/index.js leaderboards.png Lobster-Regular.ttf 200 "#ffffff" normal
node src/index.js leaderboards.png Lobster-Regular.ttf 200 "#ffffff" normal 256 256 0 100

# TODO
 - Nice console menu just for the heck of it?