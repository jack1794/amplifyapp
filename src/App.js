import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      webSocket: {},
      message: 'Please provide a message',
      serverName: "Please enter a server name",
      receiveMessages: []
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.connectServer = this.connectServer.bind(this)
    this.updateServerName = this.updateServerName.bind(this)
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  updateServerName(event) {
    this.setState({serverName: event.target.value})
  }

  updateMessage(event) {
     this.setState({message: event.target.value})
  }

  connectServer() {
    const webSocket = new WebSocket(this.state.serverName);
    this.setState({webSocket})

    webSocket.onmessage = this.receiveMessage
  }

  sendMessage(event) {
    event.preventDefault()
    let { message, webSocket } = this.state;
    webSocket.send(
      JSON.stringify({"action":"sendmessage", "data": message})
    ); 
    this.setState({message: "Please provide a message"})
  }

  receiveMessage(message) {
    let { receiveMessages } = this.state

    receiveMessages.push(message.data)

    console.log(message)
    console.log(receiveMessages)

    this.setState({receiveMessages})
  }

  render() {
    return (
      <div>
        <div>

          <p>Enter Server Name: </p>
          <input type="text" name="server-name" onChange={this.updateServerName}/>

          <button
            onClick={this.connectServer}
          >
            Connect
          </button>

          <p>Enter Message: </p>
          <input type="text" name="message" onChange={this.updateMessage} />

          <button
            onClick={this.sendMessage}
          >
            Send
          </button>

        </div>
        <div id="messages">
          {this.state.receiveMessages.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
