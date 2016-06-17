/**
 * Created by udit on 17/06/16.
 */

var webhookRoute = Picker.filter(function(req, res) {
	// you can write any logic you want.
	// but this callback does not run inside a fiber
	// at the end, you must return either true or false
	return req.method == "POST" || req.method == "GET";
});

webhookRoute.route( '/freshbooks-webhook', function( params, req, res, next ) {
	console.log(params);
	console.log(req);
	console.log(res);
	console.log(next);
} );
