import React from 'react'
import { Graph } from 'react-d3-graph';
import Data from './data'
class App extends React.Component {
  constructor() {
    super()
    let newMembers
    let newOrg
    let nodes = []
    let links = []
    Data.map((data) => {
      newMembers = data.members
      newOrg = data.organization
      newMembers.map((mem) => {
        let member = mem
        let hasNode = nodes.filter((node) => { return node.id === member.name })
        if (hasNode.length === 0) {
          nodes.push({ "id": member.name, 'din': member.din, "color": "blue", 'size': '200' })
        }
        let hasLink = nodes.filter((link) => {
          if (link.id === newOrg.name) {
            return "yes"
          }
        })
        if (hasLink.length === 0) {
          nodes.push({ "id": newOrg.name, "cin": newOrg.cin, 'status': newOrg.status, "color": "blue", 'size': '200' })
        }
        links.push({ "source": newOrg.name, 'target': member.name, "color": 'grey', 'active': false })
      })
    })
    this.state = {
      members: nodes,
      organization: links,
      multipleSources: []
    }
  }
  onClickNode = (source) => {
    this.setState({
      multipleSources: [...new Set(this.state.multipleSources), source]
    }, function () {
      let newLinks = this.state.organization.map((data) => {
        if (data.source === source || data.target === source) {
          if (data.active === false) {
            data.color = 'brown'
            data.active = true
            return data
          } else {
            data.color = 'grey'
            data.active = false
            return data
          }
        } else {
          return data
        }
      })
      this.setState({
        organization: [...newLinks]
      })
      if (this.state.multipleSources.length > 0) {
        var result =this.state.organization.map((data) => {
          let newData = data
          let res = this.state.multipleSources.includes(newData.target)
          if (res) {
            return newData
          }
        })
        let newResult = result.filter((d)=>d!==undefined)
        let res = []
        for(let i=0;i<newResult.length-1;i++){
          let presentEle = newResult[i]
          let nextEle = newResult[i+1]
          if(presentEle["source"] === nextEle["source"]){
            res.push(presentEle)
            res.push(nextEle)
            if(presentEle.active === true && nextEle.active === true){
              presentEle.color = 'orange'
              nextEle.color = 'orange'
              presentEle.status = true
              nextEle.status = true
            }
          }
        }
      }
    })
  }
  render() {
    let newData = {
      nodes: this.state.members,
      links: this.state.organization
    }
    let myConfig = {
      nodeHighlightBehavior: false,
      node: {
        color: 'blue',
        size: 120,
        highlightStrokeColor: 'red',
        highlightColor: 'red'
      },
      link: {
        highlightColor: 'red',
        color: "grey"
      }
    }
    return (
      <div>
        <Graph
          id='graph-id'
          data={newData}
          config={myConfig}
          onClickNode={this.onClickNode}
        />
      </div>
    )
  }
}
export default App