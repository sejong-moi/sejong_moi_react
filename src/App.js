
import Main from "./routes/Main";
import Navbar from "./components/Header/Navbar";
import Header from "./components/Header/Header";
import ClubInfo from "./components/ClubInfo";
import ClubDetail from "./components/Detail/ClubDetail";
import Login from "./components/Login";
import Apply from "./components/Apply/Apply";
import MyPage from "./routes/MyPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";


function App(){
  const [auth,setAuth] = useState();

  useEffect(()=>{
    if (localStorage.getItem('login-token') === null) {
      setAuth(false)
    }
    else {
      setAuth(true)
    }
    console.log(auth);
  },[]);

  return <Router>
    <Header authenticated = {auth}/>
    <Navbar />
    
    <Routes>
      <Route path = "/center/:clubcategory" element = {<ClubInfo/>} />    
      <Route path = "/center/:clubcategory/:clubname/detail" element={<ClubDetail/>}/> 
      <Route path = "/center/:clubname/apply" element={<Apply/>}/>   
      <Route path = "/login" element={<Login authenticated = {auth}/>}/>
      <Route path = "/mypage" element={<MyPage/>}/>

      <Route path = "/" element={<Main/>}/>       
    </Routes>
  </Router>;
}
export default App;
