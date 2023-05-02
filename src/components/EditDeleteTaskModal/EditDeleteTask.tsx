import './EditDeleteTask.scss'





interface Props {
    setShowEditDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowUpdateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDeleteTask  = ({setShowEditDeleteTaskModal, setShowUpdateTaskModal,setShowDeleteTaskModal}:Props) => {

    
    return (
        <div>
            <div className="edit-delete-task text-light body-lg">


                <a href="#" onClick={(e)=>{
                    setShowUpdateTaskModal(true)
                    setShowEditDeleteTaskModal(false)

                }}>Edit Task</a>
                
                <a href="#"
                    className="text--secondary"
                    onClick={(e) => {
                        // setShowEditDelete(false);
                        setShowDeleteTaskModal(true);
                        setShowEditDeleteTaskModal(false)
                    }}
                >
                    Delete Task
                </a>
            </div>
            {/* {showDeleteTask && (
                <DeleteTaskModal
                    showDeleteTask={showDeleteTask}
                    setShowDeleteTask={setShowDeleteTask}
                />
            )}

             {showUpdateTask &&( <UpdateTaskModal
                        showUpdateTask={showUpdateTask}
                        setShowUpdateTask={setShowUpdateTask}
                    /> )} */}
        </div>
    );
};

export default EditDeleteTask;
