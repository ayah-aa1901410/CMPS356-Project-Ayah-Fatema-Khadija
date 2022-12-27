"use client"
import { Stack, Box } from "@mui/material";
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useHalaqatContext } from "../../../context/HalaqatContext.js";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { CardActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from "next/image.js";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import {TextField} from "@mui/material";
import {useStore} from "../../../store/HalaqatStore.js"

export default function AnnouncementsScreen(){
    // const { students, surahs, tasks, teachers,announcements, loggedIn, setLoggedIn, HalaqatList, updatingAnnouncement, setUpdatingAnnouncement, setJsonUpdated } =
    // useHalaqatContext();
    const store = useStore()
    const [popup, setPopup] = useState({ show: false,  id: null,})
    const [coordinator, setCoordinator] = useState(false)
    const [teacher, setTeacher] = useState(false)
    const [parent, setParent] = useState(false)
    const [localStorageResponse, setLocalStorageResponse] = useState(null)
    const [dateFilter, setDateFilter] = useState({start:new Date().setMonth(new Date().getMonth()-1), end: new Date()})
    const router = useRouter()
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

    function handleClose(){
        setPopup({show: false, id: null})
    }

    function addAnnouncement(){
        router.push('/homepage/announcements/addAnnouncement')
    }

    function updateAnnouncement(announcementId){
        router.push('/homepage/announcements/updateAnnouncement')
        const requiredAnnouncement = store.announcements.find(ann => ann.announcementId == announcementId)
        const upAnnouncement = {
            announcementId: announcementId,
            title: requiredAnnouncement.title,
            content: requiredAnnouncement.content,
            image: requiredAnnouncement.image,
        }
        store.setUpdatingAnnouncement(upAnnouncement)
    }
    function handleDelete(announcementId){
        setPopup({show: true, id: announcementId})
    }

    async function deleteAnnouncement(){
        const announcementId = popup.id
        const response = await fetch("http://localhost:3000/api/AnnouncementList",{method: "DELETE", body: JSON.stringify({
            announcementId
        })})
        // setJsonUpdated(true)
        setPopup({show: false, id: null})
        store.setAnnouncements()
    }

    return (
        <div>
        {
            store.loggedIn?.obj != null && 
        <Stack direction="row" display="flex" justifyContent="space-between" alignItems="end" sx={{height: "100%", width: "90%", marginLeft: "3%", backgroundColor: "transparent"}}>
            <Stack direction="column" display="flex" justifyContent="start" alignItems="top" sx={{height: "100%", minWidth: "100%", margin: "0px", backgroundColor: "transparent"}}>
                <h1 style={{color: "#361874"}}>Announcements</h1>

                <Stack direction="row" display="flex" justifyContent="start" alignItems="top">
                    <FormControl fullWidth sx={{margin: "10px", width: "250px", backgroundColor: "white"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}}>
                            <DatePicker
                                required
                                label="Start Date"
                                value={dateFilter.start}
                                sx={{margin: "10px", backgroundColor: "white",  boxShadow: "5px 5x 5px grey"}}
                                onChange={(newValue) => {
                                    setDateFilter((prev) => ({...prev, start: newValue}))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth sx={{margin: "10px", width: "250px", backgroundColor: "white"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}}>
                            <DatePicker
                                required
                                label="End Date"
                                value={dateFilter.end}
                                sx={{margin: "10px", backgroundColor: "white",  boxShadow: "5px 5x 5px grey"}}
                                onChange={(newValue) => {
                                    setDateFilter((prev) => ({...prev, end: newValue}))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Stack>

                <div style={{overflowY:"scroll", width: "70%", marginTop: "2%", marginBottom: "2%", marginLeft: "3%", height: "640px"}}>
                    {
                        store.announcements && store.announcements.sort(
                            (objA, objB) => Number(new Date(objB.date)) - Number(new Date(objA.date)    ),
                            ).filter(announce => {
                                let filterPass = true
                                const date = new Date(announce.date)
                                if(dateFilter.start){
                                    filterPass = filterPass && (new Date(dateFilter.start) < date)
                                }
                                if(dateFilter.end){
                                    filterPass = filterPass && (new Date(dateFilter.end) > date)
                                }
                                return filterPass
                            }).map(announce => (
                            <Card key={announce.announcementId} sx={{maxWidth: "80%", borderRadius: "15px", margin: "10px"}}>
                                <CardContent>
                                    <Typography variant="h6" sx={{fontWeight: "bold"}}>
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
                                {
                                    coordinator &&
                                    <CardActions>
                                        <Stack  direction="row" display="flex" justifyContent="space-between" alignItems="center">
                                            {
                                                coordinator && <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=> updateAnnouncement(announce.announcementId)} ><EditIcon /></Button>
                                            }
                                            {
                                                coordinator && <Button variant="text" size="small" sx={{borderRadius: "70px"}} onClick={()=> handleDelete(announce.announcementId)} ><DeleteIcon /></Button>
                                            }
                                        </Stack>
                                    </CardActions>
                                }
                            </Card>
                        ))
                    }   
                </div>
                {popup.show && (
                    <Dialog  open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">
                            Delete Alert
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this announcement?
                                <br />
                                {store.announcements.find(ann=> ann.announcementId == popup.id).title}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={deleteAnnouncement} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Stack>
            {
                coordinator && <Button variant="text" size="large" sx={{backgroundColor:"white", borderRadius: "70px", height: "60px",boxShadow: "3px 3px 3px grey", width: "60px", marginBottom: "3%", marginRight: "3%"}} onClick={addAnnouncement} ><AddIcon /></Button>
            }
        </Stack>
        }
        </div>
    )
}