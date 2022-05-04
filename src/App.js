import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Overview from './components/Overview/Overview';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import ViaFacebook from './components/ViaFacebook/ViaFacebook';
import ViaInstagram from './components/ViaInstagram/ViaInstagram';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Header></Header>}></Route>
        <Route path="/home" element={<Header></Header>}></Route>
        <Route path="/overview" element={<Overview></Overview>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact>
        </Contact>}>
          <Route path="via-facebook" element={<ViaFacebook></ViaFacebook>}></Route>
          <Route path="via-instagram" element={<ViaInstagram></ViaInstagram>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
