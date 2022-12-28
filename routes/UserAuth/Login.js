const route = require( "express" ).Router()
const { Login } = require( "../../controllers/UserControllers" )
route.post( "/", Login )
module.exports=route