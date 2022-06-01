import React, { useEffect, useState, useRef } from "react";
import {Link,useParams } from 'react-router-dom';
import styles from "./Apply.module.css";
import img from "../../images/rush.svg";

const Apply = () => {
    const clubName = useParams().clubname;
    const [checkedList, setCheckedLists] = useState([{optionText : "선수"},{optionText: "매니저"}]);

    const temp = [
      {questionType : "radio", questionText : "어느 부문을 지원하시나요?", options : [{optionText : "선수"},{optionText: "매니저"}] ,open : true, required : true},
      {questionType : "text", questionText : "자기 소개 부탁드립니다", options : [{optionText : "작성해주세요"},{optionText: "더 할말은?"}] ,open : true, required : true},
    ]
    const onChecked =(e) =>{
      console.log(e.target.id);
    }
    const handleInput = (e) => {
      console.log(e.target.value);
    }
    useEffect(()=>{
      //api에서 받아옴
    },[])
    return (
    <div className={styles.container}>
      <div className={styles.inner}>       
        <div className={styles.abb}>
            <div className={styles.club_img}>
                <img src = {img} alt = {clubName} ></img>
            </div>
            <div className={styles.club_name}>{clubName}</div>
        </div>  
        <form className = {styles.apply_form}>          
          {temp && temp.map((ques,idx)=>(
            ques.questionType === "text" ? 
            <div className={styles.ques_container}>
              <div className ={styles.ques}>{ques.questionText}</div>
              <input className ={styles.ques_ans}
                  type ="text" 
                  placeholder="여기 작성해주세요"
                  onChange={handleInput}
              />
          </div> :
          ques.questionType === "radio" ? 
          <div className={styles.ques_container}>
            <div className ={styles.ques}>{ques.questionText}</div>
            {ques.options.map((list)=>(
               <div className={styles.checkbox_container}>
               <input className ={styles.ques_ans}
                  key = {list.id}
                  type ="radio" 
                  name="radio"
                  placeholder="여기 작성해주세요"
                  onChange={onChecked}
               />
               <div>{list.optionText}</div>
               </div>
            ))}
            
         </div>:
         null
          ))} 
          
          <Link to= {`/center/${clubName}/apply_success`} style ={{textDecoration:'None'}}>
            <button className={styles.btn_apply} >신청하기</button>
          </Link> 
        </form> 
        
      </div>
      
    </div>   
  );
  
};

export default Apply;