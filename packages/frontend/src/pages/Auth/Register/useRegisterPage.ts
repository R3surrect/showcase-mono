import useToast from "@/components/entities/Toast/Toast.hook";
import useAuthStore from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput, type RegisterPayload } from "@showcase-mono/backend/routes/api/v1/auth/register/register.schema";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useRegisterPage = () => {
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
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
    });

    const onSubmit = async ({ ...payload }: RegisterPayload) => {
        const minWait = new Promise(resolve => setTimeout(resolve, 300));
        const [registerResult] = await Promise.all([registerUser(payload), minWait]);

        if (registerResult?.success) {
            navigate('/analytics', { replace: true });
            pushToast({
                text: `It looks like your timezone is the '${Intl.DateTimeFormat().resolvedOptions().timeZone}'. Is that right?`,
                label: 'Timezone',
                status: 'info',
                type: 'dialog',
                confirmLabel: 'Yes',
                denyLabel: 'Change',
                onDeny() { console.log('changed click') },
                onConfirm() {

                },
            });
        }
        else if (registerResult?.message) {
            setError("root", {
                type: "server",
                message: registerResult.message,
            });
        }
    }

    const onError: SubmitErrorHandler<RegisterInput> = (errors) => {
        if (errors.email?.message) pushToast({ text: errors.email?.message, type: 'popup', label: 'Email error', status: 'error' });
        if (errors.password?.message) pushToast({ text: errors.password?.message, type: 'popup', label: 'Password error', status: 'error' });
        if (errors.confirmPassword?.message) pushToast({ text: errors.confirmPassword?.message, type: 'popup', label: 'Confirm error', status: 'error' });
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        onError
    }
}

export default useRegisterPage;