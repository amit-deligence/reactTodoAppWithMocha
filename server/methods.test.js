import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import {Messages} from '../imports/api/messages.js'
import './methods.js';

if (Meteor.isServer) {
  describe('Methods:', function () {
    let userId = Random.id();
    let messageId;
    beforeEach(function () {
      Messages.remove({});
      messageId = Messages.insert({
        message: 'Method testing...',
        owner:userId,
        createdAt: new Date(),
      });
    });
 

    it('Remove message:', function () {
      const removeMessage = Meteor.server.method_handlers['removeMessage'];
      removeMessage.apply({ userId }, [messageId]);
      assert.equal(Messages.find().count(), 0);
    });
  });
}