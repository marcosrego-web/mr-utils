<?php
/**
 * Plugin Name:       Mr.Utils
 * Plugin URI:        https://marcosrego.com/development/mr-utils/
 * Description:       Easily use Mr.Utils front-end toolkit with the block editor interface without knowing code, the classes or the functions.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.3
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

$mrutils_version = '0.1.3';

//CMS - WORDPRESS
if (file_exists(dirname(__FILE__).'/../mrdev-framework_wp/mrdev-framework_wp.php')) {
    function mrutils_plugin_notice() {
        ?>
        <div class="notice notice-error is-dismissible">
            <p><?php _e( "<b>The Mr.Utils plugin was deactivated because it's already included with the Mr.Dev.'s Framework that you have installed.</b><br>You can now enable 'Utilities configuration' on the Framework settings and <b>delete the Mr.Utils plugin</b>.", 'mr-utils' ); ?></p>
        </div>
        <?php
        deactivate_plugins( 'mr-utils/index.php' );
        if(!is_plugin_active('mrdev-framework_wp/mrdev-framework_wp.php')) {
            ?>
            <div class="notice notice-success is-dismissible">
                <p><?php _e( "Mr.Dev.'s Framework was activated.", 'mr-utils' ); ?></p>
            </div>
            <?php
            activate_plugin( 'mrdev-framework_wp/mrdev-framework_wp.php' );
        }
    }
    add_action( 'admin_notices', 'mrutils_plugin_notice' );
} else {
	function mrutils_hide_mrdev_dependencies() {
		echo '<style>
		.mr-backend-hascustomoption:not(.mr-backend-padding):not(.mr-backend-margin) option:last-child,
		.mr-backend-itemsize .components-input-control__container,
		.mr-backend-fontsize .components-input-control__container {
			display: none !important;
		}
		.mr-backend-custominput {
			position: relative;
		}
		.mr-backend-custominput:before {
			content: "";
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.mr-backend-custominput input {
		    all: unset !important;
    		opacity: 0.5 !important;
		}
		</style>';
	}
	add_action( 'admin_head', 'mrutils_hide_mrdev_dependencies' );
    include 'cms/wordpress/mr-utils.php';
}