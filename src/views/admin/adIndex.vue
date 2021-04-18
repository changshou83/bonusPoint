<template>
  <div class="container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>加分后台管理系统</span>
      </div>
      <el-button @click="logout" type="danger">退出</el-button>
    </el-header>
    <!-- 分类tab栏 -->

    <!-- 表格区域 -->
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getRanklist">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="ranklist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学号" prop="studentNumber"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="竞赛项目" prop="projectName"></el-table-column>
        <el-table-column label="比赛级别" prop="matchLevel"></el-table-column>
        <el-table-column label="获奖等级" prop="ranking"></el-table-column>
        <el-table-column label="获奖类型" prop="awardType"></el-table-column>
        <el-table-column label="考试科目" prop="testSubjects"></el-table-column>
        <el-table-column label="原成绩" prop="rawScores"></el-table-column>
        <el-table-column label="加分后成绩" prop="afterScores"></el-table-column>
        <el-table-column label="相关证明" prop="filePath">
          <template slot-scope="scope">
            <!-- 点击弹出查看图片对话框 -->
            <el-tooltip effect="dark" content="查看图片" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-picture-outline" size="mini" @click="showImg(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="是否通过审核" prop="" width="130px">
          <template slot-scope="scope">
            <!-- 通过 -->
            <el-tooltip effect="dark" content="通过" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="passRankById(scope.row)"></el-button>
            </el-tooltip>
            <!-- 拒绝 -->
            <el-tooltip effect="dark" content="拒绝" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-circle-close" size="mini" @click="removeRankById(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="附件下载" prop="" width="80px">
          <template slot-scope="scope">
            <!-- 下载附件 -->
            <el-tooltip effect="dark" content="下载附件" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-download" size="mini" @click="downloadFile(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total" :total="total"> </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="查看图片" :visible.sync="imgDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <img class="imgImg" :src="imgUrl" alt="" />
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取申请列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      // 控制查看图片对话框的显示以及隐藏
      imgDialogVisible: false,
      // 图片路径
      imgUrl: '',
      ranklist: [],
      total: 0,
      array: [],
    }
  },
  created() {
    this.getRanklist()
  },
  methods: {
    // 获取所有申请列表数据
    async getRanklist() {
      const status = 'all'
      const { data: res } = await this.$http.post('token/faculty/competitionTables', { status: status })
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败')
      }
      this.ranklist = res.list
      this.total = res.list.length
    },
    // 通过申请
    async passRankById(data) {
      this.array.push({ tid: data.tid, examine: 'true' })
      let a = JSON.stringify(this.array)
      console.log(a)
      const { data: res } = await this.$http.post('token/faculty/competitionSubmit', { array: a })
      if (res.meta.status !== 200) {
        return this.$message.error('操作失败')
      }
      this.$message.success('操作成功，已通过该同学的申请')
      this.getRanklist()
      this.array = []
    },
    // 拒绝申请
    async removeRankById(data) {
      this.array.push({ tid: data.tid, examine: 'false' })
      let a = JSON.stringify(this.array)
      const { data: res } = await this.$http.post('token/faculty/competitionSubmit', { array: a })
      if (res.meta.status !== 200) {
        return this.$message.error('操作失败')
      }
      this.$message.success('操作成功，已拒绝该同学的申请')
      this.getRanklist()
      this.array = []
    },
    // 搜索
    async getList() {
      console.log(this.queryInfo.query)
      if (this.queryInfo.query == '') {
        this.getRanklist()
        return
      }
      const { data: res } = await this.$http.post('token/faculty/search', { searchMsg: this.queryInfo.query })
      if (res.meta.status !== 200) {
        return this.$message.error('搜索失败')
      }
      this.$message.success('查找成功')
      this.ranklist = res.competitionNotSubmit
    },
    // 退出
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 显示查看图片对话框
    showImg(data) {
      const url = 'http://49.232.218.195:8080/bonusPoints/'
      this.imgDialogVisible = true
      this.imgUrl = url + data.filePath
    },
    // 下载附件
    downloadFile(data) {
      window.open('http://49.232.218.195:8080/bonusPoints/download/competitionEnclosure' + '?tid=' + data.tid)
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.el-header {
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.imgImg {
  width: 400px;
  height: 320px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
