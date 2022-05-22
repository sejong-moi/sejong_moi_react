import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import styles from './ClubSummary.module.css';
import temp from "../images/rush.svg";

// club 개별
function ClubSummary({info = [], type = 1}) {
    // const [club_info, setClub_info] = useState({});
    const [isLoading, setLoading] = useState(false);
    const {category} = useParams();

    useEffect(()=>{
        // setClub_info(info);
        // console.log("temp data ",info);
        setLoading(true);
        
    },[isLoading,category])

    if (type === 1){
        return (
            <div className={styles.container}>            
                    <div className={styles.clubs}>
                        <div className ={styles.img_container}>
                            <img src = {info.club_logo_url} alt = "img" className={styles.club_img}></img>
                        </div>
                        <div className={styles.info_container}>
                            <p className={styles.club__name}><Link to={`/center/${category}/${info.name}/detail`} style={{textDecoration : 'none'}}>{info.name}</Link></p>
                            <p className={styles.summary}>{info.introduce}</p>
                        </div>
                    </div> 
            </div>
            
        );
    }
    return(
        <div className={styles.interest_container}>            
                    <div className={styles.interest_clubs}>
                        <div className ={styles.interest_img_container}>
                            <img src = {temp} alt = "img" className={styles.club_img}></img>
                        </div>
                        <div className={styles.info_container}>
                            <p className={styles.interest_club__name}><Link to={`/center/${info.category}/${info.name}/detail`} style={{textDecoration : 'none'}}>{info.name}</Link></p>
                        </div>    
                    </div> 
            </div>
    );
    
}

export default ClubSummary;