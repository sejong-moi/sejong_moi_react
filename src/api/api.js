import axios from 'axios';
const API = axios.create();

// * 카테고리 별 동아리 정보 가져오기
export const Clubs_Info = (club_category) => API.get(`http://localhost:8000/club_api/list_${club_category}`,{
    headers: {
        'Content-Type': 'application/json',
    }
})

// * 개별 동아리 정보 가져오기
export const Club_Info = (club_name) => API.get(`http://localhost:8000/club_api/club/${club_name}`,{
    headers: { 
        'Content-Type': 'application/json'
    }
})

export const Is_Interested = (data) => API.get(`http://localhost:8000/club_api/is_interested`,JSON.stringify(data),{
    headers:{
        'Content-Type' : 'application/json'
    }
})

export const Add_Interested = (data) => API.post(`http://localhost:8000/club_api/add_interested`,JSON.stringify(data),{
    headers: {
        'Content-Type': 'application/json'
    }
})
export const Del_Interested = (data) => API.post(`http://localhost:8000/club_api/del_interested`,JSON.stringify(data),{
    headers: {
        'Content-Type': 'application/json'
    }
})

// * login
export const User_Login = ((user) => API.post('http://localhost:8000/login_api/login', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json' }
    })
    );

// ranking

export const List_Ranking = () => API.get(`http://localhost:8000/club_api/list_ranking`,{
    headers: {
        'Content-Type': 'application/json',
    }
})

