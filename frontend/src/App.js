// // App.js
import React, { useState } from "react";
import FileUploadForm from "./Components/FileUploadForm";
import PdfDisplay from "./Components/PdfDisplay";
import { Container, CssBaseline, Paper, Typography } from "@mui/material";

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [fileId, setFileId] = useState("");

  const handleUpload = (fileId) => {
    console.log("File uploaded successfully. File ID:", fileId);
    setUploaded(true);
    setFileId(fileId);
  };

  return (
    <div className="App">
      <Typography variant="h4" align="center" gutterBottom>
        PDF Processor
      </Typography>
      <FileUploadForm />
    </div>
  );
}

export default App;
