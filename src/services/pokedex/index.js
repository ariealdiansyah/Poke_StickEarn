import { api } from 'src/boot/axios';
import { adapterPokemon } from './adapter';

export default {
  async getList(starts) {
    return await api.get(`https://pokeapi.co/api/v2/pokemon?limit=7&offset=${starts}`);
  },
  async getData(name) {
    const res = await api.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return adapterPokemon(res.data);
  },
  async getDataByType(type) {
    const res = await api.get(`https://pokeapi.co/api/v2/type/${type}`);
    return res.data;
  },
};
