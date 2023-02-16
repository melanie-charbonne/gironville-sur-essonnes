import UnAuthContent from '../components/Auth/UnAuthContent'
import LogInForm from '../components/Auth/LoginForm'

export default function LogIn() {
    return (
        <>
            <h1>Connexion</h1>
            <UnAuthContent>
                <LogInForm />
            </UnAuthContent>
        </>
    )
}
