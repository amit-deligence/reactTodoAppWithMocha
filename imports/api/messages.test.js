import { Messages } from './messages.js';
import { Random } from 'meteor/random';

if (Meteor.isServer) {
  describe('Message Collection:', function () {
    it('Insertion successful', function () {
      let userId = Random.id();
      const messageId = Messages.insert({
        post: 'Collection test...',
        owner:userId,
        createdAt: new Date()
      });
      const checkMessage = Messages.find({ _id: messageId });
      const messageCollection = checkMessage._getCollectionName();
      const count = checkMessage.count();

      assert.equal(messageCollection, 'Messages');
      assert.equal(count, 1);
    });
  });
}