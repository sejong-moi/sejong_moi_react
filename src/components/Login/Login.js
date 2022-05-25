import React, { Redirect,useEffect, useState} from 'react';
import { getCookie, setCookie } from '../../api/cookie';
import loginstyles from './Login.module.css';


function Login() {
    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [auth, setAuth] = useState();

    const handleInput = (e) => setId(e.target.value);
    const handlePwInput = (e) => setPw(e.target.value);

    useEffect(()=>{
        if (getCookie('jwt')){
            setAuth(true);
        }
        else{
            setAuth(false);
        }
    },[])
    const handleClick = (e) => {
        const user= { 
            'username' : id, 
            'password' : pw
        };         
        e.preventDefault();
        fetch('http://localhost:8000/login_api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(res=> {
            if(res.jwt){              
                setCookie('jwt',res.jwt);
                console.log(getCookie('login-token'));
                window.location.replace('/');
                setAuth(true);
            }else{
                console.log("no access");
                setId('');
                setPw('');
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        });
    }

    return (
    <div>

        {
            auth?  <Redirect to={'/'} />:
            <div className={loginstyles.login}>
        <div className={loginstyles.container}>
            <h1 className={loginstyles.name}>Login</h1>
            <form className= {loginstyles.submit}>
                <input 
                    type ="text" 
                    id="username" 
                    className={loginstyles.login_input} 
                    placeholder="학번"
                    onChange={handleInput}
                />
                <input 
                    type="password" 
                    className={loginstyles.login_input} 
                    placeholder="세종 포탈 비밀번호" 
                    onChange={handlePwInput}
                />
                <div>
                    <button onClick={handleClick} className={loginstyles.btn} font-size="21px" width="230px" height="40px" >로그인</button>
                </div>
            </form>              
        </div>
    </div> 
        }
    </div>
    
    );
}

export default Login;