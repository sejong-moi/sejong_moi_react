
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import headerstyles from "./Header.module.css";
import logo from "../../images/LOGO.svg";
import profile from "../../images/profile.svg";
import { getCookie ,removeCookie} from '../../api/cookie';

function Header() {
    
    const [auth, setAuth] = useState();
    const onClick = () => {
        setAuth(false);
        removeCookie("jwt");
        window.location.replace('/');
        
        fetch('http://localhost:8000/login_api/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=> {
            
        });

    }
    useEffect(()=>{
        if (getCookie('jwt')){
            setAuth(true);
        }
        else{
            setAuth(false);
        }
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


