import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidemenu/Sidebar'
import Menu from './components/projects/menu';
function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>   
    </div>
  );
}

export default App;
