import {Request, Response} from 'express';

class AuthUserController {
    async handle(req: Request, res: Response){

        const { email , password} = req.body; 

        return res.json(true)
    }
}

export {AuthUserController}; 