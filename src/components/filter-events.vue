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
      <el-select class="el-select" v-model="filter.byStatus" @change="setFilter" :placeholder="'Event status'">
        <el-option
          v-for="item in statuses"
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
import bus, {FILTER} from "@/bus.js"

export default {
  created() {
    bus.$on(FILTER, (object) => {
      console.log(object,'object')
      if (object.genre) this.filter.byGenre = object.genre
      if (object.instrument) this.filter.byInstrument = object.instrument
      if (object.location) this.filter.byLocation = object.location
      if (object.recent) this.filter.byRecent = object.recent
      if (object.status === 'Almost full') this.filter.byStatus = 'Almost full'
      if (object.status === 'Waiting for players') this.filter.byStatus = 'Waiting for players'
      this.setFilter()

    })
  },
  data() {
    return {
      filter: {
        byName: '',
        byInstrument: '',
        byGenre: '',
        byLocation: '',
        byStatus: '',
        byRecent: ''
      },
      sort: {
        sorter: '',
        order: -1
      },
      selected: 'All Categories',
      statuses: [
        { label: 'empty', value: 'Waiting for players'},
        { label: 'Kinda full', value: 'Kinda full'},
        { label: 'Almost full', value: 'Almost full'},
        { label: 'Event full', value: 'Event full'},
        { label: 'All statuses', value: 'All statuses'},
      ],
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
      console.log(this.filter,'filter1')
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
    margin-top: 49px;
    .el-input {
      max-width: 200px;
    }
    .el-select {
      max-width: 200px;
    }
  }
</style>
