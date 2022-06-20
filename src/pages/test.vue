<template>
  <div>
    <el-form ref="elForm" :model="formData" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入单行文本" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入单行文本" />
      </el-form-item>
      <el-form-item label="排位数" prop="order">
        <el-input-number v-model="formData.order" placeholder="计数器" />
      </el-form-item>
      <el-form-item label="计数器" prop="field108">
        <el-input-number v-model="formData.field108" placeholder="计数器" />
      </el-form-item>
      <el-form-item label="单行输入框" prop="field107">
        <el-input v-model="formData.field107" placeholder="请输入单行文本" />
      </el-form-item>
      <el-form-item label="多行输入框" prop="field106">
        <el-input v-model="formData.field106" type="textarea" placeholder="请输入多行文本" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
} from "vue";
const formData = reactive({
  userName: "",
  password: "11111",
  order: 2,
  field108: 1,
  field107: "",
  field106: "2222",
});

</script>

<style>
</style>
