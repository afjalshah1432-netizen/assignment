import  { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css"
function Login() {
    const navigate=useNavigate("");
    const[user,setUser]=useState({
        email:"",
        password:""
    });
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:5000/api/student/login",user);
            console.log(res.data);
            if(res.status==200||res.data.role=="student"){
              localStorage.setItem("token",res.data.token);
              navigate("/dash");
            }
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='container'>
      <form action="" className="login" onSubmit={handleSubmit}>
        <h1>login</h1>
        <label htmlFor="email">email</label>
        <input type="text" id="email" placeholder='email' name="email" value={user.email} onChange={handleChange}/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" placeholder='password' value={user.password} id="password" onChange={handleChange} />
        <button>login</button>
        <p>can't have account please <Link to="/register">register</Link></p>
      </form>
    </div>
  )
}

export default Login
