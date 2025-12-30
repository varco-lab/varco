import { describe, it, expect } from 'vitest'
import { rankSiblings } from './route-ranking.js'
import type { Route } from '../types.js'

function r(path: string): Route {
  return { path, component: () => null }
}

describe('rankSiblings', () => {
  it('prioritizes static over dynamic', () => {
    const routes = rankSiblings([
      r('/:id'),
      r('/settings')
    ])

    expect(routes[0].path).toBe('/settings')
  })

  it('prioritizes dynamic over wildcard', () => {
    const routes = rankSiblings([
      r('/*'),
      r('/:id')
    ])

    expect(routes[0].path).toBe('/:id')
  })

  it('keeps order for same specificity', () => {
    const routes = rankSiblings([
      r('/a'),
      r('/b')
    ])

    expect(routes.map(r => r.path)).toEqual(['/a', '/b'])
  })
})
