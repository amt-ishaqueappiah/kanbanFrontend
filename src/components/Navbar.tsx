import { useState,useEffect } from "react";
import "../css/Nav.scss";
import AddNewTaskModal from "./AddNewTaskModal/AddNewTaskModal";
import EditAndDeleteBoardModal from "./EditAndDeleteBoardModal/EditAndDeleteBoardModal";
import {useContext} from 'react';
import { useParams } from "react-router-dom";
import { initialContext } from "../context/dataContext";
import DeleteBoardModal from "./DeleteBoardModal/DeleteBoardModal";
import EditBoardModal from "./EditBoardModal/EditBoardModal";


interface Props {
    sideViewToggle: boolean;
    setSideViewToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ sideViewToggle, setSideViewToggle }) => {
    const [showNewTask, setShowNewTask] = useState(false);
    const [showEditDelete, setShowEditDelete] = useState(false);
    const [navName,setNavName] = useState<any>()
    const [showEditBoard,setShowEditBoard]= useState(false)
    const [showDeleteBoard,setShowDeleteBoard]= useState(false)
    const {id}= useParams()
    const {activeBoard}= useContext(initialContext)
    console.log(activeBoard)
    useEffect(()=>{
        if(id && Object.keys(activeBoard).length>0){
            setNavName(activeBoard.name)
        }
    },[id,activeBoard])

    const handleAddTaskToggle=()=>{
        if(activeBoard.columns.length>0){
            setShowNewTask(!showNewTask)
        }
    }
   
    return (
        <nav className="nav">
            <div className="nav-left-panel">
                <svg
                    className="kanbanIcon"
                    width="24"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="#635FC7" fillRule="evenodd">
                        <rect width="6" height="25" rx="2" />
                        <rect
                            opacity=".75"
                            x="9"
                            width="6"
                            height="25"
                            rx="2"
                        />
                        <rect
                            opacity=".5"
                            x="18"
                            width="6"
                            height="25"
                            rx="2"
                        />
                    </g>
                </svg>
                <span className="heading-lg">{navName}</span>
                {sideViewToggle === false ? (
                    <svg
                        className="arrowDown"
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() =>setSideViewToggle(!sideViewToggle)}
                    >
                        <path
                            stroke="#635FC7"
                            strokeWidth="2"
                            fill="none"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                ) : (
                    <svg
                    className="arrow-up"
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke="#635FC7"
                            strokeWidth="2"
                            fill="none"
                            d="M9 6 5 2 1 6"
                            onClick={() => setSideViewToggle(!sideViewToggle)}
                        />
                    </svg>
                )}
            </div>
            <div className="nav-right-panel">
    
                        {Object.keys(activeBoard).length>0?
                        (
                            <>
                            {
                                activeBoard.columns.length===0? 
                                (
                                    <button
                                        disabled
                                        className="btn-add-text btn--md bg-light text-white"
                                    >
                                        Add New Task
                                    </button>
                                ):
                                (
                                    <button
                                        className="btn-add-text btn--primary btn--md "
                                        onClick={()=>handleAddTaskToggle()}
                                    >
                                        Add New Task
                                    </button>
                                )
                            }
                            </>
                        ):
                        (
                            <button
                            disabled
                            className="btn-add-text btn--md bg-light text-white"
                        >
                            Add New Task
                        </button>
                        )
                    }
               
                <button
                    className="btn-add-icon btn--primary btn--sm"
                    onClick={()=>{setShowNewTask(!showNewTask)}}
                >
                    <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#FFF"
                            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                        />
                    </svg>
                </button>


                {Object.keys(activeBoard).length > 0 && (
                    <svg
                        width="5"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => setShowEditDelete(!showEditDelete)}
                    >
                        <g fill="#828FA3" fillRule="evenodd">
                            <circle cx="2.308" cy="2.308" r="2.308" />
                            <circle cx="2.308" cy="10" r="2.308" />
                            <circle cx="2.308" cy="17.692" r="2.308" />
                        </g>
                    </svg>
                )}

                {Object.keys(activeBoard).length === 0 && (
                    <svg
                        width="5"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="#828FA3" fillRule="evenodd">
                            <circle cx="2.308" cy="2.308" r="2.308" />
                            <circle cx="2.308" cy="10" r="2.308" />
                            <circle cx="2.308" cy="17.692" r="2.308" />
                        </g>
                    </svg>
                )}

                {showEditDelete && (
                    <EditAndDeleteBoardModal
                        setShowDeleteBoard={setShowDeleteBoard}
                        setShowEditBoard= {setShowEditBoard}
                        setShowEditDelete= {setShowEditDelete}
                    />
                )}
                
            </div>

            {
                    showDeleteBoard && (
                        <DeleteBoardModal 
                            setShowDeleteBoard={setShowDeleteBoard}
                        />
                    )
                }
                {
                    showEditBoard && (
                        <EditBoardModal 
                        setShowEditBoard={setShowEditBoard}
                        />
                    )
                }
            {showNewTask && (
                    <AddNewTaskModal handleShowNewTask={setShowNewTask} />
                )}
        </nav>
    );
};

export default Navbar;
