<script setup lang="ts">
import { deleteDialog, deleteItemDialog, products } from "~/hooks/products.js";
import { useToast } from "vue-toastification";
const toast = useToast();
const clearDelete = () => {
  deleteDialog.value = false;
  deleteItemDialog.value = {
    p_id: 0,
    p_name: "",
  };
};
const deleteProduct = async () => {
  try {
    await $fetch(`/api/products/${deleteItemDialog.value.p_id}`, {
      method: "DELETE",
    });
    const newProducts = products.value.filter(
      (item: Product) => item.p_id !== deleteItemDialog.value.p_id
    );
    products.value = newProducts;
    clearDelete();
    toast.success("ลบสินค้าสําเร็จ");
  } catch (error) {
    console.error(error);
    toast.error("ลบสินค้าไม่สําเร็จ");
  }
};
</script>
<template>
  <v-dialog v-model="deleteDialog" max-width="500" persistent>
    <v-card>
      <div class="flex flex-row align-center justify-center w-full pt-10">
        <v-icon size="150" color="warning">mdi-alert-circle</v-icon>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <div class="">
          <h1 class="text-xl md:text-3xl font-semibold text-center text-[#555]">
            คุณต้องการลบสินค้าหรือไม่?
          </h1>
          <h1 class="text-xl mt-7 font-medium text-center">
            ลบสินค้ารายการไอดีที่
            <span class="font-semibold">{{ deleteItemDialog.p_id }}</span>
            <span class="text-error font-semibold ml-2">{{
              deleteItemDialog.p_name
            }}</span>
          </h1>
        </div>
      </v-card-text>
      <v-divider class="mt-2"></v-divider>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="clearDelete"> ปิด </v-btn>
        <v-btn class="text-error" @click="deleteProduct">
          <span class="font-semibold">ลบ</span>
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
