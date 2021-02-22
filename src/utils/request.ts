import axios from 'axios'
import * as _ from 'lodash'

export const PAGE_SIZE = 20

export function idToPageFirst(id: number): number {
    return Math.floor((id - 1) / PAGE_SIZE) * PAGE_SIZE + 1
}

export function idRangeToPageFirsts(first: number, last: number): Array<number> {
    // first<=last，前后均包含
    let pfBegin = idToPageFirst(first)
    let pfEnd = idToPageFirst(last)
    return _.range(pfBegin, pfEnd + 1, PAGE_SIZE)
}

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
    return axios.defaults.baseURL + "/static/" + url
}
