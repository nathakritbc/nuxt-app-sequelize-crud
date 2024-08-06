<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { showDialog, products, showItemDialog } from "~/hooks/products.js";
import { useToast } from "vue-toastification";
const showId = ref(0);
const formRef = ref(null);
const toast = useToast();
const initForm: Product = {
  p_name: "",
  p_price: 0,
  p_amount: 0,
};
let formData: Product = reactive({
  ...initForm,
});

watchEffect(() => {
  showId.value = showItemDialog.value.p_id;
  formData = { ...showItemDialog.value };
});
</script>
<template>
  <div>
    <v-dialog v-model="showDialog" max-width="500" persistent>
      <v-card class="  ">
        <v-card-text>
          <div class="flex flex-row align-center justify-center pt-6">
            <img
              src="../../assets/images/shopping-bag.png"
              alt="Add Product"
              class="w-[200px]"
            />
          </div>
          <h1
            class="text-3xl font-semibold text-primary text-center pb-4 pt-10"
          >
            รายละเอียดสินค้า
          </h1>
          <section class="mt-5">
            <v-text-field
              readonly
              v-model="formData.p_id"
              name="name"
              variant="outlined"
              label="ชื่อสินค้า"
              placeholder="กรอกชื่อสินค้า"
              id="id"
            ></v-text-field>
            <v-text-field
              readonly
              class="mt-3"
              variant="outlined"
              v-model="formData.p_name"
              name="name"
              label="ชื่อสินค้า"
              placeholder="กรอกชื่อสินค้า"
              id="id"
            ></v-text-field>
            <v-text-field
              class="mt-3"
              variant="outlined"
              v-model="formData.p_price"
              label="ราคาสินค้า"
              readonly
              placeholder="กรอกราคาสินค้า"
              type="number"
              min="0"
              id="id"
            ></v-text-field>
            <v-text-field
              readonly
              v-model="formData.p_amount"
              class="mt-3"
              variant="outlined"
              name="name"
              label="จำนวนสินค้า"
              placeholder="กรอกจำนวนสินค้า"
              type="number"
              min="0"
              id="id"
            ></v-text-field>
          </section>
          <section class="flex flex-row align-center justify-end mt-4">
            <div>
              <v-btn
                variant="text"
                class="text-primary"
                @click="() => (showDialog = false)"
              >
                ปิด
              </v-btn>
            </div>
          </section>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
