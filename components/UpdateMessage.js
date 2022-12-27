"use client"

import React, { useState, useEffect } from "react";
import { Button, Box, Modal, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {useStore} from  "../store/HalaqatStore"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function UpdateMessage({setOpen, message_id}){
    const handleClose = () => setOpen(false);
    const [messageTitle, setMessageTitle] = useState("");
    // const [postedAt, setPostedAt] = useState(new Date());
    const [message, setMessage] = useState("");
    const store = useStore()

    useEffect(()=>{
      console.log(message_id)
        const requiredIndex = store.messages.findIndex(mess => mess.messageId == message_id)
        console.log(requiredIndex)
        setMessageTitle(store.messages[requiredIndex].title)
        setMessage(store.messages[requiredIndex].message)
        store.setMessages()
    },[])

    async function submitForm() {
        const date = new Date()
        let messageData = {
          messageId: message_id,
          title: messageTitle,
          postedAt:`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
          message:message,
        };
        const response = await fetch("/api/MessageList", {
          method: "PUT",
          body: JSON.stringify({
            messageData,
          }),
        })
        store.setMessages()
        console.log(store.messages);
        handleClose();
        
      }
    


    return(
<div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ color: "#361874" }}>Add Message</h1>
          <br />
          <TextField
            placeholder="Message Title"
            style={{
              marginBottom: 12,
            }}
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
          />
          <br />

          <TextField
            multiline
            rows={focus ? 3 : 1}
            placeholder="Message"
            style={{
              marginBottom: 12,
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={submitForm}>Update Message</Button>
        </Box>
      </Modal>
    </div>
    )
}