"use client"
import { useState } from "react"
import { FormControl, Input, InputLabel, Stack, TextField } from "@mui/material"
import { FormGroup, Button } from "@mui/material"
import { useHalaqatContext } from "../../../../context/HalaqatContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {useStore} from "../../../../store/HalaqatStore.js"

export default function AddAnnouncement(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [otherImage, setOtherImage] = useState("")
    const router = useRouter()
    // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa} = useHalaqatContext();
    const store = useStore()

    function backToAnnouncements(){
        router.back(-1)
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    async function handleSubmit(){
        if(title=="" || content==""){
            alert("Some fields are empty. Please fill all fields!")
        }else{
            const date = new Date()
            const newAnnouncement = {
                    title: title,
                    content: content,
                    image: otherImage,
                    date: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
            }
            // console.log(base64String);
            const response = await fetch("http://localhost:3000/api/AnnouncementList",{method: "POST", body: JSON.stringify({
                newAnnouncement
            })})

            store.setAnnouncements()

            // setJsonUpdated(true)
            backToAnnouncements()
        }
    }

    function removeAttachment(){
        setImage()
        setOtherImage('')
    }

    return(
        <>
             <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", width: "130vh", margin: "0px", backgroundColor: "transparent"}}>
                <FormGroup>
                    <FormControl>
                        <TextField required name="announcementTitle" id="outlined-required" label="Announcement Title" sx={{margin: "10px", width: "250px", backgroundColor: "white",boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setTitle(newValue.target.value);
                            }}/>
                        <TextField required multiline name="announcementContent" id="outlined-required" label="Announcement Content" sx={{margin: "10px", width: "550px", backgroundColor: "white",boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setContent(newValue.target.value);
                        }}/>
                        <p>Attach Image: </p>
                        {
                            otherImage != "" && <Button variant="outlined" onClick={removeAttachment} style={{width: "220px", color: "black", outlineColor: "grey", borderRadius: "15px", backgroundColor:"white", marginTop: "10px", marginBottom: "10px"}} >Remove Attachment</Button>
                        }
                        <Input type="file" onChange={(e)=> {
                            setImage(e.target.files[0])
                            fileToDataUri(e.target.files[0])
                            .then(dataUri => {
                                setOtherImage(dataUri)
                            })
                            }}
                            sx={{height: "40px", margin: "0 10px"}}></Input>
                        <Image id="attachedImage" alt={otherImage} src={otherImage} width={0} height={0} style={{ width: '30%', height: 'auto' }}></Image>
                    </FormControl>
                </FormGroup>
                <Stack direction="row" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", minWidth: "130vh", margin: "0px", backgroundColor: "transparent"}}>
                    <Button variant="outlined" onClick={backToAnnouncements} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px", borderRadius: "15px", backgroundColor:"white", marginTop: "10px", marginBottom: "10px"}}>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handleSubmit} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px", borderRadius: "15px", backgroundColor:"white", marginTop: "10px", marginBottom: "10px"}}>
                        Submit
                    </Button>
            </Stack>
             </Stack>
        </>
    )
}