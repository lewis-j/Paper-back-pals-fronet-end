const fs = require("fs");
const path = require("path");

// Create directory if it doesn't exist
const tesseractDir = path.join(__dirname, "public", "tesseract-core");
if (!fs.existsSync(tesseractDir)) {
  fs.mkdirSync(tesseractDir, { recursive: true });
}

// Copy worker file
const workerSrc = path.join(
  __dirname,
  "node_modules",
  "tesseract.js",
  "dist",
  "worker.min.js"
);
const workerDest = path.join(tesseractDir, "worker.min.js");
fs.copyFileSync(workerSrc, workerDest);

// Copy core file
const coreSrc = path.join(
  __dirname,
  "node_modules",
  "tesseract.js-core",
  "tesseract-core.wasm.js"
);
const coreDest = path.join(tesseractDir, "tesseract-core.wasm.js");
fs.copyFileSync(coreSrc, coreDest);

console.log("Tesseract files copied successfully!");
