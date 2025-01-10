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
      // Create a new worker instance
      workerRef.current = await Tesseract.createWorker({
        workerPath: "/tesseract-core/worker.min.js",
        langPath: "/tesseract-core",
        corePath: "/tesseract-core/tesseract-core.wasm.js",
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });

      // Initialize worker
      await workerRef.current.loadLanguage("eng");
      await workerRef.current.initialize("eng");

      // Recognize text
      const result = await workerRef.current.recognize(photoBlob);

      // Clean up the extracted text
      const extractedText = result.data.text
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, " ")
        .replace(/\b\w\b/g, "")
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
