<template>
  <Card id="user">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      用户详情
    </p>
    <div class="example-header">
      <span>基本信息</span>
    </div>
    <Row className="text-row">
      <iCol span="6">用户ID：{{user.userId}}</iCol>
      <iCol span="6">用户手机号：{{user.mobile}}</iCol>
      <iCol span="6">注册时间：{{user.createTime}}</iCol>
      <iCol span="6">用户类型：{{roleName}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">所属机构：{{user.institutionName}}</iCol>
    </Row>

    <div class="example-header">
      <span>合格投资者认证信息</span>
    </div>
    <Row className="text-row">
      <iCol span="6">真实姓名：{{user.realName}}</iCol>
      <iCol span="6">证件类型：身份证</iCol>
      <iCol span="6">证件号码：{{user.idCard}}</iCol>
      <iCol span="6">是否已风险测评：{{ifRiskAssessment}}</iCol>
    </Row>

    <div class="example-header">
      <span>用户需求信息</span>
    </div>
    <Row className="text-row">
      <Table border ref="selection" :columns="columns4" :data="userDemand"></Table>
    </Row>
  </Card>
</template>
<script>
  import {getUser, getUserDemand} from '../../utils/interface';
  export default {
    data() {
      return {
        user: {},
        userDemand: [],
        columns4: [
          {
            title: '需求编号',
            key: 'id'
          },
          {
            title: '创建日期',
            key: 'createTime'
          },
          {
            title: '期望期限',
            width: 145,
            key: 'expectedDeadline'
          },
          {
            title: '我的资金',
            key: 'moneySituation'
          },
          {
            title: '期望类型',
            key: 'earningType',
            render: (h, params) => {
              let isClosed = this.userDemand[params.index].isClosed;
              if (isClosed === 1) {
                return h('span', '固定收益');
              } else if (isClosed === 2) {
                return h('span', '浮动+保底');
              } else {
                return h('span', '浮动收益');
              }
            }
//            1:固定收益 2:浮动+保底 3:浮动收益
          },
          {
            title: '风险偏好',
            key: 'isClosed',
            render: (h, params) => {
              return h('span', '平衡性');
            }
          },
          {
            title: '需求状态',
            key: 'isClosed',
            render: (h, params) => {
              let isClosed = this.userDemand[params.index].isClosed;
              if (isClosed === 1) {
                return h('span', '关闭');
              } else {
                return h('span', '开启');
              }
            }
          },
          {
            title: '补充说明',
            key: 'additionalRemarks'
          }

        ]
      };
    },
    methods: {
      init: async function() {
        await getUser({'userId': this.$route.query.userId}).then(r => {
          this.user = r.body;
        });
        await getUserDemand({'userId': this.$route.query.userId}).then(r => {
          this.userDemand = r.body;
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    computed: {
      roleName() {
        let roleName = '平台管理员';
        if (this.user.roles === 1) {
          roleName = '平台管理员';
        }
        if (this.user.roles === 2) {
          roleName = '第三方机构';
        }
        if (this.user.roles === 3) {
          roleName = '用户投资人';
        }
        if (this.user.roles === 4) {
          roleName = '个人理财师';
        }
        if (this.user.roles === 5) {
          roleName = '机构理财师';
        }
        return roleName;
      },
      ifRiskAssessment() {
        if (this.user.riskAssessmentLevel) {
          return '是';
        } else {
          return '否';
        }
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>
  .example-header {
    display: block;
    font-weight: 500;
    margin: 30px 0 30px;
    position: relative;
  }

  .example-header span {
    display: inline-block;
    background: #fff;
    padding: 0 5px 0 18px;
    position: relative;
    margin-left: 30px;
    font-size: 14px;
  }

  .example-header:before {
    box-sizing: border-box;
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #eee;
    position: absolute;
    top: 10px;
    left: 0;
  }
  .text-row{
    margin-top: 20px;
    padding: 0 60px;
  }
</style>
