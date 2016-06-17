/**
 * Created by udit on 19/05/16.
 */
Template.appNav.helpers(
	{
		currentUserGravatar: function() {
			var user = Meteor.user();
			var email = user && user.emails && user.emails[0].address;
			//email = Email.normalize( email );
			return '<img class="avatar small" src="' + Gravatar.imageUrl( email ) + '" />';
		},
		currentUserFullName: function() {
			var user = Meteor.user();

			if ( user && user.profile && user.profile.name )
				return user.profile.name.trim();

			if ( user && user.emails && user.emails[0].address )
				return user.emails[0].address;

			return "";
		}
	}
);
