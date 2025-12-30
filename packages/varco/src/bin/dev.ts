import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"
import { loadConfig } from "../load-config.js"
import { varcoPlugin } from "../vite-plugins/varco-plugin.js"
import { envPlugin } from "../vite-plugins/env-plugin.js"

export async function dev() {
    const appRoot = process.cwd()
    const frameworkRoot = path.resolve(
        fileURLToPath(import.meta.url),
        "../../" // packages/varco
    )

    const userConfig = await loadConfig(appRoot)

    const server = await createServer({
        root: frameworkRoot,
        server: {
            fs: {
                allow: [appRoot, frameworkRoot]
            }
        },
        plugins: [
            varcoPlugin({
                appRoot,
                frameworkRoot,
                reactStrictMode: userConfig.reactStrictMode ?? false
            }),
            envPlugin(),
            ...(userConfig.vitePlugins ?? [])
        ],
        optimizeDeps: {
            include: [...(userConfig.transpilePackages || [])],
            exclude: ["varco", "virtual:react-app"]
        },
    })

    await server.listen(userConfig.devServer?.port ?? 3000)
    server.printUrls()
}
