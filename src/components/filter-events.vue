<template>
  <div class="event-filter d-flex justify-content-center">
    <el-input prefix-icon="el-icon-search" class="el-input" @input="setFilter" v-model="filter.byName" :placeholder="$t('search')"></el-input>
    
      <el-select class="el-select" v-model="filter.byType" @change="setFilter" :placeholder="'select'">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>    
      <el-radio-group v-model="filter.inStock" @change="setFilter">
        <el-radio-button label="true">{{$t('inStock')}}</el-radio-button>
        <el-radio-button label="false">{{$t('notInStock')}}</el-radio-button>
        <el-radio-button label="all">{{$t('all')}}</el-radio-button>
      </el-radio-group>
      <el-button-group>
        <el-button type="primary" class="btn btn-md btn-info" @click="setSorter('price')">{{'sortPrice'}}</el-button>
        <el-button type="primary" class="btn btn-md btn-info" @click="setSorter('name')">{{'sortName'}}</el-button>
      </el-button-group>
    <!-- // <h1>{{$t('about')}}</h1> -->
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      filter: {
        byName: '',
        inStock: 'all',
        byType: '',
      },
      sort: {
        sorter: '',
        order: -1
      },
      selected: 'All Categories',
      options: [
        { label: 'Educational', value: 'Educational'},
        { label: 'Adult', value: 'Adult'},
        { label: 'Funny', value: 'Funny'},
        { label: 'All Categories', value: 'All Categories'}
      ]
    }
  },
  methods: {
    setFilter() {
      this.$emit('filter-set',this.filter,this.sort)
    },
    setSorter(sorter) {
      this.sort.sorter = sorter
      this.sort.order *= -1
      this.$emit('filter-set',this.filter,this.sort)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .event-filter {
    .el-input {
      max-width: 200px;
    }
    .el-select {
      max-width: 200px;
    }
  }
</style>
