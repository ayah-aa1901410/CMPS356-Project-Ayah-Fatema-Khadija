"use client"
import { useStore } from "../store/HalaqatStore"


export default function GetParentTasks(students ) {
    const store = useStore()

    const parentStudents = students
    const parentStudentsIds = []
    parentStudents?.forEach(student => {
        parentStudentsIds.push(student.studentId)
    });
    console.log(parentStudentsIds);
    console.log(store.tasks);

    const matchedTasks = []
    for (let i = 0; i < store.tasks.length; i++) {
        for (let j = 0; j < parentStudentsIds.length; j++) {
            if (parseInt(store.tasks[i].studentId) == parseInt(parentStudentsIds[j]))
                matchedTasks.push(store.tasks[i])
        }
    }
    
    return matchedTasks
}