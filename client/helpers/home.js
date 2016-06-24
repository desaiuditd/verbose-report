/**
 * Created by udit on 17/06/16.
 */
Template.tmplHome.helpers(
	{
		getTimeentries: function () {

			var timeentries = [];
			var user = Meteor.user();

			if ( user ) {
				var email = user.emails[0];

				timeentries = timeentry.find({staff_email: email.address}, { sort: { timestamp : 1 } }).fetch();
			}

			return timeentries;

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
