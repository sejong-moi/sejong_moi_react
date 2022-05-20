import React, { useState} from 'react';
import loginstyles from './Login.module.css';
import {User_Login} from '../api/api';


function Login({authenticated}) {
    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    // 임시
    const [auth, setAuth] = useState(authenticated);
    const [error, setError] = useState(false);

    const handleInput = (e) => setId(e.target.value);
    const handlePwInput = (e) => setPw(e.target.value);

    const onSubmit = (e)=>{
        const user= { 
            username : id, 
            password : pw
        };
        console.log(user);
        //임시
        // localStorage.setItem('login-token', 'fake');
        // setAuth(true);

        User_Login(user).then(res => {
            if(res.data.key){
                console.log(res);
                localStorage.clear();
                localStorage.setItem('login-token', res.data.key);
                window.location.replace('/');
                setAuth(true);
            }else{
                setId('');
                setPw('');
                localStorage.clear();
                setError(true);
            }
         })
         .catch(err => {
             console.clear();
             alert('아이디 또는 비밀번호가 일치하지 않습니다.');
         });
    };

    return (
    <div>
        {
            auth ? "logined": <div className={loginstyles.login}>
            <div className={loginstyles.container}>
                <h1 className={loginstyles.name}>Login</h1>
                <form className= {loginstyles.submit} onSubmit={onSubmit}>
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
                        <button className={loginstyles.btn} font-size="21px" width="230px" height="40px" >로그인</button>
                    </div>
                </form>              
            </div>
        </div> 
        }
    </div>
    
    );
}

export default Login;