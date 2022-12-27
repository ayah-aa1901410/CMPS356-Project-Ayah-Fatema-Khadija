import create from "zustand";
import { persist, devtools } from "zustand/middleware";


let store = (set) => ({
    students: [],
    surahs: [],
    tasks: [],
    teachers: [],
    announcements: [],
    messages: [],
    loggedIn: {obj: null, role: null, token: null},
    newStudentHalaqa: "",
    updatingStudent: null,
    updatingAnnouncement: null,
    updatingTask: null,
    HalaqatList: [],
    currentHalaqa: 0,
    setStudents: async ()=>{
         const studentsResponse = await fetch("http://localhost:3000/api/StudentList").then(res => res.json())
         set({ students: await studentsResponse })
    },
    setSurahs: async ()=> {
        const surahsResponse = await fetch("http://localhost:3000/api/SurahList").then(res => res.json())
        set({ surahs: await surahsResponse })
    },
    setTasks: async ()=>{
        const tasksResponse =  await fetch("http://localhost:3000/api/TaskList").then(res => res.json())
        set({ tasks: await tasksResponse })
    },
    setTeachers: async ()=>{
        const teachersResponse = await fetch("http://localhost:3000/api/TeacherList").then(res => res.json())
        set({ teachers: await teachersResponse })
    },
    setAnnouncements: async ()=>{
        const announcementsResponse = await fetch("http://localhost:3000/api/AnnouncementList").then(res => res.json())
        set({ announcements: await announcementsResponse })
    },
    setMessages: async ()=>{
        const messagesResponse = await fetch("http://localhost:3000/api/MessageList" ).then((response) => response.json());
        set({messages: messagesResponse})
    },
    setLoggedIn: (newLoggedIn) =>{
        set({
            loggedIn: newLoggedIn
        })
    },
    setNewStudentHalaqa: (studentHalaqa)=>{
        set({
            newStudentHalaqa: studentHalaqa
        })
    },
    setUpdatingStudent: (newUpdatingStudent)=>{
        set({
            updatingStudent: newUpdatingStudent
        })
    },
    setUpdatingAnnouncement: (newUpdatingAnnouncement)=>{
        set({
            updatingAnnouncement: newUpdatingAnnouncement
        })
    },
    setUpdatingTask: (newUpdatingTask)=>{
        set({
            updatingTask: newUpdatingTask
        })
    },
    setCurrentHalaqa: (latestHalaqa)=>{
        set({
            currentHalaqa: latestHalaqa
        })
    }
    ,
    setHalaqaList: async ()=>{
        const teachersResponse = await fetch("http://localhost:3000/api/TeacherList").then(res => res.json())
        let temp = []
        await teachersResponse.map(teach => {
            teach.halaqa?temp.push({
                halaqa: teach.halaqa,
                teacher: teach.firstName+" "+teach.lastName,
                tNo: teach.staffNo 
            }):""
        })
        set({
            HalaqatList: temp
        })
    }
});

store = persist(store, {name: "store"})
store = devtools(store, {name: "store"})
  
  export const useStore = create(store);
// export const useStore = create(store)



