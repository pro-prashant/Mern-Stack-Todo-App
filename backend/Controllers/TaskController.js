const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
    try {
        const task = new TaskModel(req.body);
        await task.save();
        return res.status(202).json({ message: "Task created successfully", success: true, task });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(404).json({ message: "Failed to create task", success: false, error: error.message });
    }
};
const fetchTask  = async (req,res)=>{
    try {
        const data = await TaskModel.find({});
        res.status(202)
            .json({ message: 'All Tasks', success: true, data });
    } catch (err) {
        res.status(404).json({ message: 'Failed to get all tasks', success: false });
    }
};

const updateTask = async (req,res)=>{
    try{
               const id = req.params.id;
               const body = req.body;
               const obj = {$set:{ ...body }};
               await TaskModel.findByIdAndUpdate(id,obj);
               res.status(202)
               .json({ message: 'Update Task', success: true,});
               }catch(err){
                     res.status(404).json({ message: 'Failed to get task', success: false});     
                    }
}

const deleteTask = async(req,res)=>{
   try{
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(202)
    .json({ message: 'Task is deleted', success: true });

   }catch(err){
    res.status(404).json({ message: 'Failed to delete task', success: false });
   }
}
module.exports = {createTask,fetchTask,updateTask,deleteTask};
