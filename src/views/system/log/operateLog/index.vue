<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item label="姓名" prop="k_name">
        <el-input
          v-model="queryParams.k_name"
          placeholder="请输入姓名"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="k_account">
        <el-input
          v-model="queryParams.k_account"
          placeholder="请输入账号"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="描述" prop="k_desc">
        <el-input
          v-model="queryParams.k_desc"
          placeholder="请输入描述"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录时间" prop="k_time">
        <el-date-picker
          v-model="queryParams.k_time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
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
          icon="el-icon-close"
          size="mini"
          @click="clearShow = !clearShow"
          >清除日志</el-button
        >
      </el-col>
      <template v-if="clearShow">
        <el-col :span="1.5">
          <el-radio-group v-model="clearType">
            <el-radio
              :label="item.id"
              v-for="item in clearTypeList"
              :key="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            @click="clearOperateLog"
            >清除</el-button
          >
        </el-col>
      </template>
    </el-row>
    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="ID" prop="id" width="70" />
      <el-table-column label="姓名" prop="name" :show-overflow-tooltip="true" />
      <el-table-column
        label="登录账号"
        prop="account"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="登录IP" prop="ip" :show-overflow-tooltip="true" />
      <el-table-column
        label="描述"
        prop="description"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作时间"
        prop="create_time"
        :show-overflow-tooltip="true"
      />
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
  </div>
</template>

<script>
import {
  getOperateLogList as getList,
  clearOperateLog,
} from "@/api/system/log";

export default {
  name: "operateLog",
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
      // 查询参数
      queryParams: {
        current_page: 1,
        page_size: 10,

        k_name: "",
        k_account: "",
        k_desc: "",
        k_time: [],
      },
      // 清除日志类型
      clearType: 4,
      clearTypeList: [
        {
          id: 1,
          name: "一个月前",
        },
        {
          id: 2,
          name: "三个月前",
        },
        {
          id: 3,
          name: "半年前",
        },
        {
          id: 4,
          name: "一年前",
        },
      ],
      // 是否显示清除项
      clearShow: false,
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

    // 清除日志
    clearOperateLog() {
      let data = {
        type: this.clearType,
      };
      this.$confirm(
        '是否确认清除"' +
          this.clearTypeList[this.clearType - 1].name +
          '"的操作日志？'
      )
        .then(function () {
          return clearOperateLog(data);
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
.mb8 {
  display: flex;
  align-items: center;
}
</style>
