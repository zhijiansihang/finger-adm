<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      编辑公告
    </p>

    <Form ref="notice" :model="notice" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="title">
        <Row>
          <iCol span="11">
            <Input v-model="notice.title" placeholder="请输入公告标题"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="notice.content" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="请输入公告链接"></Input>
          </iCol>
        </Row>
      </FormItem>


      <FormItem>
        <Button type="primary" @click="handleSubmit('notice')">提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
  import {updateCms, getCms} from '../../util/interface';
  export default {
    data() {
      return {
        notice: {
          typeCode: '200',
          typeName: 'notice',
          title: '',
          content: '',
          isFrontDisplay: '1'
        },
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    mounted: function() {
      this.init();
    },
    methods: {
      init: async function() {
        await getCms({'id': this.$route.query.id}).then(r => {
          this.notice = r.body;
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            await updateCms(this.notice).then(r => {
              if (r.header.code === '0') {
                this.$Message.success('修改成功!');
                this.$router.push('/notice');
              } else {
                this.$Message.error(r.header.message);
              }
            });
          } else {
            this.$Message.error('修改失败!');
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
</style>
