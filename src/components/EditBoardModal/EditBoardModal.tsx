import React, { useState, useContext } from "react";
import "./EditBoardModal.scss";
import { initialContext } from "../../context/dataContext";



interface Props {
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBoardModal: React.FC<Props> = ({ setShowEditBoard }) => {
  const { activeBoard } = useContext(initialContext);
  const [name, setName] = useState(activeBoard.name);
  const [columns, setColumns] = useState([...activeBoard.columns]);
  const [deletedColumns, setDeletedColumns] = useState<string[]>([]);
  const handleColumnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setColumns((prevColumns) => {
      prevColumns[index].name = e.target.value;
      return [...prevColumns];
    });
  };
  const handleColumnDelete = (index: number) => {
    setDeletedColumns([...deletedColumns, columns[index].columnid]);
    setColumns((prevColumn) => {
      prevColumn.splice(index, 1);
      return [...prevColumn];
    });
  };
  const handleBoardEdit = () => {
    const putEditBoardRequest = async () => {
      try {
        if (name) {
          const filteredNewColumns = columns.filter(
            (column) =>
              (!column.columnid && column.name) ||
              (column.columnid && column.name)
          );
          const requestBody = {
            name,
            columns: filteredNewColumns,
            deletedColumns: deletedColumns,
          };
          // const editBoard = await axios.put(
          //   apiRoute.boards + `/${id}`,
          //   requestBody
          // );
            console.log(requestBody)
          // const getallData = await axios.get(apiRoute.alldata);
          // setBoards(getallData.data.boards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    putEditBoardRequest();
  };
  return (
    <div>
      <div
        className="modal"
        onClick={() => {
          setColumns(activeBoard.columns);
          setShowEditBoard(false);
        }}
      >
        <div className="form" onClick={(e) => e.stopPropagation()}>
          <h2 className="heading-lg">Edit Board</h2>

          <div className="input-grp">
            <label htmlFor="">Board Name</label>
            <div className="text-field">
              <input
                type="text"
                placeholder="eg. web design"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div></div>
            </div>
          </div>

          <div className="subtasks-container">
            <label htmlFor="">Board Columns</label>
            {columns.map((column, index) => (
              <div className="subtask" key={index}>
                <div className="text-field">
                  <input
                    type="text"
                    placeholder="eg. take coffee break"
                    value={column.name}
                    onChange={(e) => handleColumnChange(e, index)}
                  />
                  <div></div>
                </div>
                <div onClick={() => handleColumnDelete(index)}>
                  <img src="/assets/icon-cross.svg" alt="" />
                </div>
              </div>
            ))}

            <button
              className="btn--secondary btn--sm btn--block"
              onClick={() => {
                setColumns([...columns, { columnid: "", name: "" }])
                          }}
                          style={{backgroundColor:'var(--buttons)'}}
            >
              + Add New Column
            </button>
          </div>

          <button
            className="btn--primary btn--block btn--sm"
            onClick={() => handleBoardEdit()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoardModal;
