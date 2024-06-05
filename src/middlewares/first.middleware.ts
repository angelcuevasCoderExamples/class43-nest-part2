import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

class FirstMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`request ${req.method} - ${req.path}`);
        next()
    }
}

export default FirstMiddleware;