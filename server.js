import express from "express"
import { config } from "dotenv"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"


config()

const app = express()

app.get('/', (req,res) => {
    res.send("Hello World")
} )

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})