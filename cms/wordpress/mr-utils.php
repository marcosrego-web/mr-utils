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
        /*
        //CODE TEMPORARY COMMENTEND - While Wordpress does not fix the enqueue of multiple assets inside block template iframes
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
                esc_url( plugins_url( 'utils_backend_custom.css', __FILE__ ) ),
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