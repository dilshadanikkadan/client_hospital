import {body,validationResult} from "express-validator"

export const validateSignup = [
    body('username').notEmpty().withMessage('Username cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
   
];
