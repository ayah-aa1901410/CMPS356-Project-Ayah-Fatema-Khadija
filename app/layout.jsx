"use client"
import  HalaqatProvider  from "../context/HalaqatContext.js"

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          {/* <HalaqatProvider> */}
            <head />
            <body style={{backgroundColor: "#F3F3F3"}}>{children}</body>
          {/* </HalaqatProvider> */}
      </html>
  )
}
