import React, {useContext} from 'react'
import './DeleteTaskModal.scss'
import { ITask } from "../utils/types";
import apiRoute from "../../config/apiEndpointRoute";
import { initialContext } from "../../context/dataContext";
import axios from 'axios'


interface Props {
    setShowDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    taskData: ITask
}

const DeleteTaskModal:React.FC<Props> = ({setShowDeleteTaskModal,taskData}) => {
    const {setBoards}= useContext(initialContext)
    const handleTaskDelete= ()=>{
        const deleteTaskRequest= async ()=>{
            try {
                await axios.get(apiRoute.tasks+`/${taskData.taskid}`)
                const getallData= await axios(apiRoute.alldata)
                setBoards(getallData.data.boards)
            } catch (error) {
                
            }
        }
        deleteTaskRequest()
    }

    return (
        <div >
            <div className='delete-task-modal' onClick={(e) => {
                        e.stopPropagation();
                    }}>
                <div className="form">
                    <h2 className="heading-lg text--secondary">
                        Delete this task?
                    </h2>

                    <p className="text-light">
                        Are you sure you want to delete the '{taskData.title}'
                        task and its subtasks? This action cannot be reversed.
                    </p>

                    <div className="button-grp">
                        <button className="btn--danger btn--sm btn--block" onClick={()=>handleTaskDelete()}>
                            Delete
                        </button>
                        <button className="btn--secondary btn--sm btn--block" onClick={()=>setShowDeleteTaskModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
