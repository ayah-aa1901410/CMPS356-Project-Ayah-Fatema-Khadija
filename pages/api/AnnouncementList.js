import fs from "fs"

export default async function handler(req, res){

    if(req.method === "GET"){
        const file = await fs.promises.readFile("data/AnnouncementList.json")
        res.status(200).json(JSON.parse(file))
    }else if(req.method === "POST"){
        let file = await fs.promises.readFile("data/AnnouncementList.json")
        let announcementList = JSON.parse(file)
        const announcementBody = JSON.parse(req.body).newAnnouncement

        const newAnnouncement = {
            announcementId: announcementList[announcementList.length-1].announcementId+1,
            title: announcementBody.title,
            content: announcementBody.content,
            image: announcementBody.image,
            date: announcementBody.date
        }

        announcementList.push(newAnnouncement)

        await fs.promises.writeFile("data/AnnouncementList.json", JSON.stringify(announcementList),'utf8', err => {
            if (err) {
              console.log(`Error writing file: ${err}`)
            } else {
              console.log(`File is written successfully!`)
            }
          })

        res.status(200).json("success")
    }else if(req.method === "PUT"){
        const file = await fs.promises.readFile("data/AnnouncementList.json")
        let announcementList = JSON.parse(file)
        const {updAnnouncement} = JSON.parse(req.body)

        const index = announcementList.findIndex(ann => ann.announcementId == updAnnouncement.announcementId)
        console.log(index);
        if(index != -1){
            announcementList[index].announcementId = updAnnouncement.announcementId
            announcementList[index].title = updAnnouncement.title
            announcementList[index].content = updAnnouncement.content
            announcementList[index].image = updAnnouncement.image
            announcementList[index].date = updAnnouncement.date

            await fs.promises.writeFile("data/AnnouncementList.json", JSON.stringify(announcementList),'utf8', err => {
                if (err) {
                  console.log(`Error writing file: ${err}`)
                } else {
                  console.log(`File is written successfully!`)
                }
              })
        }


        res.status(200).json("success")
    }else if(req.method === "DELETE"){
        const file = await fs.promises.readFile("data/AnnouncementList.json")
        let announcementList = JSON.parse(file)
        const {announcementId} = JSON.parse(req.body)

        const index = announcementList.findIndex(ann => ann.announcementId == announcementId)

        if(index != -1){
          announcementList.splice(index, 1)
          await fs.promises.writeFile("data/AnnouncementList.json", JSON.stringify(announcementList),'utf8', err => {
            if (err) {
              console.log(`Error writing file: ${err}`)
            } else {
              console.log(`File is written successfully!`)
            }
          })
        }
        res.status(200).json("success")
    }

}