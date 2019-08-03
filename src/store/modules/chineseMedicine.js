const state = {
	chineseMedicineDetail:{}
}
const mutations = {
	//中药----详情
	updateChineseMedicine(state,chineseMedicine) {
	  state.chineseMedicineDetail = chineseMedicine;
	},
}
const getters = {
	//取出state里面的中药内容向详情传值
	chineseMedicineDetail: state => state.chineseMedicineDetail,
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
