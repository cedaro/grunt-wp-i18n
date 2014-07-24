<?php

__( 'Hello World', 'incorrect-domain' );
_x( 'Post', 'verb', 'incorrect-domain' );
_e( 'Hello World', 'incorrect-domain' );
_ex( 'Post', 'verb', 'incorrect-domain' );


esc_html__( 'Hello World', 'incorrect-domain' );
esc_html_e( 'Hello World', 'incorrect-domain' );
esc_html_x( 'Post', 'verb', 'incorrect-domain' );


esc_attr__( 'Hello World', 'incorrect-domain' );
esc_attr_e( 'Hello World', 'incorrect-domain' );
esc_attr_x( 'Post', 'verb', 'incorrect-domain' );


$apples = 4;
_n( '%d apple', '%d apples', $apples, 'incorrect-domain' );
_nx( '%d post', '%d posts', $apples, 'noun, job positions', 'incorrect-domain' );


_n_noop( '%d apple', '%d apples', 'incorrect-domain' );
_nx_noop( '%d post', '%d posts', 'noun, job positions', 'incorrect-domain' );
?>