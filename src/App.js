
import './App.css';
import HeaderComponent from './components/sharedcomponents/HeaderComponent';
import Footer from './components/sharedcomponents/Footer';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <div className="App">
     <HeaderComponent />
     <MainPage />
     <Footer />
    </div>
  );
}

export default App;
