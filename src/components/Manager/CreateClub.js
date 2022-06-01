// import React, { useState, useEffect} from 'react';

// import GetLogin from '../Login/GetLogin';
// import styles from './CreateClub.module.css';
// import { getCookie} from '../../api/cookie';
// import {Send_Image,Create_Club} from "../../api/api";


// function CreateClub() {
//     const [auth, setAuth] = useState();
//     //const [write, setWrite] = useState(false);
//     const formData = new FormData();

//     const options= ["상시 모집","모집 마감","직접 입력"];
//     const categorys = ["공연", "문화", "봉사","종교","운동", "학술"];

//     function file_upload(e,type){      
//       const data = new FormData();
//       data.set("image", e.target.files[0] , e.target.files[0].name);

//       Send_Image(data).then((res)=>{
//         console.log(res);
//         formData.set(type, res.data);   
//       })          
//     }

//     function changeRecruit(e){
//       console.log(e.target.id);
//       if(e.target.id !== "직접 입력") formData.set("recruit", e.target.id);
      
//     } 
//     function addCategory(e,idx){
//       var li = [idx,0]; 
//       console.log(e.target.id)      
//       formData.set("category_kor", (e.target.id));      
//     }

//     function changeAns(e) {
//       // const data = {};
//       // formData.forEach((value, key) => data[key] = value);
      
//       // console.log("전" , data);
//       console.log(String(e.target.id),(e.target.value));
//       formData.set(String(e.target.id),(e.target.value));   
//       // data = {};
//       // formData.forEach((value, key) => data[key] = value);
      
//       // console.log("후" , data);
//     }

//     const handleClick = (e) => { 
//       e.preventDefault();
//       const data = {};
//       formData.forEach((value, key) => data[key] = value);

//       console.log(data);
//       Create_Club(JSON.stringify(data)).then((res)=>{
//         console.log(res);
//         // if (res.data.result === "Fail") alert("내용을 모두 채워주세요!")
//         // else{
//         //   alert("동아리 등록에 성공하였습니다!");
//         //   // window.location.replace('/manage/createclub');
//         // }
//       })
//   }
//     useEffect(() => { 
//       if (!getCookie('jwt')) setAuth(false);
//       else setAuth(true);
//     }, []);

//     return (
//     <div>
//       {auth? <div className={styles.container}>
//       <h1> 동아리 등록 </h1>
//       <div className={styles.inner}> 
//           <form method="post" enctype="multipart/form-data">
//             <div className= {styles.element}>
//               <label id="name">동아리 명 </label>
//               <input type="text" id="name" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="president_name">회장 이름 (사이트 관리자) </label>
//               <input type="text" id="president_name" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="president_id">회장 학번 (사이트 관리자) </label>
//               <input type="text" id="president_id" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="category">동아리 카테고리 </label>
//               <div className={styles.ques}>
//                 {categorys.map((cate, i)=>(
//                 <div className={styles.checkbox_container}>
//                 <input className ={styles.ques_ans} id = {cate} key = {i} type ="radio" name="category" onChange={(e) => addCategory(e,i+1)}/>
//                 <div>{cate}</div>
//                 </div> ))}
//               </div>
//             </div>
//             <div className={styles.file_upload}>
//               <p style={{ "font-size": "20px"}}>배경 이미지</p>
//               <label className={styles.img_btn} for="club_background_url">파일 업로드</label>
//               <input type="file" id="club_background_url" multiple="multiple" style={{display:"none"}}onChange={(e) => file_upload(e,"club_backgroud_url")} accept="image/*"/>
//             </div>
//             <div className={styles.file_upload}>
//               <p style={{ "font-size": "20px"}}>로고 이미지</p>
//               <label className={styles.img_btn} for="club_logo_url">파일 업로드</label>
//               <input type="file" id="club_logo_url"  multiple="multiple" style={{display:"none"}} onChange={(e) => file_upload(e,"club_logo_url")} accept="image/*"/>
//             </div>
//             <div className= {styles.element}>
//               <label id="introduce_abb">동아리 요약 소개 (50자 이하) </label>
//               <textarea  type="text" id="introduce_abb" maxLength={50}  className={styles.text}  onChange={(e) => changeAns(e)}></textarea >
//             </div>
//             <div className= {styles.element}>
//               <label id="introduce">동아리 소개글</label>
//               <textarea  type="text" id="introduce" className={styles.text} onChange={(e) => changeAns(e)}></textarea >
//             </div>
//             <div className= {styles.element}>
//               <label id="president_phone_number">연락처  (ex) 010-1234-5678</label>
//               <input type="text" id="president_phone_number" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="location">동아리방 위치 </label>
//               <input type="text" id="location" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="youtube">youtube link</label>
//               <input type="text" id="youtube" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="facebook">facebook link</label>
//               <input type="text" id="facebook" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="instagram">instagram link</label>
//               <input type="text" id="instagram" onChange={(e) => changeAns(e)}></input>
//             </div>
//             <div className= {styles.element}>
//               <label id="apply_date">모집 마감 기간</label>
//               <div className={styles.ques}>
//                 {options.map((list)=>(
//                 <div className={styles.checkbox_container}>
//                 <input className ={styles.ques_ans}
//                     key = {list.id}
//                     type ="radio"
//                     id= {list} 
//                     name="recruit" 
//                     onChange={(e) => changeRecruit(e)}
//                 />                
//                 <div>{list}</div>
//                </div>               
//               ))}
//               {/* <input type="text" id="recruit" name="recruit" onChange={(e) => changeAns(e)} placeholder="XXXX/XX/XX"/>
//                 {write ? <input type="text" id="recruit" onChange={(e) => changeAns(e)} placeholder="2022/12/12"/> : null} */}

//             </div>
//             </div>
//             <div>
//                 <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={handleClick} >등록</button>
//             </div>
//           </form>          
//       </div>    
//     </div> :
//     <GetLogin/>}
//     </div> 
//     );
// }

// export default CreateClub;
import React, { useState, useEffect} from 'react';

import GetLogin from '../Login/GetLogin';
import styles from './CreateClub.module.css';
import { getCookie} from '../../api/cookie';
import {Send_Image,Create_Club} from "../../api/api";


function CreateClub() {
    const [auth, setAuth] = useState();
    const [write, setWrite] = useState(false);
    const formData = new FormData();

    const options= ["상시 모집","모집 마감","직접 입력"];
    const categorys = ["공연", "문화", "봉사","종교","운동", "학술"];

    function file_upload(e,type){      
      const data = new FormData();
      data.set("image", e.target.files[0] , e.target.files[0].name);

      Send_Image(data).then((res)=>{
        console.log(res);
        formData.set(type, res.data );   
      })          
    }
    function changeRecruit(e){
      formData.set("recruit", e.target.id);
      if (e.target.id === "직접 입력") setWrite(true); 
      else setWrite(false);
    } 
    function addCategory(e,idx){
      var li = [idx,0]; 
      console.log(e.target.id)      
      formData.set("category_kor",(e.target.id));      
    }
    function changeAns(e) {
      formData.set(String(e.target.id),String(e.target.value));   
    }
    const handleClick = (e) => { 
      e.preventDefault();
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      console.log(data);
      Create_Club(JSON.stringify(data)).then((res)=>{
        console.log(res);
      })
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
          <form method="post" enctype="multipart/form-data">
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
                <input className ={styles.ques_ans} id = {cate} key = {i} type ="radio" name="category" onChange={(e) => addCategory(e,i+1)}/>
                <div>{cate}</div>
                </div> ))}
              </div>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>배경 이미지</p>
              <label className={styles.img_btn} for="club_background_url">파일 업로드</label>
              <input type="file" id="club_background_url" multiple="multiple" style={{display:"none"}}onChange={(e) => file_upload(e,"club_backgroud_url")} accept="image/*"/>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>로고 이미지</p>
              <label className={styles.img_btn} for="club_logo_url">파일 업로드</label>
              <input type="file" id="club_logo_url"  multiple="multiple" style={{display:"none"}} onChange={(e) => file_upload(e,"club_logo_url")} accept="image/*"/>
            </div>
            <div className= {styles.element}>
              <label id="introduce_abb">동아리 요약 소개 (50자 이하) </label>
              <textarea  type="text" id="introduce_abb" maxLength={50}  className={styles.text}  onChange={(e) => changeAns(e)}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="introduce">동아리 소개글</label>
              <textarea  type="text" id="introduce" className={styles.text} onChange={(e) => changeAns(e)}></textarea >
            </div>
            <div className= {styles.element}>
              <label id="president_phone_number">연락처  (ex) 010-1234-5678</label>
              <input type="text" id="president_phone_number" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="location">동아리방 위치 </label>
              <input type="text" id="location" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="youtube">youtube link</label>
              <input type="text" id="youtube" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="facebook">facebook link</label>
              <input type="text" id="facebook" onChange={(e) => changeAns(e)}></input>
            </div>
            <div className= {styles.element}>
              <label id="instagram">instagram link</label>
              <input type="text" id="instagram" onChange={(e) => changeAns(e)}></input>
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
               <input type="text" id="recruit" onChange={(e) => changeAns(e)} placeholder="2022/12/12"/>

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