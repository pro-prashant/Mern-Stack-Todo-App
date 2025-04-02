
import React, { useEffect, useState, useTransition } from 'react'
import { FaCheck, FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { createTask, DeleteTask, getTask, updateTask } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
const TaskManage = () => {

    const [input, setInput] = useState("");
    const [task, setTask] = useState([]);
    const [copy, setCopy] = useState("");
    const [update,setUpdate] = useState(null);

    const handleTask = ()=>{
        if(update && input){
            // update api call
            console.log("update api call");
            const obj = {
                taskName:input,
                isDone:update.isDone,
                _id: update._id,
                
            }
                    handleupdateTask(obj);
        }else if(update === null && input){
            // create task api call
            console.log("create task api call");
                   HandleAddClick();


        }
                     setInput("")
                   }
              useEffect(()=>{
                if(update){
                    setInput(update.taskName)
                }
              },[update])
    const HandleAddClick = async () => {
        const obj = {
            taskName: input,
            isDone: false,
        }
        console.log(obj);
        try {

            const { success, message } = await createTask(obj);
            if (success) {
                notify(message, "success");
            } else {
                notify(message, "error")
            }

        } catch (error) {
            console.error(error, "error");
            notify("Failed to Task", "error");

        }
        setInput("")
        fetchTask();
    }
    const fetchTask = async () => {
        try {
            const { data } = await getTask()
            setTask(data);
            setCopy(data);
        } catch (error) {
            console.error(error);
            notify("Failed to create task");
        }
    }

    useEffect(() => {
        fetchTask();
    }, [])

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTask(id);
            if (success) {
                notify(message, "success");
            } else {
                notify(message, "error")
            }
            fetchTask()

        } catch (error) {
            console.error(error);
            notify("Failed to Task", "error");

        }
    }

    const handleCheckUnchekc = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await updateTask(_id, obj);
            if (success) {
                notify(message, "success");
            } else {
                notify(message, "error")
            }
            fetchTask()

        } catch (error) {
            console.error(error);
            notify("Failed to Create Task", "error");

        }
    }
    const handleupdateTask = async(item)=>{
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await updateTask(_id, obj);
            if (success) {
                notify(message, "success");
            } else {
                notify(message, "error")
            }
            fetchTask()

        } catch (error) {
            console.error(error);
            notify("Failed to Create Task", "error");

        }
    }    

    
    const handleSearch = (e)=>{
              const term = e.target.value.toLowerCase();
              const oldTask = [...copy];
              const result = oldTask.filter((item)=>item.taskName.toLowerCase().includes(term));
              setTask(result);
              console.log(task)
    }
    return (

        <div className='my-[50px]'>
            {/* Search and Add task  */}
            <h2 className='text-center text-2xl font-bold'>Todo App</h2>
            <div className='flex justify-center mt-6'>
                <div className='flex items-center mx-2'>
                    <input type="text" placeholder='add a task' className='border p-2 rounded' value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className='text-white bg-green-600 p-[12px] border rounded-[6px] cursor-pointer' onClick={handleTask}><FaPlus /></button>
                </div>
                <div className='flex items-center mx-2' >
                    <button className='p-[12px] border rounded-[6px] cursor-pointer'><FaSearch /></button>

                    <input type="text" placeholder='search task' className='border p-2 rounded' onChange={ handleSearch}/>
                </div>
            </div>

            {/* Show the Todo Task */}
            {task.map((item, index) => (
                <div className='flex justify-between mx-auto my-10 items-center w-[500px] border p-2 ' key={index}>
                    <p className={item.isDone ? 'line-through' : " "}>{item.taskName}</p>
                    <div className='flex'>
                        <button className='p-[12px] border rounded-[6px] cursor-pointer text-white bg-green-600' onClick={() => handleCheckUnchekc(item)}> <FaCheck /></button>
                        <button className='p-[12px] border rounded-[6px] cursor-pointer text-white bg-blue-600' onClick={()=> setUpdate(item)}> <FaPen /></button>
                        <button className='p-[12px] border rounded-[6px] cursor-pointer text-white bg-red-600' onClick={() => handleDeleteTask(item._id)}> <FaTrash /></button>

                    </div>
                </div>
            ))
            }

            {/* Toastify */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManage
