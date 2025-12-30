import React from 'react'

import { useRouter } from '../navigation/use-router.js'

export function Link({ onClick, ...props }: React.ComponentProps<'a'>) {
    const router = useRouter()

    return (
        <a
            onClick={(e) => {
                e.preventDefault()
                router.push(props.href ?? '')
                onClick?.(e)
            }}
            {...props}
        />
    )
}
