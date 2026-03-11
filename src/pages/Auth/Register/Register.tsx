import useAuthStore from '@/store/useAuthStore';
import { registerSchema, type RegisterInput } from '@/validation/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const Register = () => {
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
        register
    </div>
}

export default Register;
