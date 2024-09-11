import { useState, useEffect } from 'react'
import { getLogo } from '../service/chatService'

export function useLogoUrl() {
    const [logoUrl, setLogoUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchLogoUrl() {
            try {
                setLoading(true)
                const url = await getLogo()
                if (url) {
                    setLogoUrl(url)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchLogoUrl()
    }, [])

    return { logoUrl, loading }
}
