import { RouteParams } from '../types.js'

export type RouteMatch = {
	params: RouteParams
	restPath: string
}

export function matchRoute(
	pattern: string,
	path: string
): RouteMatch | null {
	const patternParts = split(pattern)
	const pathParts = split(path)

	// index route ("/")
	if (patternParts.length === 0 && pathParts.length === 0) {
		return { params: {}, restPath: '/' }
	}

	// pattern must not be longer than path
	if (patternParts.length > pathParts.length) return null

	const params: RouteParams = {}

	for (let i = 0; i < patternParts.length; i++) {
		const p = patternParts[i]
		const v = pathParts[i]

		if (p.startsWith(':')) {
			if (!v) return null
			params[p.slice(1)] = decodeURIComponent(v)
			continue
		}

		if (p !== v) return null
	}

	const restParts = pathParts.slice(patternParts.length)

	return {
		params,
		restPath: restParts.length === 0 ? '/' : '/' + restParts.join('/')
	}
}

function split(path: string): string[] {
	const normalized = path.replace(/^\/+|\/+$/g, '')
	return normalized ? normalized.split('/') : []
}
