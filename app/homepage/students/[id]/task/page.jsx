"use client";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useHalaqatContext } from "../../../../../context/HalaqatContext.js";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image.js";
import { useStore } from "../../../../../store/HalaqatStore";
import CompleteTask from "../../../../../components/CompleteTask.js";
import UpdateTask from "../../../../../components/UpdateTask.js";

export default function TasksScreen({ params }) {
  //   return (
  //     <>
  //       <p>Task screen</p>
  //     </>
  //   );
  const { id } = params;
  const store = useStore();
  // const { loggedIn, setUpdatingTask, setJsonUpdated } = useHalaqatContext();
  const [popup, setPopup] = useState({ show: false, id: null });
  const [tasks, setTasks] = useState([]);
  const [coordinator, setCoordinator] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [parent, setParent] = useState(false);
  const router = useRouter();

  const [openCompleteTask, setOpenCompleteTask] = useState(false);
  const [openUpdateTask, setOpenUpdateTask] = useState({is: false, taskId: null});

  const getTasks = async (sId) => {
    let tasksResponse = await fetch(
      `http://localhost:3000/api/StudentTask?studentId=${sId}`
    ).then((response) => response.json());
    setTasks(tasksResponse);
  };

  useEffect(() => {
    getTasks(id);
  }, []);   

  useEffect(() => {
    if (store.loggedIn.obj != null) {
      if (store.loggedIn.role === "coordinator") {
        setCoordinator(true);
      } else if (store.loggedIn.role === "teacher") {
        setTeacher(true);
      } else {
        setParent(true);
      }
    } else {
      router.push("/");
    }
  },[]);

  function handleClose() {
    setPopup({ show: false, id: null });
  }

  function handleDelete(taskId) {
    setPopup({ show: true, id: taskId });
  }

  async function deleteTask() {
    const taskId = popup.id;
    const response = await fetch("http://localhost:3000/api/StudentTask", {
      method: "DELETE",
      body: JSON.stringify({
        taskId,
        studentId: id,
      }),
    });
    // setJsonUpdated(true);
    setPopup({ show: false, id: null });
    getTasks();
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
    <Stack
      direction="row"
      display="flex"
      justifyContent="start"
      alignItems="end"
      sx={{
        height: "100vh",
        minWidth: "90%",
        margin: "0px",
        backgroundColor: "transparent",
      }}
    >
      <Stack
        direction="column"
        display="flex"
        justifyContent="start"
        alignItems="top"
        sx={{
          height: "100vh",
          minWidth: "120vh",
          margin: "0px",
          backgroundColor: "transparent",
        }}
      >
        <h1 style={{ color: "#361874" }}>Tasks</h1>
        <div style={{ overflowY: "scroll", width: "90%", margin: "0px" }}>
          {tasks.length === 0 ? (
            <h4>No Tasks added</h4>
          ) : (
            tasks
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.dueDate)) -
                  Number(new Date(objA.dueDate))
              )
              .map((task) => (
                <Card
                  key={task.taskId}
                  sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h7">
                      Task {task.taskId}:
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      Student Id: {task.surahId}
                      <br />
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.surahName}
                    </Typography>
                    <Typography variant="h7">{task.fromAya}</Typography>
                    <br />

                    <Typography variant="h7">
                      {task.type}
                      <br />
                    </Typography>
                    <br />

                    <Typography variant="h7">
                      Date: {new Date(task.dueDate).toDateString()}
                    </Typography>
                    <br />
                    <Typography variant="h7">{task.masteryLevel}</Typography>
                  </CardContent>
                  {teacher && (
                    <CardActions>
                      <Stack
                        direction="row"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => setOpenCompleteTask(true)}
                          >
                            Complete Task
                          </Button>
                        )}
                        {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => updateTaskClicked(task.taskId)}
                          >
                            <EditIcon />
                          </Button>
                        )}
                        {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => handleDelete(task.taskId)}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                  )}
                </Card>
              ))
          )}
        </div>
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
                {tasks.find((task) => task.taskId == popup.id).surahName}
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
      </Stack>
      <CompleteTask
        open={openCompleteTask}
        // setOpen={setOpenCompleteTask}
        studentId={id}
      />
      <UpdateTask
        open={openUpdateTask.is}
        studentId={id}
        task_id={openUpdateTask.taskId}
      />
    </Stack>
  );
}


        // setOpen={setOpenUpdateTask.is}
