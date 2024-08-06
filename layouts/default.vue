<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
const drawer = ref(true);
const rail = ref(true);
const { name } = useDisplay();
watchEffect(() => {
  rail.value = false;
  if (name.value == "xs") {
    rail.value = true;
  }
});
// onMounted(() => {
//   drawer.value = true;
//   if (name.value == "xs") {
//     drawer.value = false;
//   }
// });
</script>

<template>
  <v-app>
    <ClientOnly>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        temporary
        permanent
        @click.stop="rail = !rail"
      >
        <v-list-item
          prepend-avatar="../assets/images/profile.png"
          title="John Leider"
          :class="[
            'px-3 py-4 cursor-pointer ',
            name !== 'xs' ? '' : 'border-b',
          ]"
          nav
        >
          <v-tooltip activator="parent" location="left">โปรไฟล์</v-tooltip>
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-list density="compact" nav class="px-2 mt-1">
          <v-list-item
            prepend-icon="mdi-home-city"
            title="หน้าหลัก"
            value="home"
          >
            <v-tooltip activator="parent" location="left">หน้าหลัก</v-tooltip>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          >
            <v-tooltip activator="parent" location="left">โปรไฟล์</v-tooltip>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-list-box"
            @click="$router.push('/products')"
            title="Stock"
            value="stock"
          >
            <v-tooltip activator="parent" location="left"
              >รายการสินค้า</v-tooltip
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </ClientOnly>
    <v-app-bar color="">
      <template v-slot:prepend v-if="name === 'xs'">
        <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
      </template>

      <!-- <v-app-bar-title>Title</v-app-bar-title> -->

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="ma-6">
      <slot />
    </v-main>
  </v-app>
</template>
