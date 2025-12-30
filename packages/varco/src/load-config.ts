import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { VarcoConfig } from './types.js'

export async function loadConfig(appRoot: string): Promise<VarcoConfig> {
    const configPath = path.join(appRoot, 'varco.config.ts')

    let userConfig: VarcoConfig = {}

    if (fs.existsSync(configPath)) {
        userConfig = (await import(pathToFileURL(configPath).href)).default as VarcoConfig
    }

    return {
        port: userConfig.port,
        reactStrictMode: userConfig.reactStrictMode === false ? false : true,
        transpilePackages: userConfig.transpilePackages || [],
        vitePlugins: userConfig.vitePlugins ?? []
    }
}
