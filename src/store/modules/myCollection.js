const state = {
	tabNum:0
}
const mutations = {
	//更改数字
	updateTabNum(state,tabNum) {
	  state.tabNum = tabNum;
	},
}
const getters = {
	//取出state里面的数字
	tabNum: state => state.tabNum,
}

const actions = {

}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
