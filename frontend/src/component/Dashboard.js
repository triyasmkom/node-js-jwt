import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Dashboard = ()=>{
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
        refreshToken();
        getUsers();
    }, []);
    const refreshToken = async ()=>{
        try {
            const response = await axios.get('http://localhost:5001/token');
            setToken(response.data.accessToken);
            const decode = jwt_decode(response.data.accessToken);
            //console.log('decode token: ', decode);
            setName(decode.name);
            setExpire(decode.exp)
        }catch (error){
            if (error.response){
                history('/');
            }
        }
    }

    const axiosJwt = axios.create();

    axiosJwt.interceptors.request.use(async (config)=>{
        const currentDate = new Date();
        if(expire*1000<currentDate.getTime()){
            const response = await axios.get('http://localhost:5001/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);

            const decode = jwt_decode(response.data.accessToken);
            setName(decode.name);
            setExpire(decode.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });

    const getUsers = async ()=>{
        const response = await axiosJwt.get('http://localhost:5001/users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(response.data);
    }
    return (
        <div className="container mt-5">
            <h1> Wecome Back: {name}</h1>
            <button onClick={getUsers} className="button is-info">Get User</button>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index)=>(
                    <tr key={user.id}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard