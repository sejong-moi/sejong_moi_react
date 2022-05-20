import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";

function Navbar() {

    useEffect(() => {
    }, []);
    return (
    <div className= {styles.navbar}>
        <nav className = {styles.container}>
            <div className = {styles.center_clubs}>
                {/* 모바일버전에서 클릭하면 메뉴 보이도록 설정하는 것도 한다. (close Mobile Menu)는 다시 버튼 누르면 없어지고 생기고 하도록 한다.  */}
                <Link to='/center/show'   style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>공연</div>
                </Link>
                <Link to='/center/cluture'   style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>문화</div>                     
                </Link>
                <Link to='/center/voluteer'   style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>봉사</div> 
                </Link>
                <Link to='/center/religion'  style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>종교</div> 
                </Link>
                <Link to='/center/athletic'  style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>체육</div> 
                </Link>
                <Link to='/center/academic'   style={{ textDecoration: 'none' }}>
                    <div className = {styles.clubs}>학술</div> 
                </Link>
            </div>
        </nav>
    </div>
    );
}

export default Navbar