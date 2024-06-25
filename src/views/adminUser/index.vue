<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item label="工号" prop="k_job_code">
        <el-input
          v-model="queryParams.k_job_code"
          placeholder="请输入工号"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="k_name">
        <el-input
          v-model="queryParams.k_name"
          placeholder="请输入姓名"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="k_phone">
        <el-input
          v-model="queryParams.k_phone"
          placeholder="请输入手机号"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色" prop="k_role_id">
        <el-select
          v-model="queryParams.k_role_id"
          placeholder="请选择角色"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id + 'k_role_id'"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="ID" prop="id" width="70" />
      <el-table-column label="通讯录ID" prop="user_id" width="80" />
      <el-table-column
        label="名称"
        prop="name"
        :show-overflow-tooltip="true"
        width="70"
      />
      <el-table-column
        label="账号"
        prop="account"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="工号"
        prop="job_code"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="性别"
        prop="sex"
        :show-overflow-tooltip="true"
        width="60"
      >
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        prop="phone"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="证件号"
        prop="id_number"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="角色名称"
        prop="role_name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="所属学校"
        prop="school_name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="备注"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-value="1"
            inactive-value="2"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="120px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total > 0"
      background
      :total="total"
      :pageSize="queryParams.page_size"
      :currentPage="queryParams.current_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @pagination="getList"
    />
    <el-dialog
      title="通讯录中选择管理员"
      :visible.sync="addressBookDialogShow"
      width="1500px"
      append-to-body
      @close="open = true"
    >
      <addressBook :isChild="true" @setAdmin="setAdmin" />
    </el-dialog>
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form
        ref="form"
        size="small"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item
          label="通讯录"
          prop="name"
          @click.native="openAddressBookDialog"
        >
          <el-input
            v-model="form.name"
            placeholder="请在通讯录中选择管理员"
            readonly
          />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="form.role_id"
            placeholder="请选择要绑定的角色"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch
            v-model="form.enabled"
            active-value="1"
            inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="form.remark"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm"
          >确 定</el-button
        >
        <el-button size="small" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addressBook from "@/views/addressBook";
import {
  getList,
  enabledChange,
  getInfoById,
  saveOrUpdate,
  delData,
} from "@/api/system/adminUser";
import { getRoleList } from "@/api/system/public";

export default {
  name: "adminUser",
  data() {
    return {
      ids: [],
      // 删除非多个禁用
      multiple: true,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 角色表格数据
      tableList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        current_page: 1,
        page_size: 10,

        k_job_code: "",
        k_name: "",
        k_phone: "",
        k_role_id: "",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "change" }],
        role_id: [{ required: true, message: "请选择学校", trigger: "change" }],
      },

      // 通讯录列表 查询用户弹窗
      addressBookDialogShow: false,
      // 角色列表
      roleList: [],
    };
  },
  components: { addressBook },
  async created() {
    this.getList();

    // 请求角色数据
    this.getRoleList();
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.multiple = !selection.length;
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      getList(this.queryParams).then((res) => {
        this.tableList = res.data.items;
        this.total = parseInt(res.data.total_count);
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParams.current_page = val;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.enabled == "2" ? "停用" : "启用";
      this.$confirm(
        '确认要 " ' + text + ' "" ' + row.name + ' "用户吗？',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          enabledChange({
            id: row.id,
          }).then((res) => {
            this.$message.msgSuccess(text + "成功");
          });
        })
        .catch(() => {
          row.enabled = row.enabled === "1" ? "2" : "1";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: 0,
        name: "",
        user_id: "",
        role_id: "",
        enabled: "1",
        remark: "",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.current_page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加管理员";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getInfoById({
        id: row.id,
      }).then((res) => {
        this.form = res.data.item;
        this.open = true;
        this.title = "修改管理员";
      });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          saveOrUpdate(this.form).then((res) => {
            this.$message.msgSuccess(res.msg);
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      let data = {
        id: row.id,
      };
      this.$confirm('是否确认删除管理员编号为"' + data.id + '"的数据项？')
        .then(function () {
          return delData(data);
        })
        .then(() => {
          this.getList();
          this.$message.msgSuccess("删除成功");
        });
    },
    // 新增管理员打开通讯录弹窗选择用户
    openAddressBookDialog() {
      this.open = false;
      this.addressBookDialogShow = true;
    },
    // 新增管理员--选中管理员
    setAdmin(info) {
      this.form.user_id = info.id;
      this.form.name = info.name;
      this.open = true;
      this.addressBookDialogShow = false;
    },
    // 加载角色列表
    getRoleList() {
      getRoleList({ platform_type: 1 }).then((res) => {
        this.roleList = res.data.items;
      });
    },
  },
};
</script>
