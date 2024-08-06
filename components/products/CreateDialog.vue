<script setup lang="ts">
import { ref } from "vue";
import { createDialog, products } from "~/hooks/products.js";
import { useToast } from "vue-toastification";
const formRef = ref(null);
const toast = useToast();
const initForm: Product = {
  p_name: "",
  p_price: 0,
  p_amount: 0,
};
let formData = reactive({ ...initForm });

const clearForm = () => {
  formData = { ...initForm };
  formRef.value?.reset();
  createDialog.value = false;
};

const createProduct = async () => {
  try {
    if (!formRef.value?.validate()) {
      console.error("validate error");
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน.");
      return;
    }
    const payload = {
      p_name: formData.p_name,
      p_price: Number(formData.p_price),
      p_amount: Number(formData.p_amount),
    };
    const response: Product = await $fetch("/api/products", {
      method: "POST",
      body: payload,
    });
    products.value.unshift(response);
    toast.success("เพิ่มสินค้าเรียบร้อย");
    clearForm();
  } catch (error) {
    console.error(error);
    toast.error("เพิ่มสินค้าไม่สําเร็จ!");
  }
};
</script>
<template>
  <v-dialog v-model="createDialog" max-width="500" persistent>
    <v-card class="  ">
      <v-form ref="formRef" @submit.prevent="createProduct">
        <v-card-text>
          <div class="flex flex-row align-center justify-center pt-6">
            <img
              src="../../assets/images/add-product.png"
              alt="Add Product"
              class="w-[200px]"
            />
          </div>
          <h1
            class="text-3xl font-semibold text-primary text-center pb-4 pt-10"
          >
            เพิ่มสินค้า
          </h1>
          <section class="mt-3">
            <v-text-field
              variant="outlined"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อสินค้า']"
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
              :rules="[
                (v) => !!v || 'กรุณากรอกราคาสินค้า',
                (v) => v > 0 || 'กรุณากรอกราคาสินค้าให้ถูกต้อง',
              ]"
              label="ราคาสินค้า"
              placeholder="กรอกราคาสินค้า"
              type="number"
              min="0"
              id="id"
            ></v-text-field>
            <v-text-field
              v-model="formData.p_amount"
              class="mt-3"
              variant="outlined"
              name="name"
              label="จำนวนสินค้า"
              :rules="[
                (v) => !!v || 'กรุณากรอกจำนวนสินค้า',
                (v) => v > 0 || 'กรุณากรอกจำนวนสินค้าให้ถูกต้อง',
              ]"
              placeholder="กรอกจำนวนสินค้า"
              type="number"
              min="0"
              id="id"
            ></v-text-field>
          </section>
          <section class="flex flex-row align-center justify-end mt-4">
            <div>
              <v-btn variant="text" @click="clearForm"> ปิด </v-btn>
              <v-btn variant="text" class="text-primary ml-3" type="submit">
                บันทึก
              </v-btn>
            </div>
          </section>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>
