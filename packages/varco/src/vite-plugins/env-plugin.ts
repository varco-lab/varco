import { type Plugin, loadEnv } from 'vite'

export function envPlugin(): Plugin {
    return {
        name: 'varco-env',
        enforce: 'pre',
        config: (config, { mode: viteMode }) => {
            const env = loadEnv(viteMode, process.cwd(), 'APP_')
            return {
                define: {
                    'process.env': JSON.stringify({
                        NODE_ENV: viteMode,
                        ...env
                    })
                }
            }
        }
    }
}
