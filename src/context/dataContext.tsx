import {createContext, useState, Dispatch, SetStateAction,ReactNode} from 'react';
import { IBoard } from '../components/utils/types';


export type ID={
    id:any
}

export interface BoardIDInterface{
    boardIndex:number
    setBoardIndex: Dispatch<SetStateAction<number>>
    activeBoard: IBoard
    setActiveBoard: Dispatch<SetStateAction<IBoard>>
    boards: IBoard[],
    setBoards: React.Dispatch<SetStateAction<IBoard[]>>
    requesting: boolean
    setRequesting: React.Dispatch<SetStateAction<boolean>>
}



export const initialContext= createContext({} as BoardIDInterface)


type IDProvideProps ={
    children: ReactNode
}

export default function ContextProvider({children}:IDProvideProps){
    const [activeBoard, setActiveBoard] =useState({} as IBoard);
    const [boards, setBoards]= useState([] as IBoard[])
    const [boardIndex,setBoardIndex]= useState(0)
    const [requesting, setRequesting] = useState(false)
    return (
        <initialContext.Provider value={{boardIndex,setBoardIndex,activeBoard,setActiveBoard, boards, setBoards, requesting, setRequesting}}>
            {children}
        </initialContext.Provider>
    )
} 