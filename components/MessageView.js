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
import UpdateMessage from "./UpdateMessage.js"

export default function MessageView({messageId}) {
//   const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingStudent, setUpdatingStudent} = useHalaqatContext()  
  const [message, setMessage] = useState(null)
    const store= useStore()
    const [localStorageResponse, setLocalStorageResponse] = useState(null)
    const [coordinator, setCoordinator] = useState(false)
    const [popup, setPopup] = useState({ show: false, id: null });
    const [teacher, setTeacher] = useState(false)
    const [parent, setParent] = useState(false)
    const [openUpdateMessage, setOpenUpdateMessage] = useState({is: false, messageId: null});
  useEffect(()=>{
    setMessage(store.messages[store.messages.findIndex(m => m.messageId == messageId)])
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
    store.setMessages()
  },[])
  

  function handleClose() {
    setPopup({ show: false, id: null });
  }

  function handleDelete(messageId) {
    setPopup({ show: true, id: messageId });
  }

  async function deleteMessage() {
    const response = await fetch("/api/MessageList", {
      method: "DELETE",
      body: JSON.stringify({
        messageId
      }),
    });
    setPopup({ show: false, id: null });
    store.setMessages()
  }

    return (
    <>
      {
        message && <ListItem key={messageId}>
        <Card key={messageId} sx={{minWidth: "600px", margin: "10px", borderRadius: "15px"}}>
            <CardContent>
                <Typography>
                    Title: {message.title}
                </Typography>
                <Typography>
                    Message: {message.message}
                </Typography>
                <Typography>
                    Sent on: {message.postedAt.split("T")[0]}
                </Typography>
                {teacher && (
                  teacher && <Button
                    variant="text"
                    size="small"
                    sx={{ borderRadius: "70px" }}
                    onClick={() => setOpenUpdateMessage({is: true, messageId: message.messageId})}
                  >
                    <EditIcon />
                  </Button>
                )}
                {teacher && (
                  teacher && <Button
                    variant="text"
                    size="small"
                    sx={{ borderRadius: "70px" }}
                    onClick={() => handleDelete(message.messageId)}
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
                Are you sure you want to delete this Message?
                <br />
                {store.messages.find((mess) => mess.messageId == popup.id).title}
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
      {
        openUpdateMessage.is &&
        <UpdateMessage
        message_id={openUpdateMessage.messageId}
        setOpen={setOpenUpdateMessage}
      />
    }
    </>
  );
}
