import express from 'express';
import { sendInquiry } from '../controllers/inquiryController.js';

const inquiryRouter = express.Router();

inquiryRouter.post('/send', sendInquiry);

export default inquiryRouter;
