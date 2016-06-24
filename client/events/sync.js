/**
 * Created by udit on 20/06/16.
 */

Template.tmplSync.onRendered( function () {
	this.autorun( function () {
		$('#date').datepicker({format: "yyyy-mm-dd"});
	} );
} );

Template.tmplSync.events(
	{
		'click #js-get-logs': function ( event, template ) {
			var input = $('#date').val() || moment(new Date()).format('YYYY-MM-DD');

			var timeentries = timeentry.find( { timestamp: new Date( input ) }, { sort: { timestamp : 1 } } ).fetch();

			Session.set( 'currentSyncTimeentries', timeentries );
		},
		'click #js-sync': function ( event, template ) {
			var timeentries = Session.get( 'currentSyncTimeentries' ) || [];

			if ( timeentries ) {
				var input = $('#date').val() || moment(new Date()).format('YYYY-MM-DD');

				var timeentries = timeentry.find( { timestamp: new Date( input ) }, { sort: { timestamp : 1 } } ).fetch();
			}

			if ( timeentries ) {
				Session.set( 'currentSyncTimeentries', timeentries );
				googleCal.handleAuthClick(event);
			} else {
				console.log('sync message')
				Session.set( 'syncMessage', '<p class="notice bg-warning text-warning">No logs found for this date.</p>' );
			}
		}
	}
);