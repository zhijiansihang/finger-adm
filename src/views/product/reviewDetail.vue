<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      产品审核
    </p>

    <div class="example-header">
      <span>基本信息</span>
    </div>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem label="产品名称" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入产品名称"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="产品类型" prop="mail">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择产品类型">
              <Option value="beijing">信托</Option>
              <Option value="shanghai">资管</Option>
              <Option value="shenzhen">其他资产</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="产品方向" prop="city">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择产品方向">
              <Option value="beijing">工商企业</Option>
              <Option value="shanghai">金融市场</Option>
              <Option value="shenzhen">基础设施</Option>
              <Option value="shenzhen">房地产</Option>
              <Option value="shenzhen">资金池</Option>
              <Option value="shenzhen">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="发行机构" prop="city">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.mail" placeholder="请输入发行机构"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="融资规模" prop="gender">
        <Row :gutter="60">
          <iCol span="8">
            <Input v-model="formValidate.mail" placeholder="请输入融资规模"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="认购金额及年化收益" prop="interest">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns4" :data="data1"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="投资期限" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入投资期限"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="付息方式" prop="name">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择付息方式">
              <Option value="1">按月付息</Option>
              <Option value="2">按季付息</Option>
              <Option value="3">半年付息</Option>
              <Option value="4">按年付息</Option>
              <Option value="5">到期付息</Option>
              <Option value="6">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="大小配比" prop="name">
        <Row>
          <iCol span="11">
              <Select v-model="formValidate.city" placeholder="请选择大小配比">
                <Option value="1">小额畅打</Option>
                <Option value="2">已配出小额</Option>
                <Option value="3">严格配比</Option>
                <Option value="4">全大额</Option>
              </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="发行地区" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入发行地区"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="保障方式" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="例如：财政承诺、土地质押"></Input>
          </iCol>
        </Row>
      </FormItem>

    </Form>

    <div class="example-header">
      <span>更多信息</span>
    </div>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem label="产品卖点" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入产品卖点"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="融资方介绍" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入融资方介绍"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="资金用途" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入资金用途"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="还款来源" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入还款来源"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="风险控制" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入风险控制"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目说明" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入项目说明"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="项目文件" prop="desc">
        <Row>
          <iCol span="11">
            <Upload
              multiple
              action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="理财师" prop="desc">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns5" :data="data2"></Table>
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
  export default {
    data() {
      return {
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        columns4: [
          {
            title: '投资金额（起）',
            key: 'name'
          },
          {
            title: '投资金额（终）',
            key: 'age'
          },
          {
            title: '预期年化收益（%）',
            width: 145,
            key: 'address'
          },
          {
            title: '是否加浮动',
            key: 'age'
          },
          {
            title: '添加',
            key: 'action',
            width: 60,
            align: 'center',
            fixed: 'right',
            renderHeader: (h, params) => {
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
                      this.data1.push({
                        name: 'Jim Green',
                        age: 24,
                        address: 'London ',
                        date: '2016-10-01'
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
//                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.data1.splice(params.index, 1);
                    }
                  }
                })
              ]);
            }
          }
        ],
        columns5: [
          {
            title: '用户ID',
            key: 'name'
          },
          {
            title: '名称',
            key: 'age'
          },
          {
            title: '手机号',
            width: 145,
            key: 'address'
          },
          {
            title: '当前产品数量',
            key: 'age'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
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
        ],
        data2: [
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
        ],
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mail: [
            {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
            {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
          ],
          city: [
            {required: true, message: 'Please select the city', trigger: 'change'}
          ],
          gender: [
            {required: true, message: 'Please select gender', trigger: 'change'}
          ],
          interest: [
            {required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change'},
            {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
          ],
          date: [
            {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
          ],
          time: [
            {required: true, type: 'date', message: 'Please select time', trigger: 'change'}
          ],
          desc: [
            {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
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
