<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      发布私募产品
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
              <Option value="1">本土</Option>
              <Option value="2">合资</Option>
              <Option value="3">外资</Option>
              <Option value="4">其他</Option>
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

      <FormItem label="产品亮点" prop="brightSpot">
        <Row>
          <iCol span="11">
            <Input v-model="loan.brightSpot" placeholder="请输入产品卖点"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="产品优势" prop="productDesc">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="loan.productDesc" placeholder="请输入产品优势" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </iCol>
          <iCol span="8">优势简介，建议不超过20个字</iCol>
        </Row>
      </FormItem>

      <FormItem label="基金经理" prop="desc">
        <Row>
          <iCol span="14">
            <Table border ref="selection" @on-select="onSelect" @on-select-all="onSelectAll" :columns="columns6" :data="data3"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
  import {loanPrivateAdd, fbList} from '../../../util/interface';
  import {portalTab} from '../../../util/utils';

  export default {
    data() {
      return {
        loan: {},
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
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          }
        ],
        data3: [],
        ruleValidate: {
          title: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          beginAmount: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              type: 'number',
              message: '类型错误',
              trigger: 'blur',
              transform(value) {
                return Number(value);
              }
            }
          ],
          productDirection: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          fundType: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              type: 'number',
              message: '类型错误',
              trigger: 'blur',
              transform(value) {
                return Number(value);
              }
            }
          ],
          adaptationDeadline: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              type: 'number',
              message: '类型错误',
              trigger: 'blur',
              transform(value) {
                return Number(value);
              }
            }
          ],
          capitalType: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          organizeForm: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          manageRate: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              type: 'number',
              message: '类型错误',
              trigger: 'blur',
              transform(value) {
                return Number(value);
              }
            }
          ],
          productDesc: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          distributionRegion: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          brightSpot: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          financeIntroduce: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          moneyUse: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          repaySource: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          riskControl: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      init: async function () {
        let self = this;
        // 获取理财师列表
        await fbList().then(r => {
          self.data3 = r.body;
        });
      },
      onSelect: function (selection, row) {
        let userIds = [];
        selection.forEach(item => {
          userIds.push(item.userId);
        });
        this.loan.userIds = userIds;
      },
      onSelectAll: function (selection) {
        let userIds = [];
        selection.forEach(item => {
          userIds.push(item.userId);
        });
        this.loan.userId = userIds;
      },
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            await loanPrivateAdd(this.loan).then(r => {
              this.$Message.success('添加成功!');
//              this.$router.push({path: 'review'});
              portalTab('add', '待审核产品', '/review');
              portalTab('close', '发布私募产品');
            });
          } else {
            this.$Message.error('添加失败!');
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
</style>
