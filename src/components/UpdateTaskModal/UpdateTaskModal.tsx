import { useState,useContext } from "react";
import "./UpdateTaskModal.scss";
import axios from 'axios';
import { initialContext } from "../../context/dataContext";
import { IColumn, ITask } from "../utils/types";
import apiRoute from "../../config/apiEndpointRoute";


interface Props {
    setShowUpdateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    taskData: ITask
    column: IColumn
    index:number
    columnData: IColumn
}



const UpdateTaskModal :React.FC<Props> = ({setShowUpdateTaskModal,taskData,column,index, columnData}) => {
    const {activeBoard,setBoards}= useContext(initialContext)
    const [title, setTitle] = useState(taskData.title)
    const [description, setDescription] = useState(taskData.description)
    const [status, setStatus] = useState(column.columnid)
    const [subtasks, setSubtasks]= useState([...taskData.subtasks!])
    const [prevStatus, setPrevStatus] = useState(column.columnid)

    const [deletedSubtasks, setDeletedSubtasks] = useState<string[]>([])
    const handleUpdateTaskSubmit =(e:any)=>{
        e.preventDefault()
        const putUpdateTaskRequest= async ()=>{
            try {
                if(title){
                    const destination={
                        columnid: status,
                        index:status==prevStatus?index:1 
                    }
                    const source={
                        columnid: prevStatus,
                        index: index
                    }
                    const requestBody={
                        title,
                        description,
                        columnid: status,
                        deletedSubtasks,
                        subtasks,
                        move: {destination,source}
                    }
                    console.log(38, requestBody)
                    await axios.put(apiRoute.tasks+`/${taskData.taskid}`, requestBody)
                    const getallData= await axios.get(apiRoute.alldata)
                    setBoards(getallData.data.boards)
                }
            } catch (error) {
                console.log(error)
            }
        }
        putUpdateTaskRequest()
       
    }

    const AddNewSubtask= ()=>{
        setSubtasks((prevSubtasks)=>{
            return [...prevSubtasks, {subtaskid: "", title: "", is_completed: false}]
        })
    }
    const deleteSubtask= (index:number, subtaskid:string)=>{
        setDeletedSubtasks([...deletedSubtasks, subtaskid])
        setSubtasks((prevSubtasks)=>{
            prevSubtasks.splice(index,1)
            return [...prevSubtasks]
        })
    }
    return (
        <div>
            <div className="update-task-modal" onClick={()=>setShowUpdateTaskModal(false)}>
                <div className="form" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <h2 className="heading-lg">Edit Task</h2>

                    <div className="input-grp">
                        <label htmlFor="">Title</label>
                        <div className="text-field">
                            <input
                                type="text"
                                placeholder="eg. take coffee break"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                            <div></div>
                        </div>
                    </div>

                    <div className="input-grp">
                        <label htmlFor="">Description</label>
                        <div className="text-field">
                            <textarea className="textarea" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="subtasks-container">
                        <label htmlFor="">Subtasks</label>
                        {
                            subtasks.map((subtask,index)=>(
                                <div className="subtask" key={index}>
                                    <div className="text-field">
                                        <input
                                            type="text"
                                            placeholder="eg. take coffee break"
                                            value={subtask.title}
                                        />
                                        <div></div>
                                    </div>

                                   <div onClick={()=>{deleteSubtask(index, subtask.subtaskid)}}>
                                        <img src="/assets/icon-cross.svg" alt="" />
                                   </div>
                                </div>
                            ))
                        }

                        <button className="btn--secondary btn--sm btn--block" onClick={AddNewSubtask}>
                            + Add New Subtask
                        </button>
                    </div>

                    <div className="status">
                        <label htmlFor="">Status</label>
                        <div className="select-box">
                            <select className="select" value={status} onChange={(e)=>{setPrevStatus(status); setStatus(e.target.value)}}>
                                {
                                    activeBoard.columns.map((column,index)=>(
                                        <option value={column.columnid} key={index}>{column.name}</option>
                                    ))
                                }
                                
                                
                            </select>
                            <div className="icon-container">
                                <img
                                    src="./assets/icon-chevron-down.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>

                    <button className="btn--primary btn--block btn--sm" onClick={handleUpdateTaskSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskModal;
