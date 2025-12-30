import React from 'react'
import type { Plugin } from 'vite'

export type VarcoConfig = {
    devServer?: {
        port?: number
    }
    reactStrictMode?: boolean
    transpilePackages?: string[]
    vitePlugins?: Plugin[] | Plugin[][]
}

export type RouteParams = Record<string, string>

export type RouteSearchParams = Record<string, string>

export type RouteMeta = {
    title?: string
}

export type Route = {
    path: string
    component: React.ComponentType<any>
    loading?: React.ReactNode,
    error?: React.ReactNode,
    notFound?: React.ReactNode,
    meta?: RouteMeta
    children?: Route[]
}
