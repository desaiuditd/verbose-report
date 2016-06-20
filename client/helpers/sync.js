/**
 * Created by udit on 20/06/16.
 */

Template.tmplSync.helpers(
	{
		getSyncMessage: function () {
			return Session.get( 'syncMessage' ) || '';
		},
		getTimeentries: function () {
			return Session.get( 'currentSyncTimeentries' ) || [];
		},
		getDate: function () {
			var date = new Date(this.timestamp);
			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
			var newDate = new Date(utc + (3600000*'0'));
			return moment(newDate).format("MMMM Do, YYYY");
		},
		getGoogleFlag: function () {
			return this.sentToGoogle ? '<i class="fa fa-check" aria-hidden="true"></i>' : '<i class="fa fa-times" aria-hidden="true"></i>';
		}
	}
);