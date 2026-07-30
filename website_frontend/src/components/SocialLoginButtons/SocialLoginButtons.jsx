import { signInWithProvider } from "services/authServices";

export function SocialLoginButtons() {
    return(
        <div>
            <button onClick={() => signInWithProvider('google')}>Continue with Google</button>
            <button onClick={() => signInWithProvider('discord')}>Continue with Discord</button>
            <button onClick={() => signInWithProvider('x')}>Continue with X</button>
        </div>
    )
}
