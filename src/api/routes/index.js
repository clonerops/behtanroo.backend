const {readdirSync} = require("fs") ;
const {Router} = require('express') ;
// const paymentRouter = require() './payment'
const patienRouter = require('./patientRoutes.js') 
const doctorRouter = require('./doctorRoutes.js') 
const referralRouter = require('./referralRoutes.js') 
const authRouter = require('./authRoutes.js') 
const documentRouter = require('./documentRoutes.js') 
const patientdocumentRouter = require('./patirntdocumentRoutes.js') 
const reportRouter = require('./reportRoutes.js') 

const router = Router()

router.use('/patient', patienRouter);   
router.use('/doctor', doctorRouter);   
router.use('/referral', referralRouter);   
router.use('/auth', authRouter);   
router.use('/document', documentRouter);   
router.use('/patientdocument', patientdocumentRouter);   
router.use('/report', reportRouter);   
readdirSync('src/api/routes').map(async (route) => {
    const {default: handler} = await import(`./${route}`)
    router.use(`/${route.slice(0, -3)}`, handler)

});


module.exports = router
