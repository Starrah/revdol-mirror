import {PostItem} from "@/utils/PostItem";

export function filterOnePostItem(item: PostItem, type: number) {
    return type === 0 || (type % 10 === item.contribute?.idol_id && (type < 10 || item.tag > 1))
}

export function getDefaultItem() {
    return {
        member: {},
        contribute: {},
        images: []
    }
}
