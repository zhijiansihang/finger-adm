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
      <FormItem label="产品类型" prop="productType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.productType" disabled placeholder="请选择产品类型">
              <Option :value=1>信托</Option>
              <Option :value=2>资管</Option>
              <Option :value=3>其他资产</Option>
              <Option :value=4>私募</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="产品方向" prop="city">
        <Row>
          <iCol span="11">
            <Select v-model="loan.productDirection" disabled placeholder="请选择产品方向">
              <Option value="1">工商企业</Option>
              <Option value="2">金融市场</Option>
              <Option value="3">基础设施</Option>
              <Option value="4">房地产</Option>
              <Option value="5">资金池</Option>
              <Option value="6">其他</Option>
            </Select>
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
      <FormItem label="融资规模" prop="amount">
        <Row :gutter="60">
          <iCol span="8">
            <Input v-model="loan.amount" disabled placeholder="请输入融资规模"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="认购金额及年化收益" prop="earningDesc">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns4" :data="loan.earningDesc?JSON.parse(loan.earningDesc):[]"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="投资期限" prop="investmentDeadline">
        <Row>
          <iCol span="8">
            <Input v-model="loan.investmentDeadline" disabled placeholder="请输入投资期限"></Input>
          </iCol>
          <iCol span="3">月</iCol>
        </Row>
      </FormItem>
      <FormItem label="付息方式" prop="servicingWay">
        <Row>
          <iCol span="11">
            <Select v-model="loan.servicingWay" disabled placeholder="请选择付息方式">
              <Option :value=1>按月付息</Option>
              <Option :value=2>按季付息</Option>
              <Option :value=3>半年付息</Option>
              <Option :value=4>按年付息</Option>
              <Option :value=5>到期付息</Option>
              <Option :value=6>其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="大小配比" prop="ratioType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.ratioType" disabled placeholder="请选择大小配比">
              <Option :value=1>小额畅打</Option>
              <Option :value=2>已配出小额</Option>
              <Option :value=3>严格配比</Option>
              <Option :value=4>全大额</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="发行地区" prop="distributionRegion">
        <Row>
          <iCol span="11">
            <Input v-model="loan.distributionRegion" disabled placeholder="请输入发行地区"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="保障方式" prop="safeguardWay">
        <Row>
          <iCol span="11">
            <Input v-model="loan.safeguardWay" disabled placeholder="例如：财政承诺、土地质押"></Input>
          </iCol>
        </Row>
      </FormItem>

    </Form>

    <div class="example-header">
      <span>更多信息</span>
    </div>

    <Form ref="loan" :model="loan" :rules="ruleValidate" :label-width="150">
      <FormItem label="产品卖点" prop="brightSpot">
        <Row>
          <iCol span="11">
            <Input v-model="loan.brightSpot" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入产品卖点"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="融资方介绍" prop="financeIntroduce">
        <Row>
          <iCol span="11">
            <Input v-model="loan.financeIntroduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入融资方介绍"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="资金用途" prop="moneyUse">
        <Row>
          <iCol span="11">
            <Input v-model="loan.moneyUse" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入资金用途"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="还款来源" prop="repaySource">
        <Row>
          <iCol span="11">
            <Input v-model="loan.repaySource" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入还款来源"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="风险控制" prop="riskControl">
        <Row>
          <iCol span="11">
            <Input v-model="loan.riskControl" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入风险控制"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目说明" prop="productDesc">
        <Row>
          <iCol span="11">
            <Input v-model="loan.productDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   disabled placeholder="请输入项目说明"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目文件" prop="productDescFiles">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns5" :data="loan.productDescFiles?JSON.parse(loan.productDescFiles):[]"></Table>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="理财师" prop="desc">
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
  import {loanPublicGet, loanReview, loanPublish, fbGetByUserIds, fbList, loanInvestorList} from '../../../utils/interface';
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
        totalAmount: 0,
        progress: 0,
        institutions: [],
        columns4: [
          {
            title: '投资金额（起）',
            key: 'startAmount',
            render: (h, params) => {
              return h('span', params.row.startAmount / 10000);
            }
          },
          {
            title: '投资金额（终）',
            key: 'endAmount',
            render: (h, params) => {
              return h('span', params.row.endAmount / 10000);
            }
          },
          {
            title: '预期年化收益（%）',
            width: 145,
            key: 'basisInterest'
          },
          {
            title: '是否加浮动',
//            key: 'isFloating',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  attrs: {
                    id: 'is-floating-' + params.index,
                    value: params.row.isFloating,
                    disabled: true
                  }
                }, [h('span', '加浮动收益')])
              ]);
            }
          }
        ],
        columns5: [
          {
            title: '文件名称',
            key: 'name'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '操作',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  style: {
                    padding: '2px 8px'
                  },
                  on: {
                    click: () => {
                      this.handleView(JSON.parse(this.loan.productDescFiles)[params.index].src);
                    }
                  }
                }, '预览')
              ]);
            }
          }
        ],
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
            align: 'createTime'
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        ruleValidate: {
//          name: [
//            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
//          ],
//          mail: [
//            {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
//            {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
//          ],
//          city: [
//            {required: true, message: 'Please select the city', trigger: 'change'}
//          ],
//          gender: [
//            {required: true, message: 'Please select gender', trigger: 'change'}
//          ],
//          interest: [
//            {required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change'},
//            {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
//          ],
//          date: [
//            {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
//          ],
//          time: [
//            {required: true, type: 'date', message: 'Please select time', trigger: 'change'}
//          ],
//          desc: [
//            {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
//            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
//          ]
        }
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
        this.type = this.$route.query.type;
        await loanPublicGet({'loanId': this.$route.query.loanId}).then(r => {
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
