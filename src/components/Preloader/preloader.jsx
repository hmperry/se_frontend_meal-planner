import './preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__text">Searching for recipes...</p>
    </div>
  );
}

export default Preloader;
