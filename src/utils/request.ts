import axios from 'axios'

export async function requestPost(pf: number) {
    try {
        return (await axios.get(`/data/forum/${pf}.json`)).data
    } catch (e) {
        if (e.response.status === 404) return []
        throw e
    }
}

export async function requestPage(key: number) {
    return (await axios.get(`/data/page/${key}.json`)).data
}

export function convertResUrl(url?: string) {
    if (!url) return ""
    if (url.substr(0, 8) === "https://") url = url.substr(8)
    else if (url.substr(0, 7) === "http://") url = url.substr(7)
    return (axios.defaults.baseURL?axios.defaults.baseURL:"") + "/static/" + url
}
