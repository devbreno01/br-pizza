import { Request, Response } from "express";
import { UserDetailService } from "../../services/user/UserDetailService";

class DetailUserController{
    async handle(req:Request , res: Response){
        const user_id  = req.user_id;
        const service = new UserDetailService();

        const user = await service.execute(user_id as string);

        return res.json({
            user
        })
    }
}

export {DetailUserController}; 