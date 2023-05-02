const apiEndpoint='https://kanban-management-system-backend-production.up.railway.app/api/v1'

const apiRoute={
    alldata: apiEndpoint+"/getalldata",
    boards: apiEndpoint+"/boards",
    columns: apiEndpoint+"/columns",
    tasks: apiEndpoint+"/tasks",
    subtasks: apiEndpoint+"/subtasks",
}

export default apiRoute