"use client"
import { Button } from "@mui/material"
import {useRouter} from "next/navigation"
import { Stack, Box } from "@mui/system";
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useHalaqatContext } from "../../../../context/HalaqatContext.js";
import { useState } from "react";
import { useEffect } from "react";
import {TextField} from "@mui/material";
import { useRef } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import {useStore} from '../../../../store/HalaqatStore.js'

export default function AddStudent(props){
    const router = useRouter()

    const [addNewParent, setAddNewParent] = useState(false)
    // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa} = useHalaqatContext();
    const store = useStore()
    const [qatariId, setQatariId] = useState(0)
    const [parentFirstName, setParentFirstName] = useState("")
    const [parentLastName, setParentLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [studentId, setStudentId] = useState(0)
    const [studentFirstName, setStudentFirstName] = useState("")
    const [studentLastName, setStudentLastName] = useState("")
    const [date, setDate] = useState(null)
    const [gender, setGender] = useState("")
    const [schoolGrade, setSchoolGrade] = useState(0)
    const [teacherId, setTeacherId] = useState(0)
    const [password, setPassword] = useState("")
    const [halaqa, setHalaqa] = useState("")
    
    useEffect(()=>{
        if(store.newStudentHalaqa !== ""){
            setTeacherId(parseInt(store.newStudentHalaqa))
        }
    },[])

    function backToStudents(){
        router.back(-1)
    }

    async function handleSubmit(){
        if(qatariId == 0 || parentFirstName == "" || parentLastName == "" || mobile == "" || email == "" || studentId == 0 || studentFirstName == "" || studentLastName == "" || date == null || gender == "" || schoolGrade == 0 || teacherId == 0 || password == "" ){
            alert("Some fields are empty. Please fill all fields!")
        }else{
            const newStudent = {
                qatariId: qatariId,
                parentFirstName: parentFirstName,
                parentLastName: parentLastName, 
                mobile: mobile,
                email: email,
                studentId: studentId, 
                studentFirstName: studentFirstName, 
                studentLastName: studentLastName, 
                date: new Intl.DateTimeFormat(['ban', 'id']).format(date),
                gender: gender,
                schoolGrade: schoolGrade,
                teacherId: teacherId,
                password: password
            }
            const response = await fetch("http://localhost:3000/api/StudentList",{method: "POST", body: JSON.stringify({
                newStudent
            })})
            store.setStudents()
            // setJsonUpdated(true)
            backToStudents()
        }
    }

    function handleQatariId(e){
        if(e.target.value !== "new parent"){
            setQatariId(e.target.value)
            setAddNewParent(false)
            const parent = store.students.find(par => par.qatariId == e.target.value)
            setParentFirstName(parent.firstName)
            setParentLastName(parent.lastName)
            setMobile(parent.mobile)
            setEmail(parent.email)
            setPassword(parent.password)
        }else{
            setAddNewParent(true)
        }
    }

    function handleHalaqaChange(e){
        const requiredHalaqa = store.HalaqatList.find(halaqa => halaqa.tNo == e.target.value)
        setHalaqa(requiredHalaqa.halaqa)
        setTeacherId(e.target.value)
    }

    return (
    <div>
        <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", width: "130vh", margin: "0px", backgroundColor: "transparent"}}>
            <FormGroup>
            <Box sx={{width: "250px", margin: "10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Halaqa</InputLabel>
                    <Select
                    required
                    name='teacherId'
                    label="Halaqa"
                    value={teacherId}
                    onChange={handleHalaqaChange}
                    sx={{backgroundColor: "white", boxShadow: "5px 5x 5px grey"}}
                    >
                        {
                            store.HalaqatList.map( halaqa => <MenuItem key={halaqa.id} value={halaqa.tNo}>{halaqa.halaqa}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{width: "250px", margin: "10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Parent Id</InputLabel>
                    <Select
                    required
                    name="qatariId"
                    label="Parent Id"
                    value={qatariId}
                    onChange={handleQatariId}
                    sx={{backgroundColor: "white", boxShadow: "5px 5x 5px grey"}}
                    >
                        {
                            store.students.map( parent => <MenuItem key={parent.qatariId} value={addNewParent?"New Parent":parent.qatariId}>{parent.firstName + " " + parent.lastName + ": " + "Id: " + parent.qatariId}</MenuItem>)
                        }
                        <MenuItem value={"new parent"}>New Parent</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {
                addNewParent && <Box>
                    <FormControl>
                        <TextField required name="qatariId" id="outlined-number" label="Parent Qatari Id" type="number" InputLabelProps={{shrink: true,}} sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setQatariId(newValue.target.value);
                            }}/>
                        <TextField required name="parentFirstName" id="outlined-required" label="Parent First Name" sx={{margin: "10px", width: "250px", backgroundColor: "white",boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setParentFirstName(newValue.target.value);
                            }}/>
                        <TextField required name="parentLastName" id="outlined-required" label="Parent Last Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setParentLastName(newValue.target.value);
                            }} />
                    </FormControl>
                    <FormControl>
                        <TextField required name="mobile" id="outlined-required" label="Parent Mobile No."  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setMobile(newValue.target.value);
                            }}/>
                        <TextField required name="email" id="outlined-required" label="Parent Email" sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setEmail(newValue.target.value)
                            }}/>
                        <TextField required name="password" id="outlined-required" label="Password" sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setPassword(newValue.target.value)
                        }}/>
                    </FormControl>
                </Box>
            }
            <Box>
                <FormControl fullWidth>
                    <TextField required name="studentId" id="outlined-number" label="Student Id" type="number" InputLabelProps={{shrink: true,}} sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {setStudentId(newValue.target.value)}}/>
                    <TextField required name="studentFirstName" id="outlined-required" label="Student First Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setStudentFirstName(newValue.target.value);
                            }}/>
                    <TextField required name="studentLastName" id="outlined-required" label="Student Last Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                setStudentLastName(newValue.target.value);
                            }}/>
                    <FormControl fullWidth sx={{margin: "10px", width: "250px", backgroundColor: "white"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{margin: "10px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}}>
                            <DatePicker
                                required
                                label="Student Date of Birth"
                                value={date}
                                sx={{margin: "10px", backgroundColor: "white",  boxShadow: "5px 5x 5px grey"}}
                                onChange={(newValue) => {
                                    setDate(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth sx={{margin: "10px", width: "250px"}}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        required
                        name="gender"
                        label="gender"
                        value={gender}
                        onChange={(newValue)=>{
                            setGender(newValue.target.value)
                        }}
                        sx={{backgroundColor: "white",  boxShadow: "5px 5x 5px grey"}}
                        >
                            <MenuItem value={"M"}>Male</MenuItem>
                            <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField required name="schoolGrade" id="outlined-number" label="Student School Grade" type="number" InputLabelProps={{shrink: true,}} sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {setSchoolGrade(newValue.target.value)}}/>
                </FormControl>
            </Box>
            </FormGroup>
            <Stack direction="row" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", minWidth: "130vh", margin: "0px", backgroundColor: "transparent"}}>
                <Button onClick={backToStudents} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px"}}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px"}}>
                    Submit
                </Button>
            </Stack>
        </Stack>
    </div>
    )
}