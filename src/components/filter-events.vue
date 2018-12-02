<template>
  <div class="event-filter d-flex justify-content-center">
    <el-input prefix-icon="el-icon-search" class="el-input" @input="setFilter" v-model="filter.byName" :placeholder="'search'"></el-input>
    
      <el-select class="el-select" v-model="filter.byGenre" @change="setFilter" :placeholder="'genre'">
        <el-option
          v-for="item in genres"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>    
      <el-select class="el-select" v-model="filter.byInstrument" @change="setFilter" :placeholder="'instrument'">
        <el-option
          v-for="item in instruments"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>    
      <el-button-group>
        <el-button type="primary" class="btn btn-md btn-info" @click="setSorter('time')">{{'Sort by date'}}</el-button>
        <el-button type="primary" class="btn btn-md btn-info" @click="setSorter('allowedMembersCount')">{{'Sort by participants'}}</el-button>
      </el-button-group>
    <!-- // <h1>{{'about'}}</h1> -->
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
        byInstrument: '',
        byGenre: '',
      },
      sort: {
        sorter: '',
        order: -1
      },
      selected: 'All Categories',
      genres: [
        { label: 'rock', value: 'rock'},
        { label: 'jazz', value: 'jazz'},
        { label: 'reggae', value: 'reggae'},
        { label: 'country', value: 'country'},
        { label: 'world', value: 'world'},
        { label: 'All genres', value: 'All genres'}
      ],
      instruments: [
        { label: 'guitar', value: 'guitar'},
        { label: 'drums', value: 'drums'},
        { label: 'bass guitar', value: 'bass guitar'},
        { label: 'flute', value: 'flute'},
        { label: 'clarinet', value: 'clarinet'},
        { label: 'piano', value: 'piano'},
        { label: 'trumpet', value: 'trumpet'},
        { label: 'french horn', value: 'french horn'},
        { label: 'trombone', value: 'trombone'},
        { label: 'xylophone', value: 'xylophone'},
        { label: 'violin', value: 'violin'},
        { label: 'saxophone', value: 'saxophone'},
        { label: 'All instruments', value: 'All instruments'},
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
