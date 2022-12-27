"use client"
import { Stack, Box } from "@mui/material";
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useHalaqatContext } from "../../../context/HalaqatContext.js";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { CardActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from "next/image.js";
import { TextField } from "@mui/material";
import { useStore } from "../../../store/HalaqatStore"
import GetParentTasks from "../../../components/ParentTasks"

export default function TasksScreen() {
  //   return (
  //     <>
  //       <p>Task screen</p>
  //     </>
  //   );
  // const { tasks, loggedIn, setUpdatingTask, setJsonUpdated, getTasks } =
  // useHalaqatContext();
  const store = useStore()
  const [popup, setPopup] = useState({ show: false, id: null });
  const [coordinator, setCoordinator] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [parent, setParent] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: new Date().setMonth(new Date().getMonth() - 1), end: new Date() })

  const router = useRouter();
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
  });

  

  const matchedTasks = GetParentTasks(store.loggedIn.obj.students)
  console.log(matchedTasks);


  function handleClose() {
    setPopup({ show: false, id: null });
  }

  // function addTask() {
  //   router.push("/homepage/tasks/addTask");
  // }

  // function updateTask(taskId) {
  //   router.push("/homepage/tasks/updateTask");
  //   const requiredtask = store.tasks.find((task) => task.taskId == taskId);
  //   const upTask = {
  //     taskId: taskId,
  //     studentId: requiredtask.studentId,
  //     surahId: requiredtask.surahId,
  //     surahName: requiredtask.surahName,
  //     fromAya: requiredtask.fromAya,
  //     toAya: requiredtask.toAya,
  //     type: requiredtask.type,
  //     dueDate: requiredtask.dueDate,
  //     completedDate: requiredtask.completedDate,
  //     masteryLevel: requiredtask.masteryLevel,
  //     comment: requiredtask.comment,
  //   };
  //   store.setUpdatingTask(upTask);
  // }
  // function handleDelete(taskId) {
  //   setPopup({ show: true, id: taskId });
  // }

  async function deleteTask() {
    const taskId = popup.id;
    const response = await fetch("http://localhost:3000/api/TaskList", {
      method: "DELETE",
      body: JSON.stringify({
        taskId,
      }),
    });
    // setJsonUpdated(true);
    setPopup({ show: false, id: null });
    store.setTasks();
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

        <Stack direction="row" display="flex" justifyContent="start" alignItems="top">
          <FormControl fullWidth sx={{ margin: "10px", width: "250px", backgroundColor: "white" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}>
              <DatePicker
                required
                label="Start Date"
                value={dateFilter.start}
                sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
                onChange={(newValue) => {
                  setDateFilter((prev) => ({ ...prev, start: newValue }))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "10px", width: "250px", backgroundColor: "white" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}>
              <DatePicker
                required
                label="End Date"
                value={dateFilter.end}
                sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
                onChange={(newValue) => {
                  setDateFilter((prev) => ({ ...prev, end: newValue }))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Stack>

        <div style={{ overflowY: "scroll", width: "90%", margin: "0px" }}>
          {teacher && store.tasks &&
            store.tasks
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.date)) - Number(new Date(objA.date))
          ).filter(task => {
            let filterPass = true
            const date = new Date(task.dueDate)
            if (dateFilter.start) {
              filterPass = filterPass && (new Date(dateFilter.start) < date)
            }
            if (dateFilter.end) {
              filterPass = filterPass && (new Date(dateFilter.end) > date)
            }
            return filterPass
          })
              .map((task) => (
                <Card
                  key={task.taskId}
                  sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.surahName}
                    </Typography>
                    <Typography variant="h7">
                      From: {task.fromAya}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      To: {task.toAya}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.type}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      Date: {new Date(task.dueDate).toDateString()}
                    </Typography>
                    {task.completedDate && <div><Typography variant="h7">
                      {task.masteryLevel}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.comment}
                      <br />
                    </Typography></div>}
                  </CardContent>
                  {teacher && (
                    <CardActions>
                      <Stack
                        direction="row"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {/* {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => updateTask(task.taskId)}
                          >
                            <EditIcon />
                          </Button>
                        )} */}
                        {/* {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => handleDelete(task.taskId)}
                          >
                            <DeleteIcon />
                          </Button>
                        )} */}
                      </Stack>
                    </CardActions>
                  )}
                </Card>
              ))}
              
          {parent && matchedTasks &&
            matchedTasks
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.date)) - Number(new Date(objA.date))
          ).filter(task => {
            let filterPass = true
            const date = new Date(task.dueDate)
            if (dateFilter.start) {
              filterPass = filterPass && (new Date(dateFilter.start) < date)
            }
            if (dateFilter.end) {
              filterPass = filterPass && (new Date(dateFilter.end) > date)
            }
            return filterPass
          })
              .map((task) => (
                <Card
                  key={task.taskId}
                  sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent>
                    <Typography variant="h7">
                      Task {task.taskId}:
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      Student Id: {task.studentId}
                      <br />
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.surahName}
                    </Typography>
                    <Typography variant="h7">
                      {task.fromAya}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.type}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      Date: {new Date(task.dueDate).toDateString()}
                    </Typography>
                    <Typography variant="h7">
                      {task.masteryLevel}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.comment}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              ))}
        </div>
        {teacher && popup.show && (
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
      </Stack>
      {/* {(teacher) && (
        <Button
          variant="text"
          size="large"
          sx={{
            backgroundColor: "white",
            borderRadius: "70px",
            height: "60px",
            boxShadow: "3px 3px 3px grey",
            width: "60px",
            margin: "20px",
          }}
          onClick={addTask}
        >
          <AddIcon />
        </Button>
      )} */}
    </Stack>
  );
  // const { students, surahs, tasks, teachers, announcements, loggedIn, setLoggedIn, HalaqatList, updatingAnnouncement, setUpdatingAnnouncement, updatingTask, setUpdatingTask, setJsonUpdated } =
  //     useHalaqatContext();
  // const [popup, setPopup] = useState({ show: false, id: null, })
  // const [coordinator, setCoordinator] = useState(false)
  // const [teacher, setTeacher] = useState(false)
  // const [parent, setParent] = useState(false)
  // const router = useRouter()
  // useEffect(() => {
  //     if (loggedIn) {
  //         if (loggedIn.role === "coordinator") {
  //             setCoordinator(true)
  //         } else if (loggedIn.role === "teacher") {
  //             setTeacher(true)
  //         } else {
  //             setParent(true)
  //         }
  //     } else {
  //         router.push('/')
  //     }
  // })

  // function handleClose() {
  //     setPopup({ show: false, id: null })
  // }

  // function addTask() {
  //     router.push('/homepage/tasks/addTask')
  // }

  // function updateTask(taskId) {
  //     router.push('/homepage/tasks/updateTask')
  //     const requiredtask = tasks.find(task => task.taskId == taskId)
  //     const upTask = {
  //         taskId: taskId,
  //         studentId: requiredtask.studentId,
  //         surahId: requiredtask.surahId,
  //         surahName: requiredtask.surahName,
  //         fromAya: requiredtask.fromAya,
  //         toAya: requiredtask.toAya,
  //         type: requiredtask.type,
  //         dueDate: requiredtask.dueDate,
  //         completedDate: requiredtask.completedDate,
  //         masteryLevel: requiredtask.masteryLevel,
  //         comment: requiredtask.comment,
  //     }
  //     setUpdatingTask(upTask)
  // }
  // function handleDelete(taskId) {
  //     setPopup({ show: true, id: taskId })
  // }

  // async function deleteTask() {
  //     const taskId = popup.id
  //     const response = await fetch("http://localhost:3000/api/TaskList", {
  //         method: "DELETE", body: JSON.stringify({
  //             taskId
  //         })
  //     })
  //     setJsonUpdated(true)
  //     setPopup({ show: false, id: null })
  // }

  // return (
  //     <Stack direction="row" display="flex" justifyContent="start" alignItems="end" sx={{ height: "100vh", minWidth: "90%", margin: "0px", backgroundColor: "transparent" }}>
  //         <Stack direction="column" display="flex" justifyContent="start" alignItems="top" sx={{ height: "100vh", minWidth: "120vh", margin: "0px", backgroundColor: "transparent" }}>
  //             <h1 style={{ color: "#361874" }}>Tasks</h1>
  //             <div style={{ overflowY: "scroll", width: "90%", margin: "0px" }}>
  //                 {
  //                     tasks && tasks.sort(
  //                         (objA, objB) => Number(new Date(objB.date)) - Number(new Date(objA.date)),
  //                     ).map(task => (
  //                         <Card key={task.taskId} sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}>
  //                             <CardContent>
  //                                 <Typography variant="h7">
  //                                     {task.studentId}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.surahId}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
  //                                     {task.surahName}
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.fromAya}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.toAya}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.type}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     Date: {task.dueDate}
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     Date: {task.completedDate}
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.masteryLevel}
  //                                     <br />
  //                                 </Typography>
  //                                 <Typography variant="h7">
  //                                     {task.comment}
  //                                     <br />
  //                                 </Typography>

  //                             </CardContent>
  //                             {
  //                                 teacher &&
  //                                 <CardActions>
  //                                     <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
  //                                         {
  //                                             teacher && <Button variant="text" size="small" sx={{ borderRadius: "70px" }} onClick={() => updateTask(task.taskId)} ><EditIcon /></Button>
  //                                         }
  //                                         {
  //                                             teacher && <Button variant="text" size="small" sx={{ borderRadius: "70px" }} onClick={() => handleDelete(task.taskId)} ><DeleteIcon /></Button>
  //                                         }
  //                                     </Stack>
  //                                 </CardActions>
  //                             }
  //                         </Card>
  //                     ))
  //                 }
  //             </div>
  //             {popup.show && (
  //                 <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
  //                     <DialogTitle id="alert-dialog-title">
  //                         Delete Alert
  //                     </DialogTitle>
  //                     <DialogContent>
  //                         <DialogContentText id="alert-dialog-description">
  //                             Are you sure you want to delete this Task?
  //                             <br />
  //                             {tasks.find(task => task.taskId == popup.id).surahName}
  //                         </DialogContentText>
  //                     </DialogContent>
  //                     <DialogActions>
  //                         <Button onClick={handleClose}>Disagree</Button>
  //                         <Button onClick={deleteTask} autoFocus>
  //                             Agree
  //                         </Button>
  //                     </DialogActions>
  //                 </Dialog>
  //             )}
  //         </Stack>
  //         {
  //             coordinator && <Button variant="text" size="large" sx={{ backgroundColor: "white", borderRadius: "70px", height: "60px", boxShadow: "3px 3px 3px grey", width: "60px", margin: "20px" }} onClick={addTask} ><AddIcon /></Button>
  //         }
  //     </Stack>
  // )
}