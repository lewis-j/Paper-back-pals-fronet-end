import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Tesseract from "tesseract.js";
import styles from "./OCRButton.module.scss";
import { CameraCapture } from "../CameraCapture/CameraCapture";

const OCRButton = ({ onTextExtracted, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = async (photoBlob) => {
    if (!photoBlob) return;

    setIsProcessing(true);
    try {
      const result = await Tesseract.recognize(photoBlob, "eng", {
        workerPath: "/tesseract-core/worker.min.js",
        // Use CDN for language data
        langPath: "/tesseract-core",
        corePath: "/tesseract-core/tesseract-core.wasm.js",
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });

      // Clean up the extracted text
      const extractedText = result.data.text
        .trim()
        // Remove special characters and extra whitespace
        .replace(/[^\w\s-]/g, "")
        // Replace multiple spaces/newlines with single space
        .replace(/\s+/g, " ")
        // Remove lone single characters (like 'N S' or 'E')
        .replace(/\b\w\b/g, "")
        // Clean up multiple spaces again
        .replace(/\s+/g, " ")
        .trim();
      onTextExtracted(extractedText);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <>
      <CameraCapture
        onCapture={handleImageUpload}
        className={styles.cameraBtn}
        disabled={disabled || isProcessing}
      >
        <FontAwesomeIcon
          icon={faCamera}
          size="lg"
          className={isProcessing ? styles.spinning : ""}
        />
      </CameraCapture>
      {isProcessing && (
        <div className={styles.progressIndicator}>Processing: {progress}%</div>
      )}
    </>
  );
};

export default OCRButton;
