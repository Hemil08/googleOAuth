import express from "express"
import { config } from "dotenv"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport"


config()

const app = express()

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},(_, __, profile,done) => {
    return done(null,profile)
}))

app.get("/auth/google",(req,res)=>{
    passport.authenticate("google", {scope: ["profile", "email"]})
})


app.get('/auth/google/callback',

    passport.authenticate('google',{failureRedirect:'/'}),
    (req, res) => {
        console.log(req.user)
        res.send("Google authentication successful")
    }
)

app.get('/', (req,res) => {
    res.send("Hello World")
} )

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})