<template>
  <div class="users-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <!-- 搜索输入框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsers"
          >
            <!-- 搜索按钮 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsers"
            ></el-button>
          </el-input>
        </el-col>

        <!-- 添加用户 按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button>
        </el-col>
        <!-- / 添加用户 按钮 -->
      </el-row>
      <!-- / 搜索添加区域 -->

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- / 用户列表区域 -->
    </el-card>

    <!-- *** 对话框 *** -->

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFromRules"
        ref="addFromRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- / 添加用户对话框 -->

    <!-- 修改用户对话框 -->

    <!-- / 修改用户对话框 -->

    <!-- 分配角色对话框 -->

    <!-- / 分配角色对话框 -->

    <!-- *** 对话框 *** -->
  </div>
</template>

<script>
import { getUserList, addNewUser } from "@/api/users";
export default {
  name: "Users",
  data() {
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入11位合法的手机号码"));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索内容
        query: "",
        // 当前所处的 页码
        // pagenum: 1,
        // 当前每页 显示多少条数据
        // pagesize: 2,
      },
      // 用户列表
      userList: [],
      // total: 0,

      // 需要被分配角色的用户信息
      // userInfo: {},
      // 所有角色的数据列表
      // rolesList: [],
      // 已选中的角色 id
      // selectedRoleId: '',

      // 控制 添加用户 对话框的显示与隐藏
      addDialogVisible: false,
      // 控制 修改用户对话框的显示与隐藏
      // editDialogVisible: false,
      // 控制 分配角色对话框的显示与隐藏
      // setRoleDialogVisible: false,

      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        mobile: "",
      },
      // 查询到的用户信息对象
      // editForm: {},

      // 添加用户 表单的验证规则对象
      addFromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "密码的长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },

      // 修改表单的验证规则对象
      // editFormRules: {
      //   mobile: [
      //     { required: true, message: "请输入手机号", trigger: "blur" },
      //     { validator: checkMobile, trigger: "blur" },
      //   ],
      // },
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    // 获取用户列表
    async getUsers() {
      // console.log(111);
      const res = await getUserList();
      // console.log('res', res);
      this.userList = res.data.data;
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFromRef.resetFields();
    },
    // 确定添加用户
    confirmAddUser() {
      // console.log('确认添加用户');
      this.$refs.addFromRef.validate(async (valid) => {
        if (!valid) return;
        const res = await addNewUser(this.addForm);
        // 添加用户的网络请求
        // const { data: res } = await this.$http.post("users", this.addForm);
        // console.log(res);
        if (res.data.meta.status !== 200)
          return this.$message.error("添加用户失败");
        this.$message.success("添加用户成功");
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        // 重新获取用户列表数据
        this.getUsers();
      });
    },
  },
};
</script>

<style></style>
