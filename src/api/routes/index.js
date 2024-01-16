import {readdirSync} from "fs";
import {Router} from 'express';
// import paymentRouter from './payment'
import patienRouter from './patientRoutes'
import referralRouter from './referralRoutes'
import authRouter from './authRoutes'

const router = Router()

router.use('/patient', patienRouter);   
router.use('/referral', referralRouter);   
router.use('/auth', authRouter);   
readdirSync('src/api/routes').map(async (route) => {
    const {default: handler} = await import(`./${route}`)
    router.use(`/${route.slice(0, -3)}`, handler)

});


export default router
