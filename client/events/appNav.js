/**
 * Created by udit on 17/06/16.
 */
Template.appNav.events(
	{
		'click .js-logout': function() {
			if ( Meteor.userId() ) {
				AccountsTemplates.logout();
				FlowRouter.go('/');
			}
		}
	}
);