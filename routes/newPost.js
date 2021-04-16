var express = require('express');
var router = express.Router();
var connection = require ('../connection/connection');
var path = require('path');


router.get('/newPost', function(request, response) {
	response.render('newPost');
});

router.post('/newPost', function (request , response) {
	var title = request.body.title;
	var description = request.body.description;
    var Photo = request.files.blogPhoto;
	var fileName = Photo.name;
	var user= request.session.username;
	var date=Date();


	if (title &&  description ) {
		connection.query('INSERT INTO  `blogPost` (`title`, `description`, `blogPhoto`, `user`, `date`) VALUES(? , ? , ? , ? ,?)', 
		[title,description,  fileName , user, date] , function (error , results, fields) {
			if (!error) {
				
				Photo.mv('./public/images/newsPhoto/'+ fileName);
				request.session.loggedin = true;
				response.redirect ('/post');
			}else {
			console.log(error);
			
						}
					}
				
								
				
)};
});

module.exports = router;