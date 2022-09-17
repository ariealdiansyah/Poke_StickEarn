import PokeServices from 'src/services/pokedex';

export const getListData = async ({ dispatch, commit }, last) => {
  try {
    const res = await PokeServices.getList(last);
    const datas = res.data;
    let listPoke = [];
    for (let i = 0; i < datas.results.length; i++) {
      const resp = await dispatch('getDetailPokemon', datas.results[i].name);
      if (resp) {
        listPoke.push(resp);
      }
    }
    commit('setListPokemon', listPoke);
    return listPoke;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailPokemon = async ({ }, name) => {
  try {
    const res = await PokeServices.getData(name);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDataByType = async ({ state, commit, dispatch }, { type, last }) => {
  try {
    const res = await PokeServices.getDataByType(type);
    commit('setTempListPokemon', res);
    let listPoke = [];
    for (let i = 0; i < 7; i++) {
      const resp = await dispatch('getDetailPokemon', state.tempList[last + i].name);
      if (resp) {
        listPoke.push(resp);
      }
    }
    commit('setListPokemon', listPoke);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDataByType2 = async ({ state, commit, dispatch }, { last }) => {
  try {
    let listPoke = [];
    for (let i = 0; i < 7; i++) {
      const resp = await dispatch('getDetailPokemon', state.tempList[last + i].name);
      if (resp) {
        listPoke.push(resp);
      }
    }
    commit('setListPokemon', listPoke);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
