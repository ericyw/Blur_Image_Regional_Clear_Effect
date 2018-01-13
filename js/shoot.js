$( document ).ready( function() {
    
    /* the code below is executed after the DOM has been completely loaded */
    var main = $( "#main" );
    
    // setting the width of the photoshoot area to
    // 1024px or the width of the document - whichever is smallest
    main.width( Math.min( 1024, $( document ).width() ) );
    
    // create an array with four possible backgrounds and their sizes:
    var pics = new Array(
                { url: "images/1.jpg", size:{x:1024, y:677} },
                { url: "images/2.jpg", size:{x:1024, y:768} },
                { url: "images/3.jpg", size:{x:1024, y:768} },
                { url: "images/4.jpg", size:{x:1158, y:756} }
            );

    // choosing a random picture to be passed to the PhotoShoot jQuery plug-in
    var bg = pics[ parseInt( Math.random() * 4 ) ];
    
    // creating an options object (try tweeking the variables):
    var opts = {
        image: bg.url,
        onClick: shoot,
        opacity: 0.8,
        blurLevel: 4
    };

    // converting the #main div to a photoShoot stage:
    main.photoShoot( opts );
    
    // adding the album holder to the stage:
    $( "<div class='album'>" ).html( "<div class='slide' />" ).appendTo( main );
    
    // our own shoot function (it is passed as onClick to the options array above)
    function shoot( position ) {
        // This function is called by the plug-in when the button is pressed
        
	// Setting the overlay's div to white will create the illusion of a camera flash:
	main.find( ".overlay" ).css( "background-color", "white" );
        
        // The flash will last for 100 milliseconds (a tenth of the second):
        setTimeout( function() { main.find( ".overlay" ).css( "background-color", "" ); }, 100 );

        // Creating a new shot image:
        var newShot = $( "<div class='shot'>" ).width( 150 ).height( 100 );

        newShot.append( 
                $( "<img src='" + bg.url + "' width='" + ( bg.size.x/2 ) + "' height='"+ ( bg.size.y/2 ) + "' />" )
                .css( "margin", -position.top * 0.5 + "px 0 0 -" + position.left * 0.5 + "px" )
          
        );
        //console.log( position.top + " " + position.left );    
        // Removing the fourth shot (the count starts from 0):
        $( ".shot" ).eq( 3 ).remove();
        
    	// adding the newly created shot to the album div, but moved 160px to the right
        // we start an animation to slide it in view:
        newShot.css( "margin-right", -160 ).prependTo( ".album .slide" ).animate({ marginRight: 0 }, "slow" );
    }    
});