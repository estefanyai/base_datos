import { Request , Response, NextFunction} from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error.status === 400){
        const status = 400;
        const message = "Bad Request";
        res.status(status).json({message});
    }

    if (error.status === 401 && error.message === "Unauthorized") {
        const status = 401;
        const message = "Unauthorized";

        res.status(status).json({message});

        return;
    }

    if (
        error.status === 401 &&
        error.code === "invalid_token" &&
        error.message === "Permission denied"
    ) {
        const status = 403;
        const message = "Forbidden";

        res.status(status).json({message});

        return;
    }

    const status = error.statusCode || error.code || 500;
    const message = "internal error";
    
    res.status(status).json({ message });
};

export default errorHandler