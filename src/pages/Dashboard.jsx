import axios from 'axios'
import { useEffect, useState } from 'react'
import "../styles/dash.css";
function Dashboard() {
  const[message,setMessage]=useState("");
  const[dataArray,setDataArray]=useState([]);
    const token=localStorage.getItem("token");
    const [user,setUser]=useState({})
    const [inputBox,setInputBox]=useState({
      title:"",
      input:"",
      operation:""
    })
    useEffect(()=>{
      const getData=async()=>{
        try{
          const res=await axios.get("http://localhost:5000/api/student/dash",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
          console.log(res.data);
          setUser(res.data);
        }
        catch(err){
          console.log(err);
          console.log(err.message);
        }
      }
      getData();
      const getData1=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/student/dash-data",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
          console.log(res.data);
          setDataArray(res.data);
        }
        catch(err){
          console.log(err);
          console.log(err.message);
        }
      }
      getData1();
    },[]);

    const handleChange=(e)=>{
      setInputBox({...inputBox,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:5000/api/student/dash-form",inputBox,{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            });
            console.log(res.data);
            setMessage(res.data.msg);
        }
        catch(err){
          console.log(err);
          console.log(err.message);
        }
    }

  return (
    <div className='dash-container'>
      <h1>welcome {user.name}</h1>
      <div className="run-task">
        <form action="" className="task-form" onSubmit={handleSubmit}>
        <h2>create task form</h2>
        <p>{message}</p>
        <label htmlFor="title">title</label>
        <input type="text" id="title" name="title" value={inputBox.title} onChange={handleChange} placeholder='title'/>
        <label htmlFor="input">input</label>
        <input type="text" id="input" name="input" value={inputBox.input} onChange={handleChange} placeholder='input' />
        <label htmlFor="operation">operations</label>
        <select name="operation" id="operation" value={inputBox.operation} onChange={handleChange}>
          <option value="">choose operations</option>
          <option value="uppercase">uppercase</option>
          <option value="lowercase">lowercase</option>
          <option value="reverse">reverse</option>
          <option value="wordcount">wordcount</option>
        </select>
        <button>run task</button>
      </form>
      <div className="task-table">
        <table>
          <tr>
            <th>title</th>
            <th>status</th>
            <th>result</th>
          </tr>
          {
          dataArray.map((ele,index)=>(
            <tr key={index}>
            <td>{ele.title}</td>
            <td>{ele.status}</td>
            <td>{ele.result}</td>
          </tr>
          ))
          }
        </table>
      </div>
      </div>
      
    </div>
  )
}

export default Dashboard
