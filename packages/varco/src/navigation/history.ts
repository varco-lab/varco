type Listener = () => void

class History {
    private listeners = new Set<Listener>()

    constructor() {
        globalThis.addEventListener("popstate", this.notify)
    }

    notify = () => {
        this.listeners.forEach(l => l())
    }

    push = (path: string) => {
        globalThis.history.pushState({}, "", path)
        this.notify()
    }

    replace = (path: string) => {
        globalThis.history.replaceState({}, "", path)
        this.notify()
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener)
        
        return () => {
            this.listeners.delete(listener)
        }
    }

    get location() {
        return globalThis.location.pathname
    }

    get search() {
        return globalThis.location.search
    }
}

export const history = new History()
