import React from 'react'
import { RouteSearchParams, RouteParams } from '../types.js'

export type RouterContextProps = {
    path: string
    params: RouteParams
    searchParams: RouteSearchParams
    push: (path: string) => void
    replace: (path: string) => void
}

export const RouterContext = React.createContext<RouterContextProps | undefined>(undefined)
