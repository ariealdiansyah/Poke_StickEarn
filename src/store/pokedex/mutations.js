const getNewArray = (index, array) => {
  const a = [];
  for (let i = 0; i < array.length; i++) {
    a.push(array[i]);
  }
  return a;
};

export const setListPokemon = async (state, payload) => {
  let list = state.listPokemon;
  const last = list.length;
  list.push(...getNewArray(last + 1, payload));
  state.listPokemon = list;
};

export const maxCount = async (state, payload) => {
  state.maxCount = payload;
};
