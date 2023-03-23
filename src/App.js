import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  
  const showalert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
    <NoteState>
    <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showalert}/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login showAlert={showalert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showalert}/>}/>
          </Routes>
        </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
