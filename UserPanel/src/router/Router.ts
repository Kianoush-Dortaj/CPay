import { Router } from 'express';
import authRouter from './Auth/AuthRouter';
import userSettingRouter from './UserSetting/UserSetting.router';
import userVerificationRouter from './UserVerfication/user-verification.router';
import coinRouter from './Coin/coin.router';
import paymentRouter from './PaymentGetway/payment-getway.router';


const router = Router();

router.use('/api/auth', authRouter);

router.use('/api/setting', userSettingRouter);

router.use('/api/verification', userVerificationRouter);

router.use('/api/coin', coinRouter);

router.use('/api/fiat', paymentRouter);


// router.use('/api/admin', adminRouter);

// router.use('/api/permission', permissionRouter);

// router.use('/api/role', roleRouter);

// router.use('/api/setting', settingRouter);

// router.use('/api/exchange', exchangeRouter);


// router.use('/api/currencyPair', currencyPairRouter);

// router.use('/api/userActivity', userActivityPairRouter);

// router.use('/api/userLevel', userLevelRouter);

// router.use('/api/comission', comissionRouter);

// router.use('/api/network', networkRouter);

// router.use('/api/language', langaugeRouter);

// router.use('/api/getwayType', getwayTypeRouter);

// router.use('/api/user', userRouter);

export default router;