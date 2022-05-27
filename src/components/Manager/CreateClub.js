import React, { useState, useEffect} from 'react';

import GetLogin from '../Login/GetLogin';
import styles from './CreateClub.module.css';
import { getCookie} from '../../api/cookie';

function CreateClub() {
    const [auth, setAuth] = useState();
    const [answer,setAnswer] = useState({
      'name': "",
      "introduce": "",
      "introduce_abb" : "",
      "club_logo_url": "",
      "category" : [],
      "president_name": "",
      "president_phone_number": "" ,
      "president_id" : ""    
    })   
    const formData = new FormData();

    const options= ["상시 모집","모집 마감","직접 입력"];
    const categorys = ["공연", "문화", "봉사","종교","운동", "학술"];
    function file_upload(e){

    }
    function changeAns(e) {
      formData.append(String(e.target.id),String(e.target.value));
      if(e.target.id === "club_logo_url"){
        console.log(e.target.files[0]);
        console.log("reader : ", FileReader.readAsDataURL(e.target.files[0]));
      }
      // console.log("change!");
      // for (var key of formData.keys()) {
      //     console.log("key : ",key);
      // }
      // for (var value of formData.values()) {
      //   console.log("value : ",value);
      // }
        
      // if(type === "name"){
      //   let ans = {...answer};
      //   ans.name = text;
      //   setAnswer(ans);        
      // }
      // else if(type === "introduce"){
      //   console.log("changed!!!");
      //   let ans = {...answer};
      //   ans.introduce = text;

      //   formData.append(String(text.target.id),String(text.target.value));

      //   console.log("keys!!");

      //   for (var key of formData.keys()) {
      //     console.log(key);
        
      //   }
      //   console.log("values!!");
        
      //   for (var value of formData.values()) {
        
      //     console.log(value);
        
      //   }

      //   setAnswer(ans);
      // }
      // else if(type === "introduce_abb"){
      //   let ans = {...answer};
      //   ans.introduce_abb = text;
      //   setAnswer(ans);
      // }
      // else if(type === "club_logo_url"){
      //   let ans = {...answer};
      //   ans.club_logo_url = text[0];
      //   setAnswer(ans);
      // }
      // else if(type === "category"){
      //   let ans = {...answer};
      //   let cate = [text,];
      //   ans.category = cate;
      //   // console.log(cate);
      //   setAnswer(ans);
      // }
      // else if(type === "president_name"){
      //   let ans = {...answer};
      //   ans.president_name = text;
      //   setAnswer(ans);
      // }
      // else if(type === "president_id"){
      //   let ans = {...answer};
      //   ans.president_id = text;
      //   setAnswer(ans);
      // }
      // else if(type === "president_phone_number"){
      //   let ans = {...answer};
      //   ans.president_phone_number = text;
      //   setAnswer(ans);
      // }
      
      // console.log(answer);
    }
    const handleClick = (e) => {
              
      e.preventDefault();
      fetch('http://localhost:8000/club_api/register',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(answer)
      }).then(res => res.json())
      .then(res=> {
          if(res){                
              console.log("success");
          }else{
              console.log("no access");
              alert('내용을 채워주세요');
          }
      });
      console.log("change!");
      for (var key of formData.keys()) {
          console.log("key : ",key);
      }
      for (var value of formData.values()) {
        console.log("value : ",value);
      }
  }
    useEffect(() => { 
      if (!getCookie('jwt')) setAuth(false);
      else setAuth(true);
    }, []);

    return (
    <div>
      {auth? <div className={styles.container}>
      <h1> 동아리 등록 </h1>
      <div className={styles.inner}> 
          <form>
            <div className= {styles.element}>
              <label id="name">동아리 명 </label>
              <input type="text" id="name" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="president_name">회장 이름 (사이트 관리자) </label>
              <input type="text" id="president_name" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="president_id">회장 학번 (사이트 관리자) </label>
              <input type="text" id="president_id" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="category">동아리 카테고리 </label>
              <div className={styles.ques}>
                {categorys.map((cate, i)=>(
                <div className={styles.checkbox_container}>
                <input className ={styles.ques_ans} id = {cate} key = {i} type ="radio" name="category" onChange={(e) => changeAns("category",i+1)} checked={answer.category[0] === i+1}/>
                <div>{cate}</div>
                </div> ))}
              </div>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>배경 이미지</p>
              <label className={styles.img_btn} for="background_img">파일 업로드</label>
              <input type="file" id="background_img" multiple="multiple" style={{display:"none"}} />
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>로고 이미지</p>
              <label className={styles.img_btn} for="club_logo_url">파일 업로드</label>
              <input type="file" id="club_logo_url"  multiple="multiple" style={{display:"none"}} onChange={(e) => changeAns(e)} />
            </div>
            <div className= {styles.element}>
              <label id="introduce_abb">동아리 요약 소개 (50자 이하) </label>
              <textarea  type="text" id="introduce_abb" maxLength={50} cols="100" rows="5" onChange={(e) => changeAns(e)}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="introduce">동아리 소개글</label>
              <textarea  type="text" id="introduce" cols="100" rows="5" onChange={(e) => changeAns(e)}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="president_phone_number">연락처  (ex) 010-1234-5678</label>
              <input type="text" id="president_phone_number" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="location">동아리방 위치 </label>
              <input type="text" id="location"></input>
            </div>
            {/* <div>동아리 SNS 정보 입력</div> */}
            <div className= {styles.element}>
              <label id="youtube">youtube link</label>
              <input type="text" id="youtube"></input>
            </div>
            <div className= {styles.element}>
              <label id="facebook">facebook link</label>
              <input type="text" id="facebook"></input>
            </div>
            <div className= {styles.element}>
              <label id="instagram">instagram link</label>
              <input type="text" id="instagram"></input>
            </div>
            <div className= {styles.element}>
              <label id="apply_date">모집 마감 기간</label>
              <div className={styles.ques}>
                {options.map((list)=>(
                <div className={styles.checkbox_container}>
                <input className ={styles.ques_ans}
                    key = {list.id}
                    type ="radio"  
                />
                <div>{list}</div>
               </div> 
            ))}
            </div>
            </div>
            <div>
                <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={handleClick} >등록</button>
            </div>
          </form>          
      </div>    
    </div> :
    <GetLogin/>}
    </div> 
    );
}

export default CreateClub;