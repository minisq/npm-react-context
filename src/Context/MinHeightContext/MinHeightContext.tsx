import React, { createContext, useEffect, useRef, useState } from "react"

type PixelString = `${number}px`

type MinHeightContextValue = {
    minHeight: PixelString
}

type MinHeightProviderProps = {
    children: React.ReactNode
    ids: string[]
}

const MinHeightContext = createContext<MinHeightContextValue | undefined>(undefined)

export const MinHeightProvider: React.FC<MinHeightProviderProps> = ({ children, ids }) => {
    const [minHeight, setMinHeight] = useState<PixelString>("0px")
    const refs = useRef<Record<string, HTMLElement | null>>({})

    const calculateMinHeight = () => {
        const totalHeight = window.innerHeight
        let minHeight = totalHeight

        for (const element of Object.values(refs.current)) {
            if (!element) continue
            const elementHeight = element.getBoundingClientRect()?.height || 0
            minHeight -= elementHeight
        }

        setMinHeight(`${minHeight}px`)
    }

    useEffect(() => {
        for (const id of ids) {
            refs.current[id] = document.getElementById(id)
        }

        calculateMinHeight()
        window.addEventListener("resize", calculateMinHeight)

        const observers: Record<string, ResizeObserver> = {}

        for (const [key, element] of Object.entries(refs.current)) {
            observers[key] = new ResizeObserver(calculateMinHeight)
            if (element) observers[key].observe(element)
        }

        return () => {
            for (const [_, observer] of Object.entries(observers)) {
                observer.disconnect()
            }
            window.removeEventListener("resize", calculateMinHeight)
        }
    }, [ids])

    return <MinHeightContext.Provider value={{ minHeight }}>{children}</MinHeightContext.Provider>
}
