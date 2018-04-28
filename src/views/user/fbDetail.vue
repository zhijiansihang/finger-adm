<template>
  <Card id="user">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      理财师详情
    </p>
    <div class="example-header">
      <span>基本信息</span>
    </div>
    <Row className="text-row">
      <iCol span="6">用户ID：{{user.user.userId}}</iCol>
      <iCol span="6">昵称：{{user.user.nickName}}</iCol>
      <iCol span="6">职位：{{user.fb.position}}</iCol>
      <iCol span="6">服务方向：{{user.fb.serviceDirection}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">毕业院校：{{user.fb.schoolName}}</iCol>
      <iCol span="6">文化程度：{{user.fb.educationLevel}}</iCol>
      <iCol span="6">从业年限：{{user.fb.workAge}}</iCol>
      <iCol span="6">总采纳数：{{user.fb.adoptCount}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">粉丝数：{{user.userFriend}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="24">从业经历：{{user.fb.workingExperience}}</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="24">个人简介：{{user.fb.personalProfile}}</iCol>
    </Row>

    <div class="example-header">
      <span>更多信息</span>
    </div>

    <Row  className="text-row" style="padding-bottom: 30px;">
      <iCol span="6">当前销售产品数：{{user.fbSelling}}</iCol>
      <iCol span="6">销售过的产品数：{{user.fbSelled}}</iCol>
      <iCol span="6">已服务过客户数：{{user.fbService}}</iCol>
      <iCol span="6">预约单数：{{user.appointment}}</iCol>
    </Row>
  </Card>
</template>
<script>
  import {fbGet} from '../../utils/interface';
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
        await fbGet({'userId': this.$route.query.userId}).then(r => {
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
