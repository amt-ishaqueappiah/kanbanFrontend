import "./EditAndDeleteBoardModal.scss";




interface Props {
    setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAndDeleteBoardModal: React.FC<Props> = ({ setShowEditBoard, setShowDeleteBoard, setShowEditDelete}) => {
    
    
    return (
        <div>
            <div className="edit-delete text-light body-lg" >
                <a  href="#" onClick={()=>{
                    setShowEditBoard(true)
                    setShowEditDelete(false)
                }}>Edit Board</a>

                
                <a href="#"
                    className="text--secondary"
                    onClick={(e) => {
                        setShowDeleteBoard(true);
                        setShowEditDelete(false)
                    }}
                >
                    Delete Board
                </a>
            </div>
            {/* {showDeleteBoard && (
                <DeleteBoardModal
                    showDeleteBoard={showDeleteBoard}
                    setShowDeleteBoard={setShowDeleteBoard}
                />
            )}

             {showEditBoard &&( <EditBoardModal
                        setShowEditBoard={setShowEditBoard}
                    /> )} */}
        </div>
    );
};

export default EditAndDeleteBoardModal;
