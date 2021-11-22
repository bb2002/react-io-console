import {useEffect, useState} from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

    const onWindowSizeChanged = () => {
        setWindowSize([window.innerWidth, window.innerHeight])
    }

    useEffect(() => {
        window.addEventListener("resize", onWindowSizeChanged)

        return () => {
            window.removeEventListener("resize", onWindowSizeChanged)
        }
    }, [])


    return {
        width: windowSize[0],
        height: windowSize[1]
    }
}
