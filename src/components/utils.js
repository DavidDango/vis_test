// node formatter
export const makeNode = (nodeId) => {
  return { id: nodeId, label: newNodeName() }
}

// random node name
const newNodeName = () => {
  return 'Actor'
}

export const checkEdges = (data, edge, net) => {
  for (let i of data.edges) {
    if (i.to === edge.to && i.from === edge.from) {
      return false
    } else if (i.to === edge.from && i.from === edge.to) {
      return false
    }
  }
  let nodes = []
  for (let i of data.nodes) {
    nodes.push(i.id)
  }
  data.edges.push(edge)
  let temp = net.getPositions(nodes)
  for (let i = 0; i < data.nodes.length; i++) {
    data.nodes[i].x = temp[data.nodes[i].id].x
    data.nodes[i].y = temp[data.nodes[i].id].y
  }
  net.setData({ nodes: data.nodes, edges: data.edges })
  return true
}
