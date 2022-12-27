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
import { string } from "prop-types";
import {useStore} from '../../../../store/HalaqatStore.js'

export default function UpdateStudent(props){
    const router = useRouter()

    // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingStudent, setUpdatingStudent} = useHalaqatContext();

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
    const [halaqa, setHalaqa] = useState("")
    const [isActive, setIsActive] = useState("")
    const [password, setPassword] = useState("")
    
    useEffect(()=>{
        setQatariId(store.updatingStudent.qatariId)
        setParentFirstName(store.updatingStudent.parentFirstName)
        setParentLastName(store.updatingStudent.parentLastName)
        setMobile(store.updatingStudent.mobile)
        setEmail(store.updatingStudent.email)
        setStudentId(store.updatingStudent.studentId)
        setStudentFirstName(store.updatingStudent.studentFirstName)
        setStudentLastName(store.updatingStudent.studentLastName)
        setGender(store.updatingStudent.gender)
        setSchoolGrade(store.updatingStudent.schoolGrade)
        setTeacherId(store.updatingStudent.teacherId)
        setIsActive(store.updatingStudent.isActive)
        setPassword(store.updatingStudent.password)
        setDate(store.updatingStudent.date)
        // const dateString = updatingStudent.date.split("/")
        // setDate(`${dateString[2]}/${dateString[0]}/${dateString[1]}`)  // yyyy/mm/dd

    },[])

    function backToStudents(){
        router.back(-1)
    }

    async function handleUpdate(){
        if(qatariId == 0 || parentFirstName == "" || parentLastName == "" || mobile == "" || email == "" || studentId == 0 || studentFirstName == "" || studentLastName == "" || date == null || gender == "" || schoolGrade == 0 || teacherId == 0 || password == ""){
            alert("Some fields are empty. Please fill all fields!")
        }else{
            let newDate = null
            let pending
            if(Object.prototype.toString.call(date) === '[object String]'){
                pending = date
            }else{
                pending = new Intl.DateTimeFormat(['ban', 'id']).format(date)
            }
            
            // console.log("date: " + date);
            // console.log("pending: " + pending);
            // console.log("updatingString: " + store.updatingStudent.date);

            if(pending == store.updatingStudent.date){
                newDate = store.updatingStudent.date
            }else{
                newDate = pending
            }

            const updatedStudent = {
                qatariId: qatariId,
                parentFirstName: parentFirstName,
                parentLastName: parentLastName, 
                mobile: mobile,
                email: email,
                studentId: studentId, 
                studentFirstName: studentFirstName, 
                studentLastName: studentLastName, 
                date: newDate,
                gender: gender,
                schoolGrade: schoolGrade,
                teacherId: teacherId,
                isActive: isActive,
                password: password
            }
            const response = await fetch("/api/StudentList",
            {method: "PUT",headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }, body: JSON.stringify({
                updatedStudent
            })})
            store.setStudents()
            // setJsonUpdated(true)
            backToStudents()
        }
    }

    function handleQatariId(e){
            setQatariId(e.target.value)
            const parent = store.students.find(par => par.qatariId == e.target.value)
            setParentFirstName(parent.firstName)
            setParentLastName(parent.lastName)
            setMobile(parent.mobile)
            setEmail(parent.email)
            setPassword(parent.password)
    }

    function handleHalaqaChange(e){
        const requiredHalaqa = store.HalaqatList.find(halaqa => halaqa.tNo == e.target.value)
        setHalaqa(requiredHalaqa.halaqa)
        setTeacherId(e.target.value)
    }

    useEffect(()=>{
        console.log(date);
    },[date])

    return (
    <div>
        <Stack direction="column" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", width: "130vh", margin: "0px", backgroundColor: "transparent"}}>
            <FormGroup>
                <FormControl fullWidth sx={{margin: "10px", width: "250px"}}>
                    <InputLabel id="demo-simple-select-label">Active ?</InputLabel>
                    <Select
                    required
                    name="active"
                    label="active ?"
                    value={isActive}
                    onChange={(newValue)=>{
                        setIsActive(newValue.target.value)
                    }}
                    sx={{backgroundColor: "white",  boxShadow: "5px 5x 5px grey"}}
                    >
                        <MenuItem value={"active"}>active</MenuItem>
                        <MenuItem value={"inactive"}>inactive</MenuItem>
                    </Select>
                </FormControl>
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
                <FormControl>
                    {/* <TextField required name="qatariId" id="outlined-number" label="Parent Qatari Id" type="number" InputLabelProps={{shrink: true,}} sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} value={qatariId} disabled/> */}
                    <TextField required name="parentFirstName" id="outlined-required" label="Parent First Name" sx={{margin: "10px", width: "250px", backgroundColor: "white",boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setParentFirstName(newValue.target.value);}}  value={parentFirstName}/>
                    <TextField required name="parentLastName" id="outlined-required" label="Parent Last Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setParentLastName(newValue.target.value)}} value={parentLastName} />
                </FormControl>
                <FormControl>
                    <TextField required name="mobile" id="outlined-required" label="Parent Mobile No."  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setMobile(newValue.target.value);}} value={mobile} />
                    <TextField required name="email" id="outlined-required" label="Parent Email" sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                            setEmail(newValue.target.value) }} value={email} />
                    <TextField required name="password" id="outlined-required" label="Password" sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {setPassword(newValue.target.value)}} value={password}/>
                </FormControl>
                <Box>
                    <FormControl fullWidth>
                        <TextField required name="studentFirstName" id="outlined-required" label="Student First Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                    setStudentFirstName(newValue.target.value); }}  value={studentFirstName}/>
                        <TextField required name="studentLastName" id="outlined-required" label="Student Last Name"  sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {
                                    setStudentLastName(newValue.target.value); }} value={studentLastName} />
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
                        <TextField required name="schoolGrade" id="outlined-number" label="Student School Grade" type="number" InputLabelProps={{shrink: true,}} sx={{margin: "10px", width: "250px", backgroundColor: "white", boxShadow: "5px 5x 5px grey"}} onChange={(newValue) => {setSchoolGrade(newValue.target.value)}} value={schoolGrade} />
                    </FormControl>
                </Box>
            </FormGroup>
            <Stack direction="row" display="flex" justifyContent="start" alignItems="start" sx={{height: "100vh", minWidth: "130vh", margin: "0px", backgroundColor: "transparent"}}>
                <Button onClick={backToStudents} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px"}}>
                    Cancel
                </Button>
                <Button onClick={handleUpdate} sx={{backgroundColor: "white", margin: "13px", color: "black", width: "100px"}}>
                    Update
                </Button>
            </Stack>
        </Stack>
    </div>
    )
}