import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build as viteBuild } from 'vite'
import { loadConfig } from '../load-config.js'
import { varcoPlugin } from '../vite-plugins/varco-plugin.js'
import { envPlugin } from '../vite-plugins/env-plugin.js'

export async function build() {
    const appRoot = process.cwd()
    const frameworkRoot = path.resolve(
        fileURLToPath(import.meta.url),
        '../../' // packages/varco
    )

    const userConfig = await loadConfig(appRoot)

    await viteBuild({
        root: frameworkRoot,
        plugins: [
            varcoPlugin({
                appRoot,
                frameworkRoot,
                reactStrictMode: false
            }),
            envPlugin(),
            ...(userConfig.vitePlugins ?? [])
        ],
        build: {
            outDir: path.resolve(appRoot, 'dist'),
            emptyOutDir: true,
            rollupOptions: {
                input: path.resolve(frameworkRoot, 'index.html')
            }
        },
        resolve: {
            dedupe: ['react', 'react-dom']
        },
        optimizeDeps: {
            include: [...(userConfig.transpilePackages || [])],
            exclude: ['varco']
        }
    })

    console.log('✅ Varco build completed')
}
