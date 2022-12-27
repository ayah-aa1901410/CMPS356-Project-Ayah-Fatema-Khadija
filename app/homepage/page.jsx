"use client"
import { useState, useEffect } from "react"
import { useHalaqatContext } from "../../context/HalaqatContext"
import { Stack, Box } from "@mui/system";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useRouter } from "next/navigation"
import GetParentMessages from "../../components/ParentMessages";
import GetParentTasks from "../../components/ParentTasks";
import { useStore } from "../../store/HalaqatStore";
import Image from "next/image";
import {
  AssignmentTurnedIn,
  BorderColorOutlined,
  Create,
  Mail,
} from "@mui/icons-material";
import AddMessage from "../../components/AddMessage";
import { IconButton } from "@mui/material";
import AddTask from "../../components/AddTask";
import StudentCard from "../../components/StudentCard"


export default function Homepage() {
  // const { students, surahs, tasks, teachers, announcements, loggedIn, setLoggedIn, HalaqatList,setJsonUpdated } =
  // useHalaqatContext();
  //=================================
  // const {
  //     students,
  //     surahs,
  //     tasks,
  //     teachers,
  //     announcements,
  //     loggedIn,
  //     setLoggedIn,
  //     HalaqatList,
  //   } = useHalaqatContext();
  //===================================
  const store = useStore()
  const [coordinator, setCoordinator] = useState(false)
  const [teacher, setTeacher] = useState(false)
  const [parent, setParent] = useState(false)
  const [sortedAnnouncements, setSortedAnnouncements] = useState([])
  const [sortedMessages, setSortedMessages] = useState([])
  const [sortedTasks, setSortedTasks] = useState([])
  const [localStorageResponse, setLocalStorageResponse] = useState(null)
  const router = useRouter()
  let studentsOnly = []
  store.students?.map(parent => 
        parent.students.forEach(student=>studentsOnly.push(student)))
  const [role, setRole] = useState(null);

  const matchedMessages = GetParentMessages(store.loggedIn.obj.students)
  const matchedTasks = GetParentTasks(store.loggedIn.obj.students)
  
  //========================================
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('response')).token != null) {
      if (JSON.parse(localStorage.getItem('response')).role === "coordinator") {
        setCoordinator(true)
      } else if (JSON.parse(localStorage.getItem('response')).role === "teacher") {
        setTeacher(true)
      } else {
        setParent(true)
      }
      setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))

      setSortedAnnouncements([
        store.announcements.sort(
          (objA, objB) =>
            Number(new Date(objB.date)) - Number(new Date(objA.date))
        )[0],
        store.announcements.sort(
          (objA, objB) =>
            Number(new Date(objB.date)) - Number(new Date(objA.date))
        )[1],
        store.announcements.sort(
          (objA, objB) =>
            Number(new Date(objB.date)) - Number(new Date(objA.date))
        )[2],
      ]);


      setSortedMessages([
        matchedMessages.sort(
          (objA, objB) =>
            Number(new Date(objB.postedAt)) - Number(new Date(objA.postedAt))
        )[0],
        matchedMessages.sort(
          (objA, objB) =>
            Number(new Date(objB.postedAt)) - Number(new Date(objA.postedAt))
        )[1],
        matchedMessages.sort(
          (objA, objB) =>
            Number(new Date(objB.postedAt)) - Number(new Date(objA.postedAt))
        )[2],
      ]);

      setSortedTasks([
        matchedTasks.sort(
          (objA, objB) =>
            Number(new Date(objB.dueDate)) - Number(new Date(objA.dueDate))
        )[0],
        matchedTasks.sort(
          (objA, objB) =>
            Number(new Date(objB.dueDate)) - Number(new Date(objA.dueDate))
        )[1],
        matchedTasks.sort(
          (objA, objB) =>
            Number(new Date(objB.dueDate)) - Number(new Date(objA.dueDate))
        )[2],
      ]);

      const all = [...sortedMessages, ...sortedTasks];

    } else {
      router.push('/')
    }
  }, [])


  console.log(sortedMessages)
  console.log(sortedTasks);

  //=======================================




  function moveToHalaqa(halaqa) {
    router.push(`/homepage/halaqat/${halaqa.tNo}`)
  }

  return (
    <div>
      {store.loggedIn?.obj != null && 
      <Stack direction="row" display="flex" justifyContent="space-between" alignItems="top" sx={{ height: "100%", width: "100%", margin: "0px", backgroundColor: "transparent" }}>
        <Stack direction="column" display="flex" justifyContent="top" alignItems="top" sx={{ width: "60%", marginLeft: "2%" }}>

              <div style={{ padding: "0px", backgroundColor: "transparent" }}>
                <h1 style={{ color: "#361874" }}>Halaqat</h1>
                <h2 style={{ color: "darkred", paddingLeft: "25px" }}>Alsalamu Alaykum {store.loggedIn.obj.firstName}</h2>
              </div>

            {coordinator && <Stack direction="column" display="flex" justifyContent="top" alignItems="top" sx={{ width: "80%", marginLeft: "2%" }}>
              
              <Box component="span" sx={{ p: 3, backgroundColor: "transparent", height: "100%", width: "100%"}}>
                {coordinator && store.HalaqatList.map(halaqa => (
                  <Card key={halaqa.id} sx={{ borderRadius: "15px", margin: "10px" }} onClick={() => moveToHalaqa(halaqa)}>
                    <CardContent>
                      <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div" sx={{ width: "50%" }}>
                          {halaqa.halaqa}
                        </Typography>
                        <Typography sx={{ width: "20%" }}>
                          {halaqa.teacher}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Stack>}

            {parent && <div style={{overflowY: "scroll", height: "60%", width: "95%"}}><Stack direction="column" display="flex" justifyContent="top" alignItems="top" sx={{ width: "80%", marginLeft: "3%" }}>
                {sortedTasks.length !== 0 && 
              <div style={{width: "100%"}}>
              {parent && <h3>Latest Tasks: </h3>}
              {sortedTasks?.map((task) => (
                <Card
                  key={task.taskId}
                  sx={{ maxWidth: "100%", borderRadius: "15px", margin: "10px" }}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.surahName}
                    </Typography>
                    <Typography variant="h7">
                      From: {task.fromAya}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      To: {task.toAya}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.type}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      Date: {new Date(task.dueDate).toDateString()}
                    </Typography>
                    <br />
                    <Typography variant="h7">
                      Student: {store.studentsOnly.find(stud => stud.studentId == task.studentId).firstName + " " + store.studentsOnly.find(stud => stud.studentId == task.studentId).lastName}
                    </Typography>
                    {task.completedDate && <div><Typography variant="h7">
                      {task.masteryLevel}
                      <br />
                    </Typography>
                    <Typography variant="h7">
                      {task.comment}
                      <br />
                    </Typography></div>}
                  </CardContent>
                </Card>
              ))}</div>}
              {parent && <h3>Latest Messages: </h3>}
              {sortedMessages.length !== 0 && 
              <div style={{width:"100%"}}>
              {sortedMessages?.map((message) => (message != undefined ?
                <Card
                  key={message.messageId}
                  sx={{ maxWidth: "100%", borderRadius: "15px", margin: "2%"}}
                  style={{
                    display: "flex",
                  }}
                >
                  <CardContent
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h7">
                        {new Date(message.postedAt).toDateString()}
                        <br />
                      </Typography>
                    </div>
                    <Typography variant="h6">
                      Message Title: {message.title}
                      <br />
                    </Typography>
                    <Typography variant="h7">{message.message}</Typography>
                    <br />
                    <Typography variant="h7">
                      Student: {store.studentsOnly.find(stud => stud.studentId == message.studentId).firstName + " " + store.studentsOnly.find(stud => stud.studentId == message.studentId).lastName}
                    </Typography>
                  </CardContent>
                </Card> : ""
              ))}
              </div>
              }
            </Stack></div>}

            {teacher && <div style={{overflowY: "scroll", height: "60%", width: "95%"}}><Stack direction="column" display="flex" justifyContent="top" alignItems="top" sx={{ width: "80%", marginLeft: "3%" }}>
                  {
                store.students.map(({ students: stds }) => (
                  <>
                    {stds.map((student, id) => (
                      <StudentCard key={id} student={student} id={id}/>
                    ))}
                  </> 
                ))}

            </Stack></div>}
        </Stack>

        <Box component="span" sx={{ p: 3, height: "100%", width: "40%", borderRadius: "15px", boxShadow: "3px 3px 3px grey", backgroundColor: "white"  }}>
          <h2>Latest Announcements: </h2>
          {
            sortedAnnouncements.length !== 0 && sortedAnnouncements?.map(announce =>
              <Card key={announce.announcementId} sx={{ width: "100%", borderRadius: "15px", marginBottom: "10px", borderStyle: "double" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {announce.title}
                  </Typography>
                  <Typography variant="h7">
                    {announce.content}
                    <br />
                  </Typography>
                  <Typography variant="h7">
                    Date: {announce.date}
                  </Typography>
                  {
                    announce.image != "" &&
                    <div>
                        <br />
                        <Image alt={announce.image} src={announce.image} width={0} height={0} style={{ width: '30%', height: 'auto', margin: "0px"  }}></Image>
                    </div>
                  }
                </CardContent>
              </Card>
            )
          }
        </Box>
      </Stack>
      }
      
     
    </div>

  )
}
