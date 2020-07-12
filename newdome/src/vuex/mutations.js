// 定义所需的 mutations
const mutations = {
  SAVEPRODUCTSTATE(state, productState) {
    state.productState = productState
  },
  SAVEPRODUCTID(state, productIdVer) {
    state.productIdVer = productIdVer
  },
  ACTIVE(state, active) {
    state.active=active
  }
}

export default mutations
