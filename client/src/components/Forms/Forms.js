import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './forms.scss';
import {FaCompass} from 'react-icons/fa';
import { registerUser, loginUser } from '../../redux/actions/userActions';

function Forms() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(false);
    const[isRegister, setRegister] = useState(true);
    const [user, setUser] = useState({ 
        email: '',
        password: ''
    })

    useEffect(()=>{
        console.log(isRegister);
    },[isRegister])

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(!isRegister){
            try {
                dispatch(loginUser(user));
                
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                dispatch(registerUser(user));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleFormSwitch = e => {
        e.preventDefault();
        setRegister(!isRegister);
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="form__inputs">
                <div className="logo">
                    <FaCompass className='logo__icon'/>
                    <p>Tripshare</p>
                </div>
                { isRegister && <input type="text" placeholder='username' name='username' onChange={handleChange}/>}
                <input type="email" placeholder='email' name='email' onChange={handleChange}/>
                <input type="password" placeholder='password' name='password' onChange={handleChange}/>
                <input type="submit" value={isRegister ? "Register" : "Login"} />
                <div className='account'>
                    <p>{ isRegister ? 'Already have an account?' : 'Dont have an account?'} <button onClick={handleFormSwitch}>{ isRegister ? 'Login here' : 'Register here'}</button></p>
                </div>
            </div>
        </form>
    );
}

export default Forms;
