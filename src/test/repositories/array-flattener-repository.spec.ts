import 'reflect-metadata';
import { ArrayFlattenerRepository } from '../../repositories/array-flattener-repository';
import { container } from "tsyringe";
import { assert } from 'chai';
import dependencyInjector from "./../../loaders/dependency-injector";

describe('Array Flattener Repository Tests', async () => {
    await dependencyInjector();
    const arrayFlattenerRepository = container.resolve(ArrayFlattenerRepository);

    it('Deep 1', async () => {
        const arrayToParse = [10, 20, 30];
        const arrayResultExpected = [10, 20, 30];
        await testArrayFlatten(arrayToParse, arrayResultExpected, 1);
    });

    it('Deep 2', async () => {
        const arrayToParse = [[10, 20, 30], 40];
        const arrayResultExpected = [10, 20, 30, 40];
        await testArrayFlatten(arrayToParse, arrayResultExpected, 2);
    });

    it('Deep 3', async () => {
        const arrayToParse = [[10, 20, [30]], 40];
        const arrayResultExpected = [10, 20, 30, 40];
        await testArrayFlatten(arrayToParse, arrayResultExpected, 3);
    });

    it('Deep 5', async () => {
        const arrayToParse = [[10, [[20, [30]]], [40]]];
        const arrayResultExpected = [10, 20, 30, 40];
        await testArrayFlatten(arrayToParse, arrayResultExpected, 5);
    });

    async function testArrayFlatten(arrayToParse: any[], arrayResultExpected: any[], deepResultExpected: number){
        const flatArray = await arrayFlattenerRepository.parseArray(arrayToParse);
        assert.deepEqual(flatArray.flatArray, arrayResultExpected, 'Flat array is incorrect.');
        assert.equal(flatArray.deep, deepResultExpected, `Deep is incorrect.`);
    }
});