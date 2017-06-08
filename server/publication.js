import { Meteor } from 'meteor/meteor';
import {Messages} from '../imports/api/messages.js';

Meteor.publish('Messages',  () => Messages.find() );