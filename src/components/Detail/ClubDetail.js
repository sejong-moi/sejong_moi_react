import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import GetLogin from "../Login/GetLogin";

import styles from './ClubDetail.module.css';
import main_img from "../../images/temp.png";
import call from "../../images/temp_call.svg";
import yes from "../../images/Yes.svg";
import no from "../../images/No.svg";
import { getCookie,  } from '../../api/cookie';
import { Club_Info,Add_Interested,Del_Interested,Is_Interested } from '../../api/api';


function ClubDetail() {
    const [auth, setAuth] = useState();
    const [interest ,setInterest] = useState(false);
    const [user,setUser] = useState([]);
    const [club,setClub] = useState([]);
    const [data,setData] = useState([]);
    const clubName = useParams().clubname;
    const [isLoading,setisLoading] = useState(false);

    useEffect(()=> {  
        if (!getCookie('jwt')) setAuth(false); 
        else setAuth(true);

        setisLoading(true);  
        setData({'jwt' : getCookie('jwt'),
            'club_name' : clubName});
        console.log("보낼 정보 :" , data);

        Is_Interested(data).then((res)=>{
            console.log(res);
            if (res.data.interested === "True"){
                setInterest(true);
            }
            else{
                setInterest(false);
            }
        });

        // user 정보 가져오기
        async function getUser () { 
            let response = await fetch('http://localhost:8000/login_api/user',{
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            });
    
            const reader = response.body.getReader();           
            // Step 2: get total length
            const contentLength = +response.headers.get('Content-Length');
    
            // Step 3: read the data
            let receivedLength = 0; // received that many bytes at the moment
            let chunks = []; // array of received binary chunks (comprises the body)
            while(true) { 
            const {done, value} = await reader.read();
    
            if (done) { break;}  
    
            chunks.push(value);  
            receivedLength += value.length; 
            }    
            // Step 4: concatenate chunks into single Uint8Array
            let chunksAll = new Uint8Array(receivedLength); // (4.1)
            let position = 0;
            for(let chunk of chunks) {
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
            }    
            // Step 5: decode into a string
            let result = new TextDecoder("utf-8").decode(chunksAll);
    
            // We're done!
            let commits = JSON.parse(result);
            setUser(commits);
            // for(let i = 0 ; i < (user.interesting))
        }      
        getUser();        
        console.log("user 정보 : ", user)
        // 동아리 세부 정보 가져오기
        Club_Info(clubName).then((res)=>{
            console.log(clubName);
            setClub(res.data);
            console.log("club 정보 : ", club);
        }).catch(err=>{
            console.log(err);
        });

        
 
    }, [isLoading]); 

      const onClick = () => {   
        if (interest){
            // delete interest
            Del_Interested(data).then((res)=> {
                console.log("delete interest",res);
            })
            setInterest(false);
        }
        else {
            //add interest
              Add_Interested(data).then((res)=>{
                  console.log("add interest", res)                    
              })
              setInterest(true);
        }          

      }

    return (
        <div>{auth? <div className={styles.container}>            
            <div className={styles.inner}>     
                <div className={styles.main_img}>
                    <img src={main_img} alt="img" className={styles.main__img} />  
                </div>             
                <div className={styles.abb}>
                    <div className={styles.club_img}>
                        <img src = {club.club_logo_url} alt = {clubName} ></img>
                    </div>
                    <div className={styles.club_name}>{clubName}</div>
                    <div className={styles.interest}>
                        {interest ? 
                        <img src = {yes} alt = "interesting" onClick={onClick}></img> :
                        <img src= {no} alt="not interestig" onClick={onClick}></img>
                        }
                    </div>
                    <p className={styles.interest_content}>관심 담기</p>
                    
                </div>  
                {/* <div>동아리 소개글</div> */}
                <div className= {styles.introduction}>
                    {club.introduce}
                </div>
                <div className= {styles.details}>
                    <div className={styles.icon_img}>
                        <img src = {call} alt = "call" ></img>
                    </div>
                    <div className={styles.content}>010-1234-5678</div>
                </div> 
                <Link to= {`/center/${clubName}/apply`} style ={{textDecoration:'None'}}>
                    <button className={styles.btn_apply} >신청하기</button>
                </Link>    
            </div>
        </div>: 
       <GetLogin/>}
                
    </div>
        
        
    );
}

export default ClubDetail;