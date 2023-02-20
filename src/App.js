import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./App.css";

import TodoCard from "./Component/TodoCard/TodoCard";
//import data from "./Utility/Utility";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';

function App() {

  const [todos,setTodos] = useState([]);

  const [todo,setTodo] = useState({
    title:"",
    description:""
  });

  useEffect(()=>{
    let data = localStorage.getItem("data");
    if(data != null)
    {
      setTodos(JSON.parse(data));
    }
  },[])

  const clickHandler = () =>{
    let item = {
      id : Math.random(),
      color : "",
      title : todo.title,
      description:todo.description,
      isCompleted : false,
      isDeleted : false,
      time:Math.floor(Date.now()/1000)    
    }

    if(todo.title.length === 0 || todo.description.length === 0)
    {
      toast('Title and Description both are required',{
        position:"top-center",
        autoclose:3000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    else
    {
      let temp = todos;

      temp.push(item);
      setTodos([...temp]);

      setTodo({
        title:"",
        description:""
      })
      localStorage.setItem("data",JSON.stringify(todos));
    }
    
  }

  const UpdateColor = (id, color) => { 
    
    let temp = todos;
    
    temp.map(e=>{
      if(e.id === id)
      {
        e.color = color;
      }
      return null;
    })

    setTodos([...temp]) //updating the current state

    localStorage.setItem("data", JSON.stringify(todos)) //updating local storage with state
  }

  const completeHandler = (id) => {
    
    let temp = todos;

    temp.map((e)=>{
      if(e.id === id){
        e.isCompleted = true;
      }
      return null;
    })

    setTodos([...temp]);

    localStorage.setItem("data",JSON.stringify(todos));

  }

  

  const deleteHandler = (id) => {
    
    let temp = todos;

    temp.map((e)=>{
      if(e.id === id){
        e.isDeleted = true;
      }
      return null;
    })

    setTodos([...temp]);

    localStorage.setItem("data",JSON.stringify(todos));

  }

  return (
    <div className="main-container">
    <ToastContainer />
      <div className='input-container'>
      <Typography gutterBottom variant="h5" component="div" style={{display:'flex',alignItems:"center",justifyContent:'center',marginTop:"20px"}}>Todo App</Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="outlined-basic"  label="Enter Title" variant="outlined" onChange={(e)=>setTodo(todo=>({...todo,title:e.target.value}))} value={todo.title}/>
          </div>
          <div>
            <TextField id="outlined-basic"  label="Enter Description" variant="outlined" onChange={(e)=>setTodo(todo=>({...todo,description:e.target.value}))} value={todo.description}/>
          </div>
        </Box>
        
        <Button variant="outlined" onClick={clickHandler} style={{background:"blue",color:"white",width:"5%"}}>Add</Button>
        
      </div>
      <div className='output-container'>
        <div className='card-container'>
          <h4>Pending</h4>
          <div className='card-list'>
            {
              todos.sort((a,b) => a.time < b.time ? 1 : -1)
              .map((e)=>
                !e.isCompleted ?
                !e.isDeleted ?
                <TodoCard title={e.title} description={e.description} key={e.id} color={e.color} id={e.id} isCompleted={e.isCompleted}  completeMarker={completeHandler} deleteMarker={deleteHandler} UpdateColor={UpdateColor}/> : <></>
                : <></>
              )
            }
           
          </div>
        </div>
        <div className='card-container'>
          <h4>Completed</h4>
          <div className='card-list'>
            {
              todos.map((e)=> 
                e.isCompleted ?
                !e.isDeleted ?
                <TodoCard title={e.title} description={e.description} key={e.id} id={e.id} color={e.color} isCompleted={e.isCompleted} deleteMarker={deleteHandler} UpdateColor={UpdateColor}/> : <></>
                : <></>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
