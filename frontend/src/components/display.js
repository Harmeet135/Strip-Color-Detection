import './styles.css'

const Display = ({ fetchedData, toggleHistory, showHistory }) => {
  return (
    <div className="display-box">
      <h1 className='display-title' onClick={toggleHistory}>Recent Result</h1>
      <p className='display-title' onClick={toggleHistory}>
        {showHistory ? 'Go Back' : '( Click to display previous results )'}
      </p>
    <ul>
      {fetchedData.map((item, index) => (
        <div className='image-info' key={index}>
          <div>
          <h2>Strip </h2>
          <img className="img-fluid" src={item.image} alt={`Image ${index + 1}`} />
          </div>
          <div>
          <h2>Result</h2>
          <div className="json-data">{JSON.stringify(item.colors, null, 1)}</div>
          </div>
        </div>
      ))}
    </ul>
  </div>
  
  );
};

export default Display;
