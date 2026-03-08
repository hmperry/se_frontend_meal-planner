import './preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <p className="preloader-text">Searching for recipes...</p>
    </div>
  );
}

export default Preloader;
