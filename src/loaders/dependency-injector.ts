import { ArrayFlattenerServiceImpl } from './../services/array-flattener-service-impl';
import { container } from "tsyringe";
import Logger from './../loaders/logger';

/**
 * Dependency injector / provider
 */
export default async () => {
    try {
        //Provide Array Flattener Service
        container.register("ArrayFlattenerService", {
            useClass: ArrayFlattenerServiceImpl
        });
    } catch (e) {
        Logger.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
}