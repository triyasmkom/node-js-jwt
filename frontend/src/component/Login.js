import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate();

    const Auth = async (e)=>{
        e.preventDefault();
        try{
            console.log("data: ", email, password);
            await axios.post('http://localhost:5001/login',{
                email:email,
                password:password
            });
            history("/dashboard");
        }catch (error){
            if (error.response){
                console.log("Error: ",error.response.data.message);
                setMessage(error.response.data.message);
            }
        }
    }
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className='column is-4-desktop' ></div>
                <form onSubmit={Auth} className="box">
                    <p className="has-text-centered">{message}</p>
                    <div className='field mt-5'>
                        <label className='label'>Email or Username</label>
                        <div className="controls">
                          <input type="text"
                                 className='input'
                                 placeholder='Username'
                                 value={email}
                                 onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className='field mt-5'>
                        <label className='label'>Password</label>
                        <div className="controls">
                          <input type="password"
                                 className='input'
                                 placeholder='*******'
                                 value={password}
                                 onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                      <button className='button is-success is-fullwidth'>Login</button>
                    </div>
                </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
