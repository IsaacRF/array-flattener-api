import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';

/**
 * Express initializer
 */
export default async ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.head('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(require('method-override')());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());
    // Load API routes
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404);
        next(createError(404));
    });

    /// error handlers
    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        switch (err.name) {
            //Check for custom errors here
        }
        return next(err);
    });
    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).send({ message: err.message });
    });
};
