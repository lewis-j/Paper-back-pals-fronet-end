import React from "react";
import { useCamera } from "../hooks/useCamera";

export const CameraCapture = () => {
  const { takePicture } = useCamera();

  const handleCapture = async () => {
    try {
      const photo = await takePicture();
      console.log("Photo taken:", photo);
      // Do something with the photo
      // e.g., upload it, display it, etc.
    } catch (error) {
      console.error("Failed to take photo:", error);
    }
  };

  return <button onClick={handleCapture}>Take Photo</button>;
};
