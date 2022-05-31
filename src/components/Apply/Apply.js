import React, { useEffect, useState, useRef } from "react";
import {Link,useParams } from 'react-router-dom';
import Survey from "./Survey";
import styles from "./Apply.module.css";
import temp from "../../images/rush.svg";

const Apply = () => {
    const clubName = useParams().clubname;
    // let temp = {
    //   {questionType : "Text", questionText : "어느 부문을 지원하시나요?",},
    //   {}
    // }
    useEffect(()=>{
      //api에서 받아옴
    },[])
    
 
    return (
    <div className={styles.container}>
      <div className={styles.inner}>       
        <div className={styles.abb}>
            <div className={styles.club_img}>
                <img src = {temp} alt = {clubName} ></img>
            </div>
            <div className={styles.club_name}>{clubName}</div>
        </div>  
        <form className = {styles.apply_form}>          
          <Survey 
            questionType = "radio"
            questionText ="지원 분야" 
            options ={ [
              {text: "매니저", uuid: "2dsf-kjh12-a1nv-wjsdf"},
              {text: "선수", uuid: "3dsf-kjh12-a1nv-wjdsdf"},
            ]}
          />
          <Survey 
            questionType = "checkbox"
            questionText ="입단 테스트 가능 날짜를 선택해주세요." 

            options ={ [
              {text: "4월 5일", uuid: "2dsf-kjh12-a1nv-wjsdf"},
              {text: "4월 6일", uuid: "3dsf-kjh12-a1nv-wjdsdf"},
              {text: "4월 7일", uuid: "4dsf-8888-19dn-1jsd3"},		
            ]}
          />
          <Survey 
            questionType = "text"
            questionText ="짧은 자기 소개 부탁드립니다."             
          />  
          
          <Link to= {`/center/${clubName}/apply_success`} style ={{textDecoration:'None'}}>
            <button className={styles.btn_apply} >신청하기</button>
          </Link> 
        </form> 
        
      </div>
      
    </div>   
  );
  
};

export default Apply;