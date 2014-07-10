<?php

__( 'Hello World' );
_x( 'Post', 'verb' );
_e( 'Hello World' );
_ex( 'Post', 'verb' );


esc_html__( 'Hello World' );
esc_html_e( 'Hello World' );
esc_html_x( 'Post', 'verb' );


esc_attr__( 'Hello World' );
esc_attr_e( 'Hello World' );
esc_attr_x( 'Post', 'verb' );


$apples = 4;
_n( '%d apple', '%d apples', $apples );
_nx( '%d post', '%d posts', $apples );


_n_noop( '%d apple', '%d apples' );
_nx_noop( '%d post', '%d posts', 'noun, job positions' );
?>
