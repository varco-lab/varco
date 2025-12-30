type Route = import('./types.ts').Route

declare module "virtual:react-app" {
    const App: () => JSX.Element
    export default App
}
