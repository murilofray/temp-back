import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';

const router = express.Router();
const authentication = new AuthenticationService();

export default router;
