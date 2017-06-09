import React, { Component, PropTypes } from 'react';
import { Messages } from '../api/messages.js';
 

// Message component - represents a single todo item

export default class Message extends Component {

	deleteMsg() {
	    Meteor.call("removeMessage",this.props.message._id,(err)=>{
        if(err)
          Bert.alert(" Error: "+err.reason, "danger", "growl-top-left");
        else
          Bert.alert(" Message Deleted successfully. ", "success", "growl-top-left");
      })
	}
  render() {

    return (

      	<li className="list-item">
      		<span>{this.props.message.message}</span>
          {this.props.message.owner == Meteor.userId() ?
          	<button className="delete" onClick={this.deleteMsg.bind(this)}>&times;</button>
      	   :""
         }
         <span className="msg-date">{this.props.message.createdAt.toString().substring(4,21)}</span>
        </li>

    );

  }

}

 

Message.propTypes = {

  // This component gets the task to display through a React prop.

  // We can use propTypes to indicate it is required

  message: PropTypes.object.isRequired,

};

