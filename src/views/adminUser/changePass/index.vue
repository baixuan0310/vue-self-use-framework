<template>
  <div class="container">
    <el-card class="box-card" style="">
      <div slot="header" class="clearfix">
        <span>密码修改</span>
        <el-button
          @click="modifyPassword()"
          :style="{
            float: 'right',
            padding: '3px 0',
            color: vuexCommon.headerBg,
          }"
          type="text"
          >立即修改</el-button
        >
      </div>
      <el-form
        ref="form"
        :label-position="labelPosition"
        label-width="120px"
        :model="form"
        :rules="rules"
        @submit.native.prevent
      >
        <el-form-item label="用户名">
          <div>{{ vuexUser.info.name }}</div>
        </el-form-item>
        <el-form-item
          label="原密码"
          style="margin-top: 20px"
          prop="old_password"
        >
          <el-input
            v-model="form.old_password"
            type="password"
            autocomplete="off"
            show-password
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          style="margin-top: 20px"
          prop="new_password"
        >
          <el-input
            v-model="form.new_password"
            type="password"
            autocomplete="off"
            show-password
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          style="margin-top: 20px"
          prop="newPass2"
        >
          <el-input
            type="password"
            autocomplete="off"
            show-password
            v-model="form.newPass2"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth.js";
import { modifyPassword } from "@/api/system/adminUser";
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        old_password: "",
        new_password: "",
        newPass2: "",
      },
      // 表单校验
      rules: {
        old_password: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
        ],
        new_password: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        newPass2: [
          { required: true, message: "确认新密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    modifyPassword() {
      if (this.form.new_password != this.form.newPass2) {
        return this.$message.msgError("两次新密码不一致,请检查");
      }
      this.$refs["form"].validate((valid) => {
        modifyPassword(this.form).then((res) => {
          this.$message.msgSuccess(res.msg);
          removeToken();
          this.$router.push("/login");
        });
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}

.container {
  height: 100%;
  padding: 10px;
}
</style>
