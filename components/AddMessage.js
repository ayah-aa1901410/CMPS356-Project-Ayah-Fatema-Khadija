"use client"
import React, { useState } from "react";
import { Button, Box, Modal, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {useStore} from "../store/HalaqatStore"

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

const AddMessage = ({ open, setOpen, studentId }) => {
  const handleClose = () => setOpen(false);
  // const [messageId, setMessageId] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  // const [postedAt, setPostedAt] = useState(new Date());
  const [message, setMessage] = useState("");
  const store = useStore()

  async function submitForm() {
    const date = new Date()
    let messageData = {
      // id: messageId,
      studentId: studentId,
      title: messageTitle,
      postedAt: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
      message:message,
    };
    const response = await fetch("/api/MessageList", {
      method: "POST",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify({
        messageData,
        studentId,
      }),
    }).then((t) => t.json());
    store.setMessages()
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ color: "#361874" }}>Add Message</h1>
          {/* <TextField
            placeholder="Message Id"
            style={{
              marginBottom: 12,
            }}
            value={messageId}
            onChange={(e) => setMessageId(e.target.value)}
          /> */}
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
          {/* <div
            style={{
              marginBottom: 12,
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Posted At"
                value={postedAt}
                onChange={(newValue) => {
                  setPostedAt(newValue);
                }}
              />
            </LocalizationProvider>
          </div> */}
          <Button onClick={submitForm}>Add Message</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMessage;
