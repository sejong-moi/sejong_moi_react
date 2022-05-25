import axios from 'axios';
const API = axios.create();

// * 카테고리 별 동아리 정보 가져오기
export const Clubs_Info = (club_category) => API.get(`http://localhost:8000/club_api/list_${club_category}`,{
    headers: {
        'Content-Type': 'application/json',
    }
})

// * 개별 동아리 정보 가져오기
export const Club_Info = (club_name) => API.post(`http://localhost:8000/club_api/club/${club_name}`,{
    headers: { 
        'Content-Type': 'application/json'
    }
})

// 회원 관심 목록 정보 가져오기 
export const Is_Interested = (data) => API.post(`http://localhost:8000/club_api/is_interested`,JSON.stringify(data),{
    headers: {
        'Content-Type': 'application/json'
    }
})

// * login
export const User_Login = ((user) => API.post('http://localhost:8000/login_api/login', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json' }
    })
    );


export const User_Logout = ((user) => API.post('http://localhost:8000/login_api/logout', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json'}})
    );


