import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const file = await fs.promises.readFile("data/TaskList.json");
    res.status(200).json(JSON.parse(file));
  }
  
  
   else if (req.method == "POST") {
    let file = await fs.promises.readFile("data/TaskList.json");
    let surahsFile = await fs.promises.readFile("data/SurahList.json")
    const tasks = JSON.parse(file);
    const surahs = JSON.parse(surahsFile);
    const { taskData } = req.body;
    const length = tasks.length
    const surahName = surahs.find(surah => surah.id == taskData.surahId)

    const newTask = {
      taskId: Number(tasks[length-1].taskId)+1,
      studentId: taskData.studentId,
      surahId: Number(taskData.surahId),
      surahName: surahName.englishName,
      fromAya: Number(taskData.fromAya),
      toAya: Number(taskData.toAya),
      type: taskData.type,
      dueDate: taskData.dueDate
    }

    tasks.push(newTask);

    await fs.promises.writeFile(
      "data/TaskList.json",
      JSON.stringify(tasks),
      "utf8",
      (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      }
    );
    res.status(200).json(taskData);
  }
  else if (req.method == "PUT") {
    let file = await fs.promises.readFile("data/TaskList.json");
    let surahsFile = await fs.promises.readFile("data/SurahList.json")
    const tasks = JSON.parse(file);
    const surahs = JSON.parse(surahsFile);
    const { taskData } = req.body;

    console.log(taskData)

    const surahName = surahs.find(surah => surah.id == taskData.surahId)

    const requiredIndex = tasks.findIndex(tk => tk.taskId == taskData.taskId)
    console.log(requiredIndex)
    if(requiredIndex != -1){
      tasks[requiredIndex].surahId = Number(taskData.surahId)
      tasks[requiredIndex].surahName = surahName.englishName
      tasks[requiredIndex].fromAya = Number(taskData.fromAya)
      tasks[requiredIndex].toAya = Number(taskData.toAya)
      tasks[requiredIndex].type = taskData.type
      tasks[requiredIndex].dueDate = taskData.dueDate

    await fs.promises.writeFile(
      "data/TaskList.json",
      JSON.stringify(tasks),
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
    res.status(200).json(taskData);
  }
  
  else if (req.method == "DELETE") {
    let file = await fs.promises.readFile("data/TaskList.json");
    const { taskId } = JSON.parse(req.body);
    console.log(taskId);
    const tasks = JSON.parse(file);
    let newTasks = tasks.filter(
      (task) => Number(task.taskId) !== Number(taskId)
    );
    await fs.promises.writeFile(
      "data/TaskList.json",
      JSON.stringify(newTasks),
      "utf8",
      (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      }
    );
    res.status(200).json({ msg: "deleted" });
  }
}
