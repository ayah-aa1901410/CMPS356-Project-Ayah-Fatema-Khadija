
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

const UpdateTask = ({ setOpen, task_id }) => {
  const handleClose = () => setOpen({is: false, taskId: null});
  const [taskId, setTaskId] = useState("");
  const [surahId, setSurahId] = useState(0);
  const [fromAya, setFromAya] = useState(1);
  const [toAya, setToAya] = useState(1);
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [RevisionChecked, setRevisionChecked] = useState(false)
  const [MemorizationChecked, setMemorizationChecked] = useState(false)
  const [endAyat, setEndAyat] = useState(2)
  const store = useStore()



  useEffect(()=>{
    const requiredTaskIndex = store.tasks.findIndex(task => task.taskId == task_id)
    setSurahId(store.tasks[requiredTaskIndex].surahId)
    setFromAya(store.tasks[requiredTaskIndex].fromAya)
    setToAya(store.tasks[requiredTaskIndex].toAya)
    setType(store.tasks[requiredTaskIndex].type)
    setDueDate(store.tasks[requiredTaskIndex].dueDate)
    const surah = store.surahs.find(sur=> sur.id == store.tasks[requiredTaskIndex].surahId)
    setEndAyat(surah.ayaCount)
    if(store.tasks[requiredTaskIndex].type == "Memorization"){
      setMemorizationChecked(true)
    }else{
      setRevisionChecked(true)
    }
  },[])

  function surahChanged(value){
    setSurahId(value)
    const surah = store.surahs.find(sur=> sur.id == value)
    setEndAyat(surah.ayaCount)
  }

  async function submitForm() {
    let taskData = {
      taskId: task_id,
      surahId: surahId,
      fromAya: fromAya,
      toAya: toAya, 
      type: type,
      dueDate: dueDate,
    };
    const response = await fetch("/api/TaskList", {
      method: "PUT",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify({
        taskData,
      }),
    })
    store.setTasks()
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
          <h1 style={{ color: "#361874" }}>Update Task</h1>
          {/* <TextField
            placeholder="Task Id"
            style={{
              marginBottom: 12,
            }}
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          /> */}
          <br />
          <label>Sura</label>
          <br />
          <select
            placeholder="Surah Id"
            style={{
              marginBottom: 12,
            }}
            value={surahId}
            onChange={(e) => surahChanged(e.target.value)}
          >
            {
                store.surahs.map( surah => <option key={surah.id} value={surah.id}>{surah.name}</option>)
            }
          </select>

          <br />
          <label htmlFor="">From Aya: {fromAya}</label>
          <br />
          <input
            min={1}
            max={endAyat}
            type="range"
            style={{
              marginBottom: 12,
            }}
            value={fromAya}
            onChange={(e) => setFromAya(e.target.value)}
          />
          <br />
          <label htmlFor="">To Aya: {toAya}</label>
          <br />
          <input
            min={1}
            max={endAyat}
            type="range"
            style={{
              marginBottom: 12,
            }}
            value={toAya}
            onChange={(e) => setToAya(e.target.value)}
          />
          <br />
          <div
            style={{
              marginBottom: 12,
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Due Date"
                value={dueDate}
                onChange={(newValue) => {
                  setDueDate(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              marginBottom: 12,
              width: "100%",
            }}
          >
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Completed Date"
                value={completedDate}
                onChange={(newValue) => {
                  setCompletedDate(newValue);
                }}
              />
            </LocalizationProvider> */}
          </div>
          <div>
            <label htmlFor="">Task Type</label>
            <input
              type="radio"
              value="Memorization"
              name="type"
              onChange={(e) => {
                setType(e.target.value)
                setMemorizationChecked(true)
                setRevisionChecked(false)
                }
              }
              checked={MemorizationChecked}
            />{" "}
            Memorization
            <input
              type="radio"
              name="type"
              value="Revision"
              onChange={(e) => {
                setType(e.target.value)
                setMemorizationChecked(false)
                setRevisionChecked(true)
                }
              }
              checked={RevisionChecked}
            />{" "}
            Revision
          </div>
          <br />
          <Button onClick={submitForm}>Update Task</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTask;
