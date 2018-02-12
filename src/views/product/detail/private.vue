<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      产品审核
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

      <FormItem label="产品优势" prop="productDesc">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.productDesc" placeholder="请输入产品优势"></Input>
          </iCol>
          <iCol span="8">优势简介，建议不超过20个字</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品卖点" prop="brightSpot">
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
            <Table border ref="selection" :columns="columns6" :data="data3"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem v-if="type === 'review'">
        <Button type="primary" @click="modalShow()">审核</Button>
      </FormItem>
      <FormItem v-if="type === 'publish'">
        <Button type="primary" @click="modalShow()">发标</Button>
      </FormItem>
    </Form>

    <Modal v-model="modalReview" width="360">
      <!--<p slot="header" style="color:#f60;text-align:center">-->
        <!--<Icon type="information-circled"></Icon>-->
        <!--<span>删除机构</span>-->
      <!--</p>-->
      <div style="text-align:center">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>{{modalStr}}</p>
        <p>&nbsp;</p>
      </div>
      <div slot="footer">
        <Button type="info" size="large" @click="modalReview = false">取消</Button>
        <Button type="error" size="large" @click="handleReview">确定</Button>
      </div>
    </Modal>

    <Modal title="预览" v-model="visible">
      <img :src="this.preImgSrc" v-if="visible" style="width: 100%">
    </Modal>
  </Card>
</template>
<script>
  import {loanPublicGet, loanReview, fbGetByUserIds} from '../../../util/interface';
  //  import {baseUrl} from '../../util/env';
  export default {
    data() {
      return {
        loan: {},
        type: '',
        preImgSrc: '',
        modalReview: false,
        modalStr: '',
        visible: false,
//        uploadUrl: baseUrl + '/cms/banner/upload?' + commonDataStr(),
        columns6: [
          {
            title: '用户Id',
            key: 'userId'
          },
          {
            title: '名称',
            key: 'realName'
          },
          {
            title: '手机号',
            width: 145,
            key: 'mobile'
          },
          {
            title: '当前产品数量',
            key: 'count'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        ruleValidate: {}
      };
    },
    methods: {
      init: async function () {
        this.type = this.$route.query.type;
        await loanPublicGet({'loanId': this.$route.query.loanId}).then(r => {
          this.loan = r.body;
        });
        await fbGetByUserIds({'userIds': this.loan.userIds}).then(r => {
          debugger;
          this.data3 = r.body;
        });
      },
      handleView(name) {
        this.preImgSrc = name;
        this.visible = true;
      },
      modalShow() {
        this.modalReview = true;
        if (this.type === 'review') {
          this.modalStr = '确定提交审核信息吗?';
        }
        if (this.type === 'publish') {
          this.modalStr = '确定将该产品发布到前端吗?';
        }
      },
      handleReview: async function () {
        if (this.type === 'review') {
          await loanReview({
            'loanId': this.$route.query.loanId,
            'loanStatus': '150'
          }).then(r => {
            this.$Message.success('审核成功!');
            this.$router.push({path: '/review'});
          });
        }
        if (this.type === 'publish') {
          await loanReview({
            'loanId': this.$route.query.loanId,
            'loanStatus': '200'
          }).then(r => {
            this.$Message.success('发标成功!');
            this.$router.push({path: '/published'});
          });
        }
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>
</style>
