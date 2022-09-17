<template>
  <q-page class="q-px-xl bg-white q-py-xl">
    <template v-if="items">
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-2">
          <div class="flex row items-center align-center">
            <q-img
              :src="items.pic"
              spinner-color="primary"
              style="height: 140px; max-width: 140px"
            />
          </div>
        </div>
        <div class="col-8">
          <div class="row">
            <span class="text-weight text-h3 text-primary capital q-pr-md">
              {{ name }}
            </span>
            <template v-for="(type, i) in items.types" :key="i">
              <q-img
                :src="getIcon(type)"
                spinner-color="primary"
                style="height: 40px; max-width: 40px"
              />
            </template>
          </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <q-markup-table>
                <thead>
                  <tr class="bg-primary text-white">
                    <th class="text-left text-h5">Info Pokemon</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Ability</td>
                    <td class="text-left">
                      <span v-for="(abl, i) in items.abilities" :key="i" class="capital">
                        {{ i + 1 }}. {{ abl }} <br />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Height</td>
                    <td class="text-left">{{ items.height }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Weight</td>
                    <td class="text-left">{{ items.weight }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Type</td>
                    <td class="text-left">
                      <span v-for="(typ, i) in items.types" :key="i" class="capital">
                        {{ i + 1 }}. {{ typ }} <br />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Status</td>
                    <td class="text-left">
                      <span v-for="(sts, i) in items.stats" :key="i" class="capital">
                        {{ sts.name_stats }} : {{ sts.base_stats }} <br />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <!-- <div class="col-4">
              <div class="text-h5 q-mt-md">
                Ability : <br />
                <span v-for="(abl, i) in items.abilities" :key="i" class="capital">
                  {{ i + 1 }}. {{ abl }} <br />
                </span>
              </div>
            </div>
            <div class="col-4">
              <div class="text-h5 q-mt-md">Height : {{ items.height }}</div>
            </div>
            <div class="col-4">
              <div class="text-h5 q-mt-md">Weight : {{ items.weight }}</div>
            </div>
            <div class="col-4">
              <div class="text-h5 q-mt-md">
                Status : <br />
                <span v-for="(sts, i) in items.stats" :key="i" class="capital">
                  {{ sts.name_stats }} : {{ sts.base_stats }} <br />
                </span>
              </div>
            </div>
            <div class="col-4">
              <div class="text-h5 q-mt-md">
                Types : <br />
                <span v-for="(typ, i) in items.types" :key="i" class="capital">
                  {{ i + 1 }}. {{ typ }} <br />
                </span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
          <q-btn
            color="primary"
            size="md"
            outline
            no-caps
            label="Back"
            @click="getBack()"
          />
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'DetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const name = ref();
    const items = ref();

    onMounted(async () => {
      const nama = route.params.nama;
      name.value = nama.charAt(0).toUpperCase() + nama.slice(1);
      const res = await store.dispatch('pokedex/getDetailPokemon', nama);
      items.value = res;
    });

    const getBack = () => {
      router.back();
    };

    const getIcon = (val) => {
      return require(`assets/type/${val}.svg`);
    };

    return {
      name,
      getBack,
      items,
      getIcon,
    };
  },
};
</script>

<style></style>
