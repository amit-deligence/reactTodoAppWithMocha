import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('Messages');

Messages.allow({
   insert: (userId, doc)=> userId == doc.owner
});

