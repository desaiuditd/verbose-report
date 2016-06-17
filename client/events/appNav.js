/**
 * Created by udit on 19/05/16.
 */
Template.appNav.events(
	{
		'click .js-logout': function() {
			if ( Meteor.userId() ) {
				AccountsTemplates.logout();
				FlowRouter.go('/login');
			}
		}
	}
);