import { describe, it, expect } from 'vitest'
import { matchRoute } from './match-route.js'

describe('matchRoute', () => {
  it('matches index route', () => {
    const res = matchRoute('/', '/')
    expect(res).toEqual({ params: {}, restPath: '/' })
  })

  it('matches static route', () => {
    const res = matchRoute('/about', '/about')
    expect(res?.params).toEqual({})
    expect(res?.restPath).toBe('/')
  })

  it('matches dynamic param', () => {
    const res = matchRoute('/team/:id', '/team/alex')
    expect(res?.params).toEqual({ id: 'alex' })
    expect(res?.restPath).toBe('/')
  })

  it('matches layout prefix and returns restPath', () => {
    const res = matchRoute('/team', '/team/alex')
    expect(res?.params).toEqual({})
    expect(res?.restPath).toBe('/alex')
  })

  it('does not match longer pattern', () => {
    const res = matchRoute('/team/:id', '/team')
    expect(res).toBeNull()
  })

  it('fails on static mismatch', () => {
    const res = matchRoute('/team', '/about')
    expect(res).toBeNull()
  })
})
