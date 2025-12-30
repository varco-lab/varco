type SegmentKind = 'static' | 'dynamic' | 'wildcard'

type FlatRoute = {
    fullPath: string,
    route: Route
}

const SEGMENT_SCORE: Record<SegmentKind, number> = {
    static: 3,
    dynamic: 2,
    wildcard: 1
}

function getSegmentKind(segment: string): SegmentKind {
    if (segment === '*') return 'wildcard'
    if (segment.startsWith(':')) return 'dynamic'
    return 'static'
}

function scorePath(path: string): number {
    return path
        .split('/')
        .filter(Boolean)
        .reduce((score, segment) => {
            return score + SEGMENT_SCORE[getSegmentKind(segment)]
        }, 0)
}

function joinPaths(basePath: string, subPath: string): string {
    return `${basePath}/${subPath}`.replace(/\/+/g, '/')
}

function flattenRoutes(routes: Route[], basePath = ''): FlatRoute[] {
    return routes.flatMap(route => {
        const fullPath = joinPaths(basePath, route.path)
        const self = [{ fullPath, route }]
        const children = route.children ? flattenRoutes(route.children, fullPath) : []
        return [...self, ...children]
    })
}

export function rankRoutes(routes: Route[]): FlatRoute[] {
    return flattenRoutes(routes).sort((a, b) => {
        return scorePath(b.fullPath) - scorePath(a.fullPath)
    })
}

export function rankSiblings(routes: Route[]): Route[] {
    return [...routes].sort(
        (a, b) => scorePath(b.path) - scorePath(a.path)
    )
}
