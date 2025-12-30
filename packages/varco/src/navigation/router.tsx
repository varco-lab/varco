import React from 'react'

import { history } from './history.js'
import { decodeSearchParams } from './decode-search-params.js'
import { renderRoute } from './render-route.js'
import { type RouteSearchParams, type Route } from '../types.js'
import { type RouterContextProps, RouterContext } from './router-context.js'
import { NotFound } from './not-found.js'

export function Router({
    routes,
    notFound: globalNotFound = <NotFound />
}: Readonly<{
    routes: Route[]
    notFound?: React.ReactNode
}>) {
    const [path, setPath] = React.useState<string>(history.location)
    const [searchParams, setSearchParams] = React.useState<RouteSearchParams>(decodeSearchParams(globalThis.location.search))

    React.useEffect(() => history.subscribe(() => {
        setPath(history.location)
        setSearchParams(decodeSearchParams(history.search))
    }), [])

    const { node, params, layoutNotFound } = renderRoute({
        routes,
        path,
        searchParams
    })

    const contextValue: RouterContextProps = React.useMemo(() => ({
        path,
        params: params ?? {},
        searchParams: searchParams,
        push: history.push,
        replace: history.replace
    }), [path, params, searchParams, history])

    return (
        <RouterContext value={contextValue}>
            {node ?? (layoutNotFound ?? globalNotFound)}
        </RouterContext>
    )
}
