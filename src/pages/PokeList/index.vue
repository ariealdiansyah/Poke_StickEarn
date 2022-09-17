<template>
  <q-page class="q-px-xl bg-white q-py-xl">
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="row items-center">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <span>Select Type</span>
          </div>
          <div class="col-8 col-md-8 col-sm-8 col-xs-12">
            <q-select
              filled
              dense
              v-model="type"
              :options="optionsType"
              emit-value
              map-options
              style="width: 250px"
              @update:model-value="changeDataByType"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-infinite-scroll @load="onLoad" :offset="5">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner color="primary" name="dots" size="40px" />
            </div>
          </template>
          <div
            v-for="(item, index) in items"
            :key="index"
            class="caption q-py-sm q-pl-sm"
          >
            <div class="row items-center">
              <div class="col-lg-2 col-md-2 col-sm-5 col-xs-12">
                <div class="flex row items-center">
                  <q-img
                    :src="item.pic"
                    spinner-color="primary"
                    style="height: 140px; max-width: 140px"
                  />
                </div>
              </div>
              <div class="col-lg-10 col-md-10 col-sm-7 col-xs-12">
                <div class="row">
                  <span class="text-weight text-h3 text-primary capital q-pr-md">
                    {{ item.name }}
                  </span>
                  <template v-for="(type, i) in item.types" :key="i">
                    <q-img
                      :src="getIcon(type)"
                      spinner-color="primary"
                      style="height: 40px; max-width: 40px"
                    />
                  </template>
                </div>
                <div class="row">
                  <div>
                    Ability :
                    <span v-for="(abl, i) in item.abilities" :key="i" class="capital">
                      {{ abl + ', ' }}
                    </span>
                  </div>
                </div>
                <div class="row">
                  <span>Weight : {{ item.weight }}</span>
                </div>
                <div class="row">
                  <span>Height : {{ item.height }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, toRef } from 'vue';
import { useStore } from 'vuex';
import { Loading, QSpinnerFacebook } from 'quasar';

export default {
  name: 'PokeListView',
  setup() {
    const store = useStore();
    const max = ref(0);
    const type = ref('');
    const optionsType = ref([
      {
        label: 'All',
        value: '',
      },
      {
        label: 'Bug',
        value: 'bug',
      },
      {
        label: 'Dark',
        value: 'dark',
      },
      {
        label: 'Dragon',
        value: 'dragon',
      },
      {
        label: 'Electric',
        value: 'electric',
      },
      {
        label: 'Fairy',
        value: 'fairy',
      },
      {
        label: 'Fighting',
        value: 'fighting',
      },
      {
        label: 'Fire',
        value: 'fire',
      },
      {
        label: 'Flying',
        value: 'flying',
      },
      {
        label: 'Ghost',
        value: 'ghost',
      },
      {
        label: 'Grass',
        value: 'grass',
      },
      {
        label: 'Ground',
        value: 'ground',
      },
      {
        label: 'Ice',
        value: 'ice',
      },
      {
        label: 'Normal',
        value: 'normal',
      },
      {
        label: 'Ghost',
        value: 'ghost',
      },
      {
        label: 'Psychic',
        value: 'psychic',
      },
      {
        label: 'Rock',
        value: 'rock',
      },
      {
        label: 'Steel',
        value: 'steel',
      },
      {
        label: 'Water',
        value: 'water',
      },
    ]);

    const items = computed(() => store.getters['pokedex/listPokemon']);
    const maxTemp = computed(() => store.state.pokedex.tempList.length);

    const changeDataByType = async () => {
      const last = 0;
      store.commit('pokedex/resetList');
      console.log('on tipe', max.value, last);
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        message: 'Sedang Menangkap Pokemon',
      });
      await store.dispatch('pokedex/getDataByType', {
        type: type.value,
        last: last,
      });
      Loading.hide();
    };

    const changeDataByType2 = async () => {
      const last = items.value.length;
      console.log(last);
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        message: 'Sedang Menangkap Pokemon',
      });
      await store.dispatch('pokedex/getDataByType2', {
        last: last,
      });
      Loading.hide();
    };

    const getIcon = (val) => {
      if (val === 'bug') {
        return 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg';
      } else if (val === 'dark') {
        return 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg';
      } else if (val === 'grass') {
        return 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg';
      } else if (val === 'dragon') {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg';
      } else if (val === 'electric') {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg';
      } else if (val === 'fairy') {
        return 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg';
      } else if (val === 'fighting') {
        return 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg';
      } else if (val === 'fire') {
        return 'https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg';
      } else if (val === 'flying') {
        return 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg';
      } else if (val === 'ghost') {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg';
      } else if (val === 'ground') {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg';
      } else if (val === 'ice') {
        return 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg';
      } else if (val === 'normal') {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg';
      } else if (val === 'poison') {
        return 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg';
      } else if (val === 'psychic') {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg';
      } else if (val === 'rock') {
        return 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg';
      } else if (val === 'steel') {
        return 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg';
      } else if (val === 'water') {
        return 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg';
      }
    };

    return {
      items,
      changeDataByType,
      changeDataByType2,
      getIcon,
      type,
      optionsType,
      async onLoad(index, done) {
        const last = items.value.length;
        console.log('last', last);
        if ((last < max.value || max.value === 0) && index > 0) {
          try {
            if (type.value === '') {
              max.value = 1154;
              await store.dispatch('pokedex/getListData', last);
              done();
            } else {
              max.value = maxTemp.value;
              await store.dispatch('pokedex/getDataByType2', {
                last: last,
              });
              done();
            }
          } catch (error) {
            throw error;
          }
        } else {
          console.log('should stop ', max.value, last);
          done((stop = true));
        }
      },
    };
  },
};
</script>

<style>
.capital {
  text-transform: capitalize;
}
</style>
