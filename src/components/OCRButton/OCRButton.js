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

      // Updated parameters for better book text recognition
      await workerRef.current.setParameters({
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.,!?\"' ",
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK, // Changed to SINGLE_BLOCK for book pages
        preserve_interword_spaces: "1",
        textord_heavy_nr: "1", // Helps with serif fonts
        tessedit_do_invert: "0", // Don't invert colors
        tessedit_ocr_engine_mode: "3", // Use Legacy + LSTM models
      });

      // Recognize text
      const result = await workerRef.current.recognize(photoBlob);

      // Enhanced text cleaning for book content
      const extractedText = result.data.text
        .trim()
        .replace(/[\r\n]+/g, " ")
        .replace(/[^\w\s.,!?'"-]/g, "") // Added more punctuation common in books
        .replace(/\s+/g, " ")
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
