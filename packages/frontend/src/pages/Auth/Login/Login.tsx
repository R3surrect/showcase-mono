import { loginSchema, type LoginInput } from '@/validation/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AuthSwitcher from '@/components/entities/auth/AuthSwitcher/AuthSwitcher';
import Button from '@/components/entities/Button/Button';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import Heading from "@/components/entities/Heading/Heading";
import Hr from "@/components/entities/Hr/Hr";
import Input from "@/components/entities/Input/Input";
import QrAuth from "@/components/entities/auth/QRAuth/QRAuth";
import Stack from '@/components/entities/Stack/Stack';
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from 'react-router-dom';
import Text from '@/components/entities/Text/Text';

export const Component = () => {
    const navigate = useNavigate();
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
        const minWait = new Promise(resolve => setTimeout(resolve, 300));
        const [loginResult] = await Promise.all([loginUser(data), minWait]);

        if (loginResult?.success) {
            navigate('/analytics', { replace: true });
        } else if (loginResult?.message) {
            const errorMessage = loginResult.status === 401
                ? "Email or password are incorrect"
                : (loginResult.message || "Something went wrong, please try again later");

            setError("root", {
                type: "server",
                message: errorMessage
            })
        }
    }

    return <Stack gap='lg'>
        <Stack gap='sm'>
            <Heading variant="accent" align='center' level={1}>Welcome back</Heading>
            <Text
                align='center'
                weight='bolder'
                color='lightgray'
            >
                Good to see you again
            </Text>
        </Stack>

        <Hr variant="accent" thickness="medium" opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>

                <Input
                    labelText="EMail"
                    type="email"
                    autoComplete='email'
                    error={errors.email?.message}
                    placeholder='site.name@domain.com'
                    {...register('email')}
                />

                <Input
                    labelText="Password"
                    type="password"
                    autoComplete='current-password'
                    error={errors.password?.message}
                    placeholder='_yo4rP@$$w0rdH3re'
                    {...register('password')}
                />
                <ErrorMessage message={errors.root?.message} />
                <Button
                    width='max'
                    type='submit'
                    variant='accent'
                    isSubmitting={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Login'}
                </Button>
                <Button
                    width='max'
                    type='button'
                    variant='outline'
                    disabled={isSubmitting}
                >
                    Login as Guest (Demo mode)
                </Button>
                <AuthSwitcher to='/auth/register' mainText="Don't have an account yet?" linkText='Create one' />

            </Stack>
        </form>

        <Hr variant="accent" thickness="medium" opacity={0.8} shadow={true} />
        <QrAuth text="Or scan the QR code from the app for quick login" />
    </Stack>
}
