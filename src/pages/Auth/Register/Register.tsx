import { registerSchema, type RegisterInput } from '@/validation/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AuthSwitcher from '@/components/auth/AuthSwitcher/AuthSwitcher';
import Button from '@/components/ui/Button/Button';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import Heading from '@/components/ui/Heading/Heading';
import Hr from '@/components/ui/Hr/Hr';
import Input from '@/components/ui/Input/Input';
import Stack from '@/components/ui/Stack/Stack';
import useAuthStore from '@/store/useAuthStore';
import LegalNotice from '@/components/auth/LegalNotice/LegalNotice';

export const Component = () => {
    const registerUser = useAuthStore(store => store.register);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        // const result = await registerUser({...data});
    }

    return <>

        <Heading variant='accent' subtitle='Organize your time in a few clicks' level={1}>Join the community</Heading>
        <Hr variant="accent" thickness='medium' opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type='submit' variant='accent' isSubmitting={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Create account'}
                </Button>
                <Button type='button' variant='outline' isSubmitting={isSubmitting}>
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
    </>
}
