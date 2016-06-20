/**
 * Created by udit on 17/06/16.
 */

timeentry = new Meteor.Collection( 'timeentry' );

Schemas.timeentry = new SimpleSchema(
	{
		freshbooks_id: {
			type: String,
			unique: true,
			optional: true
		},
		task_name: {
			type: String,
			optional: true
		},
		hours: {
			type: String,
			optional: true
		},
		notes: {
			type: String,
			optional: true
		},
		timestamp: {
			type: Date,
			optional: true
		},
		staff_email: {
			type: String,
			optional: true
		},
		project_name: {
			type: String,
			optional: true
		},
		sentToGoogle: {
			type: Boolean,
			optional: true,
			defaultValue: false
		}
	}
);

timeentry.attachSchema( Schemas.timeentry );