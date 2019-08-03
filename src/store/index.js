import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import SelfDiagnosis from './modules/selfDiagnosis'
import MyCollection from './modules/myCollection'
import Word from './modules/word'
Vue.use(Vuex);

const state = {
	//取得token
	tokenString: localStorage.getItem('authorization') ? localStorage.getItem('authorization') : '',
	uIdString: localStorage.getItem('uId') ? localStorage.getItem('uId') : ''
}
const actions = {

}
const mutations = {

}
const getters = {
	tokenString(state) {
		return state.tokenString;
	},

	uIdString(state) {
		return state.uIdString;
	}
}

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		home,
		SelfDiagnosis,
		MyCollection,
		Word

	},

})
export default store;
