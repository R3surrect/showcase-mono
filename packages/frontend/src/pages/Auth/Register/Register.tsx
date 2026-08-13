import AuthSwitcher from '@/components/entities/auth/AuthSwitcher/AuthSwitcher';
import Button from '@/components/entities/Button/Button';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import Heading from '@/components/entities/Heading/Heading';
import Hr from '@/components/entities/Hr/Hr';
import Input from '@/components/entities/Input/Input';
import Stack from '@/components/entities/Stack/Stack';
import LegalNotice from '@/components/entities/auth/LegalNotice/LegalNotice';
import Text from '@/components/entities/Text/Text';
import useRegisterPage from './useRegisterPage';

export const Component = () => {
    const { register, handleSubmit, errors, isSubmitting, onSubmit, onError } = useRegisterPage();

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
