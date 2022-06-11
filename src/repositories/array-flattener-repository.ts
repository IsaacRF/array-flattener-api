import { inject, injectable, singleton } from 'tsyringe';
import { ArrayFlattenerService } from './../services/array-flattener-service';

/**
 * Array management layer
 *
 * [NOTE]: This layer could seem overcoding in this example where just one operation is
 * performed. In a larger project, this layer would act as a data access abstraction layer, that could
 * consume from various data sources, etc. without altering the components using it
 */
@injectable()
@singleton()
export class ArrayFlattenerRepository {
    constructor(
        @inject("ArrayFlattenerService") private arrayFlattenerService: ArrayFlattenerService
    ) { }

    /**
     * Parses an array that can contain other arrays inside, and returns
     * a flat array
     * @param array Nested (or not) array
     */
    async parseArray(array: any[]): Promise<{ flatArray: any[]; deep: number }> {
        return this.arrayFlattenerService.parseArray(array);
    }
}