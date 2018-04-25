<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      发布公募产品
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
      <FormItem label="产品类型" prop="productType">
        <Row>
          <iCol span="11">
            <Select v-model="loan.productType" placeholder="请选择产品类型">
              <Option :value=1>信托</Option>
              <Option :value=2>资管</Option>
              <Option :value=3>其他资产</Option>
              <!--<Option :value=4>私募</Option>-->
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="产品方向" prop="productDirection">
        <Row>
          <iCol span="11">
            <Select v-model="loan.productDirection" placeholder="请选择产品方向">
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
      <FormItem label="发行机构" prop="issuer">
        <Row>
          <iCol span="11">
            <!--<Input v-model="loan.issuer" placeholder="请输入发行机构"></Input>-->
            <Select v-model="loan.institutionUserId" placeholder="请选择发行机构">
              <Option v-for="item in institutions" :value="`${item.userId}`" :key="item.userId">{{ item.nickName }}</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="融资规模" prop="amount">
        <Row :gutter="60">
          <iCol span="8">
            <Input v-model="loan.amount" placeholder="请输入融资规模"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="认购金额及年化收益" prop="earningDesc">
        <Row>
          <iCol span="14">
            <Input v-model="loan.earningDesc" v-show="false"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="" style="margin-top: -40px">
        <Row>
          <iCol span="14">
            <Table border :columns="columns4" :data="earningDesc"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="投资期限" prop="investmentDeadline">
        <Row>
          <iCol span="8">
            <Input v-model="loan.investmentDeadline" placeholder="请输入投资期限"></Input>
          </iCol>
          <iCol span="3">个月</iCol>
        </Row>
      </FormItem>
      <FormItem label="付息方式" prop="servicingWay">
        <Row>
          <iCol span="11">
            <Select v-model="loan.servicingWay" placeholder="请选择付息方式">
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
            <Select v-model="loan.ratioType" placeholder="请选择大小配比">
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
            <Input v-model="loan.distributionRegion" placeholder="请输入发行地区"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="保障方式" prop="safeguardWay">
        <Row>
          <iCol span="11">
            <Input v-model="loan.safeguardWay" placeholder="例如：财政承诺、土地质押"></Input>
          </iCol>
        </Row>
      </FormItem>


      <div class="example-header">
        <span>更多信息</span>
      </div>

      <FormItem label="产品优势" prop="brightSpot">
        <Row>
          <iCol span="11">
            <Input v-model="loan.brightSpot" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入产品优势"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="融资方介绍" prop="financeIntroduce">
        <Row>
          <iCol span="11">
            <Input v-model="loan.financeIntroduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入融资方介绍"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="资金用途" prop="moneyUse">
        <Row>
          <iCol span="11">
            <Input v-model="loan.moneyUse" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入资金用途"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="还款来源" prop="repaySource">
        <Row>
          <iCol span="11">
            <Input v-model="loan.repaySource" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入还款来源"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="风险控制" prop="riskControl">
        <Row>
          <iCol span="11">
            <Input v-model="loan.riskControl" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入风险控制"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目说明" prop="productDesc">
        <Row>
          <iCol span="11">
            <Input v-model="loan.productDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入项目说明"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目文件" prop="productDescFiles">
        <Row>
          <iCol span="14">
            <Upload :on-success="handleSuccess" :max-size="1024" :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError" :format="['jpg','jpeg','gif','png']" :show-upload-list="false" :action="uploadUrl">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
            </Upload>
            <br>
          </iCol>
          <iCol span="14">
            <Table border ref="selection" :columns="columns5"
                   :data="productDescFiles"></Table>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="理财师" prop="desc">
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
    <Modal v-model="modalReview" width="360">
      <!--<p slot="header" style="color:#f60;text-align:center">-->
      <!--<Icon type="information-circled"></Icon>-->
      <!--<span>删除机构</span>-->
      <!--</p>-->
      <div style="text-align:center">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>确定提交审核信息吗?</p>
        <p>&nbsp;</p>
      </div>
      <div slot="footer">
        <Button type="info" size="large" @click="modalReview = false">取消</Button>
        <Button type="error" size="large" @click="handleSubmit('formValidate')">确定</Button>
      </div>
    </Modal>

    <Modal title="预览" v-model="visible">
      <img :src="this.preImgSrc" v-if="visible" style="width: 100%">
    </Modal>

  </Card>
</template>
<script>
  import {loanPublicAdd, fbList, institutionList, getLoginUser} from '../../../util/interface';
  import {commonDataStr} from '../../../util/fetch';
  import {baseUrl} from '../../../util/env';
  import {portalTab, isAdmin} from '../../../util/utils';

  export default {
    data() {
      return {
        loan: {},
        preImgSrc: '',
        uploadUrl: baseUrl + '/loan/file/upload?' + commonDataStr(),
        modalReview: false,
        visible: false,
        institutions: [],
        columns4: [
          {
            title: '投资金额（起）',
            key: 'startAmount',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  attrs: {
                    id: 'start-amount-' + params.index,
                    value: params.row.startAmount
                  }
                })
              ]);
            }
          },
          {
            title: '投资金额（终）',
            key: 'endAmount',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  attrs: {
                    id: 'end-amount-' + params.index,
                    value: params.row.endAmount
                  }
                })
              ]);
            }
          },
          {
            title: '预期年化收益（%）',
            width: 145,
            key: 'basisInterest',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  attrs: {
                    id: 'basis-interest-' + params.index,
                    value: params.row.basisInterest
                  }
                })
              ]);
            }
          },
          {
            title: '是否加浮动',
            key: 'isFloating',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  attrs: {
                    id: 'is-floating-' + params.index,
                    value: params.row.isFloating
                  }
                }, [h('span', '加浮动收益')])
              ]);
            }
          },
          {
            title: '添加',
            key: 'action',
            width: 60,
            align: 'center',
            fixed: 'right',
            renderHeader: (h, params) => {
              let self = this;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    shape: 'circle',
                    size: 'small',
                    icon: 'plus'
                  },
                  style: {
                    //                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mergeEarningDesc('edit');
                      self.earningDesc.push({
                        startAmount: '',
                        endAmount: '',
                        basisInterest: '',
                        isFloating: false
                      });
                    }
                  }
                })
              ]);
            },
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    shape: 'circle',
                    size: 'small',
                    icon: 'minus-round'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mergeEarningDesc('edit');
                      this.earningDesc.splice(params.index, 1);
                    }
                  }
                })
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
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'ios-search'
                  },
                  style: {
                    padding: '2px 8px'
                  },
                  on: {
                    click: () => {
                      this.handleView(this.productDescFiles[params.index].src);
                    }
                  }
                }, '预览'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  style: {
                    padding: '2px 8px',
                    marginLeft: '15px'
                  },
                  on: {
                    click: () => {
                      this.productDescFiles.splice(params.index, 1);
                    }
                  }
                }, '删除')
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
        earningDesc: [],
        productDescFiles: [],
        data2: [],
        data3: [],
        ruleValidate: {
          title: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          productDirection: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          productType: [
            {type: 'number', required: true, message: '不能为空', trigger: 'blur'}
          ],
          institutionUserId: [
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
          earningDesc: [
            {required: true, message: '认购金额及年化收益', trigger: 'alert'}
          ],
          investmentDeadline: [
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
          servicingWay: [
            {type: 'number', required: true, message: '不能为空', trigger: 'blur'}
          ],
          ratioType: [
            {type: 'number', required: true, message: '不能为空', trigger: 'blur'}
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
          ],
          productDesc: [
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
        if (isAdmin()) {
          await institutionList().then(r => {
            this.institutions = r.body;
          });
        } else {
          await getLoginUser().then(r => {
            this.institutions[0] = r.body;
          });
        }
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
        this.loan.userIds = userIds;
      },
      handleSuccess (res) {
        if (res.header.code === '0') {
          this.productDescFiles.push(res.body);
        } else {
          this.$Message.error('Banner图片上传失败！');
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确!',
          desc: '文件 ' + file.name + ' 格式不正确, 请选择JPG、PNG、JPEG、GIF格式'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '文件大小超限!',
          desc: '文件 ' + file.name + ' 大小超限，最大512k'
        });
      },
      handleView(name) {
        this.preImgSrc = name;
        this.visible = true;
      },
      handleSubmit: function (name) {
        this.mergeEarningDesc();
        this.mergeProductDescFiles();
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            await loanPublicAdd(this.loan).then(r => {
              console.log(r);
              if (r.header.code === '0') {
                this.$Message.success('添加成功!');
                portalTab('add', '待审核产品', '/review');
                portalTab('close', '发布公募产品');
              }
            });
          } else {
            this.$Message.error('验证异常，添加失败!');
          }
        });
      },
      mergeEarningDesc: function (type) {
        let self = this;
        if (this.earningDesc.length < 1) {
          return;
        }
        self.loan.interestRate = 0;
        self.loan.isRateFloating = 0;
        self.loan.beginAmount = 0;
        this.earningDesc.forEach((item, index) => {
          item.startAmount = document.getElementById('start-amount-' + index).getElementsByTagName('input')[0].value;
          if (item.startAmount && type !== 'edit') {
            item.startAmount = item.startAmount * 10000;
          }

          if (self.loan.beginAmount === 0 && item.startAmount) {
            self.loan.beginAmount = item.startAmount;
          }
          if (item.startAmount && (self.loan.beginAmount - item.startAmount > 0)) {
            self.loan.beginAmount = item.startAmount;
          }
          item.endAmount = document.getElementById('end-amount-' + index).getElementsByTagName('input')[0].value;
          if (item.endAmount && type !== 'edit') {
            item.endAmount = item.endAmount * 10000;
          }

          item.basisInterest = document.getElementById('basis-interest-' + index).getElementsByTagName('input')[0].value;
          if (item.basisInterest - self.loan.interestRate > 0) { // 利率最大值
            self.loan.interestRate = item.basisInterest;
          }
          item.isFloating = document.getElementById('is-floating-' + index).getElementsByTagName('input')[0].checked;
          if (item.isFloating) {
            self.loan.isRateFloating = 1;
          }
        });
        this.loan.earningDesc = JSON.stringify(this.earningDesc);
      },
      mergeProductDescFiles: function () {
        if (this.productDescFiles.length < 1) {
          return;
        }
        this.loan.productDescFiles = JSON.stringify(this.productDescFiles);
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {
      this.init();
    }
//    watch: {
//      earningDesc: {
//        handler: function (val, oldval) {
//          debugger;
//          this.loan.earningDesc = JSON.stringify(val);
//          console.log(this.loan.earningDesc);
//        }
//        deep: true // 对象内部的属性监听，也叫深度监听
//      }
//    }
  };
</script>

<style>
  #public .ivu-table .ivu-table-row .ivu-table-cell .ivu-btn {
    padding: 0;
  }
</style>
