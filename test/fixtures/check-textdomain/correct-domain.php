<?php

__( 'Hello World', 'my-domain' );
_x( 'Post', 'verb', 'my-domain' );
_e( 'Hello World', 'my-domain' );
_ex( 'Post', 'verb', 'my-domain' );


esc_html__( 'Hello World', 'my-domain' );
esc_html_e( 'Hello World', 'my-domain' );
esc_html_x( 'Post', 'verb', 'my-domain' );


esc_attr__( 'Hello World', 'my-domain' );
esc_attr_e( 'Hello World', 'my-domain' );
esc_attr_x( 'Post', 'verb', 'my-domain' );


$apples = 4;
_n( '%d apple', '%d apples', $apples, 'my-domain' );
_nx( '%d post', '%d posts', $apples, 'noun, job positions', 'my-domain' );


_n_noop( '%d apple', '%d apples', 'my-domain' );
_nx_noop( '%d post', '%d posts', 'noun, job positions', 'my-domain' );
?>