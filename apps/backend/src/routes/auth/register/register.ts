import { Hono } from "hono";
import REGISTER_USER_QUERY from "./register.query.js";
import bcrypt from 'bcryptjs';

const registerRouter = new Hono();

interface RegisterData {
    email: string;
    password: string;
}

registerRouter.post('/register', async (c) => {
    try{
        const {email, password } = await c.req.json<RegisterData>();
        const hash = bcrypt.hash(password, 12);

        
    } catch(e){
        console.error(e);
    }
})