<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      编辑公告
    </p>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="name">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.name" placeholder="请输入banner标题"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="内容" prop="desc">
        <Row>
          <iCol span="11">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入内容"></Input>
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
