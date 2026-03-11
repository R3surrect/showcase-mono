import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from "@/components/ui/Input/Input";
import stylesObj from "./Login.module.css";
import Heading from "@/components/ui/Heading/Heading";
import Hr from "@/components/ui/Hr/Hr";
import QrAuth from "@/components/auth/QRAuth/QRAuth";
import useAuthStore from "@/store/useAuthStore";
import { loginSchema, type loginInput } from '@/validation/loginSchema';


const Login = () => {
    const loginUser = useAuthStore(store => store.login);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data: loginInput) => {
        loginUser(data);
    }

    return <>

        <Heading level={1} className={stylesObj.heading}>Welcome Back</Heading>
        <Hr variant="accent" thickness="thick" opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={stylesObj.formWrapper}>

                <Input
                    labelText="EMail"
                    type="email"
                    required
                    {...register('email')}
                />

                {errors && <span>{errors.email?.message}</span>}

                <Input
                    labelText="Password"
                    type="password"
                    required
                    {...register('password')}
                />

                {errors && <span>{errors.password?.message}</span>}

                <button className={stylesObj.button} type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>

            </div>
        </form>

        <Hr variant="accent" thickness="thick" opacity={0.8} shadow={true} />
        <QrAuth text="Или отсканируйте QR-код из приложения для быстрого входа" />
    </>
    {/*//ToDO QR-Code */ }
}

export default Login;
