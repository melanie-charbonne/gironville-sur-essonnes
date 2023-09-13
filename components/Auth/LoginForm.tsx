
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import LOG_IN from '../../lib/api/mutations/login'
import { getPreviewRedirectUrl } from '../../utils/preview-redirect'
import axios from 'axios'

export default function LogInForm() {
    const router = useRouter()
    const [logIn, { loading, error }] = useMutation(LOG_IN)

    const errorMessage = error?.message || ''
    const isUsernameValid =
        !errorMessage.includes('empty_username') &&
        !errorMessage.includes('invalid_username')
    const isPasswordValid =
        !errorMessage.includes('empty_password') &&
        !errorMessage.includes('incorrect_password')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const { username, password } = Object.fromEntries(data)
        const { postType, previewPostId } = router?.query ?? {}

        return logIn({
            variables: {
                input: {
                    username,
                    password,
                },
            },
        })
            .then(async (context) => {
                const postData = context
                return await axios('/api/login', {
                    method: 'POST',
                    data: postData,
                })
            })
            .then((data) => {
                const { success } = data.data ?? {}
                if (success && postType && previewPostId) {
                    const previewUrl = getPreviewRedirectUrl(
                        String(postType),
                        String(previewPostId)
                    )                    
                    router.push(previewUrl)
                }
            })
            .catch((error) => {
                // setLoading(false)
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
                <fieldset
                    disabled={loading}
                    aria-busy={loading}
                    className="flex flex-col gap-2"
                >
                    <label
                        htmlFor="log-in-username"
                        className="leading-7 text-sm text-gray-600"
                    >
                        Nom d&apos;utilisateur
                    </label>
                    <input
                        id="log-in-username"
                        type="text"
                        name="username"
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
                    {!isUsernameValid ? (
                        <p className="error-message text-sm text-red-600">
                            Nom d&apos;utilisateur et/ou mot de passe
                            incorrect(s).
                        </p>
                    ) : null}
                    {!isPasswordValid ? (
                        <p className="error-message text-sm text-red-600">
                            Nom d&apos;utilisateur et/ou mot de passe
                            incorrect(s).
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
