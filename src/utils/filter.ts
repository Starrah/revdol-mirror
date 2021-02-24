import {PostItem} from "@/utils/PostItem";

export function filterOnePostItem(item: PostItem, type: number) {
    return (type % 10 === 0 || type % 10 === item.idol_id) && (type < 10 || (type < 20 && item.tag > 1) || (type < 30 && item.member.official_verify))
}

export function getDefaultItem() {
    return {
        member: {},
        images: []
    }
}
