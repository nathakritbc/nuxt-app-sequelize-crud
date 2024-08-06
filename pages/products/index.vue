<script setup lang="ts">
useHead({
  title: "จัดการรายการสินค้า",
  
});
import ShowDialogComponent from "~/components/products/ShowDialog.vue";
import CreateDialogComponent from "~/components/products/CreateDialog.vue";
import UpdateDialogComponent from "~/components/products/UpdateDialog.vue";
import DeleteDialogComponent from "~/components/products/DeleteDialog.vue";
import { useToast } from "vue-toastification";
import { useDisplay } from "vuetify";
import {
  createDialog,
  deleteDialog,
  products,
  deleteItemDialog,
  updateItemDialog,
  updateDialog,
  showDialog,
  showItemDialog,
} from "~/hooks/products.js";
import { onMounted, ref } from "vue";
const toast = useToast();
const { name } = useDisplay();
const isMobile = ref(false);
const search = ref("");
const selected = ref([]);
const loading = ref(false);
const headers = ref([
  {
    title: "#",
    key: "p_id",
    align: "start",
    sortable: true,
  },
  {
    title: "ชื่อสินค้า",
    key: "p_name",
    align: "start",
    sortable: true,
  },
  {
    title: "ราคา",
    key: "p_price",
    align: "start",
    sortable: true,
  },
  {
    title: "จํานวน",
    key: "p_amount",
    align: "start",
    sortable: true,
  },
  { title: "Actions", key: "actions", sortable: false },
]);

const getColor = (num: number) => {
  if (num > 100) return "red";
  if (num > 50) return "orange";
  return "green";
};

const fetchAllProducts = async () => {
  loading.value = true;
  try {
    products.value = await $fetch("/api/products");
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
    toast.error("Fetch all products failed!");
  }
};

const createItem = () => {
  createDialog.value = true;
};

const deleteItem = (item: Product) => {
  const { p_id, p_name } = item;
  deleteItemDialog.value = { p_id, p_name };
  deleteDialog.value = true;
};
const updateItem = (item: Product) => {
  console.log("item", item);
  const { p_id, p_name, p_price, p_amount } = item;
  updateItemDialog.value = { p_id, p_name, p_price, p_amount };
  updateDialog.value = true;
};
const showItem = (item: Product) => {
  const { p_id, p_name, p_price, p_amount } = item;
  showItemDialog.value = { p_id, p_name, p_price, p_amount };
  showDialog.value = true;
};
onMounted(() => {
  fetchAllProducts();
});
watchEffect(() => {});
</script>

<template>
  <div>
    <v-card>
      <v-card-title>
        <section
          class="w-full flex flex-col md:flex-row align-start md:align-center justify-between pb-1 py-md-6"
        >
          <h1 class="text-2xl text-primary font-bold pb-3 p3-md-0">
            รายการสินค้า
          </h1>
          <ClientOnly>
            <v-btn
              append-icon="mdi-plus"
              class=""
              color="primary"
              :block="name === 'xs'"
              @click="createItem()"
              >เพิ่มสินค้า</v-btn
            >
          </ClientOnly>
        </section>
      </v-card-title>
      <v-card-text>
        <v-text-field
          lable="ค้นหา"
          density="compact"
          v-model="search"
          append-inner-icon="mdi-magnify"
          variant="outlined"
        ></v-text-field>
        <v-data-table
          :loading="loading"
          :search="search"
          :headers="headers"
          v-model="selected"
          :items="products"
          item-value="name"
          show-select
        >
          <template v-slot:item.actions="{ item }">
            <section class="flex flex-row text-no-wrap">
              <v-icon
                class=""
                size="small"
                color="grey-darken-1"
                @click="showItem(item)"
              >
                mdi-eye
              </v-icon>
              <v-icon
                class="mx-3"
                size="small"
                color="grey-darken-1"
                @click="updateItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                size="small"
                @click="deleteItem(item)"
                color="grey-darken-1"
              >
                mdi-delete
              </v-icon>
            </section>
          </template>
          <template v-slot:no-data>
            <v-btn @click="fetchAllProducts"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <CreateDialogComponent />
    <DeleteDialogComponent />
    <UpdateDialogComponent />
    <ShowDialogComponent />
  </div>
</template>

<style lang="scss" scoped>
// :deep(.v-data-table) thead tr {

// }

:deep(.v-data-table) thead tr span {
  color: black;
  font-weight: 600;
  text-wrap: nowrap;
}

// :deep(.v-data-table) tbody {

// }
</style>
