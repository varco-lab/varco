import React from 'react'
import { type Route, type RouteSearchParams, type RouteParams, type RouteMeta } from '../types.js'
import { matchRoute } from './match-route.js'
import { ErrorBoundary } from '../error-boundary.js'
import { rankSiblings } from './route-ranking.js'

function renderMeta(meta?: RouteMeta): React.ReactNode {
    if (!meta) return null
    return (
        <>
            {meta.title && <title>{meta.title}</title>}
        </>
    )
}

export function renderRoute({
    routes,
    path,
    params = {},
    searchParams
}: {
    routes: Route[]
    path: string
    params?: RouteParams
    searchParams: RouteSearchParams
}): {
    node: React.ReactNode | null
    params?: RouteParams
    layoutNotFound?: React.ReactNode
} {
    const rankedRoutes = rankSiblings(routes)

    for (const route of rankedRoutes) {
        const match = matchRoute(route.path, path)
        if (!match) continue

        const { params: matchParams, restPath } = match
        const mergedParams = { ...params, ...matchParams }
        const Comp = route.component

        // ─────────────────────────────────────────
        // LEAF ROUTE
        // ─────────────────────────────────────────
        if (!route.children || route.children.length === 0) {
            // ❗ enforce full match
            if (restPath !== '/') continue

            const node = (
                <>
                    {renderMeta(route.meta)}
                    <React.Suspense fallback={route.loading ?? null}>
                        <Comp
                            params={mergedParams}
                            searchParams={searchParams}
                        />
                    </React.Suspense>
                </>
            )

            const boundedNode = route.error ? (
                <ErrorBoundary fallback={route.error}>
                    {node}
                </ErrorBoundary>
            ) : node

            return { node: boundedNode, params: mergedParams }
        }

        // ─────────────────────────────────────────
        // LAYOUT ROUTE
        // ─────────────────────────────────────────
        const childRes = renderRoute({
            routes: route.children,
            path: restPath,
            params: mergedParams,
            searchParams
        })

        if (childRes.node) {
            const node = (
                <>
                    {renderMeta(route.meta)}
                    <React.Suspense fallback={route.loading ?? null}>
                        <Comp
                            params={mergedParams}
                            searchParams={searchParams}
                        >
                            {childRes.node}
                        </Comp>
                    </React.Suspense>
                </>
            )

            const boundedNode = route.error ? (
                <ErrorBoundary fallback={route.error}>
                    {node}
                </ErrorBoundary>
            ) : node

            return {
                node: boundedNode,
                params: { ...mergedParams, ...childRes.params }
            }
        }

        // ❗ bubble layout-level notFound, but keep trying siblings
        if (route.notFound) {
            return { node: null, layoutNotFound: route.notFound }
        }
    }

    return { node: null }
}
