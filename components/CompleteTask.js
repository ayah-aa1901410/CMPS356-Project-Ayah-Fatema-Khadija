import React, { useState } from "react";
import { Button, Box, Modal, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

const CompleteTask = ({  setOpen, task_id }) => {
  const handleClose = () => setOpen(false);
  const [hifzLevel, sethifzLevel] = useState("");
  const [comment, setComment] = useState("");
  const [completedDate, setCompletedDate] = useState(new Date());

  async function submitForm() {
    let taskData = {
      taskId: task_id,
      hifzLevel: hifzLevel,
      comment: comment,
      completedDate:completedDate,
    };
    // const response = await fetch("/api/StudentTask", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     taskData,
    //     studentId,
    //   }),
    // }).then((t) => t.json());
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
          <h1 style={{ color: "#361874" }}>Complete Task</h1>
          <br />
          <label>Hifz Level</label>
          <br />
          <select
            placeholder="Hifz Level"
            style={{
              marginBottom: 12,
            }}
            value={hifzLevel}
            onChange={(e) => sethifzLevel(e.target.value)}
          >
            <option>Excellent</option>
            <option>Okay</option>
            <option>Poor</option>
          </select>

          <br />
          <div
            style={{
              marginBottom: 12,
              width: "100%",
            }}
          >
            <label htmlFor="">Completed Date</label>
            <br />
            <input
              type="date"
              value={completedDate}
              onChange={(newValue) => {
                setCompletedDate(newValue);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Optional Comment</label>
            <br />
            <textarea
              value={comment}
              name="type"
              onChange={(e) => setComment(e.target.value)}
            />{" "}
          </div>

          <br />
          <Button onClick={submitForm}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CompleteTask;
