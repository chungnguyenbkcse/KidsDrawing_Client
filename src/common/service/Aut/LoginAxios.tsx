import axios from "axios";

export function postAutAxios(username: string, password: string) {
    const data = {
        "username": username,
        "password": password
    }
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
        'Access-Control-Allow-Credentials': 'true'
    };

    axios.post(`${process.env.REACT_APP_API_URL}/auth`, data , 
        { headers })
        .then(response => console.log(response));
}