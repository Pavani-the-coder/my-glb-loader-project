// main.js or custom-file-upload.js
document.getElementById('file-input').addEventListener('change', handleFileUpload);

async function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/uploads', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('File uploaded successfully.');
      } else {
        console.error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
