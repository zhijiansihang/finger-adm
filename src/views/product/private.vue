<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      发布私募产品
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
      <FormItem label="起投金额" prop="name">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入起投金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="投资方向" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入投资方向"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="基金类型" prop="mail">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择基金类型">
              <Option value="1">本土</Option>
              <Option value="2">合资</Option>
              <Option value="3">外资</Option>
              <Option value="4">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="融资规模" prop="gender">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="formValidate.mail" placeholder="请输入融资金额"></Input>
          </iCol>
          <iCol span="3">万元</iCol>
        </Row>
      </FormItem>
      <FormItem label="存续年限" prop="gender">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="formValidate.mail" placeholder="请输入存续年限，例如：1+0.5+0.5"></Input>
          </iCol>
          <iCol span="3">天</iCol>
        </Row>
      </FormItem>
      <FormItem label="资本类型" prop="city">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择资本类型">
              <Option value="beijing">天使基金</Option>
              <Option value="shanghai">创业基金</Option>
              <Option value="shenzhen">成长基金</Option>
              <Option value="shenzhen">FOF基金</Option>
              <Option value="shenzhen">并购基金</Option>
              <Option value="shenzhen">政府引导基金</Option>
              <Option value="shenzhen">基础设施基金</Option>
              <Option value="shenzhen">房地产基金</Option>
              <Option value="shenzhen">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="组织形式" prop="city">
        <Row>
          <iCol span="11">
            <Select v-model="formValidate.city" placeholder="请选择组织形式">
              <Option value="beijing">公司形式</Option>
              <Option value="shanghai">信托制</Option>
              <Option value="shenzhen">有限合伙制</Option>
              <Option value="shenzhen">虚拟式</Option>
              <Option value="shenzhen">组合式</Option>
              <Option value="shenzhen">契约式</Option>
              <Option value="shenzhen">其他</Option>
            </Select>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="管理费率" prop="interest">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="formValidate.mail" placeholder="请输入管理费率"></Input>
          </iCol>
          <iCol span="3">%/每年</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品优势" prop="interest">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="formValidate.mail" placeholder="请输入产品优势"></Input>
          </iCol>
          <iCol span="8">优势简介，建议不超过20个字</iCol>
        </Row>
      </FormItem>

      <FormItem label="产品卖点" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入产品卖点"></Input>
          </iCol>
        </Row>
      </FormItem>


      <FormItem label="基金经理" prop="desc">
        <Row>
          <iCol span="14">
            <Table border ref="selection" :columns="columns5" :data="data2"></Table>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="上传logo" prop="desc">
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
