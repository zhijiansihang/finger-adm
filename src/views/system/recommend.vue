<template>
  <Row>
    <iCol span="24" class="top-30">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          推荐列表
        </p>
        <a href="#" slot="extra">
          <Button type="success" shape="circle" v-on:click="$router.push({path: 'recommendAdd'});" icon="plus">添加</Button>
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
            title: '标题',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].id)
              ]);
            }
          },
          {
            title: '发布时间',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].nickname;
            }
          },
          {
            title: '链接',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
//              let gender = this.data6[params.index].gender === '0' ? '男' : '女';
              return this.data[params.index].mobile;
            }
          },
          {
            title: '海报',
            key: 'phone',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].registerTime;
            }
          },
          {
            title: '状态',
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
                      this.$router.push({path: 'recommendEdit'});
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
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
                    }
                  }
                }, '下线'),
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
//                      this.modalManager = true;
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
      }
    }
  };
</script>

<style>
</style>
