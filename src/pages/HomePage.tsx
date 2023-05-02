import { useEffect, useState,useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainBoard from "../components/MainBoard";
import { initialContext } from "../context/dataContext";
import {useMediaQuery} from 'react-responsive';
import "../css/Home.scss";

import { useNavigate, useParams } from "react-router-dom";
import { FillingBottle, FlippingSquare,FadingBalls } from "react-cssfx-loading";
import { SideBarIcon } from "../components/SideBarIcon";

// "#49C4E5",
//         "#8471F2",
//         "#67E2AE",
//         "#870C63",
//         "#21535b",
//         "##ff4500",

const HomePage: React.FC = () => {
    const [sideViewMobileToggle, setSideViewMobileToggle] = useState(false);
    const {id}= useParams()
    const navigate= useNavigate()
    const [sideBarToggle, setSideBarToggle]= useState(false)
    const {boards,setBoards,activeBoard,setActiveBoard,setBoardIndex, requesting,setRequesting}= useContext(initialContext)
    const [hideSidebar,setHideSideBar] = useState(false)

    const isBigScreen = useMediaQuery({query:'(min-width:600px)'});
    useEffect(() => {
        const fetchAllBoards = async () => {
            const response = await fetch(
                "https://kanban-management-system-backend-production.up.railway.app/api/v1/getalldata"
            );
            const data = await response.json();

            if (response.ok) {
                // data.forEach((board) => {
                //     dispatch(addBoard(board));
                // });
                setBoards(data.boards)
            }
        };

    })
    useEffect(()=>{
        if(boards.length>0){
            if(id){
                let activeBoardLocation=0
                activeBoardLocation= boards.findIndex((board)=>board.boardid===id)
                if(activeBoardLocation==-1){
                    setBoardIndex(0)
                    setActiveBoard(boards[0])
                }
                else{
                    setBoardIndex(activeBoardLocation)
                    setActiveBoard(boards[activeBoardLocation])
                }
                
            }
            else{
                const boardid= boards[0].boardid
                navigate(`/board/${boardid}`)
            }
        }
    },[id,boards])

    return (
        <div className="HomePage">
            {
                boards.length>0? (
                    <>
                        <Navbar
                            sideViewToggle={sideViewMobileToggle}
                            setSideViewToggle={setSideViewMobileToggle}
                        />
                        <MainBoard/>
                       <Sidebar sideViewToggle={sideViewMobileToggle} boards={boards} 
                       hideSideBar={hideSidebar} setHideSideBar={setHideSideBar}
                       />
                        {<SideBarIcon hideSideBar={hideSidebar} setHideSideBar={setHideSideBar} /> }
                       
                       
                    </>
                ):
                (   
                    <div className="page-preloader">
                        <FillingBottle color="#49C4E5" width="100px" height="100px" duration="3s" />
                    </div>
                )
            }
            {
                requesting && (
                    <div className="server-request-loading">
                    <FadingBalls color="#8471F2" width='10rem' height='2.5rem' duration="1s" />
                </div>
                )
            }
            
        </div>
    );
};

export default HomePage;
