import fs from "fs"

export default async function handler(req, res) {
  if(req.method === "GET"){
    const file = await fs.promises.readFile("data/StudentList.json")
    res.status(200).json(JSON.parse(file))
  }else if(req.method == "POST"){
    let file = await fs.promises.readFile("data/StudentList.json")
    const {newStudent} = JSON.parse(req.body)
    const parents = JSON.parse(file)
    const exists = parents.find(par => par.qatariId == newStudent.qatariId)
    if(exists !== undefined){
      const student = {
        studentId: newStudent.studentId,
        firstName: newStudent.studentFirstName,
        lastName: newStudent.studentLastName,
        dob: newStudent.date,
        gender: newStudent.gender,
        schoolGrade: newStudent.schoolGrade,
        teacherId: newStudent.teacherId,
        isActive: "active"
      }
      const index = parents.findIndex(par => par.qatariId == newStudent.qatariId)
      parents[index].students.push(student)
      await fs.promises.writeFile("data/StudentList.json", JSON.stringify(parents),'utf8', err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        } else {
          console.log(`File is written successfully!`)
        }
      })
    }else{ 
      let loginFile = await fs.promises.readFile("data/Login.json")
      const logins = JSON.parse(loginFile)
      const newParent = {
        qatariId: newStudent.qatariId,
        firstName: newStudent.parentFirstName,
        lastName: newStudent.parentLastName,
        mobile: newStudent.mobile,
        email: newStudent.email,
        username: newStudent.parentFirstName,
        password: newStudent.password,
        students: [{
            studentId: newStudent.studentId,
            firstName: newStudent.studentFirstName,
            lastName: newStudent.studentLastName,
            dob: newStudent.date,
            gender: newStudent.gender,
            schoolGrade: newStudent.schoolGrade,
            teacherId: newStudent.teacherId,
            isActive: "active"
        }]
      }
      logins.push({
        role: "parent",
        username: newStudent.parentFirstName,
        password: newStudent.password
      })
      parents.push(newParent)

      await fs.promises.writeFile("data/StudentList.json", JSON.stringify(parents),'utf8', err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        } else {
          console.log(`File is written successfully!`)
        }
      })

      await fs.promises.writeFile("data/Login.json", JSON.stringify(logins),'utf8', err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        } else {
          console.log(`File is written successfully!`)
        }
      })
    }
    res.status(200).json(newStudent)


  }else if(req.method == "PUT"){
    let file = await fs.promises.readFile("data/StudentList.json")
    const {updatedStudent} = JSON.parse(req.body)
    const parents = JSON.parse(file)
    const parentIndex = parents.findIndex(par => par.qatariId == updatedStudent.qatariId)
    let loginFile = await fs.promises.readFile("data/Login.json")
    const logins = JSON.parse(loginFile)
    const parentLoginIndex = logins.findIndex(login => login.username == parents[parentIndex].username)
    if(parentIndex !== -1){
      const studentIndex = parents[parentIndex].students.findIndex(stud => stud.studentId == updatedStudent.studentId)
      if(studentIndex !== -1){

        parents[parentIndex].firstName = updatedStudent.parentFirstName
        parents[parentIndex].lastName = updatedStudent.parentLastName
        parents[parentIndex].mobile = updatedStudent.mobile
        parents[parentIndex].email = updatedStudent.email
        parents[parentIndex].students[studentIndex].firstName = updatedStudent.studentFirstName
        parents[parentIndex].students[studentIndex].lastName = updatedStudent.studentLastName
        parents[parentIndex].students[studentIndex].dob = updatedStudent.date
        parents[parentIndex].students[studentIndex].gender = updatedStudent.gender
        parents[parentIndex].students[studentIndex].schoolGrade = updatedStudent.schoolGrade
        parents[parentIndex].students[studentIndex].teacherId = updatedStudent.teacherId
        parents[parentIndex].students[studentIndex].isActive = updatedStudent.isActive
        parents[parentIndex].password = updatedStudent.password

        logins[parentLoginIndex].password = updatedStudent.password

        await fs.promises.writeFile("data/StudentList.json", JSON.stringify(parents),'utf8', err => {
          if (err) {
            console.log(`Error writing file: ${err}`)
          } else {
            console.log(`File is written successfully!`)
          }
        })

        await fs.promises.writeFile("data/Login.json", JSON.stringify(logins),'utf8', err => {
          if (err) {
            console.log(`Error writing file: ${err}`)
          } else {
            console.log(`File is written successfully!`)
          }
        })

      }
    }

    res.status(200).json("updated successfully")

  }

}
