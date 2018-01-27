<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      公告详情
    </p>

    <Form ref="notice" :model="notice" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="title">
        <Row>
          <iCol span="11">
            <Input v-model="notice.title" placeholder="请输入公告标题" disabled></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="notice.content" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="请输入公告链接" disabled></Input>
          </iCol>
        </Row>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
  import {getCms} from '../../util/interface';
  export default {
    data() {
      return {
        notice: {
          typeCode: '2',
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
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  };
</script>

<style>
</style>
