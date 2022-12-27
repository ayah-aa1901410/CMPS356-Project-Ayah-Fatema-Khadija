"use client"
import { Stack, Box } from "@mui/system";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { useEffect, useState } from "react";
import { useHalaqatContext } from "../../context/HalaqatContext.js";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useStore} from '../../store/HalaqatStore.js'

export default function HomePageLayout({ children }) {
  const router = useRouter()
  // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated } =
  //   useHalaqatContext();
  const store = useStore()
  const [main, setMain] = useState(true)
  const [halaqatScreen, setHalaqatScreen] = useState(false)
  const [announcementScreen, setAnnouncementScreen] = useState(false)
  const [studentsScreen, setStudentsScreen] = useState(false)
  const [coordinator, setCoordinator] = useState(false)
  const [teacher, setTeacher] = useState(false)
  const [parent, setParent] = useState(false)
  const [localStorageResponse, setLocalStorageResponse] = useState(null)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('response')).token == null) {
      router.push('/')
    } else {
      if (JSON.parse(localStorage.getItem('response')).role === "coordinator") {
        setCoordinator(true)
      } else if (JSON.parse(localStorage.getItem('response')).role === "teacher") {
        setTeacher(true)
      } else {
        setParent(true)
      }
      setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))

      console.log(store.loggedIn);
    }
  },[])

  function changeScreen(screenName) {
    if (screenName == "Halaqat") {
      router.push('/homepage/halaqat')
    } else if (screenName == "Announcements") {
      router.push('/homepage/announcements')
    } else if (screenName == "Students") {
      router.push('/homepage/students')
    } else if (screenName == "Tasks") {
      router.push('/homepage/tasks')
    } else if (screenName == "Messages") {
      router.push('/homepage/messages')
    } else {
      router.push('/homepage')
    }
  }
// , backgroundColor: "transparent"
  return (
    <div>
      {
        store.loggedIn.obj != null && <div style={{ height: "100%" }}><Stack direction="row" display="flex" justifyContent="space-between" alignItems="top" sx={{ height: "810px", width: "100%", marginRight: "20px" }}>
          <Box sx={{ width: "25%", height: "100%", borderRadius: "15px", boxShadow: "3px 3px 3px grey", marginRight: "10px", backgroundColor: "white" }}
            role="presentation"
          >
            <List sx={{ margin: "0px", height: "100%" }}>
              <ListItem key='Home' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Home") }}>
                  <ListItemIcon>
                    <HomeTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItemButton>
              </ListItem>
              <Divider />
              {coordinator && <ListItem key='Halaqat' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Halaqat") }}>
                  <ListItemIcon>
                    <Diversity3TwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Halaqat' />
                </ListItemButton>
              </ListItem>}
              {coordinator && <Divider />}
              {coordinator && <ListItem key='Students' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Students") }}>
                  <ListItemIcon>
                    <PersonOutlineTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Students' />
                </ListItemButton>
              </ListItem>}
              {coordinator && <Divider />}
              {(parent || teacher) && <ListItem key='Tasks' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Tasks") }}>
                  <ListItemIcon>
                    <TaskAltTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Tasks' />
                </ListItemButton>
              </ListItem>}
              {(parent || teacher) && <Divider />}
              {(parent || teacher) && <ListItem key='Messages' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Messages") }}>
                  <ListItemIcon>
                    <EmailTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Messages' />
                </ListItemButton>
              </ListItem>
             }
              {(parent || teacher) && <Divider />}
              <ListItem key='Announcements' disablePadding>
                <ListItemButton onClick={() => { changeScreen("Announcements") }}>
                  <ListItemIcon>
                    <CampaignTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary='Announcements' />
                </ListItemButton>
              </ListItem>
              <Divider />
            
            </List>
          </Box>
          <div style={{ backgroundColor: "#f3f3f3", height: "800px", width: "100%" }}>{children}</div>
        </Stack>
        </div>
      }
      {
        store.loggedIn.obj == null &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>Going back to Login Screen!</strong>
        </Alert>
      }
    </div>
  )
}
