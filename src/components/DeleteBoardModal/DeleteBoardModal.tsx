import "./DeleteBoardModal.scss";
import { initialContext } from "../../context/dataContext";
import {useContext} from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiRoute from "../../config/apiEndpointRoute";


interface Props {
    setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteBoardModal: React.FC<Props> = ({
    setShowDeleteBoard,
}) => {
    const {id}= useParams()
    const {setBoards,activeBoard} = useContext(initialContext)
    const navigate= useNavigate()
    const handleDelete=()=>{
        const deleteBoardRequest= async ()=>{
            try {
                const deleteBoard= await axios.delete(apiRoute.boards+`/${id}`)
                const allData= await axios.get(apiRoute.alldata)
                setBoards(allData.data.boards)
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }

        deleteBoardRequest()
    }
    return (
        <div>
            <div className="modal" onClick={()=>setShowDeleteBoard(false)}>
                <div className="form">
                    <h2 className="heading-lg text--secondary">
                        Delete this board?
                    </h2>

                    <p className="text-light">
                        Are you sure you want to delete the '{activeBoard.name}'
                        board? This action will remove all columns and tasks and
                        cannot be reversed.
                    </p>

                    <div className="button-grp">
                        <button className="btn--danger btn--sm btn--block" onClick={handleDelete}>
                            Delete
                        </button>
                        <button
                            className="btn--secondary btn--sm btn--block"
                            onClick={(e) => setShowDeleteBoard(false)}
                            style={{backgroundColor:'var(--buttons)'}}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteBoardModal;
