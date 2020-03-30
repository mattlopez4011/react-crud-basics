import React, { Component } from 'react'

// This is a Class based component
class About extends Component{
  constructor() {
    super();
    this.state = {
      pageTitle: 'The about page'
    }
  }
  componentDidMount() {
    this.setState({
        pageTitle: 'About page'
      });
  }

  render(){
    return (
      <div>
        <h2>{this.state.pageTitle}</h2>
      </div>
    )
  }
}

export default About;