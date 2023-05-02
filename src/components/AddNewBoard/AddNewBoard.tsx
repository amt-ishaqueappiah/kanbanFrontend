import { useState, useContext } from "react";
import "./AddNewBoard.scss";
import axios from 'axios';
import apiRoute from "../../config/apiEndpointRoute";
import { initialContext } from "../../context/dataContext";
interface Props {
    setAddNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
}



const AddNewBoard: React.FC<Props> = ({ setAddNewBoard }) => {
    const [columns, setColumns] = useState<string[]>([""]);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const {setBoards,setRequesting} = useContext(initialContext)    
    // const [columnErrors, setColumnErrors] = useState<number[]>([]);

    const columnChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setColumns((prevColumns)=>{
            prevColumns[index]= event.target.value
            return [...prevColumns]
        });
    };

    const addFields = () => {
        setColumns([...columns, ""]);
    };

    const removeFields = (index: number) => {
        setColumns((prevColumns)=>{
            prevColumns.splice(index, 1);
            if(prevColumns.length===0)return [""]
            return [...prevColumns]
        });
    };

    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            
            const postNewBoardRequest= async ()=>{
                try {
                    setRequesting(true)
                    const filteredColumns= columns.filter((column)=>column.length>0)
                    // const requestBody={
                    //     name,
                    //     columns: filteredColumns
                    // }
                   // const postNewBoard= await axios.post(apiRoute.boards,requestBody)
                    const newalldata= await axios.get(apiRoute.alldata)
                    const response= newalldata.data
                    setBoards(response.boards)
                    setAddNewBoard(false)
                    setRequesting(false)
                } catch (error) {
                    console.log(error)
                    console.log('error')
                    // Internet Error
                }
                
            }
            postNewBoardRequest();
    };

    return (
        <div>
            <div
                className="modal"
                onClick={(e) => setAddNewBoard(false)}
            >
                <div
                    className="form"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <h2 className="heading-lg">Add New Board</h2>

                    <div className="input-grp">
                        <label htmlFor="name">Name</label>
                        <div
                            className={
                                "text-field " + (nameError && "border-danger")
                            }
                        >
                            <input
                                type="text"
                                placeholder="eg. web design"
                                id="name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (e.target.value !== "") setNameError("");
                                }}
                                
                            />
                            <div>{nameError && nameError}</div>
                        </div>
                    </div>

                    <div className="subtasks-container">
                        <label htmlFor="">Columns</label>

                        {columns.map((field, index) => (
                            <div className="subtask" key={index}>
                                <div className="text-field">
                                    <input
                                        type="text"
                                        placeholder="eg. take coffee break"
                                        value={field}
                                        onChange={(e) => columnChange(index, e)}
                                    />
                                    <div></div>
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
                            style={{backgroundColor:'var(--buttons)'}}
                        >
                            + Add New Column
                        </button>
                    </div>

                    <button
                        className="btn--primary btn--block btn--sm"
                        onClick={submitForm}
                    >
                        Add New Board
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewBoard;
