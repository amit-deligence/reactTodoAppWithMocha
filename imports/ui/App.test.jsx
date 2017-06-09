import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import App from './App.jsx';
import {Messages} from '../api/messages.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Random } from 'meteor/random';

Factory.define('message', Messages, {
  message: 'testing...',
  owner:Random.id(),
  createdAt: () => new Date(),
});

if (Meteor.isClient) {
	describe('Page Render',()=>{
	let messageId = null;
	let header;
	it('<App>', () => {
		const item = mount(<App />);
		console.log("----",item.find('header').length)
		chai.assert(item.find('header').length,1);
	});

	});

	describe('Insertation',()=>{
		beforeEach( ()=> {
			const list = Factory.create('message');
		});

		it('Insertion',()=>{
			assert.equal(Messages.find().count(), 1);
		})
	})



	


}

