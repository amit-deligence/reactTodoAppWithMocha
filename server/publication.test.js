import { Meteor } from 'meteor/meteor';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { assert } from 'meteor/practicalmeteor:chai';
import { Messages } from '../imports/api/messages.js';
import './publication.js';

describe('Publication of messages collection', function () {
  beforeEach(()=> {
    Messages.remove({});
    Messages.insert({
      message: 'Test Message...',
      createdAt: new Date(),
    });
  });

  describe('Messages from collection', function () {
    it('Get all', function (done) {
      const collector = new PublicationCollector();
      collector.collect('Messages', (collection) => {
        assert.equal(collection.Messages.length, 1);
        done();
      });
    });
  });
});