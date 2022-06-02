
import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';

import GetLogin from '../Login/GetLogin';
import styles from './CreateClub.module.css';
import { getCookie} from '../../api/cookie';
import {Send_Image,Update_Club,Club_Info} from "../../api/api";


function UpdateClub() {
    const [auth, setAuth] = useState();
    const [clubs,setClubs]=useState([]);
    const [data,setData] = useState([]);
    const clubName = useParams().clubname;

    const options= ["상시 모집","모집 마감"];
    const categorys = ["공연", "문화", "봉사","종교","체육", "학술"];

    useEffect(() => { 
        Club_Info(clubName).then((res)=>{
            console.log(res.data);
            setClubs(res.data);
            setData(res.data);            
        }) 
        if (!getCookie('jwt')) setAuth(false);
        else setAuth(true);
    }, []);

    function file_upload(e,type){      
      const data = new FormData();
      data.set("image", e.target.files[0] , e.target.files[0].name);
      Send_Image(data).then((res)=>{
        console.log(res);
      })          
    }

    function changeRecruit(e){
      let prev = {...data}; 
      prev.recruit = e.target.id; 
      setData(prev);      
    } 
    function addCategory(e,idx){
      var li = [idx,];      
      let prev = {...data}; 
      prev.category_kor = e.target.id; 
      prev.category=li;
      setData(prev);
      console.log(prev);
    }
    const handleClick = (e) => { 
      e.preventDefault();
      console.log(data);
      Update_Club(JSON.stringify(data)).then((res)=>{
        console.log(res);
      })
  }
    
    return (
    <div>
      {auth? <div className={styles.container}>
      <h1> 동아리 수정 </h1>
      <div className={styles.inner}> 
          <form method="post" enctype="multipart/form-data">
            <div className= {styles.element}>
              <label id="name">동아리 명 </label>
              <input type="text" value = {data.name} id="name" onChange={(e) => {let prev = {...data}; prev.name = e.target.value; setData(prev)} }></input>
            </div>
            <div className= {styles.element}>
              <label id="president_name">회장 이름 (사이트 관리자) </label>
              <input type="text" value = {data.president_name} id="president_name" onChange={(e) => {let prev = {...data}; prev.president_name = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="president_id">회장 학번 (사이트 관리자) </label>
              <input type="text" id="president_id" value = {data.president_id} onChange={(e) => {let prev = {...data}; prev.president_id = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="category">동아리 카테고리 </label>
              <div className={styles.ques}>
                {categorys.map((cate, i)=>(
                <div className={styles.checkbox_container}>
                <input className ={styles.ques_ans} id = {cate} key = {i} type ="radio" name="category" onChange={(e) => addCategory(e,i+1)} checked={data.category_kor===cate}/>
                <div>{cate}</div>
                </div> ))}
              </div>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>배경 이미지</p>
              <label className={styles.img_btn} for="club_background_url">파일 업로드</label>
              <input type="file" id="club_background_url"  style={{display:"none"}}onChange={(e) => file_upload(e,"club_backgroud_url")} accept="image/*"/>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>로고 이미지</p>
              <label className={styles.img_btn} for="club_logo_url">파일 업로드</label>
              <input type="file" id="club_logo_url"  style={{display:"none"}} onChange={(e) => file_upload(e,"club_logo_url")} accept="image/*"/>
            </div>
            <div className= {styles.element}>
              <label id="introduce">동아리 요약 소개 (50자 이하) </label>
              <textarea  type="text" value={data.introduce} id="introduce" maxLength={50}  className={styles.text}  onChange={(e) => {let prev = {...data}; prev.introduce = e.target.value; setData(prev)}}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="introduce_long">동아리 소개글</label>
              <textarea  type="text" value = {data.introduce_long}id="introduce_long" className={styles.text} onChange={(e) => {let prev = {...data}; prev.introduce_long = e.target.value; setData(prev)}}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="president_phone_number">연락처  (ex) 010-1234-5678</label>
              <input type="text" id="president_phone_number" value={data.president_phone_number}onChange={(e) => {let prev = {...data}; prev.president_phone_number = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="location">동아리방 위치 </label>
              <input type="text" id="location" onChange={(e) => {let prev = {...data}; prev.location = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="apply_link">신청서 link</label>
              <input type="text" id="apply_link"onChange={(e) => {let prev = {...data}; prev.apply_link = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="youtube">youtube link</label>
              <input type="text" id="youtube" onChange={(e) => {let prev = {...data}; prev.youtube = e.target.value; setData(prev)}}></input>
            </div>
            
            <div className= {styles.element}>
              <label id="facebook">facebook link</label>
              <input type="text" id="facebook" onChange={(e) => {let prev = {...data}; prev.facebook = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="instagram">instagram link</label>
              <input type="text" id="instagram" onChange={(e) => {let prev = {...data}; prev.instagram = e.target.value; setData(prev)}}></input>
            </div>
            <div className= {styles.element}>
              <label id="apply_date">모집 마감 기간</label>
              <div className={styles.ques}>
                {options.map((list)=>(
                <div className={styles.checkbox_container}>
                <input className ={styles.ques_ans}
                    key = {list.id}
                    type ="radio"
                    id= {list} 
                    name="recruit" 
                    onChange={(e) => changeRecruit(e)}
                />                
                <div>{list}</div>
               </div>
              ))}
               <input type="text" id="recruit" value={data.recruit} onChange={(e) => {let prev = {...data}; prev.recruit = e.target.value; setData(prev)}} placeholder="직접입력) XXXX/XX/XX"/>

            </div>
            </div>
            <div>
                <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={handleClick} >수정</button>
            </div>
          </form>          
      </div>    
    </div> :
    <GetLogin/>}
    </div> 
    );
}

export default UpdateClub;