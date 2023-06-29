import './styles.css'

const Display = ({ fetchedData }) => {
  return (
    <div>
    <h1 className='display-title'>Display</h1>
    <ul>
      {fetchedData.map((item, index) => (
        <div className='image-info' key={index}>
          <div>
          <h2>Image </h2>
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
