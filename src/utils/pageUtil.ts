import {PostItem} from "@/utils/PostItem";
import * as _ from "lodash";

export function filterOnePostItem(item: PostItem, type: number) {
    return (type % 10 === 0 || type % 10 === item.idol_id) && (type < 10 || (type < 20 && item.tag > 1) || (type < 30 && item.member.official_verify))
}

export function getDefaultItem() {
    return {
        member: {},
        images: []
    }
}

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
