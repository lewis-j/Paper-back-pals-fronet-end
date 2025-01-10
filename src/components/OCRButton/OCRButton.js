import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Tesseract from "tesseract.js";
import styles from "./OCRButton.module.scss";
import { CameraCapture } from "../CameraCapture/CameraCapture";

const OCRButton = ({ onTextExtracted, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const workerRef = useRef(null);

  const handleImageUpload = async (photoBlob) => {
    if (!photoBlob) return;

    setIsProcessing(true);

    try {
      // Create a new worker instance with updated configuration
      workerRef.current = await Tesseract.createWorker({
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });

      // Initialize worker with language
      await workerRef.current.loadLanguage("eng");
      await workerRef.current.initialize("eng");

      // Add improved configuration
      await workerRef.current.setParameters({
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-., ",
        tessedit_pageseg_mode: Tesseract.PSM.AUTO,
        preserve_interword_spaces: "1",
      });

      // Recognize text
      const result = await workerRef.current.recognize(photoBlob);

      // Improved text cleaning
      const extractedText = result.data.text
        .trim()
        .replace(/[\r\n]+/g, " ") // Replace multiple newlines with space
        .replace(/[^\w\s.,'-]/g, "") // Keep only alphanumeric, spaces, periods, commas, hyphens
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      onTextExtracted(extractedText);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      // Properly terminate the worker
      if (workerRef.current) {
        await workerRef.current.terminate();
        workerRef.current = null;
      }
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // Ensure worker is terminated when component unmounts
      const cleanup = async () => {
        if (workerRef.current) {
          try {
            await workerRef.current.terminate();
            workerRef.current = null;
          } catch (error) {
            console.error("Error cleaning up Tesseract worker:", error);
          }
        }
      };
      cleanup();
    };
  }, []);

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
