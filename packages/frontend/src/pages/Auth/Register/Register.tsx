import { registerSchema, type RegisterInput, type RegisterPayload } from '@/validation/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitErrorHandler } from 'react-hook-form';

import AuthSwitcher from '@/components/entities/auth/AuthSwitcher/AuthSwitcher';
import Button from '@/components/entities/Button/Button';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import Heading from '@/components/entities/Heading/Heading';
import Hr from '@/components/entities/Hr/Hr';
import Input from '@/components/entities/Input/Input';
import Stack from '@/components/entities/Stack/Stack';
import useAuthStore from '@/store/useAuthStore';
import LegalNotice from '@/components/entities/auth/LegalNotice/LegalNotice';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/entities/Text/Text';
import useToast from '@/components/entities/Toast/Toast.hook';

export const Component = () => {
    const navigate = useNavigate();
    const { pushToast } = useToast();
    const registerUser = useAuthStore(store => store.register);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async ({ ...payload }: RegisterPayload) => {
        const minWait = new Promise(resolve => setTimeout(resolve, 300));
        const [registerResult] = await Promise.all([registerUser(payload), minWait]);

        if (registerResult?.success) navigate('/analytics', { replace: true });
        else if (registerResult?.message) {
            setError("root", {
                type: "server",
                message: registerResult.message,
            });
        }
    }

    const onError: SubmitErrorHandler<RegisterInput> = (errors) => {
        if (errors.email?.message) pushToast({ text: errors.email?.message, type: 'popup', label: 'Email error', status: 'error' });
        if (errors.password?.message) pushToast({ text: errors.email?.message, type: 'popup', label: 'Password error', status: 'error' });
        if (errors.confirmPassword?.message) pushToast({ text: errors.email?.message, type: 'popup', label: 'Confirm error', status: 'error' });
    }

    return <Stack gap='lg'>
        <Stack gap='md'>
            <Heading variant='accent' level={1} align='center'>Join the community</Heading>
            <Text align='center' weight='bolder' color='lightgray'>Organize your time in a few clicks</Text>
        </Stack>

        <Hr variant="accent" thickness='medium' opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Stack>
                <Input
                    labelText='EMail'
                    type='email'
                    autoComplete='email'
                    error={errors.email?.message}
                    placeholder='site.name@domain.com'
                    {...register('email')}
                />
                <Input
                    labelText='Password'
                    type='password'
                    autoComplete='off'
                    error={errors.password?.message}
                    placeholder='_yo4rP@$$w0rdH3re'
                    {...register('password')}
                />
                <Input
                    labelText='Confirm password'
                    type='password'
                    autoComplete='off'
                    error={errors.confirmPassword?.message}
                    placeholder='_yo4rP@$$w0rdH3re'
                    {...register('confirmPassword')}
                />
                <ErrorMessage message={errors.root?.message} />
                <Button
                    width='max'
                    type='submit'
                    variant='accent'
                    isSubmitting={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Create account'}
                </Button>
                <Button
                    width='max'
                    type='button'
                    variant='outline'
                    isSubmitting={isSubmitting}
                >
                    Explore as a Guest
                </Button>
                <LegalNotice
                    prefix='By joining you agree to the'
                    links={[
                        { title: 'Terms of Service', route: '/legal/terms' },
                        { title: 'Privacy Policy', route: '/legal/privacy' },
                    ]} />
                <AuthSwitcher mainText='Already a member?' linkText='Sign in' to='/auth/login' />
            </Stack>
        </form>
    </Stack>
}
