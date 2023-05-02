import React,{useContext, useEffect, useState} from "react";
import "../css/MainBoard.scss";
import Column from "./Column/Column";
import {DragDropContext,Droppable, OnDragEndResponder} from 'react-beautiful-dnd'
import { useParams } from "react-router-dom";
import { initialContext } from "../context/dataContext";
import AddNewColumn from "./AddNewColumn/AddNewColumn";


const MainBoard= () => {
     const [showAddNewColumn, setShowAddNewColumn] = useState(false)
    const {id}= useParams()
    const {activeBoard,setActiveBoard,boardIndex, setBoards, boards}= useContext(initialContext)
    const colorArray = [
        "#49C4E5",
        "#8471F2",
        "#67E2AE",
        "#870C63",
        "#21535b",
        "##ff4500",
    ];
    const onDragEnd: OnDragEndResponder =(result)=>{
        const {destination, source, draggableId}= result
        if(destination==null)return;
        if(destination.droppableId==source.droppableId && destination.index==source.index)return;
        if(destination.droppableId==source.droppableId && destination.index!=source.index){
            const from= source.index
            const to= destination.index
            const changeActiveBoard={...activeBoard}
            const columnIndex=changeActiveBoard.columns.findIndex((column)=> column.columnid==source.droppableId)
            const tasks= changeActiveBoard.columns[columnIndex].tasks
            const removedTask= tasks?.splice(from, 1)![0]
            tasks?.splice(to,0,removedTask!)
            setBoards((prevBoard)=>{
                prevBoard[boardIndex]=changeActiveBoard
                console.log(prevBoard)
                return [...prevBoard]
            })
            
            return
        }
        else{
            const changeActiveBoard={...activeBoard}
            const from= destination.index
            const to = destination.index
            console.log('else')
            const sourceColumnLocation= changeActiveBoard.columns.findIndex((column)=>column.columnid===source.droppableId)
            const removeTaskFromSource= changeActiveBoard.columns[sourceColumnLocation].tasks?.splice(from,1)[0];
            const destinationColumnLocation= changeActiveBoard.columns.findIndex((column)=>column.columnid===destination.droppableId);
            const addTaskToDestination= changeActiveBoard.columns[destinationColumnLocation].tasks?.splice(to, 0, removeTaskFromSource! )
            setBoards((prevBoards)=>{
                prevBoards[boardIndex]=changeActiveBoard
                return [...prevBoards]
            })
        }
    }
    useEffect(()=>{
        console.log('change')
        setActiveBoard(boards[boardIndex])
    },[boards])
    return (

        <main className="main">

            {  Object.keys(activeBoard).length>0 &&
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        activeBoard.columns.map((column, index) => (
                            <Droppable droppableId={column.columnid} key={index}>
                                {
                                    (Provider)=>(
                                        <div {...Provider.droppableProps} ref={Provider.innerRef}>
                                            <Column eachColumn={column} color={colorArray[index]} />
                                            {Provider.placeholder}
                                        </div>  
                                    )
                                }
                                
                            </Droppable>
                        ))
                    }
                    {Object.keys(activeBoard).length >0 && activeBoard.columns.length >0 ?
                    (<div className="new-column">
                        <span className="newCol" onClick={()=>{setShowAddNewColumn(true)}}>+New Column</span>
                    </div>):
                    (<div className="add-new-column-main-board">
                         <p className="text-light body-lg">
                        This board is empty. Create a new column to get
                        started.
                        </p>
                        <button className="add-new-column-btn btn--primary btn--md" onClick={()=>{setShowAddNewColumn(true)}}>
                        +Add New Column
                        </button>
                   
                    </div>)
                
                    }
                   
                </DragDropContext>
               
            }

            {
                showAddNewColumn && (
                    <AddNewColumn setShowAddNewColumn={setShowAddNewColumn}/>
                )
            }
        </main>
    );
};

export default MainBoard;
