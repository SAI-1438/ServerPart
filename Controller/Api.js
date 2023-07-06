const dotenv = require('dotenv')
dotenv.config()

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const secretkey = process.env.secret_key

let storedData = []

const register = (req,res)=>{

    const data = req.body;
    const user = storedData.find((item) => {
        if(item.email === data.email){
            return item;
        }
    })
    if(user){
        res.send({
            msg:"user already exist"
        })
    }else{
        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(data.password,salt)
        const token = jwt.sign({user:"item.email"},secretkey)

        const tempObj = {
            name:data.name,
            email:data.email,
            password:hashedPassword,
            contact:data.contact
        }

        storedData.push(tempObj)
        res.send({
            msg:"user registered successfully with token",
            token:token
        })
        // const options = {
        //     expires:new Date(
        //         Date.now()+2*24*60*60
        //     )
        // }
        // storedData.push(tempObj)
        // res.status(200).cookie("tokenName",token,options).send(storedData)
    }
}

const login = (req,res)=>{
    
    const data = req.body;
    storedData.find((item)=>{
        if(item.email === data.email){
            const validate = bcrypt.compareSync(data.password,item.password)
            const token =jwt.sign({user:"item.email"},secretkey)
            if(validate){
                res.send({
                    msg:"user logged in",
                    token:token
                })
            }
            else{
                res.send("user password is wrong")
                return;
            }
        }
    })
    res.send({
        msg:"user is not registered"
    })
    // const user = storedData.find((item)=> item.email === data.email)

    // if(user.email === data.email){
    //     const validate = bcrypt.compareSync(data.password,user.password)
    //     const token = jwt.sign({user:user.email},secretkey,{expiresIn:"1d"})

        // if(validate){
        //     const userInfo = {
        //         email:user.email,
        //         password:user.password,
        //         token:token
        //     }
        //     const options = {
        //         expires:new Date(
        //             Date.now()+2*24*60*60
        //         )
        //     }
        //     res.status(200).cookie("tokenName",token,options).send(userInfo)
        // }
    //     else{
    //         res.send("user password is invalid")
    //     }
    // }else{
    //     res.send("user has not registered, please register")
    // }
}

const logout = (req,res)=>{
    res.send({
        msg:"user Logged out"
    })
    // res.cookie("tokenName",{
    //     expires:new Date(Date.now())
    // })
    // res.status(200).json({
    //     msg:"user logedout"
    // })
}

module.exports = {register,login, logout}