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
                <Input v-model="user.id" @on-keyup="watchId(user.id)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="用户手机号">
                <Input v-model="user.phone"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="用户类型">
                <Select v-model="user.gender" placeholder="请选择">
                  <Option value="">全部</Option>
                  <Option value="0">投资人</Option>
                  <Option value="1">机构理财师</Option>
                  <Option value="1">个人理财师</Option>
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
      <Page :total="totalCount" :page-size="pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>
  </Row>
</template>

<script type="text/ecmascript-6">
	export default {
    data() {
      return {
        user: {
          id: '',
          phone: '',
          gender: ''
        },
        modalAdd: false,
        data: [{
          id: '201709091',
          nickname: '小张',
          mobile: '15090987656',
          registerTime: '2017-09-09  12:23:45',
          appointment: '10',
          amount: '10'
        }, {
          id: '201709091',
          nickname: '小张',
          mobile: '15090987656',
          registerTime: '2017-09-09  12:23:45',
          appointment: '10',
          amount: '10'
        }, {
          id: '201709091',
          nickname: '小张',
          mobile: '15090987656',
          registerTime: '2017-09-09  12:23:45',
          appointment: '10',
          amount: '10'
        }, {
          id: '201709091',
          nickname: '小张',
          mobile: '15090987656',
          registerTime: '2017-09-09  12:23:45',
          appointment: '10',
          amount: '10'
        }],
        columns7: [
          {
            title: '用户ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].id)
              ]);
            }
          },
          {
            title: '昵称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].nickname;
            }
          },
          {
            title: '手机号',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
//              let gender = this.data6[params.index].gender === '0' ? '男' : '女';
              return this.data[params.index].mobile;
            }
          },
          {
            title: '注册时间',
            key: 'phone',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].registerTime;
            }
          },
          {
            title: '预约次数',
            width: 85,
            key: 'roles',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].appointment;
            }
          },
          {
            title: '预约总金额（万元)',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].amount;
            }
          },
          {
            title: '用户类型',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].nickname;
            }
          },
          {
            title: '所属机构',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].nickname;
            }
          },
          {
            title: '认证情况',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
//              let roles = '';
//              let length = this.data6[params.index].roles.length;
//              for (var i = 0; i < length; i++) {
//                roles += this.data6[params.index].roles[i].name + ',';
//              };
              return this.data[params.index].nickname;
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
//                      let authSet = this.data6[params.index].userAuths;
//                      this.data1 = authSet;
//                      this.userId = this.data6[params.index].id;
//                      this.modalManager = true;
                      this.$router.push({path: 'userDetail'});
                    }
                  }
                }, '详情')
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
      pageNumChange: function (pageNum) {
        this.pageNumber = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.init();
      }
    }
  };
</script>

<style>
</style>
