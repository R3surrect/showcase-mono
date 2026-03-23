import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from "@/components/ui/Input/Input";
import Heading from "@/components/ui/Heading/Heading";
import Hr from "@/components/ui/Hr/Hr";
import QrAuth from "@/components/auth/QRAuth/QRAuth";
import useAuthStore from "@/store/useAuthStore";
import { loginSchema, type LoginInput } from '@/validation/loginSchema';
import Stack from '@/components/ui/Stack/Stack';
import Button from '@/components/ui/Button/Button';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';

export const Component = () => {
    const loginUser = useAuthStore(store => store.login);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        shouldFocusError: true,
    });

    const onSubmit = async (data: LoginInput) => {

        //* The "Benevolent Deception" Approach to Prevent Button Flashing

        const minWait = new Promise(resolve => setTimeout(resolve, 300));
        const [loginResult] = await Promise.all([loginUser(data), minWait]);

        if (!loginResult.success) {
            const errorMessage = loginResult.status === 401
                ? "Email or password are incorrect"
                : (loginResult.message || "Something went wrong, please try again later");

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
                    placeholder='site.name@domain.com'
                    aria-label='EMail'
                    {...register('email')}
                />

                <Input
                    labelText="Password"
                    type="password"
                    autoComplete='current-password'
                    error={errors.password?.message}
                    placeholder='yo4rP@$$w0rdH3r3'
                    aria-label='Password'
                    {...register('password')}
                />
                <Button type='submit' variant='accent' isSubmitting={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </Button>
                <Button type='button' variant='outline' disabled={isSubmitting}>
                    Login as Guest (Demo mode)
                </Button>
                <ErrorMessage message={errors.root?.message} />
            </Stack>
        </form>

        <Hr variant="accent" thickness="medium" opacity={0.8} shadow={true} />
        <QrAuth text="Or scan the QR code from the app for quick login" />
    </>
}
