"use client";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useHalaqatContext } from "../../../context/HalaqatContext.js";
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
import FormControl from '@mui/material/FormControl';
import Image from "next/image.js";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";
import { useStore } from "../../../store/HalaqatStore"
import GetParentMessages from "../../../components/ParentMessages"

export default function MessagesScreen() {
  // return (
  //   <>
  //     <p>Task screen</p>
  //   </>
  // );

  // const {
  //   students,
  //   surahs,
  //   messages,
  //   teachers,
  //   announcements,
  //   loggedIn,
  //   setLoggedIn,
  //   getMessages,
  //   setUpdatingTask,
  //   setJsonUpdated,
  // } = useHalaqatContext();

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

  const matchedMessages = GetParentMessages(store.loggedIn.obj.students)
  console.log(matchedMessages);


  function handleClose() {
    setPopup({ show: false, id: null });
  }

  // function addTask() {
  //   router.push("/homepage/messages/addMessage");
  // }

  // function updateTask(taskId) {
  //   router.push("/homepage/messages/updateTask");
  //   const requiredtask = store.messages.find((task) => task.taskId == taskId);
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
  // function handleDelete(messageId) {
  //   setPopup({ show: true, id: messageId });
  // }

  // async function deleteMessage() {
  //   const messageId = popup.id;
  //   const response = await fetch("http://localhost:3000/api/MessageList", {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       messageId,
  //     }),
  //   });
  //   // setJsonUpdated(true);
  //   setPopup({ show: false, id: null });
  //   store.setMessages();
  // }

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
        <h1 style={{ color: "#361874" }}>Messages</h1>

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
          {teacher && store.messages &&
            store.messages
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.date)) - Number(new Date(objA.date)))
              .filter(message => {
                let filterPass = true
                const date = new Date(message.postedAt)
                if (dateFilter.start) {
                  filterPass = filterPass && (new Date(dateFilter.start) < date)
                }
                if (dateFilter.end) {
                  filterPass = filterPass && (new Date(dateFilter.end) > date)
                }
                return filterPass
              })
              .map((message) => (
                <Card
                  key={message.id}
                  sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h7">
                        {new Date(message.postedAt).toDateString()}
                        <br />
                      </Typography>
                    </div>
                    <Typography variant="h6">
                      Message Title: {message.title}
                      <br />
                    </Typography>
                    <Typography variant="h7">{message.message}</Typography>
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
                            // onClick={() => updateTask(task.taskId)}
                          >
                            <EditIcon />
                          </Button>
                        )} */}
                        {/* {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => handleDelete(message.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        )} */}
                      </Stack>
                    </CardActions>
                  )}
                </Card>
              ))}
          {parent && matchedMessages &&
            matchedMessages
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.date)) - Number(new Date(objA.date))
              ).filter(message => {
                let filterPass = true
                const date = new Date(message.postedAt)
                if (dateFilter.start) {
                  filterPass = filterPass && (new Date(dateFilter.start) < date)
                }
                if (dateFilter.end) {
                  filterPass = filterPass && (new Date(dateFilter.end) > date)
                }
                return filterPass
              })
              .map((message) => (
                <Card
                  key={message.id}
                  sx={{ maxWidth: "80%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        Message Id: {message.id}
                        <br />
                      </Typography>
                      <Typography variant="h6">
                        {new Date(message.postedAt).toDateString()}
                        <br />
                      </Typography>
                    </div>
                    <Typography variant="h5">
                      Message Title: {message.title}
                      <br />
                    </Typography>
                    <Typography variant="h7">{message.message}</Typography>
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
                {/* {tasks.find((task) => task.taskId == popup.id).surahName} */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={deleteMessage} autoFocus>
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
}
