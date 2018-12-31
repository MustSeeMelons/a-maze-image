const path = require("path");
const fs = require("fs");
const Canvas = require("canvas");
const Image = Canvas.Image;

const IMG_SIZE = 512;

const FILE_INDEX = 2;
const FONT_INDEX = 3;
const FONT_SIZE = 4;
const FONT_COLOR = 5;
const FONT_WEIGHT = 6;
const X_OFF = 7;
const Y_OFF = 8;
const START_NUM = 9;
const END_NUM = 10;

const FILE_DIR = "./images/";
const FONT_DIR = "./fonts/";
const OUTPUT_DIR = "./output/";

let fileName = process.argv[FILE_INDEX];
let fontName = process.argv[FONT_INDEX];
let fontSize = process.argv[FONT_SIZE] || 150;
let fontColor = process.argv[FONT_COLOR] || "#000000";
let fontWeight = process.argv[FONT_WEIGHT] || "normal";
let xOffset = process.argv[X_OFF] || (IMG_SIZE / 2);
let yOffset = process.argv[Y_OFF] ||  (IMG_SIZE / 2) + (fontSize / 3);
let startNum = process.argv[START_NUM] || 0;
let endNum = process.argv[END_NUM] || 100;

let fileExt;

const NANO_TO_SEC = 1000000000;

function info(info, spaced = true) {
    const newLines = spaced ? "\n\n" : "";
    console.log(`${newLines}${info.toUpperCase()}${newLines}`)
}

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
        console.log(err);
        info("this is fine");
    }

}

async function createAndSaveImage(number, fontFamily) {
    return new Promise((resolve, reject) => {
        let canvas = Canvas.createCanvas(IMG_SIZE, IMG_SIZE);
        let ctx = canvas.getContext('2d');

        const img = new Image()
        img.src = fs.readFileSync(path.join(FILE_DIR, fileName));
        ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);

        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = "center";
        ctx.fillText(`${number}`, xOffset, yOffset);

        writeStream = fs.createWriteStream(path.join(OUTPUT_DIR, `leaderboard_${number}` + fileExt));
        writeStream.on("close", () => {
            resolve();
        })
        canvas.createPNGStream().pipe(writeStream);
    });

}

async function performJob() {
    if (!fileName || !fontName) {
        console.log("Must provied file and font.");
    } else {
        const startTime = process.hrtime();

        const fontFamily = registerFonts();
        info("fonts registered");

        fileExt = getExtension(fileName);

        for (let i = startNum; i < endNum; i++) {
            await createAndSaveImage(i + 1, fontFamily);
            info(`saved image no. ${i + 1}`, false);
        }

        const endTime = process.hrtime(startTime);
        console.log("Done in: " + (endTime[0] + (endTime[1] / NANO_TO_SEC)) + " s");
    }
}

performJob();