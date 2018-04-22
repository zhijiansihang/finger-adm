<template>
  <Row>
    <iCol span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          条件筛选
        </p>
        <a href="#" slot="extra">
          <Button type="info" shape="circle" v-on:click="query()" icon="ios-search">查询</Button>
          <Button type="ghost" shape="circle" v-on:click="reset()" icon="refresh">重置</Button>
        </a>
        <Form :model="user"  :label-width="80">
          <Row :gutter="60">
            <i-col span="8">
              <Form-item label="机构ID">
                <Input v-model="user.userId" @on-keyup="watchId(user.userId)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="机构名称">
                <Input v-model="user.nickName"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
        </Form>
      </Card>
    </iCol>

    <iCol span="24" class="top-30">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          机构列表
        </p>
        <a href="#" slot="extra">
          <Button type="success" shape="circle" v-on:click="modalAdd = true;" icon="plus">添加</Button>
          <Button type="ghost" shape="circle" v-on:click="init()" icon="refresh">刷新</Button>
        </a>
        <Table border :columns="columns7" :data="data"></Table>
      </Card>
    </iCol>

    <iCol span="24" class="top-30 inner-right">
      <Page :total="totalCount" :page-size="user.pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>


    <Modal v-model="modalAdd" title="用户添加" width="730"
           @on-ok="handleSubmit('institutionAdd')"  @on-cancel="hideModal('modalAdd')">
      <Form :model="institution" ref="institutionAdd" :label-width="80" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构名称" prop="nickName">
              <Input v-model="institution.nickName" @on-enter="handleSubmit('institutionAdd')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构联系人" prop="realName">
              <Input v-model="institution.realName" @on-enter="handleSubmit('institutionAdd')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="联系方式" prop="mobile">
              <Input v-model="institution.mobile" @on-enter="handleSubmit('institutionAdd')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="后台账号" prop="authId">
              <Input v-model="institution.authId" @on-enter="handleSubmit('institutionAdd')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="密码" prop="authPass">
              <Input v-model="institution.authPass" @on-enter="handleSubmit('institutionAdd')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>

      </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('institutionAdd')">确认添加</Button>
        <Button type="info" size="large" v-on:click="hideModal()">关闭</Button>
      </div>

    </Modal>


    <Modal v-model="modalEdit" title="机构修改" width="730"
           @on-ok="handleSubmit('institutionEdit')"  @on-cancel="hideModal('modalEdit')">
      <Form :model="institution" ref="institutionEdit" :label-width="80" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构名称" prop="nickName">
              <Input v-model="institution.nickName" @on-enter="handleSubmit('institutionEdit')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构联系人" prop="realName">
              <Input v-model="institution.realName" @on-enter="handleSubmit('institutionEdit')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="联系方式" prop="mobile">
              <Input v-model="institution.mobile" @on-enter="handleSubmit('institutionEdit')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="后台账号" prop="authId">
              <Input v-model="institution.authId" @on-enter="handleSubmit('institutionEdit')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="重置密码" prop="authPass">
              <Button type="info" size="small" @click="resetPass(institution.userId)">密码重置</Button>
              <span>*联系人手机号后四位+111111</span>
            </Form-item>
          </i-col>
        </Row>
      </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('institutionEdit')">提交修改</Button>
        <Button type="info" size="large" v-on:click="hideModal()">关闭</Button>
      </div>

    </Modal>

    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除机构</span>
      </p>
      <div style="text-align:center">
        <p>机构删除后，机构名下的所有产品将结标，所有理财师角色转换为投资人</p>
        <p>确定删除该机构吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" :loading="modal_loading" @click="del">确定删除</Button>
        <Button type="info" size="large" v-on:click="hideModal()">取消</Button>
      </div>
    </Modal>

  </Row>
</template>

<script type="text/ecmascript-6">
  import {institutionPage, institutionGet, addAuth, deleteAuth, resetPass} from '../../util/interface';

  export default {
    data() {
      return {
        ruleValidate: {
          nickName: [
            {required: true, message: '机构名称不能为空', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '机构联系人不能为空', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '联系方式不能为空', trigger: 'blur'}
          ],
          authId: [
            {required: true, message: '后台账号不能为空', trigger: 'blur'}
          ],
          authPass: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        modalAdd: false,
        modalEdit: false,
        modalDel: false,
        modal_loading: false,
        user: {
          userId: '',
          mobile: '',
          nickName: '',
          pageSize: 10,
          currentPage: 1
        },
        institution: {
          nickName: '',
          userId: '',
          mobile: '',
          isFrozen: '0',
          isNameAuth: '0',
          isRegisterJg: '0',
          roles: '2',
          source: '1',
          authId: '',
          authPass: ''
        },
        data: [],
        columns7: [
          {
            title: '机构ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].userId)
              ]);
            }
          },
          {
            title: '机构名称',
            key: 'nickName',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].nickName;
            }
          },
          {
            title: '理财师（人）',
            key: 'fps',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].investTime;
            }
          },
          {
            title: '产品数量',
            width: 85,
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].totalAmount;
            }
          },
          {
            title: '机构联系人',
            key: 'realName',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].realName;
            }
          },
          {
            title: '联系方式',
            key: 'mobile',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].mobile;
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 210,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.institution.userId = this.data[params.index].userId;
                      this.get();
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modalDel = true;
                      this.user.userId = this.data[params.index].userId;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageSizeOpts: [1, 2, 5, 10, 20, 50],
        totalCount: null,
        pageSize: 5,
        pageNumber: 1
      };
    },
    methods: {
      init: async function () {
        await institutionPage(this.user).then(r => {
          this.data = r.body.results;
          this.totalCount = r.body.recordCount;
        });
      },
      get: async function () {
        let self = this;
        this.modalEdit = true;
        await institutionGet(this.institution).then(r => {
          self.institution = r.body;
        });
      },
      query: async function () {
        this.init();
      },
      del: async function () {
        await deleteAuth(this.user).then(r => {
          if (r.header.code === '0') {
            this.$Message.success('删除成功!');
          }
          this.hideModal();
        });
        this.init();
      },
      resetPass: async function (userId) {
//        console.log(userId);
        await resetPass({'userId': userId}).then(r => {
          if (r.header.code === '0') {
            this.$Message.success('重置成功!');
          } else {
            this.$Message.error('重置失败!');
          }
          this.hideModal();
        });
//        this.init();
      },
      handleSubmit(name) {
        let self = this;
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            await addAuth(this.institution).then(r => {
              if (r.header.code === '0') {
                self.init();
                this.$Message.success('添加成功!');
              }
            });
            self.hideModal();
          }
        });
      },
      hideModal() {
        this.user = {};
        this.mobile = '';
        this.institution = {
          nickName: '',
          userId: '',
          mobile: '',
          isFrozen: '0',
          isNameAuth: '0',
          isRegisterJg: '0',
          roles: '2',
          source: '1',
          authId: '',
          authPass: ''
        };
        this.modalAdd = false;
        this.modalEdit = false;
        this.modalDel = false;
      },
      watchId(val) {
        if (val.length === 1) {
          this.user.userId = val.replace(/[^1-9]/g, '');
        } else {
          this.user.userId = val.replace(/\D/g, '');
        }
      },
      pageNumChange: function (pageNum) {
        this.user.currentPage = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.user.pageSize = pageSize;
        this.init();
      },
      reset() {
        this.user = {
          userId: '',
          mobile: '',
          nickName: '',
          pageSize: 10,
          currentPage: 1
        };
        this.init();
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>
</style>
