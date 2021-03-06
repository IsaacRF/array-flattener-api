import { Router } from 'express';
import common from './routes/common';

/**
 * API default module.
 *
 * Guaranteed to get dependencies
 */
export default () => {
	const app = Router();
    common(app);

	return app;
}