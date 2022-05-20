/*
구조 example
 {
      questionType: "text", 
      title: "구글폼 만들기에 오신 분들을 환영 합니다. 제목을 적어주세요.", 
      uuid: "125s-1x12f-1cva-1sdf" // 질문별 고유 id
   },
   {
      questionType: "checkbox", 
      title: "알고 있는 기술들을 모두 선택해주세요", 
      uuid: "af12-1ssf2f-d111f-vsdf1",
      options: [
         {text: "react", uuid: "1dsf-kjh12-a1nv-wjsdf"},
         {text: "Node JS", uuid: "2dsf-kjh12-a1nv-wjdsdf"},
         {text: "GraphQL", uuid: "3dsf-8888-19dn-1jsd3"},		
      ]
   },
   {
      questionType: "radio", 
      title: "제일 잘 알고 있는 기술을 한가지 선택해주세요" ,
      uuid: "1f12-1ssf2f-d111f-vsdf1",
      options: [
         {text: "react", uuid: "2dsf-kjh12-a1nv-wjsdf"},
         {text: "Node JS", uuid: "3dsf-kjh12-a1nv-wjdsdf"},
         {text: "GraphQL", uuid: "4dsf-8888-19dn-1jsd3"},		
      ]
   }

*/

import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import styles from "./Survey.module.css"

const Survey = ({questionType,title,uuid,options}) => {
   const [type,setType] = useState();
   const [checkedList, setCheckedLists] = useState(options);
   useEffect(()=>{
      if (questionType === "text"){
         setType(1)
      }
      else if (questionType === "checkbox"){
         setType(2)
      }
      else if (questionType === "radio"){
         setType(3)
      }
   },[])
   const onSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.profile_files.files; // Form의 input을 들고온다.
        let formData = new FormData(); // formData 객체를 생성한다.
        for (let i = 0; i < files.length; i++) { 
            formData.append("files", files[i]); // 반복문을 활용하여 파일들을 formData 객체에 추가
        }

        //일반 데이터 추가
        let dataSet = {
            name: "lee",
            phone: "010-1234-1234",
            birth: "2001-09-11",
          };
      
        formData.append("data", JSON.stringify(dataSet)); // JSON 형식으로 파싱 후 추가
        //전송
        const postApply = await axios({
            method: "POST",
            url: `...`,
            mode: "cors",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          });
      
          console.log(postApply);
   };
   const onChecked = useCallback(
      (checked, list) => {
         if (checked) {
          setCheckedLists([...checkedList, list]);
         }
         else {
          setCheckedLists(checkedList.filter((el) => el !== list));
         }
      },
      [checkedList]
   );

   if (type === 1){
      //text
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{title}</div>
            <input className ={styles.ques_ans}
               type ="text" 
               id={uuid} 
               placeholder="여기 작성해주세요"
               // onChange={handleInput}
            />
         </div>
      )
   }
   else if (type === 2){
      //check box
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{title}</div>
            {options.map((list)=>(
               <div className={styles.checkbox_container}>
               <input className ={styles.ques_ans}
                  key = {list.id}
                  type ="checkbox" 
                  id={uuid} 
                  placeholder="여기 작성해주세요"
                  onChange={onChecked}
               />
               <div>{list.text}</div>
               </div>
            ))}
            
         </div>
      );
   }
   else if (type === 3){
      //radio
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{title}</div>
            {options.map((list)=>(
               <div className={styles.checkbox_container}>
               <input className ={styles.ques_ans}
                  key = {list.id}
                  type ="radio" 
                  id={uuid} 
                  placeholder="여기 작성해주세요"
                  onChange={onChecked}
               />
               <div>{list.text}</div>
               </div>
            ))}
            
         </div>
      );
   }
   return (
      
    <form onSubmit={(e) => onSubmit(e)}>
        <input
            type="file"
            name="profile_img"
            multiple="multiple"
        />
        <button type="submit">제출</button>
    </form>
  );
  
};

export default Survey;