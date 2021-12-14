import { Router } from 'express';
import authRouter from './User/UserRouter';
import permissionRouter from './Permission/Permission.router';
import roleRouter from './Role/role.router';
import adminRouter from './Admin/admin.router';
import settingRouter from './Setting/Setting.router';
import exchangeRouter from './Exchange/exchange.router';
import coinRouter from './Coin/coin.router';
import currencyPairRouter from './CurrencyPair/currencyPair.router';
import userActivityPairRouter from './UserActivity/user-activity.router';
import userLevelRouter from './UserLevel/userLevel.router';
import comissionRouter from './Comission/comission.router';
import networkRouter from './Network/network.router';
import langaugeRouter from './Langauge/Langauge.router';
import getwayTypeRouter from './GetwayType/getwayType.router';
import userRouter from './User Manager/user.router';
import countryRouter from './Country/Country.router';


const router = Router();

router.use('/api/auth', authRouter);

router.use('/api/admin', adminRouter);

router.use('/api/permission', permissionRouter);

router.use('/api/role', roleRouter);

router.use('/api/setting', settingRouter);

router.use('/api/exchange', exchangeRouter);

router.use('/api/coin', coinRouter);

router.use('/api/currencyPair', currencyPairRouter);

router.use('/api/userActivity', userActivityPairRouter);

router.use('/api/userLevel', userLevelRouter);

router.use('/api/comission', comissionRouter);

router.use('/api/network', networkRouter);

router.use('/api/language', langaugeRouter);

router.use('/api/getwayType', getwayTypeRouter);

router.use('/api/user', userRouter);

router.use('/api/country', countryRouter);

export default router;