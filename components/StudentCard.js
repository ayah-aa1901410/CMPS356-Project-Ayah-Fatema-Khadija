"use client"
import { useState, useEffect } from "react"
import { Stack, Box } from "@mui/system";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useRouter } from "next/navigation"
import Button from '@mui/material/Button'
import List from '@mui/material/List';
import Modal from '@mui/material/Modal'
import TaskView from "./TaskView.js"
import MessageView from "./MessageView.js"
import {useStore} from "../store/HalaqatStore"
import {
  AssignmentTurnedIn,
  BorderColorOutlined,
  Create,
  Mail,
} from "@mui/icons-material";
import AddMessage from "./AddMessage";
import { IconButton } from "@mui/material";
import AddTask from "./AddTask";

export default function StudentCard({student, id}){
    const router = useRouter()

    const [openAddMessage, setOpenAddMessage] = useState(false);
    const [openAddTask, setOpenAddTask] = useState(false);
    const [studentId, setStudentId] = useState("");
  const store= useStore()
    const [openTasks, setOpenTasks] = useState({is: false, id: 0})
    const [openMessages, setOpenMessages] = useState({is: false, id: 0})


    function openStudentMessages(studentId){
        setOpenMessages({is: true, id: studentId})
    }

    function openStudentTasks(studentId){
        setOpenTasks({is: true, id: studentId})
        {console.log(store.tasks.filter(task => task.studentId === studentId))}
    }

    const handleCloseTasks = () => {
        setOpenTasks({is: false, id: 0});
    };

    const handleCloseMessages = () => {
        setOpenMessages({is: false, id: 0});
    };

    return(
        <>
        <AddMessage //====================================
        open={openAddMessage}
        setOpen={setOpenAddMessage}
        studentId={studentId}
      />
      <AddTask
        open={openAddTask}
        setOpen={setOpenAddTask}
        studentId={studentId} //====================================
      />
        <Card
                key={id}
                sx={{ borderRadius: "15px", margin: "10px", width: "100%" }}
              // onClick={() => moveToHalaqa(halaqa)}
        >
                <CardContent>
                  <Stack
                    direction="row"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ width: "50%" }}
                    >
                      {student.firstName} {student.lastName}
                    </Typography>
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="top"
                    >
                        {/* <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=> openStudentTasks(student.studentId)} ><TaskIcon /></Button>
                        <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=>openStudentMessages(student.studentId)}><MessageIcon /></Button> */}

                      <IconButton
                        onClick={()=> openStudentTasks(student.studentId)}
                      >
                        <AssignmentTurnedIn />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setStudentId(student.studentId);
                          setOpenAddTask(true);
                        }}
                      >
                        <Create />
                      </IconButton>
                      <IconButton
                        onClick={()=>openStudentMessages(student.studentId)}
                      >
                        <Mail />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setStudentId(student.studentId);
                          setOpenAddMessage(true);
                        }}
                      >
                        <BorderColorOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>
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
                </CardContent>
              </Card>
              </>
    )
}