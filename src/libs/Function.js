export function getFilenameFromURL(url) {
    if(url) {
        const a = url.split("?")[0]
        const b = a.split("%2F")
        return b[b.length - 1]
    } else {
        return url
    }
}