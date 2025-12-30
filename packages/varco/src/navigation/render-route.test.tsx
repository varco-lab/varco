import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderRoute } from './render-route.js'
import type { Route } from '../types.js'

function Page({ params }: any) {
  return <div>Page {params?.id}</div>
}

function Layout({ children }: any) {
  return <div>Layout {children}</div>
}

describe('renderRoute', () => {
  it('renders leaf route', () => {
    const routes: Route[] = [
      { path: '/', component: Page }
    ]

    const res = renderRoute({
      routes,
      path: '/',
      searchParams: {}
    })

    const { container } = render(<>{res.node}</>)
    expect(container.textContent).toContain('Page')
  })

  it('renders nested layout with child', () => {
    const routes: Route[] = [
      {
        path: '/team',
        component: Layout,
        children: [
          { path: ':id', component: Page }
        ]
      }
    ]

    const res = renderRoute({
      routes,
      path: '/team/alex',
      searchParams: {}
    })

    const { container } = render(<>{res.node}</>)
    expect(container.textContent).toContain('Layout')
    expect(container.textContent).toContain('alex')
  })

  it('returns layout notFound when child not matched', () => {
    const NotFound = () => <div>Team Not Found</div>

    const routes: Route[] = [
      {
        path: '/team',
        component: Layout,
        notFound: <NotFound />,
        children: [
					{
						path: '/',
						component: Page
					}
				]
      }
    ]

    const res = renderRoute({
      routes,
      path: '/team/unknown',
      searchParams: {}
    })

    expect(res.node).toBeNull()
    expect(res.layoutNotFound).toBeTruthy()
  })
})
