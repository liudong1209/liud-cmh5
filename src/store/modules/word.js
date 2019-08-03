const state = {
	personalAvatar:{},  //个人头像
	patientAvatar:{},  //患者头像
}
const mutations = {
	//个人头像
	updatePersonalAvatar(state,personalAvatar) {
	  state.personalAvatar = personalAvatar;
	},
	//患者头像
	updatePatientAvatar(state,patientAvatar) {
	  state.patientAvatar = patientAvatar;
	},
}
const getters = {
	//取出state里面的个人头像
	personalAvatar: state => state.personalAvatar,
	//取出state里面的患者头像
	patientAvatar: state => state.patientAvatar,
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
