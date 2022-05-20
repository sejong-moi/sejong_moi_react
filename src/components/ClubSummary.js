import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import styles from './ClubSummary.module.css';


// club 개별
function ClubSummary({info = []}) {
    // const [club_info, setClub_info] = useState({});
    // const [isLoading, setLoading] = useState(false);
    const {category} = useParams();

    // useEffect(()=>{
    //     setClub_info(info);
    //     console.log("현재 띄워줄 동아리 목록들 : ",info);
    //     setLoading(true);
    // },[isLoading,category])

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

export default ClubSummary;