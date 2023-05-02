import React, { useContext, useState } from 'react';
import './AddNewColumn.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiRoute from '../../config/apiEndpointRoute';
import { initialContext } from '../../context/dataContext';
interface Prop{
    setShowAddNewColumn: React.Dispatch<React.SetStateAction<boolean>>
}
const AddNewColumn = ({setShowAddNewColumn}:Prop) => {
    const {id}= useParams()
    const [name, setName] = useState("")
    const {setRequesting,setBoards}= useContext(initialContext)
    const handldeAddColumn= ()=>{
        const addNewColumn= async ()=>{
            try {
                const requestBody={
                    boardid: id,
                    columns: [name]
                }
                setRequesting(true)
                await axios.post(apiRoute.columns, requestBody)
                const getAllData= await axios.get(apiRoute.alldata)
                setBoards(getAllData.data.boards)
                setShowAddNewColumn(false)
                setRequesting(false)
            } catch (error) {
                console.log(error)
            }
        }
        if(name){
            addNewColumn()
        }
    }
  return (
    <div onClick={()=>{setShowAddNewColumn(false)}}>
    <div
        className="modal"
    >
        <div
            className="form"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <h2 className="heading-lg">Add New Column</h2>
                    <input
                        type="text"
                        placeholder="eg. todo"
                        id="name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                <div className="add-new-column-btn">
                    <button className="btn--primary btn--block btn--sm" onClick={()=>{handldeAddColumn()}}>
                        Add New Column
                    </button>
                </div>
               
            </div>
            
        </div>

            
    </div>

  )
}

export default AddNewColumn
