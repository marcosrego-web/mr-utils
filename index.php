<?php
/**
 * Plugin Name:       Mr.Utils
 * Plugin URI:        https://marcosrego.com/development/mr-utils/
 * Description:       Easily use Mr.Utils front-end toolkit with the block editor interface without knowing code, the classes or the functions.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Marcos Rego
 * Author uri:		 	https://marcosrego.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mr-utils
 *
 * @package           create-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$mrutils_version = '0.1.0';

include 'cms/wordpress/mr-utils.php';