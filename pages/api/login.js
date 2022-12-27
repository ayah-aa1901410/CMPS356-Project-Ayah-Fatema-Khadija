
import jwt from "jsonwebtoken"
import fs from "fs"

const KEY = "thisisarandomkeyimnotsurewhatitsusedfor"

export default async function func(req, res){
 try{

  const {username, password} = req.body
  console.log(username);
  console.log(password);
  let role = null
  
  let usersLoginInfo = await fs.promises.readFile("data/Login.json")

  usersLoginInfo = JSON.parse(usersLoginInfo)

  const user = usersLoginInfo.findIndex(u => u.username === username)
  
  if(user == -1){
    return res.status(403).json({
      message: "Invalid Username"
    })
  }

  let userPassword = usersLoginInfo[user].password

  let passwordValid = false
  if(userPassword === password){
    passwordValid = true
  }
  
  if(passwordValid){
      res.json({
        token: jwt.sign({
            username,
            password, 
            role: usersLoginInfo[user].role,
        }, KEY, {expiresIn: '2h'})
    })
  }else{
    return res.status(403).json({
      message: "Invalid Username"
    })
  }

 

 }catch(e){
  console.log(e);
 }

}