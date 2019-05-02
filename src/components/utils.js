// node formatter
export const makeNode = (nodeId) => {
  return { id: nodeId, label: newNodeName() }
}

// random node name
const newNodeName = () => {
  return 'Actor'
}
