"use client";

import { Button, Input, Stack, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHalaqatContext } from "../../../../context/HalaqatContext";
import {useStore} from "../../../../store/HalaqatStore"

export default function AddTaskPage() {
  // const { getMessages } = useHalaqatContext();
  const store = useStore()
  const router = useRouter();

  const [messageId, setMessageId] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [postedAt, setPostedAt] = useState("");
  const [message, setMessage] = useState("");

  async function submitForm() {
    let messageData = {
      id: messageId,
      title: messageTitle,
      postedAt,
      message,
    };
    const response = await fetch("/api/MessageList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageData,
      }),
    }).then((t) => t.json());
    store.setMessages();
    router.push("/homepage/messages");
  }

  return (
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
      <h1 style={{ color: "#361874" }}>Add Message</h1>
      <TextField
        placeholder="Message Id"
        style={{
          marginBottom: 12,
        }}
        value={messageId}
        onChange={(e) => setMessageId(e.target.value)}
      />
      <TextField
        placeholder="Message Title"
        style={{
          marginBottom: 12,
        }}
        value={messageTitle}
        onChange={(e) => setMessageTitle(e.target.value)}
      />
      <TextField
        placeholder="Message"
        style={{
          marginBottom: 12,
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div
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
      </div>
      <Button onClick={submitForm}>Add Message</Button>
    </Stack>
  );
}
