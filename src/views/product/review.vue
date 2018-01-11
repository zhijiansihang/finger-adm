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
            <i-col span="12">
              <Form-item label="产品ID">
                <Input v-model="user.id" @on-keyup="watchId(user.id)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="产品名称">
                <Input v-model="user.phone"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="产品类型">
                <Select v-model="user.gender" placeholder="请选择">
                  <Option value="">全部</Option>
                  <Option value="0">信托</Option>
                  <Option value="1">资管</Option>
                  <Option value="2">私募股权</Option>
                  <Option value="3">其他</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="所属机构">
                <Select v-model="user.gender" placeholder="请选择">
                  <Option value="">全部</Option>
                  <Option value="0">国民信托</Option>
                  <Option value="1">中融</Option>
                  <Option value="1">光大</Option>
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
          待审核列表
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


    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除产品</span>
      </p>
      <div style="text-align:center">
        <p>确定删除该产品吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" :loading="modal_loading" @click="del">确定</Button>
        <Button type="info" size="large" v-on:click="hideModal('modalDel')">取消</Button>
      </div>
    </Modal>
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
        modalDel: false,
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
            title: '产品ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].id)
              ]);
            }
          },
          {
            title: '产品名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].nickname;
            }
          },
          {
            title: '理财师（人）',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
//              let gender = this.data6[params.index].gender === '0' ? '男' : '女';
              return this.data[params.index].mobile;
            }
          },
          {
            title: '产品类型',
            key: 'phone',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].registerTime;
            }
          },
          {
            title: '产品方向',
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
            title: '产品期限',
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
            title: '付息方式',
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
            title: '起投金额（万元）',
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
            title: '状态',
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
            width: 295,
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
                      this.$router.push({path: 'reviewDetail'});
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon: 'edit'
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
                      this.$router.push({path: 'reviewEdit'});
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
//                      let authSet = this.data6[params.index].userAuths;
//                      this.data1 = authSet;
//                      this.userId = this.data6[params.index].id;
                      this.modalDel = true;
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
      pageNumChange: function (pageNum) {
        this.pageNumber = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.init();
      },
      hideModal(modal) {
        this.modalDel = false;
      }
    }
  };
</script>

<style>
</style>
