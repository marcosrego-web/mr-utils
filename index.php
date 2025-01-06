<?php
/**
 * Plugin Name:       Mr.Utils
 * Plugin URI:        https://marcosrego.com/development/mr-utils/
 * Description:       Easily use Mr.Utils front-end toolkit with the block editor interface without knowing code, the classes or the functions.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.2.6
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

$mrutils_version = '0.2.6';

if(!isset($mrdev_utils_blocks_url)) {
    $mrdev_utils_blocks_url = plugins_url( __FILE__ );
}

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
            activate_plugin( 'mrdev-framework_wp/mrdev-framework_wp.php' );
			if(is_plugin_active('mrdev-framework_wp/mrdev-framework_wp.php')) {
				?>
				<div class="notice notice-success is-dismissible">
					<p><?php _e( "Mr.Dev.'s Framework was activated.", 'mr-utils' ); ?></p>
				</div>
				<?php
			}
        }
    }
    add_action( 'admin_notices', 'mrutils_plugin_notice' );
} else {
	include 'cms/wordpress/mr-utils.php';
}