//Bring router
const {Router} = require('express')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/products')
const {getShoppingCarts, getShoppingCart, createShoppingCart, updateShoppingCart, deleteShoppingCart, listProductsShoppingCart, saveProductShoppingCart,
    deleteProductShoppingCart} = require ('../controller/shopping-cart-products')

const {getOrders, getOrder, createOrder, updateOrder, deleteOrder, listProductsOrder, saveProductOrder,
    deleteProductOrder} = require ('../controller/order-products')

//Instance router
const router = Router()

router.get('/product', getProducts)
router.post('/product', createProduct)
router.get('/product/:id', getProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

router.get('/shopping-cart', getShoppingCarts)
router.post('/shopping-cart', createShoppingCart)
router.get('/shopping-cart/:id', getShoppingCart)
router.put('/shopping-cart/:id', updateShoppingCart)
router.delete('/shopping-cart/:id', deleteShoppingCart)
router.get("/shopping-cart/:id/products", listProductsShoppingCart);
router.post("/shopping-cart/:id/products", saveProductShoppingCart);
/*router.put("/post/:id/comments/:commentId", updateProduct);*/
router.delete("/shopping-cart/:id/products/:productId", deleteProductShoppingCart);

router.get('/order', getOrders)
router.post('/order', createOrder)
router.get('/order/:id', getOrder)
router.put('/order/:id', updateOrder)
router.delete('/order/:id', deleteOrder)
router.get("/order/:id/products", listProductsOrder);
router.post("/order/:id/products", saveProductOrder);
/*router.put("/post/:id/comments/:commentId", updateProduct);*/
router.delete("/order/:id/products/productId:", deleteProductOrder);




module.exports = router