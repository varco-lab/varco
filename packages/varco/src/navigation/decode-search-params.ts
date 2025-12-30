import { RouteSearchParams } from '../types.js'

export function decodeSearchParams(query: string): RouteSearchParams {
    if (query.length === 0) return {}

    return query
        .slice(1)
        .split('&')
        .map((keyVal) => {
            const [key, val] = keyVal.split('=') as [string, string]
            return { [key]: val }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr }), {})
}
