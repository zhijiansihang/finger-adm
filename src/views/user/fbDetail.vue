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
      <iCol span="6">用户ID：201709091</iCol>
      <iCol span="6">昵称：张经理</iCol>
      <iCol span="6">职位：客户经理</iCol>
      <iCol span="6">服务方向：期货 私募</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">毕业院校：北京大学</iCol>
      <iCol span="6">文化程度：硕士</iCol>
      <iCol span="6">从业年限：10年</iCol>
      <iCol span="6">关注度：65</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="6">粉丝数：20</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="24">从业经历：10年银行投顾工作经历使我能为客户提供更专业的理财服务</iCol>
    </Row>
    <Row  className="text-row">
      <iCol span="24">个人简介：10年银行投顾工作经历使我能为客户提供更专业的理财服务</iCol>
    </Row>

    <div class="example-header">
      <span>更多信息</span>
    </div>

    <Row  className="text-row" style="padding-bottom: 30px;">
      <iCol span="6">当前销售产品数：3</iCol>
      <iCol span="6">销售过的产品数：5</iCol>
      <iCol span="6">已服务过客户数：15</iCol>
      <iCol span="6">预约单数：17</iCol>
    </Row>
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
  .text-row{
    margin-top: 20px;
    padding: 0 60px;
  }
</style>
