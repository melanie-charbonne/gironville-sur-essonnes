import Link from 'next/link'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_USER } from '../../hooks/useAuth'

const LOG_IN = gql`
    mutation logIn($login: String!, $password: String!) {
        loginWithCookies(input: { login: $login, password: $password }) {
            status
        }
    }
`

export default function LogInForm() {
    const [logIn, { loading, error }] = useMutation(LOG_IN, {
        refetchQueries: [{ query: GET_USER }],
    })

    const router = useRouter()
    const previewURL = router.query.path

    const errorMessage = error?.message || ''
    const isEmailValid =
        !errorMessage.includes('empty_email') &&
        !errorMessage.includes('empty_username') &&
        !errorMessage.includes('invalid_email') &&
        !errorMessage.includes('invalid_username')
    const isPasswordValid =
        !errorMessage.includes('empty_password') &&
        !errorMessage.includes('incorrect_password')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const { email, password } = Object.fromEntries(data)
        logIn({
            variables: {
                login: email,
                password,
            },
        }).catch((error) => {
                console.error(error)
        })
    }

    return (
        <>
            <form
                method="post"
                onSubmit={handleSubmit}
                className="mb-4"
                data-bitwarden-watching="1"
            >
                <fieldset disabled={loading} aria-busy={loading} className="flex flex-col gap-2">
                    <label
                        htmlFor="log-in-email"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        id="log-in-email"
                        type="email"
                        name="email"
                        autoComplete="username"
                        required
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <label
                        htmlFor="log-in-password"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Mot de passe
                    </label>
                    <input
                        id="log-in-password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {/* <Link href="/forgot-password">Forgot password?</Link> */}
                    {!isEmailValid ? (
                        <p className="error-message text-sm text-red-600">
                            Adresse email et/ou mot de passe incorrect(s).
                        </p>
                    ) : null}
                    {!isPasswordValid ? (
                        <p className="error-message text-sm text-red-600">
                            Adresse email et/ou mot de passe incorrect(s).
                        </p>
                    ) : null}
                    <button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-blue-dark border-0 py-2 px-8 focus:outline-none hover:bg-blue-darker rounded text-lg"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </fieldset>
            </form>
        </>
    )
}
