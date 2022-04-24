import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    if (user) {
        navigate(from, { replace: true })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(email, password)
    }
    return (
        <div className='form-container'>
            <div className="form-div">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="email-div">
                        <label htmlFor="email">E-mail</label> <br />
                        <input type="email" name="email" id="email" required onBlur={handleEmail} />
                    </div>
                    <div className="email-div">
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" name="password" id="password" required onBlur={handlePassword} />
                    </div>
                    {
                        loading &&
                        <div className="loading">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    <p style={{ color: 'red' }}>{error?.message}</p>
                    <button className="login" type="submit">Login</button>
                </form>
                <p>New to Ema-john? <Link to="/signup">Create New Account</Link></p>
                <div className="hr-div">
                    <p className="or">or</p>
                </div>
                <button className="google">Continue with google</button>
            </div>
        </div>
    );
};

export default Login;