import React from 'react';
import styles from './GetLogin.module.css';

function GetLogin() {
    const onClick = (e) => {
        window.location.replace('/login');
    }
    return (
    <div className={styles.getlogin}>
        <div className={styles.container}>
            <h1 className={styles.name}>로그인 후 이용이 가능합니다.</h1>
            <div>
                <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={onClick} >확인</button>
            </div>          
        </div>
    </div> 
    
    );
}

export default GetLogin;