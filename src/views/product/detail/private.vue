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
            <Input v-model="loan.title" disabled placeholder="请输入产品名称"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="起投金额" prop="beginAmount">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.beginAmount" disabled placeholder="请输入起投金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="投资方向" prop="productDirection">
        <Row>
          <iCol span="11">
            <Input v-model="loan.productDirection" disabled placeholder="请输入投资方向"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="发行机构" prop="institutionUserId">
        <Row>
          <iCol span="11">
            <!--<Input v-model="loan.issuer" placeholder="请输入发行机构"></Input>-->
            <Select v-model="loan.institutionUserId" placeholder="请选择发行机构" disabled>
              <Option v-for="item in institutions" :value="item.userId" :key="item.userId">{{ item.nickName }}</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="基金类型" prop="fundType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.fundType" disabled placeholder="请选择基金类型">
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
            <Input v-model="loan.amount" disabled placeholder="请输入融资金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="存续年限" prop="adaptationDeadline">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.adaptationDeadline" disabled placeholder="请输入存续年限，例如：1+0.5+0.5"></Input>
          </iCol>
          <iCol span="3">年</iCol>
        </Row>
      </FormItem>
      <FormItem label="资本类型" prop="capitalType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.capitalType" disabled placeholder="请选择资本类型">
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
            <Select v-model="loan.organizeForm" disabled placeholder="请选择组织形式">
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
            <Input v-model="loan.manageRate" disabled placeholder="请输入管理费率"></Input>
          </iCol>
          <iCol span="3">%/每年</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品优势" prop="productDesc">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.productDesc" disabled placeholder="请输入产品优势"></Input>
          </iCol>
          <iCol span="8">优势简介，建议不超过20个字</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品卖点" prop="safeguardWay">
        <Row>
          <iCol span="11">
            <Input v-model="loan.safeguardWay" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入产品卖点"></Input>
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
      <FormItem label="预约详情" v-if="type === 'published'">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns7" :data="data4"></Table>
          </iCol>
          <iCol span="14">
            预约总金额：{{totalAmount}}万 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            预约进度：{{progress}}%
          </iCol>
        </Row>
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
  import {loanPublicGet, loanReview, loanPublish, loanInvestorList, fbGetByUserIds, fbList} from '../../../utils/interface';
//  import {portalTab} from '../../../utils/utils';
  import {getStore} from '../../../utils/storage';
  //  import {baseUrl} from '../../util/env';
  export default {
    data() {
      return {
        loan: {},
        type: '',
        preImgSrc: '',
        totalAmount: 0,
        progress: 0,
        modalReview: false,
        modalStr: '',
        institutions: [],
        visible: false,
//        uploadUrl: baseUrl + '/cms/banner/upload?' + commonDataStr(),
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
        columns7: [
          {
            title: '姓名',
            key: 'realName'
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '预约金额(万)',
            key: 'amount',
            render: (h, params) => {
              return h('span', params.row.amount / 10000);
            }
          },
          {
            title: '理财师',
            key: 'financeUserName'
          },
          {
            title: '预约时间',
            key: 'createTime'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
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
        this.type = this.$route.query.type;
//        if (isAdmin()) {
//          await institutionList().then(r => {
//            self.institutions = r.body;
//          });
//        } else {
//          await getLoginUser().then(r => {
//            self.institutions[0] = r.body;
//          });
//        }
        await loanPublicGet({'loanId': this.$route.query.loanId}).then(r => {
          this.loan = r.body;
          this.loan.amount = this.loan.amount / 10000;
          this.loan.beginAmount = this.loan.beginAmount / 10000;
          console.log('aaa');
          console.log(this.loan.institutionUserId);
        });
        let fbSelects;
        await fbGetByUserIds({'userIds': this.loan.userIds}).then(r => {
          fbSelects = r.body;
        });
        await fbList({institutionUserId: this.loan.institutionUserId}).then(r => {
          self.data3 = r.body;
          self.data3.forEach(fb => {
            fb._disabled = true;
            fbSelects.forEach(fbSelect => {
              if (fb.userId === fbSelect.userId) {
                fb._checked = true;
              }
            });
          });
        });
        // loanInvestorList 获取预约详情
        if (this.type === 'published') {
          await loanInvestorList({'loanId': this.$route.query.loanId}).then(r => {
            this.data4 = r.body;
            this.data4.forEach(item => {
              self.totalAmount = self.totalAmount + (item.amount / 10000);
              self.progress = (self.totalAmount / self.loan.amount).toFixed(2);
            });
          });
        }
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
//            portalTab('close', '待审核产品');
//            portalTab('close', '审核产品');
//            portalTab('add', '待审核产品', '/review');
          });
        }
        if (this.type === 'publish') {
          await loanPublish({
            'loanId': this.$route.query.loanId,
            'loanStatus': '200',
            'isDisplay': '1'
          }).then(r => {
            this.$Message.success('发标成功!');
            this.$router.push({path: '/publish'});
//            portalTab('close', '发布产品');
//            portalTab('close', '产品发布');
//            portalTab('add', '产品发布', '/publish');
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
