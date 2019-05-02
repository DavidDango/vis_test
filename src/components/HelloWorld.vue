<template>
  <div>
    <button type="button" @click="toggle_physics"> Turn off physics </button>
    <div id="outer">
      <div id="mynetwork"></div>
    </div>
  </div>
</template>

<script>
import vis from 'vis'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      nodes: [
        { id: 0, label: '0', x: -147, y: -77 },
        { id: 1, label: '1', x: -186, y: 88 },
        { id: 2, label: '2', x: 8, y: 160 },
        { id: 3, label: '3', x: 159, y: 28 },
        { id: 4, label: '4', x: 45, y: -111 }
      ],
      edges: [
        { from: 0, to: 1 },
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 },
        { from: 0, to: 4 },
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 4 }
      ],
      options: {
        manipulation: {
          enabled: true,
          initiallyActive: true,
          addEdge: function (edgeData, callback) {
            callback(edgeData)
          }
        },
        nodes: {}
      },
      container: '',
      network: null
    }
  },
  computed: {
    graph_data () {
      return {
        nodes: this.nodes,
        edges: this.edges
      }
    }
  },
  mounted () {
    this.container = document.getElementById('mynetwork')
    this.network = new vis.Network(this.container, this.graph_data, this.options)
  },
  methods: {
    toggle_physics () {
      this.options.nodes.physics = false
      this.network.setOptions(this.options)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mynetwork {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
    display: inline-block;
  }
  #outer {
    width: 100%;
    text-align: center;
  }
</style>
