<template>
    <div>
        <el-row>
            <el-col :span="10">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="Static IP">
                        <el-input v-model="form.Ip"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-button type="warning" class="myBtn applyBtn">申请Static IP</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: { Ip: "" }
    };
  }
};
</script>

<style scoped>
.applyBtn {
  margin-left: 80px;
}
</style>
