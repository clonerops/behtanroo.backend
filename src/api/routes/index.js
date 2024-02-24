const {readdirSync} = require("fs") ;
const {Router} = require('express') ;
// const paymentRouter = require() './payment'
const patienRouter = require('./patientRoutes.js') 
const referralRouter = require('./referralRoutes.js') 
const authRouter = require('./authRoutes.js') 
const documentRouter = require('./documentRoutes.js') 

const router = Router()

router.use('/patient', patienRouter);   
router.use('/referral', referralRouter);   
router.use('/auth', authRouter);   
router.use('/document', documentRouter);   
readdirSync('src/api/routes').map(async (route) => {
    const {default: handler} = await import(`./${route}`)
    router.use(`/${route.slice(0, -3)}`, handler)

});


module.exports = router
