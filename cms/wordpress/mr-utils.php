<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function mrutils_assets_backend() {
    global $mrutils_version,$mrdev_version;
    wp_enqueue_script(
        'mrutils-js',
            esc_url( plugins_url( '/build/index.js', __FILE__ ) ),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
            $mrutils_version,
            true
    );

    if(!isset($mrdev_version)) {
        //CODE TEMPORARY COMMENTEND - While Wordpress does not fix the enqueue of multiple assets inside block template iframes
        /*
        wp_enqueue_style(
            'mrutils_backend-css',
                esc_url( plugins_url( '../../css/utils_backend.css', __FILE__ ) ),
                array( ),
                $mrutils_version
        );
        */
        
        //TEMPORARY CODE - While Wordpress does not fix the enqueue of multiple assets inside block template iframes
        wp_enqueue_style(
            'mrutils_backend-css',
                esc_url( plugins_url( 'assets/css/utils_backend_custom.css', __FILE__ ) ),
                array( ),
                $mrutils_version
        );
    }
}
add_action( 'enqueue_block_editor_assets', 'mrutils_assets_backend' );

function mrutils_assets() {
    global $mrutils_version,$mrdev_version;
    if(!isset($mrdev_version)) {
        wp_enqueue_style(
                'mrutils-utils',
                esc_url( plugins_url( '../../css/utils.css', __FILE__ ) ),
                array( ),
                $mrutils_version
        );
        wp_enqueue_style(
            'mrutils-utils_hover',
            esc_url( plugins_url( '../../css/utils_hover.css', __FILE__ ) ),
            array( ),
            $mrutils_version
        );
        wp_enqueue_style(
            'mrutils-utils_desktop',
            esc_url( plugins_url( '../../css/utils_desktop.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(min-width: 1200px)'
        );
        wp_enqueue_style(
            'mrutils-utils_laptop',
            esc_url( plugins_url( '../../css/utils_laptop.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(min-width: 960px) and (max-width: 1199px)'
        );
        wp_enqueue_style(
            'mrutils-utils_tablet',
            esc_url( plugins_url( '../../css/utils_tablet.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(min-width: 768px) and (max-width: 959px)'
        );
        wp_enqueue_style(
            'mrutils-utils_phone',
            esc_url( plugins_url( '../../css/utils_phone.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(max-width: 767px)'
        );
        wp_enqueue_style(
            'mrutils-utils_landscape',
            esc_url( plugins_url( '../../css/utils_landscape.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(orientation: landscape)'
        );
        wp_enqueue_style(
            'mrutils-utils_portrait',
            esc_url( plugins_url( '../../css/utils_portrait.css', __FILE__ ) ),
            array( ),
            $mrutils_version,
            '(orientation: portrait)'
        );
        wp_enqueue_script(
            'mrutils-utils',
            esc_url( plugins_url( '../../js/utils.js', __FILE__ ) ),
            array( ),
            $mrutils_version,
            true
        );
    }
}
add_action( 'enqueue_block_assets', 'mrutils_assets' );

function mrutils_render_block( $block_content, $block ) {
    /*
    This function replaced the use of blocks.getSaveContent.extraProps (on src/index.js) because it does not work with dynamic blocks.
    https://github.com/WordPress/gutenberg/issues/36127#issuecomment-1106645202
    */
    if ( !$block_content || !isset( $block['attrs'] ) ) {
		return $block_content;
	}

    $mrutils_class_names = '';
    foreach($block['attrs'] as $block=>$attr) {
        if(!empty($attr) && !is_array($attr)) {
            if(strpos($attr, 'mr-') !== false) {
                $mrutils_class_names .= $attr;
            } else if(strpos($block, 'mr') !== false && strpos($block, 'Pagination') !== false || strpos($block, 'mr') !== false && strpos($block, 'ScrollNavigation') !== false) {
                //Handle checkboxes and other boolean inputs.
                $block = str_replace("mr","mr-",strtolower($block));
                $block = str_replace("navigation","nav",strtolower($block));
                $mrutils_class_names .= $block;
            } else if(strpos($block, 'mrPerPage') !== false) {
                //Handle numeric input with a different syntax order.
                $mrutils_class_names .= 'mr-'.($attr).'perpage';
            } else if(strpos($block, 'mrFontSize') !== false || strpos($block, 'mrSize') !== false) {
                //Handle numeric and range inputs + breakpoints.
                $block = strtolower($block);
                if(strpos($block, 'desktop')) {
                    $block = str_replace("mr","mr-desktop-",str_replace("desktop","",$block));
                } else if(strpos($block, 'laptop')) {
                    $block = str_replace("mr","mr-laptop-",str_replace("laptop","",$block));
                } else if(strpos($block, 'tablet')) {
                    $block = str_replace("mr","mr-tablet-",str_replace("tablet","",$block));
                } else if(strpos($block, 'phone')) {
                    $block = str_replace("mr","mr-phone-",str_replace("phone","",$block));
                } else if(strpos($block, 'hover')) {
                    $block = str_replace("mr","mr-hover-",str_replace("hover","",$block));
                } else {
                    $block = str_replace("mr","mr-",$block);
                }
                $mrutils_class_names .= $block.($attr);
            }

            $mrutils_class_names .= ' ';

            if(strpos($block,'mrAnimation') !== false) {
                $mrutils_class_names .= 'mr-active ';
            }
        }
    }

    if($mrutils_class_names) {
        if(strpos($block_content, ' class="')) {
            return preg_replace(
                    '/' . preg_quote( ' class="', '/' ) . '/',
                    ' class="' . esc_attr( $mrutils_class_names ) . ' ',
                    $block_content,
                    1
            );
        } else {
            return preg_replace(
                '/' . preg_quote( '>', '/' ) . '/',
                ' class="' . esc_attr( $mrutils_class_names ) . '">',
                $block_content,
                1
            );
        }
    } else {
        return $block_content;
    }
    
}
add_filter( 'render_block', 'mrutils_render_block', 10, 2 );