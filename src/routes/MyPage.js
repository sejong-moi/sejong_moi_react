
import React, { useEffect,useState} from 'react';
import styles from "./MyPage.module.css"
import ClubSummary from "../components/ClubInfos/ClubSummary";
import GetLogin from "../components/Login/GetLogin";
import { getCookie} from '../api/cookie';
import { Club_Info } from '../api/api';

// 동아리 이미지 동아리 명 받아와야함
function MyPage() {
    const [auth, setAuth] = useState();
    const [infos, setInfos] = useState([]);
    // let clubs = [];
    const [user,setUser] = useState([]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => { 
        if (getCookie('jwt')) {
            setAuth(true);

            //user fetch 동아리 이름, 카테고리, 로고 사진)
            async function getUser () { 
                let response = await fetch('http://localhost:8000/login_api/user',{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
        
                const reader = response.body.getReader();           
                
                // Step 3: read the data
                let receivedLength = 0; // received that many bytes at the moment
                let chunks = []; // array of received binary chunks (comprises the body)
                while(true) { 
                const {done, value} = await reader.read();
        
                if (done) { break;}  
        
                chunks.push(value);  
                receivedLength += value.length; 
                }    
                // Step 4: concatenate chunks into single Uint8Array
                let chunksAll = new Uint8Array(receivedLength); // (4.1)
                let position = 0;
                for(let chunk of chunks) {
                chunksAll.set(chunk, position); // (4.2)
                position += chunk.length;
                }    
                // Step 5: decode into a string
                let result = new TextDecoder("utf-8").decode(chunksAll);
        
                // We're done!
                let data = JSON.parse(result);
                setUser(data);
                console.log("interesting list", data.interesting);

                data.interesting.map((clubName) => (
                    Club_Info(clubName).then((res)=>{
                        setInfos((prev)=>[...prev, res.data]);
                    }).catch(err=>{ 
                        console.log(err);
                    }) 
                ))
            }      
            getUser();    
        setLoading(true);
        }
        else{
            setAuth(false);
        } 
      }, []);  

    return (
        <div>
            {auth ? 
            <div className={styles.container}>
            <div className={styles.inner}>  
                <h1>관심목록</h1>     
                <div className={styles.abb}>
                    {infos.map((club) => (
                        <ClubSummary type="2" info = {club}/>
                    ))
                    }
                </div>           
            </div>
            <div className={styles.inner}>  
                <h1>관리 목록</h1>     
                <div className={styles.abb}>
                    {infos.map((club) => (
                        <ClubSummary type="2" info = {club}/>
                    ))
                    }
                </div>           
            </div>
        </div>:
        <GetLogin/>}
        </div>
    );
}

export default MyPage;


