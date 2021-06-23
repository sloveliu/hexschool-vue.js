<template>
  <div>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/admin">後台</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/css/all";
</style>
