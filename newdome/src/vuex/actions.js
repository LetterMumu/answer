export const saveProductState = ({commit}, productState) => {
  commit('SAVEPRODUCTSTATE', productState)
}
export const saveProductID = ({
  commit,
  state
}, productIdVer) => {
  commit('SAVEPRODUCTID', productIdVer)
}
