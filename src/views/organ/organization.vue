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
                <Input v-model="user.id" @on-keyup="watchId(user.id)" placeholder="请输入"></Input>
              </Form-item>
            </i-col>
            <i-col span="8">
              <Form-item label="机构名称">
                <Input v-model="user.phone"  placeholder="请输入"></Input>
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
      <Page :total="totalCount" :page-size="pageSize" :page-size-opts="pageSizeOpts"
            show-sizer show-total @on-change="pageNumChange" @on-page-size-change="pageSizeChange"></Page>
    </iCol>


    <Modal v-model="modalAdd" title="用户添加" width="730"
           @on-ok="handleSubmit('formValidate')"  @on-cancel="hideModal('modalAdd')">
      <Form :model="user" ref="formValidate" :label-width="80" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构名称" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构联系人" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="联系方式" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="后台账号" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="密码" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>

      </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('formValidate')">确认添加</Button>
        <Button type="info" size="large" v-on:click="hideModal('modalAdd')">关闭</Button>
      </div>

    </Modal>


    <Modal v-model="modalEdit" title="用户添加" width="730"
           @on-ok="handleSubmit('formValidate')"  @on-cancel="hideModal('modalEdit')">
      <Form :model="user" ref="formValidate" :label-width="80" :rules="ruleValidate">
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构名称" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="机构联系人" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="联系方式" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="后台账号" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
        <Row :gutter="60">
          <i-col span="18">
            <Form-item label="密码" prop="realName">
              <Input v-model="user.phone" @on-enter="handleSubmit('formValidate')" placeholder="请输入"></Input>
            </Form-item>
          </i-col>
        </Row>
      </Form>

      <div slot="footer">
        <Button type="info" size="large"  @click="handleSubmit('formValidate')">添加为理财师</Button>
        <Button type="info" size="large" v-on:click="hideModal('modalAdd')">关闭</Button>
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
        modalAdd: false,
        modalEdit: false,
        modalDel: false,
        modal_loading: false,
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
            title: '机构ID',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('strong', this.data[params.index].id)
              ]);
            }
          },
          {
            title: '机构名称',
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
            title: '产品数量',
            key: 'phone',
            align: 'center',
            render: (h, params) => {
              return this.data[params.index].registerTime;
            }
          },
          {
            title: '机构联系人',
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
            title: '联系方式',
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
//                      let authSet = this.data6[params.index].userAuths;
//                      this.data1 = authSet;
//                      this.userId = this.data6[params.index].id;
//                      this.modalManager = true;
                      this.modalEdit = true;
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
//                      this.modalManager = true;
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
      }
    }
  };
</script>

<style>
</style>
