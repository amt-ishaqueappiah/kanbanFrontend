import React, {useEffect, useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage";
import { useTheme } from "./context/ThemesContext";
import { initialContext } from "./context/dataContext";





function App() {
    const { theme } = useTheme()
    console.log(theme)
    const {setBoards} = useContext(initialContext)
    useEffect(()=>{
        const fetchDataFunc= async ()=>{
            try {
                const response= await fetch(
                    "https://kanban-management-system-backend-production.up.railway.app/api/v1/getalldata"
                );
                const status= response.status
                const data = await response.json()
                if(status===200){
                    setBoards(data.boards)
                }
                else {

                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataFunc()
    },[initialContext])



    return (
        
            <div className="App" style={{...theme as React.CSSProperties}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/board/:id" element={<HomePage />} />
                        </Routes>
                    </BrowserRouter>
            </div>

    );
}

export default App;
