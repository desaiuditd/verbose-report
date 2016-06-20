/**
 * Created by udit on 20/06/16.
 */

googleCal = {
	clientId: '1015113841225-ja60231cioqvr7h00vl307btv19m205a.apps.googleusercontent.com',
	scopes: ['https://www.googleapis.com/auth/calendar'],
	/**
	 * Handle response from authorization server.
	 *
	 * @param {Object} authResult Authorization result.
	 */
	handleAuthResult: function (authResult) {
		console.log(authResult);
		if (authResult && !authResult.error) {
			// Hide auth UI, then load client library.
			googleCal.loadCalendarApi();
		} else {
			// Show auth UI, allowing the user to initiate authorization by
			// clicking authorize button.
			if ( authResult && authResult.error == "immediate_failed" && authResult.error_subtype == "access_denied" ) {
				gapi.auth.authorize(
					{
						'client_id': googleCal.clientId,
						'scope': googleCal.scopes.join(' '),
						'immediate': false
					}, googleCal.handleAuthResult);
			}
		}
	},
	/**
	 * Initiate auth flow in response to user clicking authorize button.
	 *
	 * @param {Event} event Button click event.
	 */
	handleAuthClick: function (event) {
		console.log("immediate auth true");
		gapi.auth.authorize(
			{ client_id: googleCal.clientId, scope: googleCal.scopes, immediate: true },
			googleCal.handleAuthResult);
		return false;
	},
	/**
	 * Load Google Calendar client library. List upcoming events
	 * once client library is loaded.
	 */
	loadCalendarApi: function () {
		gapi.client.load('calendar', 'v3', googleCal.createEvent);
	},
	/**
	 * Create Google Calendar Event
	 */
	createEvent: function () {
		var timeentries = Session.get( 'currentSyncTimeentries' ) || [] ;

		if ( timeentries ) {
			var date = timeentries[0].timestamp;
			date = new Date(date);
			date = date.getTime() + (date.getTimezoneOffset() * 60000);
			date = new Date(date + (3600000*'0'));
			date = moment(date).format('YYYY-MM-DD');

			var description = '';

			description += "Project\t\t\tTask\t\t\tHours\tNotes\n";
			for (i in timeentries) {
				description += ( timeentries[i].project_name + "\t\t" );
				description += ( timeentries[i].task_name + "\t\t" );
				description += ( timeentries[i].hours + "\t\t" );
				description += ( timeentries[i].notes + "\n" );
			}

			var event = {
				'summary': 'Daily Report',
				'description': description,
				'start': {
					'date': date,
					'timeZone': 'America/Los_Angeles'
				},
				'end': {
					'date': date,
					'timeZone': 'America/Los_Angeles'
				}
			};
			var request = gapi.client.calendar.events.insert(
				{
					'calendarId': 'primary',
					'resource': event
				}
			);

			request.execute( function( event ) {
				console.log(event);
				console.log( 'Event created: ' + event.htmlLink );

				for ( i in timeentries ) {
					timeentry.update(
						{
							_id: timeentries[i]._id
						}, {
							$set: {
								sentToGoogle: true
							}
						}
					)
				}

			} );
		}

	}
};