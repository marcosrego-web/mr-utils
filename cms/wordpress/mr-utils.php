<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function mrutils_enqueue_block_editor_assets() {
    global $mrutils_version;
    wp_enqueue_script(
        'mrutils-js',
            esc_url( plugins_url( '/build/index.js', __FILE__ ) ),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
            $mrutils_version,
            true
    );

    wp_enqueue_style(
        'mrutils_backend-css',
            esc_url( plugins_url( '../../css/utils_backend.css', __FILE__ ) ),
            array( ),
            $mrutils_version
    );
}
add_action( 'enqueue_block_editor_assets', 'mrutils_enqueue_block_editor_assets' );

function mrutils_enqueue_mrutils_assets() {
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
add_action( 'wp_enqueue_scripts', 'mrutils_enqueue_mrutils_assets');
add_action('admin_enqueue_scripts', 'mrutils_enqueue_mrutils_assets');