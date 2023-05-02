// import { Board } from "../../data/interface";
import { IColumn } from "../utils/types";
import Bullet from "../Bullet/Bullet";
import Card from "../Card/Card";
import "./Column.scss";
import { initialContext } from "../../context/dataContext";
import { useContext } from "react";
import {Draggable} from 'react-beautiful-dnd'
import { Provider } from "react-redux";
interface Props {
    eachColumn: IColumn;
    color: string;
    
    
}
 interface Column{
    column:{
        name:any
    }
   
 }


const Column: React.FC<Props> = ({ eachColumn, color }) => {
    return (
        <div style={{display:'flex'}}>
            <div className="column-container">
                <div className="column-heading">
                    <Bullet color={color} />
                    <h6 className="heading-sm text-light uppercase">
                    { eachColumn.name}
                </h6>
                   
                    
                </div>

                <div className="todos">
                    {
                        eachColumn.tasks?.map((task,index)=>
                            <Draggable key={task.taskid} draggableId={task.taskid} index={index}>
                                {
                                    (Provider)=>(
                                        <div ref={Provider.innerRef} {...Provider.dragHandleProps} {...Provider.draggableProps}>
                                            <Card task={task} column={eachColumn} index={index+1}/>
                                        </div>
                                    )
                                }
                            </Draggable>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Column;
