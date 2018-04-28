<template>
  <Row>
    <iCol span="24" class="top-30">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          首页banner列表
        </p>
        <a href="#" slot="extra">
          <Button type="success" shape="circle" v-on:click="$router.push({path: 'bannerAdd'});" icon="plus">添加</Button>
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
  import {cmsPage, updateCms, delCms} from '../../utils/interface';
  export default {
    data() {
      return {
        user: {
          id: '',
          phone: '',
          gender: ''
        },
        data: [],
        columns7: [
          {
            title: '标题',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].title)
              ]);
            }
          },
          {
            title: '上传时间',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].createTime;
            }
          },
          {
            title: '链接',
            key: 'gender',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].hrefLink;
            }
          },
          {
            title: '海报',
            key: 'phone',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].imageAccessPath;
            }
          },
          {
            title: '状态',
            width: 85,
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].isFrontDisplay === 1 ? '显示' : '不显示';
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 240,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
//                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path: 'bannerEdit', query: {'id': this.data[params.index].id}});
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: this.data[params.index].isFrontDisplay === 1 ? 'warning' : 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.frontShow(this.data[params.index].id, this.data[params.index].isFrontDisplay === 1 ? 0 : 1);
                    }
                  }
                }, this.data[params.index].isFrontDisplay === 1 ? '下线' : '上线'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
//                    icon: 'trash-a'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.del(this.data[params.index].id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageSizeOpts: [1, 2, 5, 10, 20, 50],
        totalCount: null,
        pageSize: 10,
        pageNumber: 1
      };
    },
    methods: {
      init: async function () {
        await cmsPage({'currentPage': this.pageNumber, 'pageSize': this.pageSize, 'typeCode': '100'}).then(r => {
          this.data = r.body.results;
          this.totalCount = r.body.recordCount;
        });
      },
      pageNumChange: function (pageNum) {
        this.pageNumber = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.init();
      },
      frontShow: async function (id, isFrontDisplay) {
        let self = this;
        await updateCms({ 'id': id, 'isFrontDisplay': isFrontDisplay }).then(r => {
          if (r.header.code === '0') {
            this.$Message.success('成功');
            self.init();
          } else {
            this.$Message.error(r.header.message);
          }
        });
      },
      del: function (id) {
        let self = this;
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>确定要删除内容么？</p>',
          onOk: async () => {
            await delCms({ 'id': id }).then(r => {
              if (r.header.code === '0') {
                this.$Message.success('删除成功！');
                self.init();
              } else {
                this.$Message.error(r.header.message);
              }
            });
          }
        });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>
</style>
