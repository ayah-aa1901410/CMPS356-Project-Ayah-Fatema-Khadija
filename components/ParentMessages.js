"use client"
import { useStore } from "../store/HalaqatStore"


export default function GetParentMessages( students ) {
    const store = useStore()

    const parentStudents = students
    const parentStudentsIds = []
    parentStudents?.forEach(student => {
        parentStudentsIds.push(student.studentId)
    });
    console.log(parentStudentsIds);
    console.log(store.messages);

    const matchedMessages = []
    for (let i = 0; i < store.messages.length; i++) {
        for (let j = 0; j < parentStudentsIds.length; j++) {
            if (parseInt(store.messages[i].studentId) == parseInt(parentStudentsIds[j]))
                matchedMessages.push(store.messages[i])
        }
    }

    return matchedMessages
}