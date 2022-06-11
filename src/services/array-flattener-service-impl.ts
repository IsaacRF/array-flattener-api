import { ArrayFlattenerService } from './array-flattener-service';
import Logger from './../loaders/logger';

/**
 * Implementation of Array Flattener Service
 */
export class ArrayFlattenerServiceImpl implements ArrayFlattenerService {
    private flatArray: any[];
    private deep: number;

    constructor() {
        this.flatArray = [];
        this.deep = 0;
    }

    async parseArray(array: any[]): Promise<{ flatArray: any[]; deep: number }> {
        Logger.info(`Array input: ${JSON.stringify(array)}`);
        this.flatArray = [];
        this.deep = 0;
        await this.flattenArray(array);
        Logger.info(`-- Final Flat Array: ${JSON.stringify(this.flatArray)}`);
        Logger.info(`-- Final Deep: ${this.deep}`);

        return {flatArray: this.flatArray, deep: this.deep};
    }

    /**
     * Uses recursivity to flattens the array passed as parameter
     * to its max deep
     * @param array Array to flatten
     * @param deep Current deep level
     */
    async flattenArray(array: any[], deep: number = 0) {
        deep += 1;
        if (deep > this.deep) {
            this.deep = deep;
        }

        for(let element of array) {
            if (Array.isArray(element)) {
                Logger.info(`> Flatten: ${JSON.stringify(element)}`);
                await this.flattenArray(element, deep);
            } else {
                Logger.info(`+ Flat Array push: ${element}`);
                this.flatArray.push(element);
            }
        }
    }
}