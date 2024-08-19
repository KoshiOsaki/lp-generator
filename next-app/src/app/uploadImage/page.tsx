'use client';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
  }

  const handleSubmit = async (file: File) => {
    const body = new FormData()

    body.append('file', file)
    const res = await fetch(`/api/uploadImage`, {
      method: 'POST',
      body: body,
    });
    const jsonRes = await res.json()
    console.log(jsonRes)
  }

  return (
    <>
      <h2>Upload Image</h2>
      <TextField
        label="ファイル名"
        variant="outlined"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        fullWidth
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button onClick={() =>
        file && fileName &&
        handleSubmit(file)
      }>
        Upload
      </Button>
    </>
  );
}
