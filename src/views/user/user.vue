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
              <Form-item label="用户ID">
                <Input v-model="user.userId" @on-keyup="watchId(user.userId)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="用户手机号">
                <Input v-model="user.mobile"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="用户类型">
                <Select v-model="user.rolesList[0]" placeholder="请选择" clearable>
                  <Option :value=3>投资人</Option>
                  <Option :value=5>机构理财师</Option>
                  <Option :value=4>个人理财师</Option>
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
          平台用户列表
        </p>
        <a href="#" slot="extra">
          <!--<Button type="success" shape="circle" v-on:click="modalAdd = true;" icon="plus">添加</Button>-->
          <Button type="ghost" shape="circle" v-on:click="init()" icon="refresh">刷新</Button>
        </a>
        <Table border :columns="columns7" :data="data"></Table>
      </Card>
    </iCol>

    <iCol span="24" class="top-30 inner-right">
      <Page :total="totalCount" :page-size="user.pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>
  </Row>
</template>

<script type="text/ecmascript-6">
  import {userPage} from '../../util/interface';

  export default {
    data() {
      return {
        user: {
          userId: '',
          mobile: '',
          rolesList: [],
          pageSize: 10,
          currentPage: 1
        },
        modalAdd: false,
        data: [],
        columns7: [
          {
            title: '用户ID',
            key: 'userId',
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
            key: 'mobile',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].mobile;
            }
          },
          {
            title: '注册时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].createTime;
            }
          },
          {
            title: '预约次数',
            width: 85,
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].investTime;
            }
          },
          {
            title: '预约总金额（万元)',
            align: 'center',
            render: (h, params) => {
              if (this.data[params.index].totalAmount) {
                return this.data[params.index].totalAmount;
              } else {
                return '0';
              }
            }
          },
          {
            title: '用户类型',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              let roles = this.data[params.index].roles;
              let roleName = '平台管理员';
              if (roles === 1) {
                roleName = '平台管理员';
              }
              if (roles === 2) {
                roleName = '第三方机构';
              }
              if (roles === 3) {
                roleName = '用户投资人';
              }
              if (roles === 4) {
                roleName = '个人理财师';
              }
              if (roles === 5) {
                roleName = '机构理财师';
              }
              return roleName;
            }
          },
          {
            title: '所属机构',
            key: 'institutionUserId',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].institutionName;
            }
          },
          {
            title: '认证情况',
            key: 'isNameAuth',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].isNameAuth === 1 ? '已认证' : '未认证';
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
                      this.$router.push({path: 'userDetail', query: {'userId': this.data[params.index].userId}});
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
        await userPage(this.user).then(r => {
          this.data = r.body.results;
          this.totalCount = r.body.recordCount;
        });
      },
      query: async function () {
        this.init();
      },
      reset() {
        this.user = {
          userId: '',
          mobile: '',
          rolesList: [],
          pageSize: 10,
          currentPage: 1
        };
        this.init();
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
    }
  };
</script>

<style>
</style>
