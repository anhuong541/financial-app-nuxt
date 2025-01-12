<script setup lang="ts">
import Banking from "~/components/pages-dependencies/financial-tracking/Banking.vue";

definePageMeta({
  middleware: "auth",
});
// TODO: Cần Show cái overview của cái budget bản thân
// Sau khi có được mới bắt đầu update thêm phần chi phí cố định như (tiền nhà, hóa đơn, lương hàng tháng, tiền bố mẹ cho,...)
// Rồi sau đó sẽ có những quỹ category nhỏ như (tiền ăn, tiền xe, tiền đi chơi,...)
// Tính đến những khoản mà mình sẽ chia trong tháng
// List ra một danh sách nhỏ để filter ra được là những khoản chi tiêu nhỏ như tiền ăn kem, ăn vặt chiếm tổng bao nhiêu.
// Các tag như chi phí không cần thiết hoặc chi phí cần thiết
</script>

<template>
  <NuxtLayout name="user-layout" app-type="financial-tracking">
    <div class="h-[calc(100vh-64px)]]">
      <Banking />
    </div>
  </NuxtLayout>
</template>
