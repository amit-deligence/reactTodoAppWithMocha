import { Mongo } from 'meteor/mongo';
import {Messages} from '../imports/api/messages.js'

Meteor.methods({
	'removeMessage': (id) => Messages.remove(id)
})