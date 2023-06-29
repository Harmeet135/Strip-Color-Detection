import { useState } from 'react';

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
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      <button onClick={handleUpload} disabled={!selectedImage}>
        Upload Image
      </button>
    </div>
  );
};

export default Newimg;
