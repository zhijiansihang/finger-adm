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
        <Form :model="loan"  :label-width="80">
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="产品ID">
                <Input v-model="loan.loanId" @on-keyup="watchId(loan.loanId)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="12">
              <Form-item label="产品名称">
                <Input v-model="loan.title"  placeholder="请输入"></Input>
              </Form-item>
            </i-col>
          </Row>
          <Row :gutter="60">
            <i-col span="12">
              <Form-item label="产品类型">
                <Select v-model="loan.productType" placeholder="请选择">
                  <Option value="">全部</Option>
                  <Option value="1">信托</Option>
                  <Option value="2">资管</Option>
                  <Option value="4">私募</Option>
                  <Option value="3">其他</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col span="12" v-if="isAdmin">
              <Form-item label="所属机构">
                <Select v-model="loan.institutionUserId" placeholder="请选择机构">
                  <Option v-for="item in institutions" :value="`${item.userId}`" :key="item.userId">{{ item.nickName }}</Option>
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
      <Page :total="totalCount" :page-size="loan.pageSize" :page-size-opts="pageSizeOpts"
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
  import {loanPage, loanDelete, institutionList, getLoginUser} from '../../util/interface';
  import {portalTab, isAdmin} from '../../util/utils';
  import {setStore} from '../../util/storage';
  export default {
    data() {
      return {
        loan: {
          loanId: '',
          title: '',
          productType: '',
          institutionUserId: '',
          status: [100],
          pageSize: 10,
          currentPage: 1
        },
        isAdmin: isAdmin(),
        loanId: '',
        modal_loading: false,
        modalDel: false,
        data: [],
        institutions: [],
        columns7: [
          {
            title: '产品ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].loanId)
              ]);
            }
          },
          {
            title: '产品名称',
            key: 'title',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].title;
            }
          },
          {
            title: '理财师（人）',
            key: 'loanId',
            align: 'center',
            render: (h, params) => {
//              let loanId = this.data6[params.index].loanId === '0' ? '男' : '女';
              return this.data[params.index].countFinanceUser;
            }
          },
          {
            title: '产品类型',
            key: 'productType',
            align: 'center',
            render: (h, params) => {
              let productType = this.data[params.index].productType;
              if (productType === 1) {
                return '信托';
              } else if (productType === 2) {
                return '资管';
              } else if (productType === 4) {
                return '私募';
              } else {
                return '其他资产';
              }
            }
          },
          {
            title: '产品方向',
            width: 85,
            key: 'productDirection',
            align: 'center',
            render: (h, params) => {
              let productDirection = this.data[params.index].productDirection;
              if (productDirection === '1') {
                productDirection = '工商企业';
              }
              if (productDirection === '2') {
                productDirection = '金融市场';
              }
              if (productDirection === '3') {
                productDirection = '基础设施';
              }
              if (productDirection === '4') {
                productDirection = '房地产';
              }
              if (productDirection === '5') {
                productDirection = '资金池';
              }
              if (productDirection === '6') {
                productDirection = '其他';
              }
              return productDirection;
            }
          },
          {
            title: '产品期限',
            align: 'center',
            render: (h, params) => {
              let loanType = this.data[params.index].loanType;
              if (loanType === 2) {
                return this.data[params.index].adaptationDeadline + '年';
              } else {
                return this.data[params.index].investmentDeadline + '个月';
              }
            }
          },
          {
            title: '付息方式',
            key: 'roles',
            align: 'center',
            render: (h, params) => {
              let servicingWay = this.data[params.index].servicingWay;
              if (servicingWay === 1) {
                return '按月付息';
              } else if (servicingWay === 2) {
                return '按季付息';
              } else if (servicingWay === 3) {
                return '半年付息';
              } else if (servicingWay === 4) {
                return '按年付息';
              } else if (servicingWay === 5) {
                return '到期付息';
              } else {
                return '其他';
              }
            }
          },
          {
            title: '起投金额（万元）',
            key: 'beginAmount',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].beginAmount / 10000;
            }
          },
          {
            title: '所属机构',
            key: 'issuer',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].institutionName;
            }
          },
          {
            title: '状态',
            key: 'loanStatus',
            align: 'center',
            render: (h, params) => {
              let loanStatus = this.data[params.index].loanStatus;
              if (loanStatus === 100) {
                return '审核中';
              } else if (loanStatus === 200) {
                return '募集中';
              } else if (loanStatus === 300) {
                return '结束';
              } else if (loanStatus === 400) {
                return '已删除';
              }
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
                      if (this.data[params.index].loanType === 1) {
                        portalTab('add', '审核产品', '/product/detail/public?loanId=' + this.data[params.index].loanId + '&type=review');
//                        this.$router.push({path: 'product/detail/public', query: {'loanId': this.data[params.index].loanId, 'type': 'review'}});
                      } else {
                        portalTab('add', '审核产品', '/product/detail/private?loanId=' + this.data[params.index].loanId + '&type=review');
//                        this.$router.push({path: 'product/detail/private', query: {'loanId': this.data[params.index].loanId, 'type': 'review'}});
                      }
                    }
                  }
                }, '审核'),
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
                      if (this.data[params.index].loanType === 1) {
                        portalTab('add', '编辑产品', '/product/edit/public?loanId=' + this.data[params.index].loanId);
//                        this.$router.push({path: 'product/detail/public', query: {'loanId': this.data[params.index].loanId, 'type': 'review'}});
                      } else {
                        portalTab('add', '编辑产品', '/product/edit/private?loanId=' + this.data[params.index].loanId);
//                        this.$router.push({path: 'product/detail/private', query: {'loanId': this.data[params.index].loanId, 'type': 'review'}});
                      }
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
                      this.loanId = this.data[params.index].loanId;
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
        await loanPage(this.loan).then(r => {
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
        setStore('institutions', this.institutions);
      },
      query: async function () {
        this.init();
      },
      del: async function () {
        await loanDelete({'loanId': this.loanId}).then(r => {
          if (r.header.code === '0') {
            this.$Message.success('删除成功!');
            this.modalDel = false;
            this.init();
          }
//          self.hideModal();
        });
      },
      pageNumChange: function (pageNum) {
        this.loan.currentPage = pageNum;
        this.init();
      },
      pageSizeChange: function (pageSize) {
        this.loan.pageSize = pageSize;
        this.init();
      },
      hideModal(modal) {
        this.modalDel = false;
      },
      reset() {
        this.loan = {
          loanId: '',
          title: '',
          productType: '',
          institutionUserId: '',
          status: [100],
          pageSize: 10,
          currentPage: 1
        };
        this.init();
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      '$route': function (newValue, oldVale) {
        this.init();
      }
    }
  };
</script>

<style>
</style>
