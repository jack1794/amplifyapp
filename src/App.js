import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      webSocket: {},
      message: 'Please provide a message',
      serverName: "Please enter a server name",
      clickCounter: 0
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.updateServerName = this.updateServerName.bind(this)
  }

  updateServerName(event) {
    this.setState({serverName: event.target.value})
  }

  updateMessage(event) {
     this.setState({message: event.target.value})
  }

  sendMessage(event) {
    event.preventDefault()
    let { message, clickCounter, webSocket } = this.state;
    this.setState({clickCounter: clickCounter += 1})
    if(clickCounter < 2) {
      webSocket = new WebSocket(this.state.serverName);
      this.setState({webSocket})
    }
    webSocket.send(
      JSON.stringify({"action":"sendmessage", "data": message})
    ); 
    this.setState({message: "Please provide a message"})
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.sendMessage}></form>
          <p>Enter Message: </p>
          <input type="text" name="message" onChange={this.updateMessage} value={this.state.message}/>
          <input type="text" name="server-name" onChange={this.updateServerName} value={this.state.serverName}/>
          <input
            type="submit"
            value="Submit"
          ></input>
        </div>
        <div id="messages"></div>
      </div>
    )
  }
}

export default App
