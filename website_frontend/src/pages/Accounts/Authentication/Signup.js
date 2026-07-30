import { SocialLoginButtons } from "components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signUp } from "services/authServices";

export const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);

    const onSubmit = async({ email, password }) => {
        const { error } = await signUp(email, password);
        setMessage(error ? error.message : "Check your email to confirm your account.");
    }

    return (
        <div>
            <SocialLoginButtons />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', { required: true })} type="email" placeholder="Email" />
                <input {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}
