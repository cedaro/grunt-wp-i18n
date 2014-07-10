<?php
$domain = 'my-domain'; //Allthough correct, this should fail.

__( 'Hello World', $domain );
_x( 'Post', 'verb', $domain );
_e( 'Hello World', $domain );
_ex( 'Post', 'verb', $domain );


esc_html__( 'Hello World', $domain );
esc_html_e( 'Hello World', $domain );
esc_html_x( 'Post', 'verb', $domain );


esc_attr__( 'Hello World', $domain );
esc_attr_e( 'Hello World', $domain );
esc_attr_x( 'Post', 'verb', $domain );


$apples = 4;
_n( '%d apple', '%d apples', $apples, $domain );
_nx( '%d post', '%d posts', $apples, 'noun, job positions', $domain );


_n_noop( '%d apple', '%d apples', $domain );
_nx_noop( '%d post', '%d posts', 'noun, job positions', $domain );
?>