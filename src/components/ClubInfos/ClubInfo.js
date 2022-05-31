import { useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import ClubSummary from "./ClubSummary";
import styles from './ClubInfo.module.css';
import {Clubs_Info} from '../../api/api';

function ClubInfo() {
    const {clubcategory} = useParams();
    const [clubs, setClubs] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        //API 받아옴
        console.log("call", clubcategory);
        Clubs_Info(clubcategory).then((res)=>{     
            setClubs([...res.data]);
            setLoading(true);
            console.log("받은것", clubs);
        })
        .catch(err =>{
            console.log("정보를 가져오지 못했습니다.");
        })

    },[isLoading,clubcategory]);

    return (
    <div className={styles.clubs}>     
        <div className={styles.container}>
            {clubs && clubs.map((club,idx)=>(
                <ClubSummary key = {idx} info= {club} />
            ))}
        </div>
    </div>);
} 

export default ClubInfo;