import axios from 'axios';
const API = axios.create();


export const Clubs_Infos = (clubcategory) => API.get('http://localhost:8000/club_api/list',{
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('login-token'),
    }
})

// 카테고리 별 동아리 정보 가져오기
export const Clubs_Info = (club_name) => API.get(`http://localhost:8000/club_api/${club_name}`,{
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('login-token'),
    }
})

//login
export const User_Login = ((user) => API.post('/login_api/login', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json'}}));
