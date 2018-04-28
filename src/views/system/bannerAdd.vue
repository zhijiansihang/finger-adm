<template>
  <Card id="public">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      新增banner
    </p>

    <Form ref="banner" :model="banner" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="title">
        <Row>
          <iCol span="11">
            <Input v-model="banner.title" placeholder="请输入banner标题"></Input>
          </iCol>
        </Row>
      </FormItem>
      <FormItem label="链接" prop="hrefLink">
        <Row :gutter="30">
          <iCol span="11">
            <Input v-model="banner.hrefLink" placeholder="请输入banner链接"></Input>
          </iCol>
        </Row>
      </FormItem>

      <FormItem label="上传海报" prop="imageAccessPath">
        <Row>
          <iCol span="12">
              <template v-if="banner.imageAccessPath !== ''">
                <div class="demo-upload-list"  >
                  <img :src="banner.imageAccessPath" style="height: 200px;">
                </div>
              </template>
              <Upload :on-success="handleSuccess" :max-size="1024" :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError" :format="['jpg','jpeg','gif','png']" :show-upload-list="false" :action="uploadUrl">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
              </Upload>
          </iCol>
        </Row>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('banner')">提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
  import {saveCms} from '../../utils/interface';
  import {commonDataStr} from '../../utils/fetch';
  import {baseUrl} from '../../utils/env';
  export default {
    data() {
      return {
        banner: {
          typeCode: '100',
          typeName: 'banner',
          title: '',
          hrefLink: '',
          imageAccessPath: '',
          isFrontDisplay: '1'
        },
        uploadUrl: baseUrl + '/cms/banner/upload?' + commonDataStr(),
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          hrefLink: [
            {required: true, message: '链接不能为空', trigger: 'blur'}
          ],
          imageAccessPath: [
            {required: true, message: '海报不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            await saveCms(this.banner).then(r => {
              let resultCode = r.header.code;
              if (resultCode === '0') {
                this.$Message.success('Banner添加成功!');
                this.$router.push('/banner');
              } else {
                this.$Message.error(r.header.message);
              }
            });
          } else {
            this.$Message.error('添加失败!');
          }
        });
      },
      handleSuccess (res) {
        if (res.header.code === '0') {
          this.banner.imageAccessPath = res.body;
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
          desc: '文件 ' + file.name + ' 大小超限，最大1024k'
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
