import React from 'react'

import type { RouteSearchParams, RouteParams } from '../types.js'
import { RouterContext } from './router-context.js'

export type UseRouter = {
    params?: RouteParams
    searchParams?: RouteSearchParams
}

export function useRouter<TRouter extends UseRouter = UseRouter>() {
    const ctx = React.useContext(RouterContext)

    if (!ctx) throw new Error('RouterContext not defined')

    const getSearchParams = <T = RouteSearchParams>() => {
        return ctx.searchParams as T
    }

    const getParams = <T = RouteParams>() => {
        return ctx.params as T
    }

    return {
        path: ctx.path,
        params: ctx.params as TRouter['params'],
        searchParams: ctx.searchParams as TRouter['searchParams'],
        getSearchParams,
        getParams,
        push: ctx.push,
        replace: ctx.replace
    }
}
