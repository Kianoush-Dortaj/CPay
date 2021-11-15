import { Router } from 'express';
import authRouter from './User/UserRouter';
import permissionRouter from './Permission/Permission.router';
import roleRouter from './Role/role.router';
import adminRouter from './Admin/admin.router';
import settingRouter from './Setting/Setting.router';
import exchangeRouter from './Exchange/exchange.router';
import coinRouter from './Coin/coin.router';
import currencyPairRouter from './CurrencyPair/coin.router';


const router = Router();

router.use('/api/auth', authRouter);

router.use('/api/admin', adminRouter);

router.use('/api/permission', permissionRouter);

router.use('/api/role', roleRouter);

router.use('/api/setting', settingRouter);

router.use('/api/exchange', exchangeRouter);

router.use('/api/coin', coinRouter);

router.use('/api/currencyPair', currencyPairRouter);




export default router;