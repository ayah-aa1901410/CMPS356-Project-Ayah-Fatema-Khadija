"use client"
import {useRouter} from "next/navigation"
import { Stack } from "@mui/material"
import { Card } from "@mui/material";
import {CardContent} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import {Box} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TaskView from "../../../../components/TaskView.js";
import {useStore} from "../../../../store/HalaqatStore.js"
import MessageIcon from '@mui/icons-material/Message';
import MessageView from "../../../../components/MessageView.js"

export default function HalaqaPage(props){
    const router = useRouter()
    // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, setUpdatingStudent } = useHalaqatContext();
    const store = useStore()
    const [coordinator, setCoordinator] = useState(false)
    const [teacher, setTeacher] = useState(false)
    const [parent, setParent] = useState(false)
    const [openTasks, setOpenTasks] = useState({is: false, id: 0})
    const [openMessages, setOpenMessages] = useState({is: false, id: 0})
    const [localStorageResponse, setLocalStorageResponse] = useState(null)
    let parentIndex = -1
    let studentIndex = -1
    
    let studs = []
    store.students.map(parent => 
        parent.students.map(student=> studs.push(student)))

    const halaqa = props.params?.halaqa
    
    const localStudents = studs.filter(stud => stud.teacherId == parseInt(store.currentHalaqa))
    
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('response')).token !== null){
          if(JSON.parse(localStorage.getItem('response')).role === "coordinator"){
              setCoordinator(true)
          }else if(JSON.parse(localStorage.getItem('response')).role === "teacher"){
              setTeacher(true)
          }else{
              setParent(true)
          }
        //   setJsonUpdated(true)
          setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))
      }else{
        router.push('/')
      }

      if(halaqa){
        store.setCurrentHalaqa(halaqa)
      }
      console.log(store.currentHalaqa);
    }, [])

    function addStudent(){
        router.push('/homepage/students/addStudent')
        store.setNewStudentHalaqa(store.currentHalaqa)
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
            isActive: store.students[parentIndex].students[studentIndex].isActive
        }
        store.setUpdatingStudent(updStudent)
    }

    function goBack(){
        router.back(-1)
    }

    function openStudentTasks(studentId){
        setOpenTasks({is: true, id: studentId})
    }

    const handleCloseTasks = () => {
        setOpenTasks({is: false, id: 0});
    };

    function openStudentMessages(studentId){
        setOpenMessages({is: true, id: studentId})
    }

    const handleCloseMessages = () => {
        setOpenMessages({is: false, id: 0});
    };

    return(
        <div style={{height:"100%", width: "90%"}}>
            <Stack direction="row" display="flex" justifyContent="start" alignItems="end" sx={{width: "90%", height: "100%", backgroundColor: "transparent", marginLeft: "3%"}}>
                <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{height: "100%", width: "100%", margin: "0px", backgroundColor: "transparent"}}>
                    <Stack direction="row" display="flex" justifyContent="start" alignItems="top" sx={{width: "100%", backgroundColor: "transparent"}}>
                        <Button variant="text" size="large" sx={{color: "black", borderRadius: "70px", height: "60px", width: "60px", margin: "3%"}} onClick={goBack} ><ArrowBackIosIcon /></Button>
                            <h1>{store.teachers.find(teach => teach.staffNo == (halaqa?halaqa:parseInt(store.currentHalaqa))).halaqa}</h1>
                    </Stack>
                    <div style={{overflowY: 'scroll', width: "100%", height: "700px"}}>
                    {
                        localStudents.map(student => 
                            <Card key={student.studentId} sx={{borderRadius: "15px", margin: "10px", width: "90%"}}>
                                <CardContent key={student.studentId}>
                                    <Stack  direction="row" display="flex" justifyContent="space-between" alignItems="center" key={student.studentId}>
                                        <Typography component="div" key={student.studentId}>
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
                                                        <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: 400, minHeight: 200, backgroundColor: "white", border: "1px solid lightgray", borderRadius: "15px", boxShadow: "2px 2px 2px grey", margin: "auto", p: 4,}}>
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
                            </Card>)
                    }
                    </div>
                </Stack>
                {
                    coordinator && <Button variant="text" size="large" sx={{backgroundColor:"white", borderRadius: "70px", height: "60px",boxShadow: "3px 3px 3px grey", width: "60px", margin: "40px"}} onClick={addStudent} ><AddIcon /></Button>
                }
            </Stack>
        </div>
    )
}