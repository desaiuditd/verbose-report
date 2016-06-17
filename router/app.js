/**
 * Created by udit on 17/06/16.
 */
FlowRouter.route( '/', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn ],
	name: 'home',
	action: function(params, queryParams) {

		Tracker.autorun( function () {
			var data = {};
			data.queryParams = queryParams;

			BlazeLayout.render( 'layoutMain', { tmpl: 'tmplHome', data: data } );
		} );

	}
} );

/**
 * Accounts Routes
 */
AccountsTemplates.configureRoute( 'changePwd', {
	name: 'changePwd',
	path: '/change-password'
} );
AccountsTemplates.configureRoute( 'enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account'
} );
AccountsTemplates.configureRoute( 'forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password'
} );
AccountsTemplates.configureRoute( 'resetPwd', {
	name: 'resetPwd',
	path: '/reset-password'
} );
AccountsTemplates.configureRoute( 'signIn', {
	name: 'signIn',
	path: '/login',
	redirect: '/'
} );
AccountsTemplates.configureRoute( 'signUp', {
	name: 'signUp',
	path: '/register'
} );
AccountsTemplates.configureRoute( 'verifyEmail', {
	name: 'verifyEmail',
	path: '/verify-email'
} );
AccountsTemplates.configureRoute( 'resendVerificationEmail', {
	name: 'resendVerificationEmail',
	path: '/send-again'
} );

/**
 * Misc Routes
 * */
FlowRouter.route( '/privacy', {
	name: 'privacy',
	action: function() {
		BlazeLayout.render( 'layoutMain', { tmpl: 'tmplPrivacy' } );
	}
} );
FlowRouter.route( '/terms-of-use', {
	name: 'termsOfUse',
	action: function() {
		BlazeLayout.render( 'layoutMain', { tmpl: 'tmplTermsOfUse' } );
	}
} );