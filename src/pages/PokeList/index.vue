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
                <div class="row q-mt-sm">
                  <q-btn
                    color="primary"
                    size="md"
                    outline
                    no-caps
                    rounded
                    icon-right="info"
                    label="View Details"
                    @click="goDetail(item.name)"
                  />
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
import { useRouter } from 'vue-router';
import { Loading, QSpinnerFacebook } from 'quasar';

export default {
  name: 'PokeListView',
  setup() {
    const store = useStore();
    const router = useRouter();
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
      return require(`assets/type/${val}.svg`);
    };

    const goDetail = (name) => {
      router.push(`/detail/${name}`);
    };

    return {
      items,
      changeDataByType,
      changeDataByType2,
      getIcon,
      goDetail,
      type,
      optionsType,
      async onLoad(index, done) {
        const last = items.value.length;
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
