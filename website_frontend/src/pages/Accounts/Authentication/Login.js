import { SocialLoginButtons } from "components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithPassword } from "services/authServices";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        const { error } = await signInWithPassword(email, password);
        if (error) return setMessage(error.message);
        navigate("/call-of-duty"); // or wherever a logged-in user should land
    }

    return (
        <div>
            <SocialLoginButtons />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email', { required: true })} type="email" placeholder="Email" />
                <input {...register('password', { required: true })} type="password" placeholder="Password" />
                <button type="submit">Log In</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}
