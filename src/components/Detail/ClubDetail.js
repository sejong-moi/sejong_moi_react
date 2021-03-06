import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import GetLogin from "../Login/GetLogin";
import Questions from './Questions';
import styles from './ClubDetail.module.css';
import call from "../../images/temp_call.svg";
import yes from "../../images/Yes.svg";
import no from "../../images/No.svg";
import { getCookie,  } from '../../api/cookie';
import { isPresident,Club_Info,Add_Interested,Del_Interested,Add_Question } from '../../api/api';


function ClubDetail() {
    const [auth, setAuth] = useState();
    const [pres,setPres] = useState(false);
    const [interest ,setInterest] = useState(false);
    const [user,setUser] = useState([]);
    const [club,setClub] = useState({'questions_list' : []});
    const [ques, setQues] = useState([]);
    
    const clubName = useParams().clubname;
    const [isLoading,setisLoading] = useState(false);
    const handleInput = (e)=> setQues(e.target.value); 
    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
            alert("질문하기 버튼을 이용해주세요");
        }
      }
    const handleClick = (e) => {
        const add = {
            'questioner' : user.id,
            'club_name' : clubName,
            'question_text' : ques
        }
        Add_Question(add).then((res)=> console.log(res));
        alert("질문을 등록 하였습니다")
    } 
    useEffect(()=> {   
        if (!getCookie('jwt')) setAuth(false); 
        else setAuth(true); 
  
        setisLoading(true);         

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
            let data = JSON.parse(result);
            setUser(data);
            for(let i in data.interesting){
                console.log(i);
                if (data.interesting[i] === clubName){
                    setInterest(true);
                }
            }
            
            let is_pres = {
                "club_name" : clubName,
                "user_id" : data.id
            }
            isPresident(is_pres).then((res)=>{
                if (res.data === "True") setPres(true);
                else setPres(false);
            })
        }      
        getUser();        

        // 동아리 세부 정보 가져오기
        Club_Info(clubName).then((res)=>{
            console.log(res.data); 
            setClub(res.data);
            // club.introduce_long =club.introduce_long.replace(/<br>/ig,"\n")
        }).catch(err=>{
            console.log(err);
        });       
    }, [isLoading]);  

    const onClick = () => {            
        let data = ({'username' : user.username,
            'club_name' : clubName});
        if (interest){
            // delete interest            
            Del_Interested(data);
            setInterest(false);
        }
        else {
            //add interest
            Add_Interested(data);
            setInterest(true); 
        }          
      }

    return (
        <div>{auth? <div className={styles.container}>            
            <div className={styles.inner}>     
                <div className={styles.main_img}>
                    <img src= {club.club_background_url} alt="img" className={styles.main__img} />  
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
                <div className= {styles.introduction}>
                    <pre style={{"white-space": "pre-wrap"}}>{club.introduce_long}</pre>
                </div>
                <div className= {styles.details}>
                    <div className={styles.content}>모집기간 : {club.is_recruiting}(~{club.recruit})</div>
                    <div className={styles.element}>
                        <div className={styles.icon_img}>
                            <img src = {call} alt = "call" ></img>
                        </div>
                        <div className={styles.content}>010-1234-5678</div>
                    </div>
                </div>                 
                { 
                    club.apply_link !== "" ? 
                    <a href={club.apply_link} style ={{textDecoration:'None'}}>
                        <button className={styles.btn} >신청하기</button> 
                    </a>
                    : null
                }
                
                <div className={styles.qna}>  
                    <h1>Q n A</h1>  
                    {club && club.questions_list.map((ques,id) => (
                        <Questions questions = {ques} key = {id} auth={pres} user_id={user.id}/>    
                    ))}
                </div>
                <div className={styles.qna}>  
                    <h1>Question</h1>  
                    <form  onKeyDown={onKeyDown}>
                        <input className ={styles.ques}
                            type ="text" 
                            placeholder="여기 질문해주세요"
                            onChange={handleInput}
                        />
                        <button type="submit" className={styles.btn} font-size="21px" width="230px" height="40px" onClick={handleClick} >질문하기</button>
                    </form>
                </div>  
                   
            </div>
            
        </div> 
        : 
       <GetLogin/>}
                
    </div>
    );
}

export default ClubDetail;