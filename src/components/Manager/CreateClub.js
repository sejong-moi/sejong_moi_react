import React, { useState, useEffect} from 'react';

import GetLogin from '../Login/GetLogin';
import styles from './CreateClub.module.css';

function CreateClub() {
    const [auth, setAuth] = useState();

    const [imgBase64, setImgBase64] = useState([]); // 미리보기 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const options= ["상시 모집","모집 마감","직접 입력"];
    const onClick = () => {

    }
    const handleChangeFile = (event) => {
        console.log(event.target.files)
        setImgFile(event.target.files);
        //fd.append("file", event.target.files)
        setImgBase64([]);
        for(var i=0;i<event.target.files.length;i++){
        if (event.target.files[i]) {
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
          // 파일 상태 업데이트
          reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            console.log(base64)
            if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString()
               
            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
              // 파일 base64 상태 업데이트
            //  console.log(images)
            }
          }
        }
      }
    
      }
    useEffect(() => { 
      if (!localStorage.getItem('login-token')) {
        setAuth(false);
      }
      else{
          setAuth(true);
      }
    }, []);

    return (
    <div>
      {auth? <div className={styles.container}>
      <h1> 동아리 등록 </h1>
      <div className={styles.inner}> 
          <form>
            <div className= {styles.element}>
              <label id="club_name">동아리 명 </label>
              <input type="text" id="club_name"></input>
            </div>
            <div className= {styles.element}>
              <label id="pres_name">현재 회장 학번 (사이트 관리자) </label>
              <input type="text" id="pres_name"></input>
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>배경 이미지</p>
              <label className={styles.img_btn} for="background_img">파일 업로드</label>
              <input type="file" id="background_img"  onChange={handleChangeFile} multiple="multiple" style={{display:"none"}} />
            </div>
            <div className={styles.file_upload}>
              <p style={{ "font-size": "20px"}}>로고 이미지</p>
              <label className={styles.img_btn} for="logo_img">파일 업로드</label>
              <input type="file" id="logo_img"  onChange={handleChangeFile} multiple="multiple" style={{display:"none"}} />
            </div>
            <div className= {styles.element}>
              <label id="club_intro_abb">동아리 요약 소개 (50자 이하) </label>
              <textarea  type="text" id="club_intro_abb" maxLength={50} cols="100" rows="5"></textarea >
            </div>
            <div className= {styles.element}>
              <label id="club_intro">동아리 소개글</label>
              <textarea  type="text" id="club_intro" cols="100" rows="5"></textarea >
            </div>
            <div className= {styles.element}>
              <label id="tel">연락처  (ex) 010-1234-5678</label>
              <input type="text" id="tel"></input>
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
                <button className={styles.btn} font-size="21px" width="230px" height="40px" onClick={onClick} >등록</button>
            </div>
          </form>          
      </div>    
    </div> :
    <GetLogin/>}
    </div> 
    );
}

export default CreateClub;