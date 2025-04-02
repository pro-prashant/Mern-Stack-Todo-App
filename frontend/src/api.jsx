import { API_URL } from "./utils"

export const createTask = async(taskobj)=>{

    const url = `${API_URL}/task`;
    console.log("url",url);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(taskobj)
    };
    try{
           
        const result = await fetch(url,options);
        const data = await result.json();
        return data;
    }catch(error){
          return error;
    }
}

export const getTask = async()=>{

    const url = `${API_URL}/task`;
    console.log("url",url);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    
    };
    try{
        const result = await fetch(url,options);
        const data = await result.json();
        return data;
    }catch(error){
          return error;
    }
}

export const DeleteTask = async (id) => {
    const url = `${API_URL}/task/${id}`;
    console.log('url ', url)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const updateTask = async (id,reqBody) => {
    const url = `${API_URL}/task/${id}`;
    console.log('url ', url)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
                  body:JSON.stringify(reqBody)
    };
              
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

