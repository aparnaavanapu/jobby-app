import Cookies from 'js-cookie'
import { Navigate,useNavigate } from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const LoginRoute=()=>{
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [showSubmitError,setShowSubmitError]=useState('')
    const navigate=useNavigate()


    const loginSuccess=jwtToken=>{
        Cookies.set('jwt_token',jwtToken,{expires:30});
        navigate('/')
    }

    const loginFailure=errorMsg=>{
        setShowSubmitError(errorMsg)
    }

    const submitForm= async (event)=>{
        event.preventDefault();
        const url="https://apis.ccbp.in/login";
        const userDetails={username:userName,password}
        const options={
            method:'POST',
            body:JSON.stringify(userDetails)
        } 
        const response=await fetch(url,options);
        const data=await response.json()
        console.log(data)
        if(response.ok===true){
            loginSuccess(data.jwt_token)
        }
        else{
            loginFailure(data.error_msg)
        }
    }

    const onChangeUsername=(event)=>{
        setUserName(event.target.value)
    }

    const onChangePassword=(event)=>{
        setPassword(event.target.value)
    }


    const renderUserName=()=>{
        
        return(
            <div className="input-container">
                <label htmlFor="username">
                    Username
                </label>
                <input type="text" value={userName} placeholder="Username" id="username" onChange={onChangeUsername} className="login-input-box" />
            </div>
        )
    }

    const renderPassword=()=>{
        return(
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} id="password" placeholder="Password" onChange={onChangePassword} className="login-input-box" />
            </div>
        )
    }
    
    const jwtToken=Cookies.get('jwt_token')
        if (jwtToken){
            return <Navigate to="/" replace/>
        }
    
    return(
        
        <div className="login-bg-container">
            <form onSubmit={submitForm} className="form-container">
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" className="login-form-logo" />
                {renderUserName()}
                {renderPassword()}
                <button type="submit" className="login-btn">Login</button>
                {showSubmitError && <p className="login-error-message">*{showSubmitError}</p>}
            </form>
        </div>
    )



}

export default LoginRoute