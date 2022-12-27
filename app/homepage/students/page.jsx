"use client"
import { Stack, Box } from "@mui/system";
import Button from '@mui/material/Button'

import List from '@mui/material/List';
import Link from "next/navigation"
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useHalaqatContext } from "../../../context/HalaqatContext.js";
import { useEffect, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase'
import {useRouter} from "next/navigation"
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import TaskView from "../../../components/TaskView.js";
import MessageView from "../../../components/MessageView.js"
import {useStore} from '../../../store/HalaqatStore.js'
import MessageIcon from '@mui/icons-material/Message';

export default function StudentsPage(){

    const router= useRouter()
    // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, newStudentHalaqa, setNewStudentHalaqa, setUpdatingStudent, setJsonUpdated} = useHalaqatContext();
    const store = useStore()
    let studentsOnly = []
    store.students?.map(parent => 
        parent.students.forEach(student=>studentsOnly.push(student)))
    const [query, setQuery] = useState("")
    const [coordinator, setCoordinator] = useState(false)
    const [teacher, setTeacher] = useState(false)
    const [parent, setParent] = useState(false)
    const [openTasks, setOpenTasks] = useState({is: false, id: 0})
    const [openMessages, setOpenMessages] = useState({is: false, id: 0})
    const [filteredStudents, setFilteredStudents] = useState(studentsOnly)
    const [localStorageResponse, setLocalStorageResponse] = useState(null)
    let parentIndex = -1
    let studentIndex = -1

    

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('response')).token != null){
          if(JSON.parse(localStorage.getItem('response')).role === "coordinator"){
              setCoordinator(true)
          }else if(JSON.parse(localStorage.getItem('response')).role === "teacher"){
              setTeacher(true)
          }else{
              setParent(true)
          }
          setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))

      }else{
        router.push('/')
      }
    },[])

    function filter(e){
        setQuery(e.target.value)
        setFilteredStudents(studentsOnly?.filter(stud => stud.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || stud.lastName.toLowerCase().includes(e.target.value.toLowerCase()) || stud.studentId == e.target.value ))
    }

    function addStudent(){
        router.push('/homepage/students/addStudent')
    }

    function updateStudent(studentId){
        router.push('/homepage/students/updateStudent')
        for (var i = 0; i<store.students.length; i++ ){
            const exists = store.students[i].students.findIndex(stud => stud.studentId == studentId)
            if(exists != -1){
                parentIndex = i
                studentIndex = exists
                break;
            }
        }

        const updStudent = {
            qatariId: store.students[parentIndex].qatariId,
            parentFirstName: store.students[parentIndex].firstName,
            parentLastName: store.students[parentIndex].lastName, 
            mobile: store.students[parentIndex].mobile,
            email: store.students[parentIndex].email,
            studentId: store.students[parentIndex].students[studentIndex].studentId,
            studentFirstName: store.students[parentIndex].students[studentIndex].firstName,
            studentLastName: store.students[parentIndex].students[studentIndex].lastName,
            date: store.students[parentIndex].students[studentIndex].dob,
            gender: store.students[parentIndex].students[studentIndex].gender,
            schoolGrade: store.students[parentIndex].students[studentIndex].schoolGrade,
            teacherId: store.students[parentIndex].students[studentIndex].teacherId,
            isActive: store.students[parentIndex].students[studentIndex].isActive,
            password: store.students[parentIndex].password
        }
        store.setUpdatingStudent(updStudent)
        parentIndex = -1
        studentIndex = -1
    }

    function openStudentMessages(studentId){
        setOpenMessages({is: true, id: studentId})
    }

    function openStudentTasks(studentId){
        setOpenTasks({is: true, id: studentId})
    }

    const handleCloseTasks = () => {
        setOpenTasks({is: false, id: 0});
    };

    const handleCloseMessages = () => {
        setOpenMessages({is: false, id: 0});
    };

    return (
        <div style={{height: "90%", width: "90%"}}>
        {
            store.loggedIn?.obj !== null && <Stack direction="row" display="flex" justifyContent="space-between" alignItems="end" sx={{ backgroundColor: "transparent", marginLeft: "3%", width: "100%"}}>
                        <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{width: "90%"}}>
                            <h1 style={{color: "#361874"}}>Students List</h1>
                            <fieldset aria-hidden="true" style={{width:"50%",margin: "0", color: "transparent", borderColor: "transparent"}} >
                                <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", boxShadow: "5px 5x 5px grey", borderRadius: "15px"}}>
                                    <IconButton color="primary"  sx={{ p: "10px" }} aria-label="directions" disabled >
                                        <SearchIcon />
                                    </IconButton>
                                    <InputBase style={{height: "10%", outline: "none", outlineColor: "white",}} label="Search" type="search" autoFocus sx={{backgroundColor: "white", width: "100%"}} value={query} onChange={filter} />
                                    <legend style={{borderRadius: "10px", color: "grey",display: "block",visibility: "hidden", height: "11px", dataLpignore: "true"}}>
                                        <span style={{ color: "grey" }}>
                                            Search
                                        </span>
                                    </legend>
                                </Paper>
                            </fieldset>
                            <div style={{overflowY: 'scroll', height: "620px", width: "80%", marginTop:"2%", marginBottom: "2%"}}>

                                    {
                                        filteredStudents?.map(student=>(
                                            <Card key={student.studentId} sx={{borderRadius: "15px", margin: "2%"}}>
                                                <CardContent key={student.studentId}>
                                                    <Stack  direction="row" display="flex" justifyContent="space-between" alignItems="center">
                                                        <Typography component="div">
                                                            {student.firstName+" "+student.lastName}
                                                        </Typography>
                                                        <Stack  direction="row" display="flex" justifyContent="space-between" alignItems="center">
                                                            {
                                                                coordinator && <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=> updateStudent(student.studentId)} ><EditIcon /></Button>
                                                            }
                                                            {
                                                                coordinator && 
                                                                <div>
                                                                    <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=> openStudentTasks(student.studentId)} ><TaskIcon /></Button>
                                                                    <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=>openStudentMessages(student.studentId)}><MessageIcon /></Button>
                                                                    <Modal
                                                                        hideBackdrop
                                                                        open={openTasks.is}
                                                                        onClose={()=> {handleCloseTasks}}
                                                                        aria-labelledby="child-modal-title"
                                                                        aria-describedby="child-modal-description"
                                                                    >
                                                                        <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: 400, minHeight: 200, backgroundColor: "white", border: "1px solid lightgray", borderRadius: "15px", boxShadow: "2px 2px 2px grey", margin: "auto", p: 4, }}>
                                                                            <Stack direction="column" justifyContent="space-between" alignItems="center">
                                                                                <h2>Tasks</h2>
                                                                                <List sx={{pt: 0}}>
                                                                                {
                                                                                    store.tasks.filter(task => task.studentId === openTasks.id).length !== 0 ? store.tasks.filter(task => task.studentId === openTasks.id).map(task => <TaskView key={task.taskId} taskId={task.taskId}></TaskView>) : <h3>No Tasks</h3>
                                                                                }
                                                                                </List>
                                                                                <Button onClick={handleCloseTasks} sx={{color: "black", outlineColor: "lightGrey", borderRadius: "10px"}} variant="outlined">OK</Button>
                                                                            </Stack>
                                                                        </Box>
                                                                    </Modal>
                                                                    <Modal
                                                                        hideBackdrop
                                                                        open={openMessages.is}
                                                                        onClose={()=> {handleCloseMessages}}
                                                                        aria-labelledby="child-modal-title"
                                                                        aria-describedby="child-modal-description"
                                                                    >
                                                                        <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: 400, minHeight: 200, backgroundColor: "white", border: "1px solid lightgray", borderRadius: "15px", boxShadow: "2px 2px 2px grey", margin: "auto", p: 4, }}>
                                                                            <Stack direction="column" justifyContent="space-between" alignItems="center">
                                                                                <h2>Messages</h2>
                                                                                <List sx={{pt: 0}}>
                                                                                {
                                                                                    store.messages.filter(message => message.studentId === openMessages.id).length !== 0 ? store.messages.filter(message => message.studentId === openMessages.id).map(message => <MessageView key={message.messageId} messageId={message.messageId}></MessageView>) : <h3>No Messages</h3>
                                                                                }
                                                                                </List>
                                                                                <Button onClick={handleCloseMessages} sx={{color: "black", outlineColor: "lightGrey", borderRadius: "10px"}} variant="outlined">OK</Button>
                                                                            </Stack>
                                                                        </Box>
                                                                    </Modal>
                                                                </div>
                                                            }
                                                        </Stack>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                            ))
                                        // )  
                                    }
                        </div>
                        </Stack>
                        {
                            coordinator && <Button variant="text" size="large" sx={{backgroundColor:"white", borderRadius: "70px", height: "60px",boxShadow: "3px 3px 3px grey", width: "60px", margin: "3%"}} onClick={addStudent} ><AddIcon /></Button>
                        }
                    </Stack>
        }
        </div>
    )
}                                                                                               