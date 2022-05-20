
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import headerstyles from "./Header.module.css";
import logo from "../../images/LOGO.svg";
import chat from "../../images/chat.svg";
import profile from "../../images/profile.svg";
import store from '../../store';


function Header({authenticated}) {
    //const auth = store.getState().user.userAuth;
    
    const [auth, setAuth] = useState(authenticated);
    const onClick = () => {
        setAuth(false);
        localStorage.clear();
        console.log("clear localstorage");
    }
    useEffect(()=>{
        console.log("header ",auth);
    },[])
    return (
    <div className={headerstyles.header}>
        <div className = {headerstyles.inner}>
            <div className={headerstyles.left}>
                <Link to='/' style ={{textDecoration:'None'}}>
                    <img src={logo} alt = "logo" className={headerstyles.logo}/> 
                </Link>
            </div>
            {auth ? <button className={headerstyles.btn_logout} onClick={onClick} >로그아웃</button> : 
                <Link to='/login' style ={{textDecoration:'None'}}>
                    <button className={headerstyles.btn_login} >로그인</button>
                </Link>
            
            }         
            <Link to ='/mypage' style={{textDecoration:'None'}}>
                <img className={headerstyles.icons} src={profile} alt = "profile"/>
            </Link>
            {/* <img className={headerstyles.icons} src={chat} alt = "chat"/>  */}

        </div>
        
    </div>);
}

export default Header;


