<template>
  <div class="container">
    <!-- 头部区域 -->
    <el-header class="header">
      <div>
        <span class="header_projectName">加分申请平台</span>
      </div>
      <div class="header_welcome">
        <div>欢迎:{{ name }}</div>
        <div>登录加分申请平台</div>
      </div>
      <el-button @click="logout" type="danger" class="logout">退出</el-button>
    </el-header>
    <!-- 回复 -->
    <el-badge :value="replay_num" class="reply_item">
      <el-button size="small" @click="checkReply">查看回复</el-button>
    </el-badge>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" type="card" class="tabs" @tab-click="tabClick">
      <el-tab-pane label="竞赛申请表" name="competition">
        <!-- 竞赛申请表单 -->
        <el-form ref="competitionForm" :model="competitionForm" label-width="130px" :rules="competitionFormRules" size="small">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="competitionForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="competitionForm.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="比赛级别" prop="matchLevel">
            <el-input v-model="competitionForm.matchLevel"></el-input>
          </el-form-item>
          <el-form-item label="获奖等级及排名" prop="ranking">
            <el-input v-model="competitionForm.ranking"></el-input>
          </el-form-item>
          <el-form-item label="竞赛项目" prop="projectName">
            <el-input v-model="competitionForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="获奖类型" prop="awardType">
            <el-radio-group v-model="competitionForm.awardType">
              <el-radio :label="1">知识或科技类</el-radio>
              <el-radio :label="2">文体类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试科目" prop="testSubjects">
            <el-input v-model="competitionForm.testSubjects"></el-input>
          </el-form-item>
          <el-form-item label="原始成绩" prop="rawScores">
            <el-input v-model="competitionForm.rawScores"></el-input>
          </el-form-item>
          <el-form-item label="奖励后成绩" prop="afterScores">
            <el-input v-model="competitionForm.afterScores"></el-input>
          </el-form-item>
          <el-form-item label="学年学期" prop="term">
            <el-input v-model="competitionForm.term" placeholder="例：2015-2016第一学期"></el-input>
          </el-form-item>
          <el-form-item label="是否放弃加分" prop="isAbandon">
            <el-cascader v-model="competitionForm.isAbandon" :options="isAbandonOptions" placeholder="请选择是否放弃加分"></el-cascader>
          </el-form-item>
          <el-form-item label="学院负责人" prop="leadingCadre">
            <el-cascader v-model="competitionForm.leadingCadre" :options="leadingCadreOptions" placeholder="请选择负责人" filterable clearable></el-cascader>
          </el-form-item>

          <el-form-item>
            <el-dialog title="添加附件" :visible.sync="competitionDialogVisible" width="30%" center>
              <el-form>
                <el-form-item>
                  <el-upload
                    multiple
                    class="appendix-uploader"
                    action=""
                    :limit="3"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :on-change="certificateChange"
                    :before-remove="certificateRemove"
                    :file-list="fileListCertificate"
                  >
                    <el-button type="primary">获奖说明</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-upload
                    multiple
                    class="appendix-uploader"
                    action=""
                    :limit="3"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :on-change="renounceChange"
                    :before-remove="renounceRemove"
                    :file-list="fileListRenounce"
                  >
                    <el-button type="primary">放弃说明</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-upload
                    multiple
                    class="appendix-uploader"
                    action=""
                    :limit="3"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :on-change="othersChange"
                    :before-remove="othersRemove"
                    :file-list="fileListOthers"
                  >
                    <el-button type="primary">其他</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-button type="primary" class="competeBtn" @click="competitionDialogVisible = true">添加附件</el-button>
            <el-button type="primary" class="competeBtn" @click="toSubmitForm('competitionForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="专利申请表" name="patent">
        <!-- 专利申请表单 -->
        <el-form ref="patentForm" :model="patentForm" label-width="110px" :rules="patentFormRules" size="small">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="patentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="patentForm.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="专利名称" prop="projectName">
            <el-input v-model="patentForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="专利排名" prop="patentRanking">
            <el-input v-model="patentForm.patentRanking"></el-input>
          </el-form-item>
          <el-form-item label="专利类型" prop="patentType">
            <el-radio-group v-model="patentForm.patentType">
              <el-radio :label="1">知识或科技类</el-radio>
              <el-radio :label="2">文体类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试科目" prop="testSubjects">
            <el-input v-model="patentForm.testSubjects"></el-input>
          </el-form-item>
          <el-form-item label="原始成绩" prop="rawScores">
            <el-input v-model="patentForm.rawScores"></el-input>
          </el-form-item>
          <el-form-item label="奖励后成绩" prop="afterScores">
            <el-input v-model="patentForm.afterScores"></el-input>
          </el-form-item>
          <el-form-item label="学年学期" prop="term">
            <el-input v-model="patentForm.term" placeholder="例：2015-2016第一学期"></el-input>
          </el-form-item>
          <el-form-item label="是否放弃加分" prop="isAbandon">
            <el-cascader v-model="patentForm.isAbandon" :options="isAbandonOptions" placeholder="请选择是否放弃加分"></el-cascader>
          </el-form-item>
          <el-form-item label="学院负责人" prop="leadingCadre">
            <el-cascader v-model="patentForm.leadingCadre" :options="leadingCadreOptions" placeholder="请选择负责人" filterable clearable></el-cascader>
          </el-form-item>
          <el-form-item>
            <!-- 附件 -->
            <el-dialog title="添加附件" :visible.sync="patentDialogVisible" width="30%" center>
              <el-form>
                <el-form-item>
                  <el-upload multiple class="appendix-uploader" action="" :limit="3" :auto-upload="false" :on-exceed="handleExceed" :on-change="certificateChange" :before-remove="certificateRemove">
                    <el-button type="primary">获奖证明</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-upload multiple class="appendix-uploader" action="" :limit="3" :auto-upload="false" :on-exceed="handleExceed" :on-change="renounceChange" :before-remove="renounceRemove">
                    <el-button type="primary">放弃说明</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-upload multiple class="appendix-uploader" action="" :limit="3" :auto-upload="false" :on-exceed="handleExceed" :on-change="othersChange" :before-remove="othersRemove">
                    <el-button type="primary">其他</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-button type="primary" class="patentBtn" @click="patentDialogVisible = true">添加附件</el-button>
            <el-button type="primary" class="patentBtn" @click="toSubmitForm('patentForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="回复箱" name="reply">
        <!-- 开关 -->
        <el-tooltip content="打开查看已通过" placement="top">
          <el-switch v-model="isAdopt" active-color="#13ce66" inactive-color="#eaecf0" @change="switchChange"></el-switch>
        </el-tooltip>
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input v-model="query" clearable @clear="getReplyList" placeholder="请输入项目名称进行搜索">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <!-- 回复表单 -->
        <el-table :data="replyList" stripe border>
          <template slot="empty"> 当前没有回复 </template>
          <el-table-column prop="time" label="提交日期" width="180px"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="studentNumber" label="学号"> </el-table-column>
          <el-table-column prop="projectName" label="名称"> </el-table-column>
          <el-table-column prop="tabId" label="类型">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.tabId === 1">竞赛表</el-tag>
              <el-tag type="primary" v-else>专利表</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isAdopt" label="是否通过审核">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.isAdopt === '1'">通过</el-tag>
              <el-tag type="danger" v-else>未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.tid, scope.row.tabId)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询字符串
      query: '',
      // 是否通过审核
      isAdopt: false,
      formLabelWidth: '120px',
      // 用户信息
      name: null,
      username: null, // 这里是studentNumber
      token: null,
      // 竞赛表单
      competitionForm: {
        name: null,
        studentNumber: null,
        matchLevel: null,
        ranking: null,
        projectName: null,
        awardType: null,
        testSubjects: null,
        rawScores: null,
        afterScores: null,
        term: null,
        isAbandon: null,
        leadingCadre: null,
      },
      // 专利表单
      patentForm: {
        name: null,
        studentNumber: null,
        patentRanking: null,
        projectName: null,
        patentType: null,
        testSubjects: null,
        rawScores: null,
        afterScores: null,
        term: null,
        isAbandon: null,
        leadingCadre: null,
      },
      // 实际上传的表单
      submitForm: new FormData(),
      // 表单验证
      competitionFormRules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
        studentNumber: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur',
          },
        ],
        matchLevel: [
          {
            required: true,
            message: '请输入比赛级别',
            trigger: 'blur',
          },
        ],
        ranking: [
          {
            required: true,
            message: '请输入获奖等级及排名',
            trigger: 'blur',
          },
        ],
        projectName: [
          {
            required: true,
            message: '请输入竞赛项目',
            trigger: 'blur',
          },
        ],
        awardType: [
          {
            required: true,
            message: '请输入获奖类型',
            trigger: 'blur',
          },
        ],
        testSubjects: [
          {
            required: true,
            message: '请输入考试科目',
            trigger: 'blur',
          },
        ],
        rawScores: [
          {
            required: true,
            message: '请输入原始成绩',
            trigger: 'blur',
          },
        ],
        afterScores: [
          {
            required: true,
            message: '请输入奖励后成绩',
            trigger: 'blur',
          },
        ],
        term: [
          {
            required: true,
            message: '请输入学年学期',
            trigger: 'blur',
          },
        ],
        isAbandon: [
          {
            required: true,
            message: '请选择是否放弃加分',
            trigger: 'blur',
          },
        ],
        leadingCadre: [
          {
            required: true,
            message: '请输入负责人',
            trigger: 'blur',
          },
        ],
      },
      patentFormRules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
        studentNumber: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur',
          },
        ],
        patentRanking: [
          {
            required: true,
            message: '请输入专利排名',
            trigger: 'blur',
          },
        ],
        projectName: [
          {
            required: true,
            message: '请输入专利排名',
            trigger: 'blur',
          },
        ],
        patentType: [
          {
            required: true,
            message: '请输入专利类型',
            trigger: 'blur',
          },
        ],
        testSubjects: [
          {
            required: true,
            message: '请输入考试科目',
            trigger: 'blur',
          },
        ],
        rawScores: [
          {
            required: true,
            message: '请输入原始成绩',
            trigger: 'blur',
          },
        ],
        afterScores: [
          {
            required: true,
            message: '请输入奖励后成绩',
            trigger: 'blur',
          },
        ],
        term: [
          {
            required: true,
            message: '请输入学年学期',
            trigger: 'blur',
          },
        ],
        isAbandon: [
          {
            required: true,
            message: '请选择是否放弃加分',
            trigger: 'blur',
          },
        ],
        leadingCadre: [
          {
            required: true,
            message: '请输入负责人',
            trigger: 'blur',
          },
        ],
      },
      // 级联选择器配置
      isAbandonOptions: [
        {
          value: true,
          label: '是',
        },
        {
          value: false,
          label: '否',
        },
      ],
      leadingCadreOptions: [],
      // 当前选中的标签页
      activeName: 'competition',
      // 弹出框是否显示
      competitionDialogVisible: false,
      patentDialogVisible: false,
      // 回复数
      replay_num: 0,
      // 回复列表
      replyList: [],
      // 文件列表
      fileListCertificate: [],
      fileListRenounce: [],
      fileListOthers: [],
    }
  },
  created() {
    this.token = window.sessionStorage.getItem('token')
    const userInfo = JSON.parse(`${window.sessionStorage.getItem('userinfo')}`)
    this.username = userInfo.studentNumber
    this.name = userInfo.name
    this.getLeaders()
    this.getReply()
  },
  methods: {
    async getLeaders() {
      const { data: res } = await this.$http.get(`token/student/leaders`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      res.list.forEach((element) => {
        element.value = `${element.faculty}-${element.leadingCadre}-${element.leaderId}`
        element.label = element.leadingCadre
      })
      this.leadingCadreOptions = res.list
    },
    async toSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        }
      })
      const resetTarget = formName
      const reqStr = formName.split('F')[0]
      // 处理级联选择器
      formName = JSON.parse(JSON.stringify(this[formName]))
      const leaderInfo = formName.leadingCadre.join('').split('-')
      formName.leaderId = leaderInfo.pop() - 0
      formName.leadingCadre = leaderInfo.join('-')
      formName.isAbandon = formName.isAbandon[0]
      for (let k in formName) {
        this.submitForm.set(`${k}`, formName[k])
      }
      for (let key of this.submitForm.keys()) {
        if (this.submitForm.get(`${key}`) instanceof File) {
          console.log(key, ':', this.submitForm.get(`${key}`))
        }
      }
      const { data: res } = await this.$http.post(`token/student/${reqStr}`, this.submitForm)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.$refs[resetTarget].resetFields()
      this.submitForm = new FormData()
      this.fileListOthers = []
      this.fileListRenounce = []
      this.fileListCertificate = []
    },
    async getReply() {
      const { data: res } = await this.$http.post(`token/student/newReply`, {
        username: this.username,
      })
      if (res.meta.status !== 200) {
        return this.$message(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.replay_num = res.number
    },
    // 搜索
    getList() {
      if (this.query === '') {
        this.getReplyList()
        return
      }
      // 根据项目名称过滤数组，留下想要的
      this.replyList.forEach((reply) => {
        if (reply.projectName === `${this.query}`) {
          this.replyList = [{ ...reply }]
        }
      })
    },
    async getReplyList() {
      const { data: res } = await this.$http.post('/token/student/viewReply', {
        username: this.username,
      })
      if (res.meta.status !== 200) {
        return this.$message.warning('当前没有回复！')
      }
      this.replyList = res.list
    },
    async removeById(tid, tabId) {
      const confirmResult = await this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      const { data: res } = await this.$http.post('token/student/deleteReply', {
        tabId: tabId,
        tid: tid,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')
      this.getReply()
      this.getReplyList()
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    certificateChange(file) {
      this.submitForm.set('certificates', file.raw, file.name)
    },
    renounceChange(file) {
      this.submitForm.append('renounce', file.raw, file.name)
    },
    othersChange(file) {
      this.submitForm.append('others', file.raw, file.name)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件共选择了 ${files.length + fileList.length} 个文件`)
    },
    certificateRemove() {
      this.submitForm.delete('certificates')
    },
    renounceRemove() {
      this.submitForm.delete('renounce')
    },
    othersRemove() {
      this.submitForm.delete('others')
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除${file.name}？`)
    },
    checkReply() {
      this.getReplyList()
      this.activeName = 'reply'
    },
    switchChange() {
      const localReplyList = this.replyList
      this.replyList = []
      if (!this.isAdopt) {
        this.getReplyList()
      } else {
        localReplyList.forEach((reply) => {
          if (reply.isAdopt === '1') {
            this.replyList.push(reply)
          }
        })
      }
    },
    tabClick(targetName) {
      if (targetName.paneName === 'reply') {
        this.getReplyList()
      }
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: #409eff;
  height: 50px;
  width: 100%;
  color: white;
  font-weight: 700;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .header_welcome {
  position: absolute;
  top: 10px;
  right: 100px;
  font-weight: 400;
  font-size: 14px;
}

.header .logout {
  position: absolute;
  top: 10px;
  right: 20px;
}

.reply_item {
  position: absolute;
  top: 65px;
  right: 50px;
  z-index: 99;
}

.appendix-uploader {
  padding: 20px 35%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.el-row {
  left: 60px;
  top: -20px;
}

.el-switch {
  left: 10px;
  top: 10px;
}

.el-tab-pane {
  padding: 0px 20px;
}
</style>
