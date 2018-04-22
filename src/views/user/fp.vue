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
        <Form :model="user" :label-width="80">
          <Row :gutter="60">
            <i-col span="8">
              <Form-item label="用户ID">
                <Input v-model="user.userId" @on-keyup="watchId(user.userId)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="用户手机号">
                <Input v-model="user.mobile" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="所属机构">
                <Select v-model="user.institutionUserId" placeholder="请选择">
                  <Option v-for="item in institutions" :value="item.userId" :key="item.userId">{{ item.nickName }}</Option>
                </Select>
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
          理财师列表
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
    <Modal v-model="modalAdd" title="用户添加" width="730" >
      <Form :model="fb" :label-width="80" ref="fbAdd" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="手机号" prop="phone">
              <Input v-model="mobile" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
          <i-col span="6">
            <Button type="info" shape="circle" icon="search" @click="getByMobile">查询</Button>
          </i-col>
        </Row>
        <div v-if="fb.userId">
          <Row :gutter="60">
            <i-col span="18">
              <Form-item label="昵称" prop="nickName">
                {{fb.nickName}}
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="18">
              <Form-item label="用户ID" prop="userId">
                {{fb.userId}}
              </Form-item>
            </i-col>
          </Row>

          <Row :gutter="60">
            <i-col span="18">
              <Form-item label="注册时间" prop="createTime">
                {{fb.createTime}}
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="18">
              <Form-item label="选择机构" prop="institutionUserId">
                <Row>
                  <iCol span="24">
                    <Select v-model="fb.institutionUserId" placeholder="请选择机构">
                      <Option v-for="item in institutions" :value="`${item.userId}`" :key="item.userId">{{ item.nickName }}</Option>
                    </Select>
                  </iCol>
                </Row>
              </Form-item>
            </i-col>
          </Row>
        </div>
      </Form>

      <div slot="footer">
        <Button type="info" size="large" @click="handleSubmit" v-if="fb.userId">添加为理财师</Button>
        <Button type="info" size="large" v-on:click="hideModal">关闭</Button>
      </div>

    </Modal>
  </Row>
</template>

<script type="text/ecmascript-6">
  import {getLoginUser, fbPage, getUserByMobile, fbAdd, institutionList} from '../../util/interface';
  import {isAdmin} from '../../util/utils';
  export default {
    data() {
      return {
        ruleValidate: {
          institutionUserId: [
            {required: true, message: '机构不能为空', trigger: 'blur'}
          ]
        },
        user: {
          userId: '',
          mobile: '',
          roles: '',
          pageSize: 10,
          currentPage: 1
        },
        fb: {
          userId: '',
          mobile: '',
          roles: '',
          pageSize: 10,
          currentPage: 1
        },
        institutions: [],
        mobile: '',
        modalAdd: false,
        data: [],
        columns7: [
          {
            title: '用户ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].userId)
              ]);
            }
          },
          {
            title: '昵称',
            key: 'nickName',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].nickName;
            }
          },
          {
            title: '手机号',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].mobile;
            }
          },
          {
            title: '注册时间',
            width: 158,
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].createTime;
            }
          },
          {
            title: '产品数量',
            width: 85,
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].investTime;
            }
          },
          {
            title: '预约总金额（万元)',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              if (this.data[params.index].totalAmount) {
                return (this.data[params.index].totalAmount / 10000).toFixed(2);
              } else {
                return '0';
              }
//              return this.data[params.index].totalAmount;
            }
          },
          {
            title: '所属机构',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].institutionName;
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 110,
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
                      this.$router.push({path: 'fbDetail', query: {'userId': this.data[params.index].userId}});
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        pageSizeOpts: [1, 2, 5, 10, 20, 50],
        totalCount: null
      };
    },
    methods: {
      init: async function () {
        await fbPage(this.user).then(r => {
          this.data = r.body.results;
          this.totalCount = r.body.recordCount;
        });
        if (isAdmin()) {
          await institutionList().then(r => {
            this.institutions = r.body;
          });
        } else {
          await getLoginUser().then(r => {
            this.institutions[0] = r.body;
          });
        }
      },
      getByMobile: async function () {
//        console.log();
        this.fb.mobile = this.mobile;
        let self = this;
        await getUserByMobile(this.fb).then(r => {
          if (r.body.roles === 4) {
            this.$Message.error('该用户已是理财师');
          } else {
            self.fb = r.body;
          }
        });
      },
      query: async function () {
        this.init();
      },
      reset() {
        this.user = {
          userId: '',
          mobile: '',
          roles: '',
          pageSize: 10,
          currentPage: 1
        };
        this.init();
      },
      handleSubmit() {
        let self = this;
        this.$refs['fbAdd'].validate(async (valid) => {
          if (valid) {
            await fbAdd(this.fb).then(r => {
              if (r.header.code === '0') {
                self.hideModal();
                this.$Message.success('添加成功!');
                self.init();
              }
            });
          }
        });
      },
      hideModal() {
        this.fb = {};
        this.mobile = '';
        this.modalAdd = false;
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
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      'fb.institutionUserId': function (newValue, oldVale) {
        let self = this;
        this.institutions.forEach(item => {
          if (newValue * 1 === item.userId) {
            self.fb.institutionName = item.nickName;
          }
        });
      }
    }
  };
</script>

<style>
</style>
