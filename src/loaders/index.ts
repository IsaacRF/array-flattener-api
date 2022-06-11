import "reflect-metadata";
import express from 'express'
import expressLoader from './express';
import Logger from './logger';
import dependencyInjector from "./dependency-injector";

/**
 * Loaders default module
 */
export default async ({ expressApp }: { expressApp: express.Application }) => {

    await dependencyInjector();
    Logger.info('✌️ Dependencies Injected');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};