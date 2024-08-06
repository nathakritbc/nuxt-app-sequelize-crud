import { ref, reactive } from "vue";
export const products = ref([]);
export const showDialog = ref(false);
export const createDialog = ref(false);
export const updateDialog = ref(false);
export const deleteDialog = ref(false);
export const showItemDialog = ref({
  p_id: 0,
  p_name: "",
  p_price: 0,
  p_amount: 0,
});
export const updateItemDialog = ref({
  p_id: 0,
  p_name: "",
  p_price: 0,
  p_amount: 0,
});
export const deleteItemDialog = ref({
  p_id: 0,
  p_name: "",
});
