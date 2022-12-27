import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const file = await fs.promises.readFile("data/MessageList.json");
    res.status(200).json(JSON.parse(file));
  } 
  
  else if (req.method == "POST") {
    let file = await fs.promises.readFile("data/MessageList.json");
    const messages = JSON.parse(file)
    const { messageData } = req.body;
    const length = messages.length
    const newMessage= {
      messageId: messages[length-1].messageId+1,
      title: messageData.title,
      studentId: messageData.studentId,
      postedAt: messageData.postedAt,
      message: messageData.message
    }

    messages.push(newMessage);
    await fs.promises.writeFile(
      "data/MessageList.json",
      JSON.stringify(messages),
      "utf8",
      (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      }
    );
    res.status(200).json(messageData);
  } else if (req.method == "PUT") {
    let file = await fs.promises.readFile("data/MessageList.json");
    const messages = JSON.parse(file)
    const { messageData } = JSON.parse(req.body);

    const requiredIndex = messages.findIndex(mess => mess.messageId == messageData.messageId)

    if(requiredIndex != -1){
      messages[requiredIndex].title = messageData.title
      messages[requiredIndex].postedAt = messageData.postedAt
      messages[requiredIndex].message = messageData.message

      await fs.promises.writeFile(
        "data/MessageList.json",
        JSON.stringify(messages),
        "utf8",
        (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          } else {
            console.log(`File is written successfully!`);
          }
        }
      );
      res.status(200).json(messageData);
    }

  } else if (req.method == "DELETE") {
    let file = await fs.promises.readFile("data/MessageList.json");
    // const { messageId } = JSON.parse(req.body);
    const { messageId } = JSON.parse(req.body);
    
    const messages = JSON.parse(file);

    // const index = announcementList.findIndex(ann => ann.announcementId == announcementId)
    // announcementList.splice(index, 1)

    const index = messages.findIndex(mess => mess.messageId == messageId)
    console.log(index)
    messages.splice(index,1)


    await fs.promises.writeFile(
      "data/MessageList.json",
      JSON.stringify(messages),
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
