import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import Heading from '@/components/ui/Heading/Heading';
import Hr from '@/components/ui/Hr/Hr';
import useAuthStore from '@/store/useAuthStore';
import { registerSchema, type RegisterInput } from '@/validation/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

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

    const onSubmit = (data: { email: string; password: string; }) => {
        const result = await registerUser(data);
    }

    return <div>

        <Heading subtitle='Organize your time in a few clicks' variant='accent'>Get started</Heading>
        <Hr variant="accent" thickness='medium' opacity={0.8} shadow={true} />

        <form onSubmit={handleSubmit(onSubmit)}>

            <ErrorMessage message={errors.email?.message} />
            <ErrorMessage message={errors.password?.message} />
            <ErrorMessage message={errors.confirmPassword?.message} />
        </form>
        <Hr variant="accent" thickness='medium' opacity={0.8} shadow={true} />

    </div>
}
