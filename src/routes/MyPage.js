
import React, { useState} from 'react';
import styles from "./MyPage.module.css"
import temp from "../images/rush.svg";
import ClubSummary from "../components/ClubSummary";

function MyPage({authenticated}) {
    
    return (
    <div className={styles.container}>
        <div className={styles.inner}>  
            <h1>관심목록</h1>     
            <div className={styles.abb}>
                <ClubSummary/>
                <ClubSummary/>
                <ClubSummary/>
                <ClubSummary/> 
                <ClubSummary/>                

            </div>          
      </div>
    </div>
    );
}

export default MyPage;


