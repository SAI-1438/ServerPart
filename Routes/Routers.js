const {register,login,logout} = require ("../Controller/Api")

const apiroutes = require ("express").Router()

apiroutes.post("/register", register)
apiroutes.post("/login",login)
apiroutes.post('/logout',logout)

module.exports = apiroutes;