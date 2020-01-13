import React from 'react';
import './App.css';
import { LogLevel, HubConnectionBuilder } from '@aspnet/signalr';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: '',
      response: ''
    }
  }
  componentDidMount() {
    let connection = new HubConnectionBuilder()
    .withUrl("https://testsig.azurewebsites.net/api")
    .configureLogging(LogLevel.Information)
    .build();
 
connection.on("newMessage", ({text}) => {
  const {response, imageUrl} = JSON.parse(text)
    this.setState({response, imageUrl})
});
 
connection.start()
    .then(() => connection.invoke("send", "Hello"));
  }
  render(){
  return (
    <div className="App">
      <h3>Smart IoT Solution</h3>
      <div style={{minHeight: "120px", marginTop:"10px"}}>
        <h5>Image</h5>
        <img src={this.state.imageUrl} className="App-logo" alt="uploaded" /></div>
      <div>

      <div>
        <h5>Output</h5>
        </div>
        <div style={{width: '50%', marginLeft: '25%'}}>
          <p style={{overflowWrap: 'break-word'}}>
          {this.state.response}
          </p>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
