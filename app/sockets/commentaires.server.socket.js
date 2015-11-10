// Invoke 'strict' JavaScript mode
'use strict';
var mongoose = require('mongoose'),
	domain = require('domain'),
 Commentaire = mongoose.model('Commentaire');
 
// Create the chat configuration
module.exports = function(io, socket, app) {   

    socket.on('commentaire', function(commentaire){
        var commentaire = new Commentaire(commentaire);  
        console.log(commentaire)  ;


        var d = domain.create();
			d.on('error', function (error) {
			console.error(error.stack);
			d.exit()
			socket.emit('commentaireCreated', {'Custom Error': error.message});
		});

			d.run(function(){
				commentaire.save(function(err){
	            if(err) 
	                socket.emit('error', err);

	             socket.emit('commentaireCreated', commentaire);

        		});
			});

        
    });

    socket.on('annonceID', function(annonceID){
    	Commentaire.find({annonce: annonceID}).sort('-date').exec(function(err, comments){
    	socket.emit('allComments', comments);	
    });
   });

    
    

    
};
