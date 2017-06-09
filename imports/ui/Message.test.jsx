import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Random } from 'meteor/random';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { Messages } from '../api/messages.js';
import Message from './Message.jsx';

Factory.define('message', Messages, {
  message: 'testing...',
  owner:Random.id(),
  createdAt: () => new Date(),
});
const message = Factory.create('message');
if (Meteor.isClient) {
  describe('<Message/>', function () {
    it('Render', function () {
      
      const item = mount(<Message message={message} />);
      chai.assert(item.find('span').length,1);
    });
  });
}
