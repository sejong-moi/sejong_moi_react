/*
구조 example
 {
      questionType: "text", 
      questionText: "구글폼 만들기에 오신 분들을 환영 합니다. 제목을 적어주세요.", 
      uuid: "125s-1x12f-1cva-1sdf" // 질문별 고유 id
   },
   {
      questionType: "checkbox", 
      questionText: "알고 있는 기술들을 모두 선택해주세요", 
      uuid: "af12-1ssf2f-d111f-vsdf1",
      options: [
         {text: "react", uuid: "1dsf-kjh12-a1nv-wjsdf"},
         {text: "Node JS", uuid: "2dsf-kjh12-a1nv-wjdsdf"},
         {text: "GraphQL", uuid: "3dsf-8888-19dn-1jsd3"},		
      ]
   },
   {
      questionType: "radio", 
      questionText: "제일 잘 알고 있는 기술을 한가지 선택해주세요" ,
      uuid: "1f12-1ssf2f-d111f-vsdf1",
      options: [
         {text: "react", uuid: "2dsf-kjh12-a1nv-wjsdf"},
         {text: "Node JS", uuid: "3dsf-kjh12-a1nv-wjdsdf"},
         {text: "GraphQL", uuid: "4dsf-8888-19dn-1jsd3"},		
      ]
   }

*/

import React, { useEffect, useState,useCallback } from "react";
import styles from "./Survey.module.css"

const Survey = ({questionType,questionText,options}) => {
   const [type,setType] = useState();
   const [checkedList, setCheckedLists] = useState(options);
   useEffect(()=>{
      
   },[])
   const onSubmit = async (e) => {
      //   console.log("send apply");
      //   e.preventDefault();
      //   e.persist();

      //   let files = e.target.profile_files.files; // Form의 input을 들고온다.
      //   let formData = new FormData(); // formData 객체를 생성한다.
      //   for (let i = 0; i < files.length; i++) { 
      //       formData.append("files", files[i]); // 반복문을 활용하여 파일들을 formData 객체에 추가
      //   }

      //   //일반 데이터 추가
        
      
      //   formData.append("data", JSON.stringify(dataSet)); // JSON 형식으로 파싱 후 추가
      //   //전송
      //   const postApply = await axios({
      //       method: "POST",
      //       url: `...`,
      //       mode: "cors",
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //       data: formData,
      //     });
      
      //     console.log(postApply);
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

   if (questionType === "text"){
      //text
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{questionText}</div>
            <input className ={styles.ques_ans}
               type ="text" 
               placeholder="여기 작성해주세요"
               // onChange={handleInput}
            />
         </div>
      )
   }
   else if (questionType === "checkbox"){
      //check box
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{questionText}</div>
            {options.map((list)=>(
               <div className={styles.checkbox_container}>
               <input className ={styles.ques_ans}
                  key = {list.id}
                  type ="checkbox" 
                  placeholder="여기 작성해주세요"
                  onChange={onChecked}
               />
               <div>{list.text}</div>
               </div>
            ))}
            
         </div>
      );
   }
   else if (questionType === "radio"){
      //radio
      return(
         <div className={styles.container}>
            <div className ={styles.ques}>{questionText}</div>
            {options.map((list)=>(
               <div className={styles.checkbox_container}>
               <input className ={styles.ques_ans}
                  key = {list.id}
                  type ="radio" 
                  name="radio"
                  placeholder="여기 작성해주세요"
                  onChange={onChecked}
               />
               <div>{list.text}</div>
               </div>
            ))}
            
         </div>
      );
   }
};

export default Survey;