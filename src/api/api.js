import axios from 'axios';
const API = axios.create();

// * 카테고리 별 동아리 정보 가져오기
export const Clubs_Info = (club_category) => API.get(`http://localhost:8000/club_api/list_${club_category}`,{
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('login-token'),
    }
})
// 개별 동아리 정보 가져오기
export const Club_Info = (club_name) => API.get(`http://localhost:8000/club_api/${club_name}/detail`,{
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('login-token'),
    }
})

// 회원 관심 목록 정보 가져오기 
export const User_Interest = (user) => API.get(`http://localhost:8000/`,{
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('login-token'),
    }
})

// * login
export const User_Login = ((user) => API.post('http://localhost:8000/login_api/login', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json',
    'Connection':'keep-alive'}
        })
    );


export const User_Logout = ((user) => API.post('http://localhost:8000/login_api/logout', JSON.stringify(user),
	{headers:{'Content-Type': 'application/json'}})
    );


// export const Login = async() =>{
//     try {
//         const response = await axios.post('http://localhost:8000/login_api/login')
//         cons
//     }
// }