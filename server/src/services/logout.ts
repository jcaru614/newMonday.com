import { Request, Response } from 'express';

class Logout {
    public logout = (req: Request, res: Response): void => {
        console.log('got here logout')
        res.clearCookie('usertoken').json({ msg: 'logged out' })
    }
}

export default new Logout();