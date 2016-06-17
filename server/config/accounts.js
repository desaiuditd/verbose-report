/**
 * Created by udit on 19/05/16.
 */

// Set up login services
Meteor.startup( function () {
	// Add Google configuration entry
	ServiceConfiguration.configurations.update(
		{
			service: "google"
		}, {
			$set: {
				clientId: "1015113841225-ja60231cioqvr7h00vl307btv19m205a.apps.googleusercontent.com",
				client_email: "desaiuditd@gmail.com",
				secret: "01z2IGA1uu4656ydgk43zUPw"
			}
		}, {
			upsert: true
		}
	);
} );
