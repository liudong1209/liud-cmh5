//state 数据
const state = {
		selectedPatient:{},  //选择病人
		healthRegimenContent:{},//从诊断结果证型向详情传值
		illDetail:{},//从诊断结果疾病向详情传值
		manMainSymptoms:[],//男成年主症状
		manAuxiliarySymptoms:[],//男成年辅症状
		womanMainSymptoms:[],//女成年主症状
		womanAuxiliarySymptoms:[],//女成年辅症状
		boyMainSymptoms:[],//男小孩主症状
		boyAuxiliarySymptoms:[],//男小孩辅症状
		girlMainSymptoms:[],//女小孩主症状
		girlAuxiliarySymptoms:[],//女小孩辅症状
}


//getters 类似计算属性
const getters = {
  selectedPatient: state => state.selectedPatient,
  sexOfPatient: state => state.selectedPatient.patientSex,
  ageOfPatient: state => state.selectedPatient.patientBirth,
  pIdOfPatient: state => state.selectedPatient.pId,
	//取出state里面的诊断结果向详情传值
	healthRegimenContent: state => state.healthRegimenContent,
	//取出state里面的诊断结果疾病向详情传值
	illDetail: state => state.illDetail,
	//取出男成年主症状
	manMainSymptoms: state => state.manMainSymptoms,
	//取出男成年辅症状
	manAuxiliarySymptoms: state => state.manAuxiliarySymptoms,
	//取出女成年主症状
	womanMainSymptoms: state => state.womanMainSymptoms,
	//取出女成年辅症状
	womanAuxiliarySymptoms: state => state.womanAuxiliarySymptoms,
	//取出男小孩主症状
	boyMainSymptoms: state => state.boyMainSymptoms,
	//取出男小孩辅症状
	boyAuxiliarySymptoms: state => state.boyAuxiliarySymptoms,
	//取出女小孩主症状
	girlMainSymptoms: state => state.girlMainSymptoms,
	//取出女小孩辅症状
	girlAuxiliarySymptoms: state => state.girlAuxiliarySymptoms,
	
};

//mutations  改变数据
const mutations = {
  updateSelectedPatient(state,anotherPatient) {
    state.selectedPatient = anotherPatient;
  },
	//更新诊断结果进入的养生
	updateHealthRegimen(state,healthRegimen) {
	  state.healthRegimenContent = healthRegimen;
	},
	//更新诊断疾病
	updateIllDetail(state,illDetail) {
	  state.illDetail = illDetail;
	},
	//更新男成年主症状
	updateManMainSymptoms(state,manMainSymptoms) {
	  state.manMainSymptoms = manMainSymptoms;
	},
	//更新男成年辅症状
	updateManAuxiliarySymptoms(state,manAuxiliarySymptoms) {
	  state.manAuxiliarySymptoms = manAuxiliarySymptoms;
	},
	//更新女成年主症状
	updateWomanMainSymptoms(state,womanMainSymptoms) {
	  state.womanMainSymptoms = womanMainSymptoms;
	},
	//更新女成年辅症状
	updateWomanAuxiliarySymptoms(state,womanAuxiliarySymptoms) {
	  state.womanAuxiliarySymptoms = womanAuxiliarySymptoms;
	},
	//更新男小孩主症状
	updateBoyMainSymptoms(state,boyMainSymptoms) {
	  state.boyMainSymptoms = boyMainSymptoms;
	},
	//更新男小孩辅症状
	updateBoyAuxiliarySymptoms(state,boyAuxiliarySymptoms) {
	  state.boyAuxiliarySymptoms = boyAuxiliarySymptoms;
	},
	//更新女小孩主症状
	updateGirlMainSymptoms(state,girlMainSymptoms) {
	  state.girlMainSymptoms = girlMainSymptoms;
	},
	//更新女小孩辅症状
	updateGirlAuxiliarySymptoms(state,girlAuxiliarySymptoms) {
	  state.girlAuxiliarySymptoms = girlAuxiliarySymptoms;
	},
	
};


//提交 mutations
const actions = {
	//提交updateSelectedPatient
  updateSelectedPatient({commit},item) {
    commit('updateSelectedPatient',item);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
