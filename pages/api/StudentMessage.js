import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const file = await fs.promises.readFile("data/StudentList.json");
    const studentsList = JSON.parse(file);
    const { studentId } = req.query;

    let messages = [];
    studentsList?.forEach((list) => {
      list.students.forEach((student) => {
        if (student.studentId == studentId) {
          messages = student?.messages ?? [];
        }
      });
    });
    res.status(200).json(messages);
  } else if (req.method == "POST") {
    let file = await fs.promises.readFile("data/StudentList.json");
    const { messageData, studentId } = req.body;
    console.log(messageData, studentId);
    // const { messageData } = JSON.parse(req.body);
    const studentsList = JSON.parse(file);
    // console.log(studentsList);
    let newList = [];
    if (studentsList) {
      studentsList?.forEach((list) => {
        let newStudents = [];
        list.students.forEach((student) => {
          if (student.studentId == studentId) {
            newStudents.push({
              ...student,
              messages: [...(student?.messages ?? []), messageData],
            });
          } else {
            newStudents.push(student);
          }
        });
        newList.push({ ...(list ?? {}), students: newStudents });
      });

      await fs.promises.writeFile(
        "data/StudentList.json",
        JSON.stringify(newList),
        "utf8",
        (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          } else {
            console.log(`File is written successfully!`);
          }
        }
      );
    }

    // messages.push(messageData);

    res.status(200).json(messageData);
  } else if (req.method == "DELETE") {
    let file = await fs.promises.readFile("data/StudentList.json");
    const { messageId, studentId } = JSON.parse(req.body);
    // const { messageId } = req.body;
    const studentsList = JSON.parse(file);
    // console.log(studentsList);
    let newList = [];
    if (studentsList) {
      studentsList?.forEach((list) => {
        let newStudents = [];
        list.students.forEach((student) => {
          if (student.studentId == studentId) {
            newStudents.push({
              ...student,
              messages: (student?.messages ?? []).filter(
                (task) => task.id != messageId
              ),
            });
          } else {
            newStudents.push(student);
          }
        });
        newList.push({ ...(list ?? {}), students: newStudents });
      });

      await fs.promises.writeFile(
        "data/StudentList.json",
        JSON.stringify(newList),
        "utf8",
        (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          } else {
            console.log(`File is written successfully!`);
          }
        }
      );
    }
    res.status(200).json({ msg: "deleted" });
  }
}
