<?php

_n( '%d apple', '%d apples', 4, 'my-domain' );
_nx( '%d post', '%d posts', 4, 'noun, job positions', 'my-domain' );

//Using a variable
$apples = 4;
_n( '%d apple', '%d apples', $apples, 'my-domain' );
_nx( '%d post', '%d posts', $apples, 'noun, job positions', 'my-domain' );

//Using a function
function __return( $int ){
	return $int;
}
_n( '%d apple', '%d apples', __return( 4 ), 'my-domain' );
_nx( '%d post', '%d posts', __return( 4 ), 'noun, job positions', 'my-domain' );


?>