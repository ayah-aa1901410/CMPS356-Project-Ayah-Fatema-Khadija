"use client"
import { CardContent, ListItem, Typography } from "@mui/material";
import {Card} from "@mui/material";
import { useHalaqatContext } from "../context/HalaqatContext";
import { useEffect, useState } from "react";
import {useStore} from "../store/HalaqatStore"
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CompleteTask from "./CompleteTask.js";
import UpdateTask from "./UpdateTask.js";

export default function TaskView({taskId}) {
//   const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingStudent, setUpdatingStudent} = useHalaqatContext()  
  const [task, setTask] = useState(null)
    const store= useStore()
    const [popup, setPopup] = useState({ show: false, id: null });
    const [localStorageResponse, setLocalStorageResponse] = useState(null)
    const [coordinator, setCoordinator] = useState(false)
    const [teacher, setTeacher] = useState(false)
    const [parent, setParent] = useState(false)

    const [openCompleteTask, setOpenCompleteTask] = useState(false);
    const [openUpdateTask, setOpenUpdateTask] = useState({is: false, taskId: null});

  useEffect(()=>{
    setTask(store.tasks[store.tasks.findIndex(t => t.taskId == taskId)])
    console.log(store.tasks[store.tasks.findIndex(t => t.taskId == taskId)]);
  },[])
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('response')).token != null) {
      if (JSON.parse(localStorage.getItem('response')).role === "coordinator") {
        setCoordinator(true)
      } else if (JSON.parse(localStorage.getItem('response')).role === "teacher") {
        setTeacher(true)
      } else {
        setParent(true)
      }
      setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))
    }
  },[])

  function handleClose() {
    setPopup({ show: false, id: null });
  }

  function handleDelete(taskId) {
    setPopup({ show: true, id: taskId });
  }

  async function deleteTask() {
    const taskId = popup.id;
    const response = await fetch("/api/TaskList", {
      method: "DELETE",
      body: JSON.stringify({
        taskId
      }),
    });
    // setJsonUpdated(true);
    setPopup({ show: false, id: null });
    store.setTasks()
  }

  function updateTaskClicked(taskId){
    const requiredTaskIndex = store.tasks.findIndex(task => task.taskId == taskId)
    const requiredTask = store.tasks[requiredTaskIndex]
    if(requiredTask.completedDate){
      alert("This task is already complete!")
    }else{
      setOpenUpdateTask({is: true, taskId: taskId})
    }  
  }

    return (
    <>
      {
        task && <ListItem key={taskId}>
        <Card key={taskId} sx={{minWidth: "600px", margin: "10px", borderRadius: "15px"}}>
            <CardContent>
                <Typography>
                    Surah: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].surahName}
                </Typography>
                <Typography>
                    From Aya: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].fromAya}
                </Typography>
                <Typography>
                    To Aya: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].toAya}
                </Typography>
                <Typography>
                    Task: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].type}
                </Typography>
                <Typography>
                    Due Date: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].dueDate}
                </Typography>
                {task.completedDate ? 
                    (<div>
                        <Typography>
                            Completed on: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].completedDate}
                        </Typography>
                        <Typography>
                            Grade: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].masteryLevel}
                        </Typography>
                        <Typography>
                            Comments: {store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].comment}
                        </Typography>
                    </div>)
                    :
                    (<Typography>
                            Still in Progress
                    </Typography>)
                }
                {teacher && 
                           store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].completedDate ? "" :
                           (teacher && <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => setOpenCompleteTask(true)}
                            >
                            Complete Task
                            </Button>)
                          
                        }
                        {teacher && store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].completedDate ? "" :(
                          teacher && <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => updateTaskClicked(store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].taskId)}
                          >
                            <EditIcon />
                          </Button>
                        )}
                        {teacher && (
                          teacher && <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => handleDelete(store.tasks[store.tasks.findIndex(t => t.taskId == taskId)].taskId)}
                          >
                            <DeleteIcon />
                          </Button>
                  )}
            </CardContent>
        </Card>
      </ListItem>
      }
      {popup.show && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Alert</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this Task?
                <br />
                {store.tasks.find((task) => task.taskId == popup.id).surahName}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={deleteTask} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {
openCompleteTask &&
      <CompleteTask
        setOpen={setOpenCompleteTask}
        task_id={taskId}
      />
        }
      {
        openUpdateTask.is &&
        <UpdateTask
        task_id={openUpdateTask.taskId}
        setOpen={setOpenUpdateTask}
      />
    }
    </>
  );
}
