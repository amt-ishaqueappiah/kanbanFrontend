import "./Card.scss";
import { IColumn, ITask } from "../utils/types";
import {useState} from 'react';
import EditTaskModal from "../EditTaskModal/EditTaskModal";



interface Props {
    task: ITask;
    column: IColumn;
    index: number
    
}

const Card: React.FC<Props> = ({task, column,index}) => {
    const [showEditTask, setShowEditTask]= useState(false)
    const [taskID,setTaskID]=useState('')

    const handleToggleShowModal=(e:any)=>{
        setShowEditTask(prev=>!prev)
        setTaskID(task.taskid)     
    }
    
    
    return (
        <div>
            <div className="card--container" onClick={(e)=>handleToggleShowModal(e)} >
                <p className="heading-md" >{task.title}</p>
                <p className="body-md text-light">{task.subtasks?.reduce((prev,curr)=>curr.is_completed?prev+1:prev,0)} of {task.subtasks?.length} subtasks</p>
            </div>
         { showEditTask===true &&  
         
         <EditTaskModal showEditTask={showEditTask} 
         setShowEditTask={setShowEditTask}
          taskData={task} id={taskID}
          columnData= {column}
          index={index}/>}
          
        </div>
      
       
    );
};

export default Card;
