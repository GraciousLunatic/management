import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

//styles
import './App.css'

//pages and components
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import UsersBar from "./components/usersBar/UsersBar";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (<BrowserRouter>
        {user && <Sidebar/>}
        <div className="container">
          <Navbar/>
          <Routes>
            <Route exact path="/" element={ user ? <Dashboard/> : <Navigate to="/login"/> }/>
            <Route path="/login" element={ !user ? <Login/> : <Navigate to="/"/> }/>
            <Route path="/signup" element={ !user ? <Signup/> : <Navigate to="/"/> }/>
            <Route path="/create" element={ user ? <Create/> : <Navigate to="/login"/> }/>
            <Route path="/projects/:id" element={ user ? <Project/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
        {user && <UsersBar/>}
      </BrowserRouter>)}
    </div>
  );
}

export default App
