import { createError } from './error.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verifyToken = (req, res, next) => {
    console.log("this is from verification");

    const token = req.cookies.token;
    if (!token) return next(createError(401, 'Access denied.'));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        next(createError(401, 'Invalid token.'));
    }
};

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(createError(401, 'Access denied.'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.role === "patient" || req.user.isAdmin) {
        next();
    } else {
        next(createError(401, 'Not an Admin or User'));
    }
};

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(createError(401, 'Access denied.'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.isAdmin) {
        next();
    } else {
        next(createError(401, 'Not an Admin'));
    }
};

export const verifyDoctor = (req, res, next) => {
    console.log(req.user.id);
    if (req.user.isDoctor) {
        next();
    } else {
        next(createError(401, 'Not an Admin'));
    }
};
