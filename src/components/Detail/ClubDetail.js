import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';

import styles from './ClubDetail.module.css';
import main_img from "../../images/temp.png";
import rush from "../../images/rush.svg";
import call from "../../images/temp_call.svg";

function ClubDetail({authenticated}) {
    const [auth, setAuth] = useState(authenticated);
    const clubName = useParams().clubname;

    useEffect(() => { 
        // api에서 clubName 에 대한 정보 get
        // 동아리 소개글, 전화번호 etc
        if (!localStorage.getItem('login-token')) {
            setAuth(false);
            console.log("로그인 안 되어있음");
        }
        else{
            setAuth(true);
            console.log("로그인 되어있음");
        }
        console.log(clubName);
      }, []);

    return (
        <div>{auth? <div className={styles.container}>            
            <div className={styles.inner}>     
                <div className={styles.main_img}>
                    <img src={main_img} alt="img" className={styles.main__img} />  
                </div>
            
                <div className={styles.abb}>
                    <div className={styles.club_img}>
                        <img src = {rush} alt = {clubName} ></img>
                    </div>
                    <div className={styles.club_name}>{clubName}</div>
                </div>  
                {/* <div>동아리 소개글</div> */}
                <div className= {styles.introduction}>
                    🏀세종대학교 중앙농구동아리 RUSH🏀<br/><br/>
                    🏀2022 신입 부원 모집🏀<br/>
                    세종대학교 중앙농구동아리 RUSH에서 즐거운 학교생활을 함께 할 신입 부원(선수, 매니저)들을 모집합니다!!<br/>
                    🏀평소 농구를 좋아하고 관심이 있는 사람!<br/>
                    🏀농구를 배우고 싶은 사람!<br/>
                    <br/>
                    🏀농구관람을 좋아하는 사람!<br/>
                    <br/>
                    🏀농구라는 스포츠가 궁금한 사람!<br/>
                    <br/>
                    🏀모집일정<br/>
                    1. 지원기간: ~ 2022년 3월 11일 (금)까지<br/>
                    2. 지원대상: 선수/매니저<br/>
                    - 학번 제한 X<br/>
                    - 농구를 잘 못하고 모르지만 관심이 생긴 여학우분들도 매니저로 많이 활동하고 있으니 여학우분들도 부담 없이 지원 부탁드립니다‼️
                    3. 지원방법: 아래 링크를 통하여 폼을 작성해주시면 됩니다!<br/>
                    https://forms.gle/1xiQ8DNvzM1Qb5N76<br/>
                    4. 면접: 선수는 지원 후 간단한 테스트가 진행될 예정<br/>
                    <br/>
                    🏀동아리 활동<br/>
                    1. 정기 모임은 주 1회(평일), 홈 대관 격주 1회(주말)<br/>
                    (현재 코로나19로 인해 모임은 항시 조정 중에 있습니다.)<br/>
                    2. 모임, 대관 후에는 소소한 뒷풀이<br/>
                    3. 각종 대회 참여<br/>
                    (BDR 오프닝전 8강, 서울 동아리 연합 대회 준우승, 농구연구소 대회 8강등)<br/>
                    4. MT, 농구 관람 외 다양한 친목 활동<br/>
                    <br/>
                    🏀 동아리방: 학생회관 516호<br/>
                    <br/>
                    🏀RUSH는 항상 여러분을 환영합니다🏀<br/>
                    기타 문의는 아래 번호로 부탁드립니다!<br/>
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
        </div>: <div>get login first</div>}
                
    </div>
        
        
    );
}

export default ClubDetail;