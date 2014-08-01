<?php
require_once( dirname( __FILE__ ) . '/add-textdomain.php' );

class GruntAddTextdomain extends AddTextdomain {
	/**
	 * List of text domains to update.
	 *
	 * @type array
	 */
	protected $domains_to_update = array();

	/**
	 * Add textdomain to a set of PHP tokens.
	 *
	 * @param string $domain Text domain.
	 * @param array  $tokens PHP tokens. An array of token identifiers. Each individual token identifier is either a
	 *                       single character (i.e.: ;, ., >, !, etc.), or a three element array containing the token
	 *                       index in element 0, the string content of the original token in element 1 and the line
	 *                       number in element 2.
	 *
	 * @return string Modified source.
	 */
	public function process_tokens( $domain, $tokens ) {
		$this->modified_contents = '';
		$domain = addslashes( $domain );

		$in_func = false;
		$args_started = false;
		$parens_balance = 0;
		$found_domain = false;

		foreach( $tokens as $index => $token ) {
			$string_success = false;
			if ( is_array( $token ) ) {
				list( $id, $text ) = $token;
				if ( T_STRING == $id && in_array( $text, $this->funcs ) ) {
					$in_func        = true;
					$parens_balance = 0;
					$args_started   = false;
					$found_domain   = false;
				} elseif ( T_CONSTANT_ENCAPSED_STRING == $id && ( "'$domain'" == $text || "\"$domain\"" == $text ) ) {
					if ( $in_func && $args_started ) {
						$found_domain = true;
					}
				} elseif ( T_CONSTANT_ENCAPSED_STRING == $id && in_array( trim( $text, '\'"' ), $this->domains_to_update ) ) {
					if ( $in_func && $args_started ) {
						$text = preg_replace( '/([\'"]).+[\'"]$/', '$1' . $domain . '$1', $text );
						$found_domain = true;
					}
				}
				$token = $text;
			} elseif ( '(' == $token ) {
				$args_started = true;
				++$parens_balance;
			} elseif ( ')' == $token ) {
				--$parens_balance;
				if ( $in_func && 0 == $parens_balance ) {
					if ( ! $found_domain ) {
						$token = ", '$domain'";
						if ( T_WHITESPACE == $tokens[ $index - 1 ][0] ) {
							$token .= ' '; // Maintain code standards if previously present
							// Remove previous whitespace token to account for it.
							$this->modified_contents = trim( $this->modified_contents );
						}
						$token .= ')';
					}
					$in_func      = false;
					$args_started = false;
					$found_domain = false;
				}
			}
			$this->modified_contents .= $token;
		}

		return $this->modified_contents;
	}

	/**
	 * Normalize and set a list of text domains to update.
	 *
	 * @param string|array $domains Comma-separated string or array of domains to update.
	 */
	public function set_domains_to_update( $domains = array() ) {
		if ( is_string( $domains ) ) {
			$domains = explode( ',', $domains );
		}

		// Remove empty items and non-strings.
		$this->domains_to_update = array_filter( array_filter( (array) $domains ), 'is_string' );
	}
}

/**
 * CLI interface.
 *
 * Run the CLI only if the file wasn't included.
 */
$included_files = get_included_files();
if ( __FILE__ == $included_files[0] ) {
	$adddomain = new GruntAddTextdomain;

	if ( ! isset( $argv[1] ) || ! isset( $argv[2] ) ) {
		$adddomain->usage();
	}

	$inplace = false;
	if ( '-i' == $argv[1] ) {
		$inplace = true;
		if ( ! isset( $argv[3] ) ) {
			$adddomain->usage();
		}
		array_shift( $argv );
	}

	// Set text domains to update.
	if ( isset( $argv[3] ) ) {
		$adddomain->set_domains_to_update( $argv[3] );
	}

	$adddomain->process_file( $argv[1], $argv[2], $inplace );
}
