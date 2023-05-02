import { useEffect, useState, useContext } from "react";
import { isString } from "../utils/validation";
import { initialContext } from "../../context/dataContext";

import "./AddNewTaskModal.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiRoute from "../../config/apiEndpointRoute";

// Style: remove modal parent div on click
// Style: stop closing of modal when the select is shown
interface Props {
    handleShowNewTask: React.Dispatch<React.SetStateAction<boolean>>
}

interface Subtask{
    title: string
    is_completed: boolean
}

const AddNewTaskModal: React.FC<Props> = ({ handleShowNewTask }) => {
    const {activeBoard, setBoards,setRequesting}= useContext(initialContext)
    let data = [];
    // const {id, setID}= useContext(initialContext)
    const [columnId, setColumnId]= useState(activeBoard.columns[0].columnid)

  
    const [subtasks, setSubtasks] = useState([{title:"", is_completed: false}] as Subtask[]);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    const [description, setDescription] = useState("");
    // const [descriptionError, setDescriptionError] = useState("");

    const [status, setStatus] = useState("Todo");

    const [subtaskErrors, setSubtaskErrors] = useState<number[]>([]);

    const subTaskChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        
        setSubtasks(subtasks);
        setSubtasks((prevSubtasks)=>{
            prevSubtasks[index].title = event.target.value;
            return [...prevSubtasks]
        })
        if (event.target.value !== "") {
            const subtaskErrorIndices = [...subtaskErrors];
            const final = subtaskErrorIndices.filter((ind) => ind !== index);
            setSubtaskErrors(final);
        } else setSubtaskErrors([...subtaskErrors, index]);
    };

    const addFields = () => {
        setSubtasks([...subtasks, {title:"", is_completed: false}]);
    };

    const removeFields = (index: number) => {
        setSubtasks((prevSubtasks)=>{
            prevSubtasks.splice(index, 1);
            if(prevSubtasks.length==0)return [{title:"", is_completed: false}]
            return [...prevSubtasks]
        })
    };



    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const postAddTask= async ()=>{
            try {
                setRequesting(true)
                const filteredSubtask= subtasks.filter((subtask)=>subtask.title.length!==0)
                const requestBody={
                    title,
                    description,
                    columnId,
                    subtasks:filteredSubtask
                }
                console.log(requestBody)
                const postData= await axios.post(apiRoute.tasks,requestBody)
                const getallData= await axios.get(apiRoute.alldata)
                setBoards(getallData.data.boards)
                handleShowNewTask(false)
                setRequesting(false)
            } catch (error) {
                console.log(error)
            }
        }
        postAddTask()
    };

    return (
        <div>
            <div className="add-new-task-modal" onClick={() => handleShowNewTask(false)}>
                <div
                    className="add-new-task-form"
                    onClick={(e) => {
                        // do not close modal if anything inside modal content is clicked
                        e.stopPropagation();
                    }}
                >
                    <h2 className="heading-lg">Add New Task</h2>

                    <div className="input-grp">
                        <label htmlFor="">Title</label>
                        {/* text-field */}
                        <div
                            className={
                                "text-field " + (titleError && "border-danger")
                            }
                        >
                            <input
                                type="text"
                                placeholder="eg. take coffee break"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value !== "")
                                        setTitleError("");
                                }}
                            />
                            <div>{titleError && titleError}</div>
                        </div>
                    </div>

                    <div className="input-grp">
                        <label htmlFor="">Description</label>
                        <div className="text-field">
                            <textarea
                                className="textarea"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                // style={{backgroundColor:'var(--background)'}}
                            >{description}</textarea>
                        </div>
                    </div>

                    <div className="subtasks-container">
                        <label htmlFor="">Subtasks</label>

                        {subtasks.map((field, index) => (
                            <div className="subtask" key={index}>
                                <div
                                    className={
                                        "text-field " +
                                        (subtaskErrors.includes(index)
                                            ? "border-danger"
                                            : "")
                                    }
                                >
                                    <input
                                        type="text"
                                        name="subtask"
                                        placeholder="eg. take coffee break"
                                        value={field.title}
                                        onChange={(e) =>
                                            subTaskChange(index, e)
                                        }
                                    />
                                    <div>
                                        {subtaskErrors.includes(index) &&
                                            "cannot be empty"}
                                    </div>
                                </div>

                                <img
                                    src="/assets/icon-cross.svg"
                                    alt=""
                                    onClick={() => removeFields(index)}
                                />
                            </div>
                        ))}

                        <button
                            className="btn--secondary btn--sm btn--block"
                            onClick={addFields}
                            style={{backgroundColor:'var(--buttons)',borderColor:'var(--modal_input_border)'}}
                        >
                            + Add New Subtask
                        </button>
                    </div>

                    <div className="status">
                        <label htmlFor="">Status</label>
                        <div className="select-box">
                            <select
                                className="select"
                                onChange={(e) => setColumnId(e.target.value)}
                                value={columnId}
                                
                            >
                                {activeBoard.columns.map((column,index):any=>

                                    <option className="option" value={column.columnid} key={index}
                                    >{column.name?.toUpperCase()}</option>
                               )}
                            </select>
                            
                            <div className="icon-container">
                                <img
                                    src="/assets/icon-chevron-down.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn--primary btn--block btn--sm"
                        onClick={submitForm}
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewTaskModal;
