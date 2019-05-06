<template>
  <div>
    <button type="button" @click="toggle_physics"> Turn off physics </button>
    <button type="button" @click="create_node"> Create a node </button>
    <button type="button" @click="add_edge"> Make edge </button>
    <div id="outer">
      <div id="mynetwork"></div>
    </div>
  </div>
</template>

<script>
import vis from 'vis'
import * as utils from './utils.js'

let urlHumanU = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/humanA.png'
let urlHumanS = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/humanB.png'
let urlAgentU = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/somethingA.png'
let urlAgentS = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/somethingB.png'
let urlIntermediaryU = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/something2A.png'
let urlIntermediaryS = 'https://raw.githubusercontent.com/DavidDango/vis_test/master/src/assets/something2B.png'

let options = {
  manipulation: {
    enabled: true,
    initiallyActive: true
  },
  nodes: {}
}

let network = null

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      nodes: [],
      edges: [],
      container: '',
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
    let tempData = this
    options.manipulation['addEdge'] = function (edgeData, callback) { utils.checkEdges(tempData, edgeData, network) }
    network = new vis.Network(this.container, this.graph_data, options)
    options.nodes = { shape: 'image' }
    network.setOptions(options)
  },
  methods: {
    toggle_physics () {
      options.nodes.physics = false
      network.setOptions(options)
    },
    create_node () {
      let nNode = utils.makeNode(this.nextNodeId())
      nNode.image = { unselected: urlHumanU, selected: urlHumanS }
      let nodes = []
      for (let i of this.nodes) {
        if (i.id !== null) {
          nodes.push(i.id)
        }
      }
      let temp = network.getPositions(nodes)
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].x = temp[this.nodes[i].id].x
        this.nodes[i].y = temp[this.nodes[i].id].y
      }
      this.nodes.push(nNode)
      network.setData({ nodes: this.nodes, edges: this.edges })
    },
    nextNodeId () {
      this.current_node_id++
      return this.current_node_id
    },
    add_edge () {
      network.addEdgeMode()
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
