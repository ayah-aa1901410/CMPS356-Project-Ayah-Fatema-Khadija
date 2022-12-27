// import fs from "fs";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const file = await fs.promises.readFile("data/StudentList.json");
//     const studentsList = JSON.parse(file);
//     const { studentId } = req.query;

//     let tasks = [];
//     studentsList?.forEach((list) => {
//       list.students.forEach((student) => {
//         if (student.studentId == studentId) {
//           tasks = student?.tasks ?? [];
//         }
//       });
//     });
//     res.status(200).json(tasks);
//   } else if (req.method == "POST") {
//     let file = await fs.promises.readFile("data/StudentList.json");
//     const { taskData, studentId } = req.body;
//     console.log(taskData, studentId);
//     // const { taskData } = JSON.parse(req.body);
//     const studentsList = JSON.parse(file);
//     // console.log(studentsList);
//     let newList = [];
//     if (studentsList) {
//       studentsList?.forEach((list) => {
//         let newStudents = [];
//         list.students.forEach((student) => {
//           if (student.studentId == studentId) {
//             newStudents.push({
//               ...student,
//               tasks: [...(student?.tasks ?? []), taskData],
//             });
//           } else {
//             newStudents.push(student);
//           }
//         });
//         newList.push({ ...(list ?? {}), students: newStudents });
//       });

//       await fs.promises.writeFile(
//         "data/StudentList.json",
//         JSON.stringify(newList),
//         "utf8",
//         (err) => {
//           if (err) {
//             console.log(`Error writing file: ${err}`);
//           } else {
//             console.log(`File is written successfully!`);
//           }
//         }
//       );
//     }

//     // messages.push(taskData);

//     res.status(200).json(taskData);
//   } else if (req.method == "DELETE") {
//     let file = await fs.promises.readFile("data/StudentList.json");
//     const { taskId, studentId } = JSON.parse(req.body);
//     // const { messageId } = req.body;
//     const studentsList = JSON.parse(file);
//     // console.log(studentsList);
//     let newList = [];
//     if (studentsList) {
//       studentsList?.forEach((list) => {
//         let newStudents = [];
//         list.students.forEach((student) => {
//           if (student.studentId == studentId) {
//             newStudents.push({
//               ...student,
//               tasks: (student?.tasks ?? []).filter(
//                 (task) => task.taskId != taskId
//               ),
//             });
//           } else {
//             newStudents.push(student);
//           }
//         });
//         newList.push({ ...(list ?? {}), students: newStudents });
//       });

//       await fs.promises.writeFile(
//         "data/StudentList.json",
//         JSON.stringify(newList),
//         "utf8",
//         (err) => {
//           if (err) {
//             console.log(`Error writing file: ${err}`);
//           } else {
//             console.log(`File is written successfully!`);
//           }
//         }
//       );
//     }
//     res.status(200).json({ msg: "deleted" });
//   }
// }
