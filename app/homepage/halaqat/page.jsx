"use client"
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useHalaqatContext } from "../../../context/HalaqatContext.js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useStore} from "../../../store/HalaqatStore.js"

export default function HalaqatPage(){
    const router = useRouter()
    // const {students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingStudent, setUpdatingStudent} = useHalaqatContext();
    const store = useStore()
    const [localStorageResponse, setLocalStorageResponse] = useState(null)

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('response')).token == null){
            router.push('/')
        }else{
            setLocalStorageResponse(JSON.parse(localStorage.getItem('response')))
        }
    },[])

    function moveToHalaqa(halaqa){
        router.push(`/homepage/halaqat/${halaqa.tNo}`)
    }

    return (
        <div>
        {store.loggedIn?.obj!= null && <Stack direction="row" display="flex" justifyContent="start" alignItems="top" sx={{height: "100%", width: "90%", marginLeft: "3%", backgroundColor: "transparent"}}>
                        <Stack direction="column" display="flex" justifyContent="top" alignItems="top">
                            <h1 style={{color: "#361874"}}>Halaqat</h1>
                            {store.HalaqatList.map(halaqa => (
                                    <Card key={halaqa.id} sx={{borderRadius: "15px", margin: "10px", width: "100vh"}} onClick={()=>moveToHalaqa(halaqa)}>
                                        <CardContent key={halaqa.id}>
                                            <Stack  direction="row" display="flex" justifyContent="space-between" alignItems="center" key={halaqa.id}>
                                                <Typography  key={halaqa.id} variant="h6" component="div" sx={{width: "200px"}}>
                                                    {halaqa.halaqa}
                                                </Typography>
                                                <Typography key={halaqa.id} sx={{width: "150px"}}>
                                                    |
                                                </Typography>
                                                <Typography key={halaqa.id} sx={{width: "80px"}}>
                                                    {halaqa.teacher}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                ))}
                        </Stack>
        </Stack>
        }
        </div>
    )
}