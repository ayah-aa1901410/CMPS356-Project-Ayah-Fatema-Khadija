import fs from "fs"

export default async function handler(req, res) {
    if(req.method === "GET"){
        const file = await fs.promises.readFile("data/TeacherList.json")
        res.status(200).json(JSON.parse(file))
    }
}