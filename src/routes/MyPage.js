
import React, { useEffect,useState} from 'react';
import styles from "./MyPage.module.css"
import ClubSummary from "../components/ClubSummary";
import GetLogin from "../components/Login/GetLogin";

// 동아리 이미지 동아리 명 받아와야함
function MyPage() {
    const [auth, setAuth] = useState();
    const [info, setInfo] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => { 
        if (localStorage.getItem('login-token')) {
            setAuth(true);
            console.log("로그인 되어있음");
            //관심 담은 동아리 리스트 받아와야함 (동아리 이름, 카테고리, 로고 사진)
            setInfo([{"name" : "RUSH",
        "img_url" : "temp",
        "category" : "Athletic"}])
        setLoading(true);
        }
        else{
            setAuth(false);
            console.log("로그인 안 되어있음");
        }
      }, [isLoading]);

    return (
        <div>
            {auth ? 
            <div className={styles.container}>
            <div className={styles.inner}>  
                <h1>관심목록</h1>     
                <div className={styles.abb}>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>
                    <ClubSummary type = "2" info = {info[0]}/>       
                </div>           
          </div>
        </div>:
        <GetLogin/>}
        </div>
    );
}

export default MyPage;


