"use client";

import { useHalaqatContext } from "../context/HalaqatContext";
import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import image from "../public/background.png";
import jwt from "jsonwebtoken";
import Form from "@mui/material";
import {useStore} from "../store/HalaqatStore"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default async function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false)
  // const { students, surahs, tasks, teachers, loggedIn, setLoggedIn, HalaqatList } =
  //   useHalaqatContext();
  const store = useStore();
  const [valid, setValid] = useState(false);
  const router = useRouter();

  async function submitForm() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    .then((t) => t.json());

    const token = response.token;

    if (token) {
      store.setStudents()
      store.setAnnouncements()
      store.setTeachers()
      store.setTasks()
      store.setSurahs()
      store.setHalaqaList()
      store.setMessages()
      const json = jwt.decode(token)
      setUsername(json.username)
      setPassword(json.password)
      let object = null
      let userRole = ""
      if (store.teachers.findIndex((t) => t.username === json.username) != -1) {
        const index = store.teachers.findIndex((t) => t.username === json.username);
        if (store.teachers[index].isCoordinator) {
          object = store.teachers[index]
          userRole = "coordinator"
        } else {
          object = store.teachers[index]
          userRole = "teacher"
        }
      } else {
        const index = store.students.findIndex((p) => p.username === json.username);
        object = store.students[index]
        userRole = "parent"
        }
      console.log(store.HalaqatList);

      localStorage.setItem('response', JSON.stringify({token: response.token, obj: object, role:userRole }))

      store.setLoggedIn({
        obj: object,
        role: userRole,
        token: response.token
      })
      setValid(true)
      setIncorrect(false)
      router.push('/homepage')
    } else {
      setValid(false)
      setIncorrect(true)
      store.setLoggedIn({obj: null, role: null, token: null})
      localStorage.setItem('token', null)
    }
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button size="large" disabled><AutoStoriesIcon fontSize="large"/></Button>
        <h2>Halaqat Metrash</h2>
        {incorrect && (
          <Typography sx={{ color: "red" }}>Wrong username or password!</Typography>
        )}
        <form
          method="POST"
          action="/api/login"
          display="flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="column" spacing={3} display="flex" justifyContent="center" alignItems="center" >
            <TextField
              type="text"
              size="small"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <br />
            <TextField
              type="password"
              size="small"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <br />
            <Button value="Login" onClick={submitForm} width="100%">
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
