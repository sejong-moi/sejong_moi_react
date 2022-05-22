
import React, { useEffect,useState} from 'react';
import styles from "./Home.module.css"
import ClubSummary from "./ClubSummary";

// 동아리 이미지 동아리 명 받아와야함
function Home() {
    const [info, setInfo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const onClick = () => {
        window.location.replace('/manage');

    }
    useEffect(() => { 
        setInfo([{"name" : "RUSH",
        "img_url" : "temp",
        "category" : "Athletic"}])
        setLoading(true);
      }, [isLoading]);

    return (
        <div className={styles.container}>
            <div className={styles.inner}>  
                <h1>Ranking</h1>     
                <div className={styles.abb}>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>       
                </div>          
          </div>
          <div className={styles.inner}>  
                <h1>동아리 등록 신청</h1>     
                <div>
                <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={onClick} >신청</button>
                </div>         
          </div>
        </div>
        
    );
}

export default Home;


