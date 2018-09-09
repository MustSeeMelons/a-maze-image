const path = require("path");
const fs = require("fs");
const Canvas = require("canvas");
const Font = Canvas.Font;
const Image = Canvas.Image;

const IMG_SIZE = 512;

const FILE_INDEX = 2;
const FONT_INDEX = 3;
const FONT_SIZE = 4;
const FONT_COLOR = 5;
const FONT_WEIGHT = 6;

const FILE_DIR = "./images/";
const FONT_DIR = "./fonts/";
const OUTPUT_DIR = "./output/";

let fileName = process.argv[FILE_INDEX];
let fontName = process.argv[FONT_INDEX];
let fontSize = process.argv[FONT_SIZE] || 150;
let fontColor = process.argv[FONT_COLOR] || "#000000";
let fontWeight = process.argv[FONT_WEIGHT] || "normal";

let fileExt;

function fontFile(name) {
    return FONT_DIR + name;
}

function removeExtension(name) {
    const lastDot = name.lastIndexOf(".");
    return name.substring(0, lastDot);
}

function getExtension(file) {
    const lastDot = file.lastIndexOf(".");
    return file.substring(lastDot, file.length);
}

function registerFonts() {
    const ext = getExtension(fontName);
    const fontFamily = removeExtension(fontName);

    registerFont(fontName, fontFamily, "normal");
    registerFont(fontFamily + "-bold" + ext, fontFamily, "bold");
    registerFont(fontFamily + "-italic" + ext, fontFamily, "italic");

    return fontFamily;
}

function registerFont(nameOfFile, fontFamily, weight) {
    try {
        Canvas.registerFont(fontFile(nameOfFile), { family: fontFamily, weight: weight });
    } catch (err) {
        // Ignoring faults
    }

}

function createAndSaveImage(number, fontFamily) {
    const canvas = Canvas.createCanvas(IMG_SIZE, IMG_SIZE);
    const ctx = canvas.getContext('2d');

    const img = new Image()
    img.src = fs.readFileSync(path.join(FILE_DIR, fileName));
    ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";
    ctx.fillText(`${number}`, (IMG_SIZE / 2) - (0 / 2), (IMG_SIZE / 2) + (fontSize / 4));

    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(OUTPUT_DIR, `leaderboard_${number}` + fileExt)))
}

if (!fileName || !fontName) {
    console.log("Must provied file and font.");
} else {
    const startTime = process.hrtime();

    const fontFamily = registerFonts();
    fileExt = getExtension(fileName);

    for (let i = 0; i < 100; i++) {
        createAndSaveImage(i + 1, fontFamily);
    }

    const endTime = process.hrtime(startTime);
    console.log("Done in: " + (endTime[1]) / 1000000 + "ms");
}
