import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from "@/components/ui/Input/Input";
import stylesObj from "./Login.module.css";
import Heading from "@/components/ui/Heading/Heading";
import Hr from "@/components/ui/Hr/Hr";
import QrAuth from "@/components/auth/QRAuth/QRAuth";
import useAuthStore from "@/store/useAuthStore";
import { loginSchema, type loginInput } from '@/validation/loginSchema';
import Stack from '@/components/ui/Stack/Stack';

export const Component = () => {
    const loginUser = useAuthStore(store => store.login);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<loginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        shouldFocusError: true,
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        const result = await loginUser(data);

        if (!result.success) {
            const errorMessage = result.status === 401
                ? "Email or password are incorrect"
                : (result.message || "Something went wrong, please try again later");

            setError("root", {
                type: "server",
                message: errorMessage
            })
        }
    }

    return <>

        <Heading variant="accent" subtitle='Good to see you again' level={1}>Welcome back</Heading>
        <Hr variant="accent" thickness="medium" opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>

                <Input
                    labelText="EMail"
                    type="email"
                    autoComplete='email'
                    error={errors.email?.message}
                    placeholder='name@domain.com'
                    {...register('email')}
                />


                <Input
                    labelText="Password"
                    type="password"
                    autoComplete='current-password'
                    error={errors.password?.message}
                    placeholder='********'
                    {...register('password')}
                />

                <button className={stylesObj.button} type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                {errors.root && <span className={stylesObj.errorMessage}>{errors.root.message}</span>}
            </Stack>
        </form>

        <Hr variant="accent" thickness="medium" opacity={0.8} shadow={true} />
        <QrAuth text="Or scan the QR code from the app for quick login" />
    </>
}
