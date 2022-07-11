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

export const getDataByType = async ({ dispatch, commit }, type) => {
  try {
    const res = await PokeServices.getDataByType(type);
    console.log(res.pokemon);
    let listPoke = [];
    for (let i = 0; i < res.pokemon.length; i++) {
      const resp = await dispatch('getDetailPokemon', res.pokemon[i].pokemon.name);
      if (resp) {
        listPoke.push(resp);
      }
    }
    return { listPoke: listPoke, max: res.pokemon.length };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
