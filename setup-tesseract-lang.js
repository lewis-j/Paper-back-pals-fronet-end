const https = require("https");
const fs = require("fs");
const path = require("path");

const tesseractDir = path.join(__dirname, "public", "tesseract-core");

// Create directory if it doesn't exist
if (!fs.existsSync(tesseractDir)) {
  fs.mkdirSync(tesseractDir, { recursive: true });
}

// Function to download file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest, { mode: 0o666 });

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download: ${response.statusCode} for ${url}`)
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${dest}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function downloadLanguages() {
  const languages = [{ code: "eng", name: "English" }];

  for (const lang of languages) {
    const url = `https://raw.githubusercontent.com/tesseract-ocr/tessdata_best/main/${lang.code}.traineddata`;
    const dest = path.join(tesseractDir, `${lang.code}.traineddata`);

    console.log(`Downloading ${lang.name} language data from ${url}`);
    try {
      await downloadFile(url, dest);
      const stats = fs.statSync(dest);
      if (stats.size === 0) {
        throw new Error("Downloaded file is empty");
      }
      console.log(`Successfully downloaded ${lang.name} (${stats.size} bytes)`);
    } catch (error) {
      console.error(`Error downloading ${lang.name} language data:`, error);
      try {
        const fallbackUrl = `https://github.com/tesseract-ocr/tessdata/raw/main/${lang.code}.traineddata`;
        console.log(`Trying fallback URL: ${fallbackUrl}`);
        await downloadFile(fallbackUrl, dest);
        const stats = fs.statSync(dest);
        console.log(
          `Successfully downloaded ${lang.name} using fallback URL (${stats.size} bytes)`
        );
      } catch (fallbackError) {
        console.error(`Fallback download also failed:`, fallbackError);
      }
    }
  }
}

// Run the download
downloadLanguages()
  .then(() => {
    console.log("All language files downloaded successfully!");
    const files = fs.readdirSync(tesseractDir);
    console.log("Files in tesseract-core directory:", files);
  })
  .catch((error) => {
    console.error("Error in download process:", error);
  });
