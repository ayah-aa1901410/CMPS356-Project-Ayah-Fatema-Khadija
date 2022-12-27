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
import {useStore} from "../../../../../store/HalaqatStore"

export default function MessagesScreen({ params }) {
  // return (
  //   <>
  //     <p>Task screen</p>
  //   </>
  // );

  const { id } = params;

  // const { loggedIn, setJsonUpdated } = useHalaqatContext();
  const store = useStore()
  const [popup, setPopup] = useState({ show: false, id: null });
  const [messages, setMessages] = useState([]);
  const [coordinator, setCoordinator] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [parent, setParent] = useState(false);
  const router = useRouter();

  const getMessages = async (sId) => {
    console.log("sId", sId);
    let tasksResponse = await fetch(
      `http://localhost:3000/api/StudentMessage?studentId=${sId}`
    ).then((response) => response.json());
    setMessages(tasksResponse);
  };

  useEffect(() => {
    if (id) {
      getMessages(id);
    }
  }, []);

  useEffect(() => {
    if (store.loggedIn.obj !== null) {
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

  function handleDelete(messageId) {
    setPopup({ show: true, id: messageId });
  }

  async function deleteMessage() {
    const messageId = popup.id;
    const response = await fetch("http://localhost:3000/api/StudentMessage", {
      method: "DELETE",
      body: JSON.stringify({
        messageId,
        studentId: id,
      }),
    });
    // setJsonUpdated(true);
    setPopup({ show: false, id: null });
    getMessages();
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
        <h1 style={{ color: "#361874" }}>Messages</h1>
        <div style={{ overflowY: "scroll", width: "90%", margin: "0px" }}>
          {messages.length === 0 ? (
            <h4>No Messages added</h4>
          ) : (
            messages
              .sort(
                (objA, objB) =>
                  Number(new Date(objB.postedAt)) -
                  Number(new Date(objA.postedAt))
              )
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
                        {teacher && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ borderRadius: "70px" }}
                            onClick={() => handleDelete(message.id)}
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
    </Stack>
  );
}
