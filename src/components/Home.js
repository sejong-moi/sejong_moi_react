
import React, { useEffect,useState} from 'react';
import styles from "./Home.module.css"
import ClubSummary from "./ClubInfos/ClubSummary";
import {List_Ranking} from "../api/api";

// 동아리 이미지 동아리 명 받아와야함
function Home() {
    const [clubs, setClubs] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const onClick = () => {
        window.location.replace('/manage/createclub');
    }
    useEffect(() => { 
        List_Ranking().then((res)=> {
            setClubs([...res.data]);
            setLoading(true);
        }) 
      }, [isLoading]);
  
    return (
        <div className={styles.container}>
            <div className={styles.inner}>  
                <h1>Ranking</h1>     
                <div className={styles.abb}>
                    {
                        clubs && clubs.map((club,idx)=> (
                            <ClubSummary type = "2" info = {club}/>
                        ))
                    }                        
                </div>            
          </div>
          <div className={styles.inner}>  
                <h1>Recruiting</h1>     
                <div className={styles.abb}>
                    {
                        clubs && clubs.map((club,idx)=> (
                            <ClubSummary type = "2" info = {club}/>
                        ))
                    }                        
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


