import { Router } from 'express';
import authRouter from './User/UserRouter';
import permissionRouter from './Permission/Permission.router';
import roleRouter from './Role/role.router';
import adminRouter from './Admin/admin.router';
import settingRouter from './Setting/Setting.router';
import exchangeRouter from './Exchange/exchange.router';
import coinRouter from './Coin/coin.router';
import currencyPairRouter from './CurrencyPair/coin.router';
import userActivityPairRouter from './UserActivity/user-activity.router';
import userLevelRouter from './UserLevel/userLevel.router';
import comissionRouter from './Comission/comission.router';

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

export default router;