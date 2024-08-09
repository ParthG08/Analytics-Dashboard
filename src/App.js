import logo from './logo.svg';
import './App.css';
import IntensityTable1 from './intensity/intensityTable1.js';
import IntensityTable2 from './intensity/IntensityTable2.js';
import Navbar from './navbar/index.js';

function App() {
  return (
    <div>
      <Navbar/>
      <IntensityTable1/>
    </div>
  );
}

export default App;
