import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Router } from './router.js'
import { history } from './history.js'
import type { Route } from '../types.js'

function Home() {
  return <div>Home</div>
}

function About() {
  return <div>About</div>
}

describe('Router', () => {
  const routes: Route[] = [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]

  it('renders initial route', () => {
    history.replace('/')

    render(<Router routes={routes} />)

    expect(screen.getByText('Home')).toBeDefined()
  })

  it('renders global notFound', () => {
    history.replace('/missing')

    render(
      <Router
        routes={routes}
        notFound={<div>Not Found</div>}
      />
    )

    expect(screen.getByText('Not Found')).toBeDefined()
  })
})
