import { Request, Response } from 'express';
import WebUtil from '../utils/webUtil';
import * as Constants from '../utils/constants';

class Logout {
    public logout = (req: Request, res: Response): void => {
        res.clearCookie('usertoken');
        WebUtil.response(res, Constants.LOGGED_OUT, 200)
    }
}

export default new Logout();