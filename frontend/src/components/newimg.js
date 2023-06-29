import { useState } from 'react';
import './styles.css';

const Newimg = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div className='upload-box'>
        <h1  id='heading-new'>Upload the image of Your strip</h1>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      <button id='upload-button' onClick={handleUpload} disabled={!selectedImage}>
        Upload 
      </button>
    </div>
  );
};

export default Newimg;
