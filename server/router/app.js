/**
 * Created by udit on 17/06/16.
 */

import bodyParser from 'body-parser';
import FreshBooks from 'freshbooks';

// Define our middleware using the Picker.middleware() method.
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

var webhookRoute = Picker.filter(function(req, res) {
	// you can write any logic you want.
	// but this callback does not run inside a fiber
	// at the end, you must return either true or false
	return req.method == "POST" || req.method == "GET";
});

webhookRoute.route( '/freshbooks-webhook', function( params, req, res, next ) {

	console.log("==== req.body ====");
	console.log(req.body);

	var freshbooksRes = JSON.parse( req.body );
	// var freshbooksRes = {
	// 	user_id: '1',
	// 	name: 'time_entry.update',
	// 	object_id: '1059736',
	// 	system: 'https://incognitech.freshbooks.com'
	// };

	if ( freshbooksRes ) {

		if ( freshbooksRes.name && freshbooksRes.name.includes('time_entry') ) {

			if ( freshbooksRes.object_id ) {

				var freshbooks = new FreshBooks( FreshBooksConfig.apiURL, FreshBooksConfig.apiToken );

				var timeentryAPI = new freshbooks.Time_Entry();
				timeentryAPI.get( parseInt( freshbooksRes.object_id ), Meteor.bindEnvironment( function (err, timeentryObj) {

					if ( err ) {

						console.log( "something went wrong in fetching timeentry object." );
						console.log(err);

					} else {

						switch (freshbooksRes.name) {
							case "time_entry.create":
							case "time_entry.update":
								timeentry.upsert(
									{
										freshbooks_id: timeentryObj.time_entry_id
									}, {
										$set: {
											freshbooks_id: timeentryObj.time_entry_id,
											hours: timeentryObj.hours,
											timestamp: new Date(timeentryObj.date),
											notes: timeentryObj.notes
										}
									}, {
										$upsert: true
									}
								);

								var projectAPI = new freshbooks.Project();
								projectAPI.get( parseInt( timeentryObj.project_id ), Meteor.bindEnvironment( function ( err, projectObj ) {

									if ( err ) {

										console.log( "something went wrong in fetching project object." );
										console.log(err);

									} else {

										timeentry.upsert(
											{
												freshbooks_id: timeentryObj.time_entry_id
											}, {
												$set: {
													project_name: projectObj.name
												}
											}, {
												$upsert: true
											}
										);

									}

								}, function (err) {

									console.log( "Failed to bind environment in project.get" );
									console.log(err);

								} ) );

								var staffAPI = new freshbooks.Staff();
								staffAPI.get( parseInt( timeentryObj.staff_id ), Meteor.bindEnvironment( function ( err, staffObj ) {

									if ( err ) {

										console.log( "something went wrong in fetching staff object." );
										console.log(err);

									} else {

										timeentry.upsert(
											{
												freshbooks_id: timeentryObj.time_entry_id
											}, {
												$set: {
													staff_email: staffObj.email
												}
											}, {
												$upsert: true
											}
										);

									}

								}, function (err) {

									console.log( "Failed to bind environment in staff.get" );
									console.log(err);

								} ) );

								var taskAPI = new freshbooks.Task();
								taskAPI.get( parseInt( timeentryObj.task_id ), Meteor.bindEnvironment( function ( err, taskObj ) {

									if ( err ) {

										console.log( "something went wrong in fetching task object." );
										console.log(err);

									} else {

										timeentry.upsert(
											{
												freshbooks_id: timeentryObj.time_entry_id
											}, {
												$set: {
													task_name: taskObj.name
												}
											}, {
												$upsert: true
											}
										);

									}

								}, function (err) {

									console.log( "Failed to bind environment in task.get" );
									console.log(err);

								} ) );

								break;
							case "time_entry.delete":
								timeentry.delete( { freshbooks_id: timeentryObj.time_entry_id } );
								break;
						}
					}

				}, function (err) {

					console.log( "Failed to bind environment in timeentry.get" );
					console.log(err);

				} ) );

			} else {

				console.log("no object_id found");

			}

		} else {

			console.log("not a timeentry event");

		}

	} else {

		console.log( "no response found from freshbooks" );

	}

} );
