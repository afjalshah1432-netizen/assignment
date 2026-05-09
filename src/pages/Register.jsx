import  { useState } from 'react'
import axios from 'axios'
import "../styles/register.css"
import { Link } from 'react-router-dom';

function Register() {
    const[result,setResult]=useState("");
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        city:""
    })
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
  
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:5000/api/student/register",user);
            console.log(res.data);
            setResult(res.data.msg);
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className='container'>
      <form action="" className="register" onSubmit={handleSubmit}>
        <h1>register</h1>
        <p className="result">{result}</p>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" placeholder='name' value={user.name} onChange={handleChange} />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" placeholder='email' value={user.email} onChange={handleChange} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" placeholder='password'  id="password" value={user.password} onChange={handleChange}/>
        <label htmlFor="cpassword">confirem password</label>
        <input type="password" name="cpassword" placeholder='cpassword'  id="cpassword" value={user.cpassword} onChange={handleChange}/>
        <label htmlFor="city">city</label>
        <input type="text" id="city" name='city' placeholder='city' value={user.city} onChange={handleChange}/>
        <button>register</button>
        <p>already have account please <Link to="/login">login</Link></p>
      </form>
    </div>
  )
}

export default Register
