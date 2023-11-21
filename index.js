import express from 'express';
import mongoose from "mongoose";
import checkAuth from './utils/checkAuth.js'
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import {check} from "express-validator";

mongoose.connect('mongo',
    ).then(() => {
        console.log('DB OK');
    }).catch((err) => {
        console.log('Db Error', err);
    });

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation,UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts',checkAuth ,postCreateValidation , PostController.create);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);


app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server OK');
})
