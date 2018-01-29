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
      <iCol span="6">用户类型：{{user.roles}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">所属机构：{{user.institutionUserId}}</iCol>
    </Row>

    <div class="example-header">
      <span>合格投资者认证信息</span>
    </div>
    <Row className="text-row">
      <iCol span="6">真实姓名：{{user.realName}}</iCol>
      <iCol span="6">证件类型：身份证</iCol>
      <iCol span="6">证件号码：{{user.idCard}}</iCol>
      <iCol span="6">上传照片：<a>查看照片</a></iCol>
    </Row>

    <div class="example-header">
      <span>用户需求信息</span>
    </div>
    <Row className="text-row">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    </Row>
  </Card>
</template>
<script>
  import {getUser} from '../../util/interface';
  export default {
    data() {
      return {
        user: {},
        columns4: [
          {
            title: '需求编号',
            key: 'name'
          },
          {
            title: '创建日期',
            key: 'age'
          },
          {
            title: '期望期限',
            width: 145,
            key: 'address'
          },
          {
            title: '我的资金',
            key: 'age'
          },
          {
            title: '期望类型',
            key: 'age'
          },
          {
            title: '资金闲置时间',
            key: 'age'
          },
          {
            title: '需求状态',
            key: 'age'
          },
          {
            title: '补充说明',
            key: 'age'
          }

        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London ',
            date: '2016-10-01'
          }
        ]
      };
    },
    methods: {
      init: async function() {
        await getUser({'userId': this.$route.query.userId}).then(r => {
          this.user = r.body;
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
