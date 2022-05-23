
import Main from "./routes/Main";
import Navbar from "./components/Header/Navbar";
import Header from "./components/Header/Header";
import ClubInfo from "./components/ClubInfo";
import ClubDetail from "./components/Detail/ClubDetail";
import Login from "./components/Login/Login";
import CreateClub from "./components/Manager/CreateClub";

import Apply from "./components/Apply/Apply";
import MyPage from "./routes/MyPage";

import CenteredTabs from "./components/Apply_/Tabs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App(){

  return <Router>
    <Header />
    <Navbar />
    
    <Routes>
      <Route path = "/center/:clubcategory" element = {<ClubInfo/>} />    
      <Route path = "/center/:clubcategory/:clubname/detail" element={<ClubDetail/>}/> 
      <Route path = "/center/:clubname/apply" element={<Apply/>}/>   
      <Route path = "/login" element={<Login />}/>
      <Route path = "/mypage" element={<MyPage/>}/>
      <Route path = "/manage" element = {<CreateClub/>}/>
      <Route path ="/temp" element={<CenteredTabs/>}/>     

      <Route path = "/" element={<Main/>}/>
    </Routes>
  </Router>;
}
export default App;
