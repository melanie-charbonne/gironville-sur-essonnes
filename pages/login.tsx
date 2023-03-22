import UnAuthContent from '../components/Auth/UnAuthContent'
import LogInForm from '../components/Auth/LoginForm'

export default function LogIn() {
    return (
        <>
            <section className="mt-8 flex justify-center">
                <div className="gap-8 w-full md:w-2/3 lg:w-1/3 p-10 flex flex-col bg-neutral-100">
                    <h1>Connexion</h1>
                    <LogInForm />
                </div>
            </section>
        </>
    )
}
