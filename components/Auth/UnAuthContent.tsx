import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

import useAuth from '../../hooks/useAuth'


export default function UnAuthContent({ children }: {children: ReactNode}) {
    const { loggedIn, loading } = useAuth()
    const router = useRouter()
    const redirectURL = router.query.path

    // Navigate authenticated users to Members page.
    useEffect(() => {
        if (!loading && loggedIn) {
            if (redirectURL) {
                router.push(`${redirectURL}`)
            }
            else router.push('/')
        }
    }, [loggedIn, loading, router])

    if (!loggedIn) {
        return <>{children}</>
    }

    return <p>Loading...</p>
}
