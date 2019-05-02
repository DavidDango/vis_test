<template>
  <div>
    <button type="button" @click="toggle_physics"> Turn off physics </button>
    <button type="button" @click="create_node"> Create a node </button>
    <div id="outer">
      <div id="mynetwork"></div>
    </div>
  </div>
</template>

<script>
import vis from 'vis'
import * as utils from './utils.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      nodes: [],
      edges: [],
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
      network: null,
      current_node_id: 0
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
    this.options.nodes = { shape: 'image' }
    this.network.setOptions(this.options)
  },
  methods: {
    toggle_physics () {
      this.options.nodes.physics = false
      this.network.setOptions(this.options)
    },
    create_node () {
      var nNode = utils.makeNode(this.nextNodeId())
      // var url = 'https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_shape_rectangle-512.png'
      var url1 = '../assets/humanB.png'
      var url2 = '../assets/humanA.png'
      nNode.image = { unselected: url1, selected: url2 }
      this.nodes.push(nNode)
      this.network.setData({ nodes: this.nodes, edges: this.edges })
    },
    nextNodeId () {
      this.current_node_id++
      return this.current_node_id
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
