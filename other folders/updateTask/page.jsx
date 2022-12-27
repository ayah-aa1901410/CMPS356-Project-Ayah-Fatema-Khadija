// "use client"
// import { useEffect, useState } from "react"
// import { FormControl, Stack, TextField, Input, InputLabel } from "@mui/material"
// import { FormGroup, Button } from "@mui/material"
// import { useHalaqatContext } from "../../../../context/HalaqatContext"
// import { useRouter } from "next/navigation"
// import Image from "next/image"

// export default function UpdateTask() {
//     return <><p>UpdateTask Screen</p></>
//     // const [taskId, setTaskId] = useState(0)
//     // const [studentId, setStudentId] = useState(0)
//     // const [surahId, setSurahtId] = useState(0)
//     // const [surahName, setSurahName] = useState("")
//     // const [fromAya, setFromAya] = useState(0)
//     // const [toAya, setToAya] = useState(0)
//     // const [dueDate, setDueDate] = useState(null)
//     // const [completedDate, setCompletedDate] = useState(null)
//     // const [masteryLevel, setMasteryLevel] = useState(0)
//     // const [comment, setComment] = useState("")
//     // const router = useRouter()
//     // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingAnnouncement, setUpdatingAnnouncement, updatingTask, setUpdatingTask } = useHalaqatContext();
//     // const levels = ["Excellent work", "Good work", "Ok work", "Poor work"]
//     // const typs=["Memorization,Revision"]
//     // useEffect(() => {
//     //     setTaskId(updatingTask.taskId)
//     //     setStudentId(updatingTask.studentId)
//     //     setSurahtId(updatingTask.surahId)
//     //     setSurahName(updatingTask.surahName)
//     //     setFromAya(updatingTask.fromAya)
//     //     setToAya(updatingTask.toAya)
//     //     setDueDate(updatingTask.dueDate)
//     //     setCompletedDate(updatingTask.completedDate)
//     //     setMasteryLevel(updatingTask.masteryLevel)
//     //     setComment(updatingTask.comment)
//     // }, [])

//     // function backToTasks() {
//     //     router.back(-1)
//     // }

//     // async function handleSubmit() {
//     //     if (taskId == "" || studentId == "" || surahId == "" || surahName == "" || fromAya == "" || toAya == "" || dueDate == "" || completedDate == "" || masteryLevel == "") {
//     //         alert("Some fields are empty. Please fill all fields!")
//     //     } else {
//     //         const date = new Date()
//     //         const updTask = {
//     //             taskId: taskId,
//     //             studentId: studentId,
//     //             surahId: surahId,
//     //             surahName: surahName,
//     //             fromAya: fromAya,
//     //             toAya: toAya,
//     //             dueDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
//     //             completedDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
//     //             masteryLevel: masteryLevel,
//     //             comment: comment
//     //         }
//     //         const response = await fetch("http://localhost:3000/api/TaskList", {
//     //             method: "PUT", body: JSON.stringify({
//     //                 updTask
//     //             })
//     //         })
//     //         setJsonUpdated(true)
//     //         backToTasks()
//     //     }
//     // }

   

//     // return (
//     //     <div>
//     //         <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{ height: "100vh", width: "130vh", margin: "0px", backgroundColor: "transparent" }}>
//     //             <FormGroup>
//     //                     <FormControl fullWidth>
//     //                         <TextField required name="taskId" id="outlined-number" label="task Id" type="number" InputLabelProps={{ shrink: true, }} sx={{ margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }} value={taskId} disabled />
//     //                         <TextField required name="studentId" id="outlined-number" label="Student Id" type="number" InputLabelProps={{ shrink: true, }} sx={{ margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }} value={studentId} disabled />
//     //                         <Box sx={{ width: "250px", margin: "10px" }}>
//     //                             <FormControl fullWidth>
//     //                                 <InputLabel id="demo-simple-select-label">Task</InputLabel>
//     //                                 <Select
//     //                                     required
//     //                                     name='surahId'
//     //                                     label="surah Id"
//     //                                     value={surahId}
//     //                                     onChange={handleSurahIdChange}
//     //                                     sx={{ backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                 >
//     //                                     {
//     //                                         SurahList.map(surah => <MenuItem key={surah.id} value={surah.id}>{surah.id}</MenuItem>)
//     //                                     }
//     //                                 </Select>
//     //                             </FormControl>
//     //                         </Box>
                            
//     //                         <Box sx={{ width: "250px", margin: "10px" }}>
//     //                             <FormControl fullWidth>
//     //                                 <InputLabel id="demo-simple-select-label">Task</InputLabel>
//     //                                 <Select
//     //                                     required
//     //                                     name='surahName'
//     //                                     label="surah Name"
//     //                                     value={surahName}
//     //                                     onChange={handleSurahNameChange}
//     //                                     sx={{ backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                 >
//     //                                     {
//     //                                         SurahList.map(surah => <MenuItem key={surah.name} value={surah.name}>{surah.name}</MenuItem>)
//     //                                     }
//     //                                 </Select>
//     //                             </FormControl>
//     //                         </Box>
//     //                         <TextField required name="FromAya" id="outlined-number" label="Starting Aya" type="number" InputLabelProps={{ shrink: true, }} sx={{ margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }} value={fromAya} disabled />
//     //                         <TextField required name="ToAya" id="outlined-number" label="ending Aya" type="number" InputLabelProps={{ shrink: true, }} sx={{ margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }} value={toAya} disabled />
//     //                         <Box sx={{ width: "250px", margin: "10px" }}>
//     //                             <FormControl fullWidth>
//     //                                 <InputLabel id="demo-simple-select-label">Task</InputLabel>
//     //                                 <Select
//     //                                     required
//     //                                     name='type'
//     //                                     label="Type"
//     //                                     value={type}
//     //                                     onChange={handleTypeChange}
//     //                                     sx={{ backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                 >
//     //                                     {
//     //                                         types.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)
//     //                                     }
//     //                                 </Select>
//     //                             </FormControl>
//     //                         </Box>
                          
//     //                         <FormControl fullWidth sx={{ margin: "10px", width: "250px", backgroundColor: "white" }}>
//     //                             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}>
//     //                                 <DatePicker
//     //                                     required
//     //                                     label="Due Date"
//     //                                     value={dueDate}
//     //                                     sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                     onChange={(newValue) => {
//     //                                         setDate(newValue)
//     //                                     }}
//     //                                     renderInput={(params) => <TextField {...params} />}
//     //                                 />
//     //                             </LocalizationProvider>
//     //                         </FormControl>
//     //                         <FormControl fullWidth sx={{ margin: "10px", width: "250px", backgroundColor: "white" }}>
//     //                             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}>
//     //                                 <DatePicker
//     //                                     required
//     //                                     label="Completed Date"
//     //                                     value={completedDate}
//     //                                     sx={{ margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                     onChange={(newValue) => {
//     //                                         setDate(newValue)
//     //                                     }}
//     //                                     renderInput={(params) => <TextField {...params} />}
//     //                                 />
//     //                             </LocalizationProvider>
//     //                         </FormControl>
//     //                         <Box sx={{ width: "250px", margin: "10px" }}>
//     //                             <FormControl fullWidth>
//     //                                 <InputLabel id="demo-simple-select-label">Task</InputLabel>
//     //                                 <Select
//     //                                     required
//     //                                     name='masteryLevel'
//     //                                     label="mastery level"
//     //                                     value={mastryLevel}
//     //                                     onChange={handleMasteryLevelChange}
//     //                                     sx={{ backgroundColor: "white", boxShadow: "5px 5x 5px grey" }}
//     //                                 >
//     //                                     {
//     //                                         levels.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)
//     //                                     }
//     //                                 </Select>
//     //                             </FormControl>
//     //                         </Box>
//     //                         <TextField required name="comment" id="outlined-required" label="Comment" sx={{ margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey" }} onChange={(newValue) => {
//     //                             setComment(newValue.target.value);
//     //                         }} value={comment} />
                              
//     //                     </FormControl>
                   
//     //             </FormGroup>
//     //             <Stack direction="row" display="flex" justifyContent="start" alignItems="start" sx={{ height: "100vh", minWidth: "130vh", margin: "0px", backgroundColor: "transparent" }}>
//     //                 <Button onClick={backToStudents} sx={{ backgroundColor: "white", margin: "13px", color: "black", width: "100px" }}>
//     //                     Cancel
//     //                 </Button>
//     //                 <Button onClick={handleUpdate} sx={{ backgroundColor: "white", margin: "13px", color: "black", width: "100px" }}>
//     //                     Update
//     //                 </Button>
//     //             </Stack>
//     //         </Stack>
//     //     </div>
//     // )
// }