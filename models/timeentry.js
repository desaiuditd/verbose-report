/**
 * Created by udit on 17/06/16.
 */

timeentry = new Meteor.Collection( 'timeentry' );

Schemas.timeentry = new SimpleSchema(
	{
		user_id: {
			type: String
		},
		type: {
			type: String
		},
		query_id: {
			type: String
		},
		document_id: {
			type: String
		},
		timestamp: {
			type: Date
		}
	}
);

timeentry.attachSchema( Schemas.timeentry );