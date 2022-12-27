// "use client";

// import { Button, Input, Stack, TextField } from "@mui/material";
// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useHalaqatContext } from "../../../../context/HalaqatContext";
// import {useStore} from "../../../../store/HalaqatStore"

// export default function AddTaskPage() {
//   const router = useRouter();
//   // const { getTasks } = useHalaqatContext();
//   const [taskId, setTaskId] = useState("");
//   const [surahId, setSurahId] = useState("");
//   const [surahName, setSurahName] = useState("");
//   const [fromAya, setFromAya] = useState("");
//   const [type, setType] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [masteryLevel, setMasteryLevel] = useState("");
//   const store = useStore()

//   async function submitForm() {
//     let task = {
//       taskId: taskId,
//       surahId: surahId,
//       surahName:surahName,
//       fromAya:fromAya,
//       type,
//       dueDate,
//       masteryLevel,
//     };
//     const response = await fetch("/api/TaskList", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         task,
//       }),
//     }).then((t) => t.json());
//     store.setTasks();
//     router.push("/homepage/tasks");
//   }

//   return (
//     <Stack
//       direction="column"
//       display="flex"
//       justifyContent="start"
//       alignItems="top"
//       sx={{
//         height: "100vh",
//         minWidth: "120vh",
//         margin: "0px",
//         backgroundColor: "transparent",
//       }}
//     >
//       <h1 style={{ color: "#361874" }}>Add Task</h1>
//       <TextField
//         placeholder="Task Id"
//         style={{
//           marginBottom: 12,
//         }}
//         value={taskId}
//         onChange={(e) => setTaskId(e.target.value)}
//       />
//       <TextField
//         placeholder="Surah Id"
//         style={{
//           marginBottom: 12,
//         }}
//         value={surahId}
//         onChange={(e) => setSurahId(e.target.value)}
//       />
//       <TextField
//         placeholder="Surah Name"
//         style={{
//           marginBottom: 12,
//         }}
//         value={surahName}
//         onChange={(e) => setSurahName(e.target.value)}
//       />
//       <TextField
//         placeholder="From Aya"
//         style={{
//           marginBottom: 12,
//         }}
//         value={fromAya}
//         onChange={(e) => setFromAya(e.target.value)}
//       />
//       <TextField
//         placeholder="Type"
//         style={{
//           marginBottom: 12,
//         }}
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//       />
//       <div
//         style={{
//           marginBottom: 12,
//           width: "100%",
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateTimePicker
//             renderInput={(props) => <TextField {...props} />}
//             label="Due Date"
//             value={dueDate}
//             onChange={(newValue) => {
//               setDueDate(newValue);
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//       <TextField
//         style={{
//           marginBottom: 12,
//         }}
//         placeholder="Mastery Level"
//         value={masteryLevel}
//         onChange={(e) => setMasteryLevel(e.target.value)}
//       />
//       <Button onClick={submitForm}>Add Task</Button>
//     </Stack>
//   );
// }
