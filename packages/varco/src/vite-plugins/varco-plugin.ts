import path from 'node:path'
import { type Plugin } from 'vite'

export function varcoPlugin({ appRoot, frameworkRoot, ...opts }: {
  appRoot: string
  frameworkRoot: string
  reactStrictMode: boolean
}): Plugin {
  return {
    name: 'varco',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === 'virtual:react-app') return id
    },
    load(id: string) {
      if (id === 'virtual:react-app') {
        if (!opts.reactStrictMode) {
          return `export { default } from '${path.join(appRoot, 'src/app.tsx')}'`
        }

        return `
        import React from 'react'
        import App from '${path.join(appRoot, 'src/app.tsx')}'

        const Strict = ${opts.reactStrictMode ? 'React.StrictMode' : 'React.Fragment'}

        export default function AppWrapper() {
          return React.createElement(
            Strict,
            null,
            React.createElement(App, null)
          )
        }
        `
      }
    }
  }
}
