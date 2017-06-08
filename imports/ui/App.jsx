
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages.js';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Message from './Message.jsx';


 

// App component - represents the whole app

 class App extends Component {

    renderMessages() {

    return this.props.messages.map((task) => (

      <Message key={task._id} task={task} />

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
    if(!this.props.isReady)
      return <div className="loading">Loading...</div>
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

          {this.renderMessages()}

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