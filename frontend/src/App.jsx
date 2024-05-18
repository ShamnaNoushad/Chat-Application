import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ChatRoom from './components/Chat/ChatRoom';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/chat" element={<ChatRoom/>}/>
    </Routes>  
    </div>
  );
}

export default App;
