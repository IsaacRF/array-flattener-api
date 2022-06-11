import { ArrayFlattenerRepository } from './../../repositories/array-flattener-repository';
import { Router } from 'express';
import { container } from "tsyringe";
const route = Router();

/**
 * Common routes
 */
export default (app: Router) => {
    const arrayFlattenerRepository = container.resolve(ArrayFlattenerRepository);
    app.use('/', route);

    //Main URL
    route.post('/',
        async function (req, res) {
            const {flatArray, deep} = await arrayFlattenerRepository.parseArray(req.body);

            res
                .status(200)
                .json({flatArray, deep});
        });
}