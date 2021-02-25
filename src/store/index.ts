import Vue from 'vue'
import Vuex from 'vuex'
import {requestPage, requestPost} from "@/utils/request";
import {filterOnePostItem, idRangeToPageFirsts, idToPageFirst} from "@/utils/pageUtil";
import moment from "moment"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pageInfos: {}, // 存储获取到的所有pageInfo
        postInfos: {}, // 存储所有获取到的post
        showType: -1,
        startPage: 0, // 开头从第几页开始，注意第一页是0
        showPagesCount: 1, // 一共要显示几页
    },
    mutations: {
        mergePostInfo(state, {arr, pf}) {
            for (let post of arr) {
                (state.postInfos as any)[post.id] = post
            }
            if ((state.postInfos as any)[pf] === undefined) (state.postInfos as any)[pf] = null // 用于表示该数据已经被拿到过了，不必再次请求
        },
        modifyPage(state, {startPage, showPageCount, showType}) {
            if (showPageCount !== undefined) state.showPagesCount = showPageCount
            if (startPage !== undefined) state.startPage = startPage
            if (showType !== undefined) state.showType = showType
        },
    },
    actions: {
        async ensurePost({state, commit}, id) {
            let pf = idToPageFirst(id)
            if ((state.postInfos as any)[pf] === undefined) {
                let arr = await requestPost(pf)
                commit('mergePostInfo', {arr, pf})
            }
        },
        async ensurePostOfPage({state, commit}, {page, showType}) {
            if (showType === undefined) showType = state.showType
            if (showType < 0) return
            let pfRange
            let fullPostList = (state.pageInfos as any)[showType].fullPostList
            if (fullPostList) {
                let postIds: Array<number> = fullPostList[page]
                pfRange = postIds.map(value => idToPageFirst(value))
            }else {
                let pageIds = (state.pageInfos as any)[showType].pageIds
                let last = pageIds[page]
                let first = (page + 1 < pageIds.length ? pageIds[page + 1] : 0) + 1
                pfRange = idRangeToPageFirsts(first, last)
            }
            let pendingRequests = []
            for (let pf of pfRange) {
                if ((state.postInfos as any)[pf] === undefined) {
                    pendingRequests.push({req: requestPost(pf), pf})
                }
            }
            for (let pendingRequest of pendingRequests) {
                let arr = await pendingRequest.req
                let pf = pendingRequest.pf
                commit('mergePostInfo', {arr, pf})
            }
        },
        async changeShowType({state, commit, dispatch}, {type, page}): Promise<number> {
            if (state.showType === type) {
                return await dispatch('jumpToPage', page)
            }
            if (!(state.pageInfos as any)[type]) {
                (state.pageInfos as any)[type] = await requestPage(type)
            }
            if (page === undefined || page < 0 || page >= (state.pageInfos as any)[type].pageIds.length) page = 0
            await dispatch('ensurePostOfPage', {page, showType: type})
            commit('modifyPage', {startPage: page, showPageCount: 1, showType: type})
            return 1
        },
        async jumpToPage({state, commit, dispatch, getters}, page: number): Promise<number> {
            if (page === undefined) page = 0
            if (page < 0 || page >= getters.maxPage) return -1
            if (page === state.startPage) return 0 // 现在就在这页上 无需变换
            // 需要重新加载。showCount重置回1。
            await dispatch('ensurePostOfPage', {page})
            commit('modifyPage', {startPage: page, showPageCount: 1})
            return 1 // 页面整个发生置换
        },
        async loadOneMorePage({state, commit, dispatch, getters}) {
            if (getters.loadedAll) return
            let newPage = state.startPage + state.showPagesCount
            await dispatch('ensurePostOfPage', {page: newPage})
            commit('modifyPage', {showPageCount: state.showPagesCount + 1})
        },
        getDateFromPage({state, dispatch}, date: Date): string | number {
            let dateNumber = Number(moment(date).format("YYMMDD"))
            let pageDates = (state.pageInfos as any)[state.showType].pageDates
            if (!pageDates) return "程序发生错误或暂不支持此功能"
            let page
            for (page=0; page<pageDates.length;page++) {
                if (Number(pageDates[page]) === dateNumber) break
                else if (Number(pageDates[page]) < dateNumber) {
                    if (page > 0)page--
                    break
                }
            }
            if (!(page >= 0 && page < pageDates.length)) return "日期无效"
            return page
        }
    },
    modules: {},
    getters: {
        showPostArr: state => {
            if (state.showType < 0) return []
            let pageIds = (state.pageInfos as any)[state.showType].pageIds
            let last = pageIds[state.startPage]
            let toPageExcluded = state.startPage + state.showPagesCount
            let first = (toPageExcluded < pageIds.length ? pageIds[toPageExcluded] : 0) + 1
            let result = []
            for (let id = last; id >= first; id--) {
                let item = (state.postInfos as any)[id]
                if (item && filterOnePostItem(item, state.showType)) result.push(item)
            }
            return result
        },
        maxPage: state => (state.pageInfos as any)[state.showType].pageIds.length,
        loadedAll: (state, getters) => state.showType >= 0 && state.startPage + state.showPagesCount >= getters.maxPage
    }
})
