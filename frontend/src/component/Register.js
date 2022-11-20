import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useNavigate();

    const Register = async (e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5001/users',{
                    name: name, email:email, password:password, confirmPassword:confirmPassword
            });
            // redirect ke login
            history("/");
        }catch (error) {
            if (error.response){
                console.log(error.response.data.message);
                setMessage(error.response.data.message);
            }

        }
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className='column is-4-desktop'></div>
                <form className="box" onSubmit={Register}>
                    <p className="has-text-centered">{message}</p>
                    <div className='field mt-5'>
                        <label className='label'>Name</label>
                        <div className="controls">
                            <input type="text"
                                   className='input'
                                   placeholder='Name'
                                   value={name}
                                   onChange={(e)=>setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className='field mt-5'>
                        <label className='label'>Email</label>
                        <div className="controls">
                          <input type="text"
                                 className='input'
                                 placeholder='Email'
                                 value={email}
                                 onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className='field mt-5'>
                        <label className='label'>Password</label>
                        <div className="controls">
                          <input type="password"
                                 className='input'
                                 placeholder='*******'
                                 value={password}
                                 onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className='field mt-5'>
                        <label className='label'>Confirm Password</label>
                        <div className="controls">
                            <input type="password"
                                   className='input'
                                   placeholder='*******'
                                   value={confirmPassword}
                                   onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                      <button className='button is-success is-fullwidth'>Register</button>
                    </div>
                </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
