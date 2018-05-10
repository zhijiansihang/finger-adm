<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      产品编辑
    </p>

    <div class="example-header">
      <span>基本信息</span>
    </div>

    <Form ref="formValidate" :model="loan" :rules="ruleValidate" :label-width="150">
      <FormItem label="产品名称" prop="title">
        <Row>
          <iCol span="11">
            <Input v-model="loan.title" placeholder="请输入产品名称"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="起投金额" prop="beginAmount">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.beginAmount" placeholder="请输入起投金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="投资方向" prop="productDirection">
        <Row>
          <iCol span="11">
            <Input v-model="loan.productDirection" placeholder="请输入投资方向"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="发行机构" prop="institutionUserId">
        <Row>
          <iCol span="11">
            <!--<Input v-model="loan.issuer" placeholder="请输入发行机构"></Input>-->
            <Select v-model="loan.institutionUserId" placeholder="请选择发行机构">
              <Option v-for="item in institutions" :value="item.userId" :key="item.userId">{{ item.nickName }}</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="基金类型" prop="fundType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.fundType" placeholder="请选择基金类型">
              <Option :value=1>本土</Option>
              <Option :value=2>合资</Option>
              <Option :value=3>外资</Option>
              <Option :value=4>其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="融资规模" prop="amount">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.amount" placeholder="请输入融资金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="存续年限" prop="adaptationDeadline">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.adaptationDeadline" placeholder="请输入存续年限，例如：1+0.5+0.5"></Input>
          </iCol>
          <iCol span="3">年</iCol>
        </Row>
      </FormItem>
      <FormItem label="资本类型" prop="capitalType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.capitalType" placeholder="请选择资本类型">
              <Option value="1">天使基金</Option>
              <Option value="2">创业基金</Option>
              <Option value="3">成长基金</Option>
              <Option value="4">FOF基金</Option>
              <Option value="5">并购基金</Option>
              <Option value="6">政府引导基金</Option>
              <Option value="7">基础设施基金</Option>
              <Option value="8">房地产基金</Option>
              <Option value="9">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="组织形式" prop="organizeForm">
        <Row>
          <iCol span="11">
            <Select v-model="loan.organizeForm" placeholder="请选择组织形式">
              <Option value="1">公司形式</Option>
              <Option value="2">信托制</Option>
              <Option value="3">有限合伙制</Option>
              <Option value="4">虚拟式</Option>
              <Option value="5">组合式</Option>
              <Option value="6">契约式</Option>
              <Option value="7">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="管理费率" prop="manageRate">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.manageRate" placeholder="请输入管理费率"></Input>
          </iCol>
          <iCol span="3">%/每年</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品亮点" prop="safeguardWay">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.safeguardWay" placeholder="请输入产品优势"></Input>
          </iCol>
          <iCol span="8">优势简介，建议不超过20个字</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品优势" prop="brightSpot">
        <Row>
          <iCol span="11">
            <Input v-model="loan.brightSpot" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入产品卖点"></Input>
          </iCol>
        </Row>
      </FormItem>


      <FormItem label="基金经理" prop="desc">
        <Row>
          <iCol span="14">
            <!---->
            <Table border ref="selection" @on-selection-change="onSelectChange" :columns="columns6" :data="data3"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      </FormItem>
    </Form>

    <!--<Modal v-model="modalReview" width="360">-->
      <!--<div style="text-align:center">-->
        <!--<p>&nbsp;</p>-->
        <!--<p>&nbsp;</p>-->
        <!--<p>{{modalStr}}</p>-->
        <!--<p>&nbsp;</p>-->
      <!--</div>-->
      <!--<div slot="footer">-->
        <!--<Button type="info" size="large" @click="modalReview = false">取消</Button>-->
        <!--<Button type="error" size="large" @click="handleReview">确定</Button>-->
      <!--</div>-->
    <!--</Modal>-->

    <!--<Modal title="预览" v-model="visible">-->
      <!--<img :src="this.preImgSrc" v-if="visible" style="width: 100%">-->
    <!--</Modal>-->
  </Card>
</template>
<script>
  import {loanPrivateGet, fbGetByUserIds, loanPrivateEdit, fbList} from '../../../utils/interface';
//  import {portalTab} from '../../../utils/utils';
  import {getStore} from '../../../utils/storage';
  export default {
    data() {
      return {
        loan: {},
        type: '',
        preImgSrc: '',
        modalReview: false,
        modalStr: '',
        visible: false,
        institutions: [],
        columns6: [
          {
            title: '用户Id',
            key: 'userId'
          },
          {
            title: '名称',
            key: 'nickName'
          },
          {
            title: '手机号',
            width: 145,
            key: 'mobile'
          },
          {
            title: '当前产品数量',
            key: 'investTime'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        userIds: [],
        ruleValidate: {}
      };
    },
    beforeCreate() {
      this.$nextTick(function () {
        this.institutions = JSON.parse(getStore('institutions'));
        console.log(this.institutions);
      });
    },
    methods: {
      init: async function () {
        let self = this;
//        if (isAdmin()) {
//          await institutionList().then(r => {
//            self.institutions = r.body;
//          });
//        } else {
//          await getLoginUser().then(r => {
//            self.institutions[0] = r.body;
//          });
//        }
//        setTimeout(100);
        this.type = this.$route.query.type;
        await loanPrivateGet({'loanId': this.$route.query.loanId}).then(r => {
          this.loan = r.body;
          this.loan.amount = this.loan.amount / 10000;
          this.loan.beginAmount = this.loan.beginAmount / 10000;
        });
        let fbSelects;
        await fbGetByUserIds({'userIds': this.loan.userIds}).then(r => {
          fbSelects = r.body;
        });
        await fbList({institutionUserId: this.loan.institutionUserId}).then(r => {
          self.data3 = r.body;
          self.data3.forEach(fb => {
            fbSelects.forEach(fbSelect => {
              if (fb.userId === fbSelect.userId) {
                fb._checked = true;
                self.userIds.push(fb.userId);
              }
            });
          });
        });
      },
      onSelectChange: function (selection) {
        let self = this;
        this.userIds = [];
        selection.forEach(item => {
          self.userIds.push(item.userId);
        });
      },
      getSelectedUserIds() {
        this.loan.userIds = this.userIds;
      },
      handleView(name) {
        this.preImgSrc = name;
        this.visible = true;
      },
      handleSubmit: function (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.getSelectedUserIds();
            await loanPrivateEdit(this.loan).then(r => {
              if (r.header.code === '0') {
                this.$Message.success('修改成功!');
                this.$router.push({path: '/review'});
//                portalTab('add', '待审核产品', '/review');
//                portalTab('close', '编辑产品');
              }
            });
          } else {
            this.$Message.error('验证异常，添加失败!');
          }
        });
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      'loan.institutionUserId': function (newValue, oldValue) {
        console.log(newValue, oldValue);
        fbList({institutionUserId: newValue}).then(r => {
          this.data3 = r.body;
        });
      }
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

  #public .ivu-table .ivu-table-row .ivu-table-cell .ivu-btn {
    padding: 0;
  }
</style>
