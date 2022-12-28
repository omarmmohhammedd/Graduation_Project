const route = require('express').Router()
const { getAllProducts } = require('../controllers/ProductControllers')
const { AddNewProduct } = require('../controllers/ProductControllers')
const { updateProduct } = require('../controllers/ProductControllers')
const { deleteProduct } = require('../controllers/ProductControllers')
const {AddtoCart} = require('../controllers/CartControllers')
const {getCart} = require('../controllers/CartControllers')
const {deleteCart} = require('../controllers/CartControllers')
const verifyRoles = require('../middlewares/verifyRoles')
const verifyToken = require('../middlewares/verifyToken')
const allowedRoles = require('../config/allowedRoles')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})
const uploader = multer({ storage: storage })
route.get('/', verifyToken, getAllProducts)
route.post('/add', verifyRoles(allowedRoles.Admin), uploader.single('productImg'), AddNewProduct)
route.put(
  '/update/:productId',
  verifyRoles(allowedRoles.Admin),
  uploader.single('productImg'),
  updateProduct
)
route.delete('/del/:productId', verifyRoles(allowedRoles.Admin), deleteProduct)
route.get('/userCart/:userId', verifyToken, getCart)
route.post('/addToCart/:userId', verifyToken, AddtoCart)
route.delete('/delToCart/:userId', verifyToken, deleteCart)

module.exports = route
