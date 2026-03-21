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
    return <div>
        {errors.email && <span>{errors.email?.message}</span>}
        {errors.password && <span>{errors.password?.message}</span>}
        {errors.confirmPassword && <span>{errors.confirmPassword?.message}</span>}
        register
    </div>
}
