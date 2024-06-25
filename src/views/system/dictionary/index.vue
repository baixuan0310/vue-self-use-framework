<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增字典类型</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="ID" prop="id" width="70" />
      <el-table-column
        label="名称"
        prop="name"
        :show-overflow-tooltip="true"
        width="170"
      />
      <el-table-column
        label="备注"
        prop="remark"
        width="170"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="字段值" prop="remark">
        <template slot-scope="scope">
          <div
            :key="item.id"
            v-for="item in scope.row.dm_list"
            class="tag-list"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @click.stop="tagHandleUpdate(item, scope.row.id)"
              @close="tagHandleClose(item)"
            >
              {{ item.name }}
            </el-tag>
          </div>
          <div class="tag-list">
            <el-tag
              type="danger"
              :disable-transitions="false"
              @click="handleTagAdd(scope.row)"
            >
              新增字段
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
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

    <!-- 添加或修改字典类型 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form
        ref="form"
        size="small"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入字典名称"
            clearable
          />
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
    <!-- 添加或修改字段类型 -->
    <el-dialog
      :title="titleTag"
      :visible.sync="openTag"
      width="500px"
      append-to-body
    >
      <el-form
        ref="formTag"
        :model="formTag"
        :rules="rulesTag"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="formTag.name"
            placeholder="请输入字段名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            size="mini"
            v-model="formTag.sort"
            placeholder="请填写排序"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitFormTag"
          >确 定</el-button
        >
        <el-button size="small" @click="cancelTag">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getDmTypeInfoById,
  saveOrUpdate,
  delData,
  getInfoById,
  save,
  del,
} from "@/api/system/dictionary";

export default {
  name: "dictionary",
  data() {
    return {
      ids: [],
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "change" }],
      },
      // 字段弹窗标题
      titleTag: "",
      // 是否显示字段弹窗
      openTag: false,
      // 字段表单参数
      formTag: {},
      // 字段表单校验
      rulesTag: {
        name: [{ required: true, message: "名称不能为空", trigger: "change" }],
        sort: [{ required: true, message: "排序不能为空", trigger: "change" }],
      },
    };
  },
  async created() {
    this.getList();
  },
  methods: {
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
        remark: "",
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getDmTypeInfoById({
        id: row.id,
      }).then((res) => {
        this.form = res.data.item;
        this.open = true;
        this.title = "修改字典";
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
      this.$confirm('是否确认字典编号为"' + data.id + '"的数据项？')
        .then(function () {
          return delData(data);
        })
        .then(() => {
          this.getList();
          this.$message.msgSuccess("删除成功");
        });
    },
    cancelTag() {
      this.openTag = false;
      this.resetTag();
    },
    /** 字段提交按钮 */
    submitFormTag: function () {
      this.$refs["formTag"].validate((valid) => {
        if (valid) {
          save(this.formTag).then((res) => {
            this.$message.msgSuccess(res.msg);
            this.openTag = false;
            this.getList();
          });
        }
      });
    },
    // 字段表单重置
    resetTag() {
      this.formTag = {
        id: 0,
        name: "",
        type_id: "",
        sort: 100,
      };
      this.resetForm("formTag");
    },
    /** 新增字段按钮操作 */
    handleTagAdd(row) {
      this.resetTag();
      this.formTag.type_id = row.id;
      this.openTag = true;
      this.titleTag = "添加字段";
    },
    // 编辑新增字段
    tagHandleUpdate(row, type_id) {
      this.resetTag();
      getInfoById({
        id: row.id,
      }).then((res) => {
        this.formTag = res.data.item;
        this.formTag.type_id = type_id;
        this.openTag = true;
        this.titleTag = "修改字段";
      });
    },
    // 删除字段
    tagHandleClose(row) {
      let data = {
        id: row.id,
      };
      this.$confirm('是否确认字段为"' + row.name + '"的数据项？')
        .then(function () {
          return del(data);
        })
        .then(() => {
          this.getList();
          this.$message.msgSuccess("删除成功");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-list {
  display: inline-block;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
</style>
