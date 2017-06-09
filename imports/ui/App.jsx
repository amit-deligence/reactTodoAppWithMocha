
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages.js';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Message from './Message.jsx';


 

// App component - represents the whole app

 class App extends Component {

    renderMessages() {
    console.log(this.props, "<<<Props")
    return this.props.messages.map((message) => (

      <Message key={message._id} task={message} />

    ));

  }

   handleSubmit(event) {

    event.preventDefault();

    const text = this.refs.textInput.value;

    //Inserting Message in DB
    Messages.insert({
      message:text,
      owner: Meteor.userId(),
      createdAt: new Date()
    });
    this.refs.textInput.value = '';

  }

  render() {
    
    return (

      <div className="container">

        <header>

          <h1>Messages List</h1>
          <AccountsUIWrapper />

        </header>        
        { this.props.currentUser ? 
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >

            <input

              type="text"

              ref="textInput"

              placeholder="Type to add new messages"

            />

          </form>: ""}
 

        <ul>

          {this.props.isReady && this.props.messages.length!=0?this.renderMessages():""}

        </ul>

      </div>

    );

  }

}

App.propTypes = {

  messages: PropTypes.array.isRequired,

};

 

export default createContainer(() => {
  let handler = Meteor.subscribe("Messages");

  return {
    isReady : handler.ready(),
    messages: Messages.find({},{sort:{createdAt:-1}}).fetch(),
    currentUser: Meteor.user()

  };

}, App);