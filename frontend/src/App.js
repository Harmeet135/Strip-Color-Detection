// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Newimg from './components/newimg';
import Display from './components/display';
import History from './components/history';

const App = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [buttonText, setButtonText] = useState('History');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/images');
      setFetchedData(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (selectedImage) => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      await axios.post('http://127.0.0.1:8000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleHistory = () => {
    setShowHistory((prevState) => !prevState);
    setButtonText((prevState) => (prevState === ' View History' ? ' Go Back' : ' View History'));
    console.log(showHistory);
  };

  return (
    <>
      {/* <button className='history-button' onClick={toggleHistory}>{buttonText}</button> */}
      <Newimg onImageUpload={handleImageUpload} />
      {showHistory ? <History fetchedData={fetchedData} /> : <Display fetchedData={fetchedData.slice(0, 1)} />}
    </>
  );
};



export default App;