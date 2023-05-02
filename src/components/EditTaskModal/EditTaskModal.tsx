import "./EditTaskModal.scss";
import { IColumn, ISubTask, ITask } from "../utils/types"
import EditDeleteTask from "../EditDeleteTaskModal/EditDeleteTask";
import { useState, useContext } from "react";
import apiRoute from "../../config/apiEndpointRoute";
import axios from "axios";
import UpdateTaskModal from "../UpdateTaskModal/UpdateTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import { initialContext } from "../../context/dataContext";

interface Props {
    showEditTask: boolean;
    setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
    taskData: ITask;
    id:string;
    columnData: IColumn
    index: number
}

const EditTaskModal: React.FC<Props> = ({showEditTask,setShowEditTask,taskData, id,columnData,index}) => {
    const [showEditDeleteTaskModal, setShowEditDeleteTaskModal] =useState(false)
    const [showUpdateTaskModal, setShowUpdateTaskModal]= useState(false)
    const [showDeleteTaskModal, setShowDeleteTaskModal]= useState(false)
    const [subtasks, setSubtasks]= useState(taskData.subtasks!)
    const [selectColumn, setSelectColumn]= useState(columnData.columnid)

    const {setBoards,activeBoard}= useContext(initialContext)
    const changeCompletion= (subtaskid:string, e:React.ChangeEvent<HTMLInputElement>, index:number)=>{
        const updateCompletion= async ()=>{
            try {
                const requestBody= {
                    is_completed:!subtasks[index].is_completed
                }
                const putComopletionRequest= await axios.put(apiRoute.subtasks+`/complete/${subtaskid}`,requestBody)
                const getallData= await axios.get(apiRoute.alldata)
                setBoards(getallData.data.boards)
                setSubtasks((prevSubtasks)=>{
                    prevSubtasks[index].is_completed=!prevSubtasks[index].is_completed
                    return [...prevSubtasks]
                })
            } catch (error) {
                console.log(error)
            }
        }
        updateCompletion()
        
    }
    
    const handleMove= (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const move= async ()=>{
            const source={
                columnid: selectColumn,
                index: index
            }
            const destination={
                columnid: e.target.value,
                index: 1
            }
            const moveData={source,destination}
            console.log(moveData)
            await axios.put(apiRoute.tasks+`/move/${taskData.taskid}`,moveData)
            const getalldata= await axios.get(apiRoute.alldata)
            setBoards(getalldata.data.boards)
        }
        move()
       
    }
    return (
        <div className="edit-task-modal"   onClick={(e) => setShowEditTask(!showEditTask)}>
            {id===taskData.taskid &&
                <div className="form editTask"   onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        
                <div className="header">
                    <h2 className="heading-lg">
                        {taskData.title} 
                    </h2>
                    <svg className="editTaskSvg" width="5" height="20" xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>setShowEditDeleteTaskModal(prev=>!prev)}
                    ><g fill="#828FA3" fillRule="evenodd">
                        <circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/>
                        <circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                </div>

                <p className="body-lg text-light">
                    {taskData.description}
                </p>

                <p className="body-lg text-light">Subtasks ({taskData.subtasks?.reduce((prev,cur)=>cur.is_completed? prev+1: prev,0)} of {taskData.subtasks?.length})</p>

                <div className="sub-tasks-container">
                {
                        taskData.subtasks?.map((subtask,index)=>(<div className="check-box">
                        <input type="checkbox" id="check-box" checked={subtasks[index].is_completed} onChange={(e)=>changeCompletion(subtask.subtaskid,e,index)} />
                        <label htmlFor="check-box " className="text-light">
                            {subtask.title}
                        </label>
                    </div>))
                    }
                </div>

                <div className="state">
                    <label htmlFor="check-box " className="text-light">
                        Current Status
                    </label>
                    <div className="select-box">
                        <select name="" id="" className="select" value={selectColumn} onChange={handleMove}>
                            {
                               activeBoard.columns.map((column)=>(
                                    <option value={column.columnid}>{column.name}</option>
                               )) 
                            }
                            
                        </select>
                        <div className="icon-container">
                            <img src="/assets/icon-chevron-down.svg" alt="" />
                        </div>
                    </div>

                </div>
                { showEditDeleteTaskModal===true &&   
                <EditDeleteTask
                setShowEditDeleteTaskModal={setShowEditDeleteTaskModal}
                setShowUpdateTaskModal={setShowUpdateTaskModal}
                setShowDeleteTaskModal={setShowDeleteTaskModal}
                />
                }
                {showDeleteTaskModal && (
                <DeleteTaskModal
                setShowDeleteTaskModal={setShowDeleteTaskModal}
                taskData={taskData}
                />
            )}

             {showUpdateTaskModal &&
             ( <UpdateTaskModal 
                setShowUpdateTaskModal={setShowUpdateTaskModal}
                taskData={taskData}
                columnData={columnData}
                column={columnData}
                index={index}/> 
             )}
            </div>}
            
        </div>
    );
};

export default EditTaskModal;
