"use client"
import { useState, useEffect, useContext, createContext } from "react";


const halaqatContext = createContext();

export default function HalaqatProvider({ children }) {
    const [students, setStudents] = useState([])
    const [surahs, setSurahs] = useState([])
    const [tasks, setTasks] = useState([])
    const [messages, setMessages] = useState([]);
    const [teachers, setTeachers] = useState([])
    const [announcements, setAnnouncements] = useState([])
    const [loggedIn, setLoggedIn] = useState({
        obj: null, 
        role: null, 
        token: null
      })
    const [jsonUpdated, setJsonUpdated] = useState(false)
    const [newStudentHalaqa, setNewStudentHalaqa] = useState("")
    const [updatingStudent, setUpdatingStudent] = useState(null)
    const [updatingAnnouncement, setUpdatingAnnouncement] = useState(null)
    const [updatingtask, setUpdatingtask] = useState(null)
    
    
    let HalaqatList=[]
    // let AnnouncementList=[]

    //====================================
    const getMessages = async () => {
      let messagesResponse = await fetch(
        "http://localhost:3000/api/MessageList"
      ).then((response) => response.json());
      setMessages(messagesResponse);
    };
  
    const getTasks = async () => {
      let tasksResponse = await fetch("http://localhost:3000/api/TaskList").then(
        (response) => response.json()
      );
      setTasks(tasksResponse);
    };
//===========================================
    useEffect(() => {
      const fetchingData = async function(){
        let studentsResponse = await fetch("http://localhost:3000/api/StudentList").then(response => response.json())
        let surahsResponse = await fetch("http://localhost:3000/api/SurahList").then(response => response.json())
        let tasksResponse = await fetch("http://localhost:3000/api/TaskList").then(response => response.json())
        let teachersResponse = await fetch("http://localhost:3000/api/TeacherList").then(response => response.json()) 
        let announcementsResponse = await fetch("http://localhost:3000/api/AnnouncementList").then(response => response.json()) 
        getMessages();
        getTasks();
        setStudents(studentsResponse)
        setSurahs(surahsResponse)
        setTasks(tasksResponse)
        setTeachers(teachersResponse)
        setAnnouncements(announcementsResponse)
      }
      fetchingData()
      setJsonUpdated(false)
    }
    ,[jsonUpdated])
    
    
    teachers.map(teach => {
      teach.halaqa?HalaqatList.push({halaqa: teach.halaqa, teacher: teach.firstName+" "+teach.lastName, tNo: teach.staffNo}):""
    })

    

  return (
    <halaqatContext.Provider value={{ students, surahs, tasks, messages, teachers, announcements, loggedIn, setLoggedIn, HalaqatList, setJsonUpdated, newStudentHalaqa, setNewStudentHalaqa, updatingStudent, setUpdatingStudent, updatingAnnouncement, setUpdatingAnnouncement}}>
      {children}
    </halaqatContext.Provider>
  );
}

export const useHalaqatContext = () => useContext(halaqatContext);


