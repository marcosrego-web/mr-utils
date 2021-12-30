/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";

import { addFilter } from "@wordpress/hooks";

import { Fragment, useState } from "@wordpress/element";

import { createHigherOrderComponent } from "@wordpress/compose";

import { InspectorControls } from "@wordpress/block-editor";

import {
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	TabPanel,
} from "@wordpress/components";

import {
	settings,
	aspectRatio,
	desktop,
	tablet,
	mobile,
	resizeCornerNE,
	swatch,
	plus,
	pullLeft,
	typography,
	symbol,
	plusCircle,
	layout,
	pages,
	moveTo,
	blockDefault,
	replace,
} from "@wordpress/icons";

const mrAllowedBlocks = [
	"core/audio",
	"core/buttons",
	"core/button",
	"core/code",
	"core/column",
	"core/columns",
	"core/group",
	"core/cover",
	"core/coverImage",
	"core/embed",
	"core/file",
	"core/gallery",
	"core/heading",
	"core/html",
	"core/image",
	"core/list",
	"core/paragraph",
	"core/preformatted",
	"core/pullquote",
	"core/quote",
	"core/reusableBlock",
	"core/separator",
	"core/shortcode",
	"core/subhead",
	"core/table",
	"core/textColumns",
	"core/verse",
	"core/video",
	"core/query-title",
	"core/site-title",
	/*
	  //NOT FULLY SUPPORTED : https://github.com/WordPress/gutenberg/issues/36127
	  "core/categories",
	  "core/archives",
	  "core/latest-comments",
	  "core/latest-posts",
	  "core/latestComments",
	  "core/latestPosts",
	  "core/rss",
	  "core/query",
	  "core/post-terms",
	  "core/post-template",
	  "core/site-logo",
	  "core/site-tagline",
	  "core/calendar",
	  "core/page-list",
	  "core/tag-cloud",
	  "core/search",
	  "core/loginout",
	  "core/navigation",
	  "core/post-author",
	  "core/post-comments",
	  "core/post-content",
	  "core/post-date",
	  "core/post-excerpt",
	  "core/post-featured-image",
	  "core/post-title",
	  "core/template-part",
	  "core/term-description",
	  "core/post-navigation-link",
	  //WooCommerce
	  "woocommerce/handpicked-products",
	  "woocommerce/all-reviews",
	  "woocommerce/featured-category",
	  "woocommerce/featured-product",
	  "woocommerce/product-best-sellers",
	  "woocommerce/product-categories",
	  "woocommerce/product-category",
	  "woocommerce/product-new",
	  "woocommerce/product-on-sale",
	  "woocommerce/products-by-attribute",
	  "woocommerce/product-top-rated",
	  "woocommerce/reviews-by-product",
	  "woocommerce/reviews-by-category",
	  "woocommerce/product-search",
	  "woocommerce/products-by-tag",
	  "woocommerce/all-products",
	  "woocommerce/price-filter",
	  "woocommerce/attribute-filter",
	  "woocommerce/stock-filter",
	  "woocommerce/active-filters",
	  */
];

const mrUtilsBreakpoints = ["hover", "desktop", "laptop", "tablet", "phone"];

const mrUtilsGlobalFeatures = [
	"animations",
	"pagination",
	"offcanvas",
	"dynamic",
	"other",
];

const mrUtilsBreakpointsFeatures = [
	"display",
	"layout",
	"placement",
	"spacing",
	"text",
	"misc",
];

const mrUtilsStateFeatures = [
	"animations",
	"display",
	"layout",
	"spacing",
	"text",
	"misc",
];

/**
 * Adds custom icon
 */
const mrDevIcon = wp.element.createElement(
	"svg",
	{
		width: 20,
		height: 20,
	},
	wp.element.createElement("path", {
		d:
			"M11.361,13.455c0,0.252-0.51,0.456-1.141,0.456s-1.141-0.204-1.141-0.456c0-0.252,0.51-0.457,1.141-0.457   S11.361,13.203,11.361,13.455z M20.029,12.448c0,1.34-0.843,2.479-2.002,2.859c-1.487,2.854-4.476,4.697-7.792,4.697   c-3.313,0-6.299-1.837-7.786-4.686c-1.177-0.368-2.037-1.515-2.037-2.87c0-0.828,0.325-1.577,0.844-2.12   C0.89,9.954,0.612,9.477,0.451,8.916C0.177,7.969,0.26,6.904,0.686,5.918C1.194,4.739,2.13,3.852,3.18,3.485   c0.237-2.627,4.676-3.569,7.611-3.478c4.147,0.13,5.12,2.016,5.292,3.322c1.331,0.148,2.594,1.146,3.215,2.589   c0.424,0.986,0.509,2.051,0.236,2.998c-0.129,0.449-0.334,0.845-0.597,1.177C19.6,10.639,20.029,11.493,20.029,12.448z    M11.434,17.606l-0.216-0.967H9.236l-0.222,0.964c0.304-0.136,0.73-0.223,1.207-0.223C10.7,17.38,11.129,17.468,11.434,17.606z    M18.203,12.448c0-0.646-0.454-1.169-1.021-1.169c0,0-0.001,0-0.002,0c-0.155,0.25-0.333,0.489-0.534,0.718   c0.126-0.409,0.21-0.826,0.256-1.244c0-0.006-0.001-0.012-0.001-0.018c-0.595-0.317-1.205-1-1.625-1.901   c-0.438-0.939-0.562-1.886-0.395-2.549c-1.687,1.07-4.545,0.562-4.545,0.562c-1.71,0.114-2.167,2.281-2.167,2.281   C7.374,8.952,6.549,8.401,5.831,7.79C5.754,8.129,5.635,8.482,5.47,8.834c-0.489,1.05-1.237,1.805-1.917,2.026   c0.047,0.382,0.127,0.762,0.242,1.135c-0.202-0.229-0.379-0.468-0.534-0.718c-0.001,0-0.001-0.001-0.002-0.001   c-0.568,0-1.022,0.523-1.022,1.17c0,0.646,0.455,1.168,1.022,1.168c0.142,0,0.276-0.032,0.399-0.091   c0.124,0.361,0.279,0.708,0.459,1.038c1.016,0.359,2.496,1.069,3.199,2.279l0.304-1.321c0.095-0.414,0.464-0.708,0.889-0.708h3.44   c0.428,0,0.799,0.296,0.891,0.714l0.291,1.301c0.713-1.216,2.214-1.925,3.227-2.279c0.177-0.324,0.329-0.663,0.449-1.016   c0.115,0.051,0.241,0.083,0.373,0.083C17.749,13.616,18.203,13.092,18.203,12.448z M7.121,9.929c-0.566,0-1.027,0.46-1.027,1.026   s0.461,1.026,1.027,1.026s1.026-0.461,1.026-1.026S7.687,9.929,7.121,9.929z M13.32,9.929c-0.566,0-1.027,0.46-1.027,1.026   s0.461,1.026,1.027,1.026c0.565,0,1.026-0.461,1.026-1.026S13.885,9.929,13.32,9.929z",
	})
);

/**
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function mrAddAttributes(settings) {
	//check if object exists for old Gutenberg version compatibility
	//add mrAllowedBlocks restriction
	if (
		typeof settings.attributes !== "undefined" &&
		mrAllowedBlocks.includes(settings.name)
	) {
		settings.attributes = Object.assign(settings.attributes, {
			mrAnimation: {
				type: "string",
				default: "mr-",
			},
			mrAnimationhover: {
				type: "string",
				default: "mr-hover",
			},
			mrTransition: {
				type: "string",
				default: "mr-",
			},
			mrTransitionhover: {
				type: "string",
				default: "mr-hover",
			},
			mrPerPage: {
				type: "int",
				default: "",
			},
			mrPaginationPosition: {
				type: "int",
				default: "",
			},
			mrArrowPagination: {
				type: "boolean",
				default: false,
			},
			mrSelectPagination: {
				type: "boolean",
				default: false,
			},
			mrRadioPagination: {
				type: "boolean",
				default: false,
			},
			mrComponent: {
				type: "string",
				default: "mr-",
			},
			mrActiveWhen: {
				type: "string",
				default: "mr-",
			},
			mrNavPosition: {
				type: "string",
				default: "mr-",
			},
			mrPerLine: {
				type: "string",
				default: "mr-",
			},
			mrPerLinedesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPerLinelaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPerLinetablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPerLinephone: {
				type: "string",
				default: "mr-phone",
			},
			mrOrder: {
				type: "string",
				default: "mr-",
			},
			mrOrderdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrOrderlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrOrdertablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrOrderphone: {
				type: "string",
				default: "mr-phone",
			},
			mrDisplay: {
				type: "string",
				default: "mr-",
			},
			mrDisplayhover: {
				type: "string",
				default: "mr-hover",
			},
			mrDisplaydesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrDisplaylaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrDisplaytablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrDisplayphone: {
				type: "string",
				default: "mr-phone",
			},
			mrWrap: {
				type: "string",
				default: "mr-",
			},
			mrWrapdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrWraplaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrWraptablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrWrapphone: {
				type: "string",
				default: "mr-phone",
			},
			mrPaddingTop: {
				type: "string",
				default: "mr-",
			},
			mrPaddingTophover: {
				type: "string",
				default: "mr-hover",
			},
			mrPaddingTopdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPaddingToplaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPaddingToptablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPaddingTopphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomPaddingTop: {
				type: "string",
				default: "mr-paddingtop",
			},
			mrCustomPaddingTophover: {
				type: "string",
				default: "mr-hover-paddingtop",
			},
			mrCustomPaddingTopdesktop: {
				type: "string",
				default: "mr-desktop-paddingtop",
			},
			mrCustomPaddingToplaptop: {
				type: "string",
				default: "mr-laptop-paddingtop",
			},
			mrCustomPaddingToptablet: {
				type: "string",
				default: "mr-tablet-paddingtop",
			},
			mrCustomPaddingTopphone: {
				type: "string",
				default: "mr-phone-paddingtop",
			},
			mrPaddingRight: {
				type: "string",
				default: "mr-",
			},
			mrPaddingRighthover: {
				type: "string",
				default: "mr-hover",
			},
			mrPaddingRightdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPaddingRightlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPaddingRighttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPaddingRightphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomPaddingRight: {
				type: "string",
				default: "mr-paddingright",
			},
			mrCustomPaddingRighthover: {
				type: "string",
				default: "mr-hover-paddingright",
			},
			mrCustomPaddingRightdesktop: {
				type: "string",
				default: "mr-desktop-paddingright",
			},
			mrCustomPaddingRightlaptop: {
				type: "string",
				default: "mr-laptop-paddingright",
			},
			mrCustomPaddingRighttablet: {
				type: "string",
				default: "mr-tablet-paddingright",
			},
			mrCustomPaddingRightphone: {
				type: "string",
				default: "mr-phone-paddingright",
			},
			mrPaddingBottom: {
				type: "string",
				default: "mr-",
			},
			mrPaddingBottomhover: {
				type: "string",
				default: "mr-hover",
			},
			mrPaddingBottomdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPaddingBottomlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPaddingBottomtablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPaddingBottomphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomPaddingBottom: {
				type: "string",
				default: "mr-paddingbottom",
			},
			mrCustomPaddingBottomhover: {
				type: "string",
				default: "mr-hover-paddingbottom",
			},
			mrCustomPaddingBottomdesktop: {
				type: "string",
				default: "mr-desktop-paddingbottom",
			},
			mrCustomPaddingBottomlaptop: {
				type: "string",
				default: "mr-laptop-paddingbottom",
			},
			mrCustomPaddingBottomtablet: {
				type: "string",
				default: "mr-tablet-paddingbottom",
			},
			mrCustomPaddingBottomphone: {
				type: "string",
				default: "mr-phone-paddingbottom",
			},
			mrPaddingLeft: {
				type: "string",
				default: "mr-",
			},
			mrPaddingLefthover: {
				type: "string",
				default: "mr-hover",
			},
			mrPaddingLeftdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPaddingLeftlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPaddingLefttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPaddingLeftphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomPaddingLeft: {
				type: "string",
				default: "mr-paddingleft",
			},
			mrCustomPaddingLefthover: {
				type: "string",
				default: "mr-hover-paddingleft",
			},
			mrCustomPaddingLeftdesktop: {
				type: "string",
				default: "mr-desktop-paddingleft",
			},
			mrCustomPaddingLeftlaptop: {
				type: "string",
				default: "mr-laptop-paddingleft",
			},
			mrCustomPaddingLefttablet: {
				type: "string",
				default: "mr-tablet-paddingleft",
			},
			mrCustomPaddingLeftphone: {
				type: "string",
				default: "mr-phone-paddingleft",
			},
			mrMarginTop: {
				type: "string",
				default: "mr-",
			},
			mrMarginTophover: {
				type: "string",
				default: "mr-hover",
			},
			mrMarginTopdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrMarginToplaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrMarginToptablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrMarginTopphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomMarginTop: {
				type: "string",
				default: "mr-margintop",
			},
			mrCustomMarginTophover: {
				type: "string",
				default: "mr-hover-margintop",
			},
			mrCustomMarginTopdesktop: {
				type: "string",
				default: "mr-desktop-margintop",
			},
			mrCustomMarginToplaptop: {
				type: "string",
				default: "mr-laptop-margintop",
			},
			mrCustomMarginToptablet: {
				type: "string",
				default: "mr-tablet-margintop",
			},
			mrCustomMarginTopphone: {
				type: "string",
				default: "mr-phone-margintop",
			},
			mrMarginRight: {
				type: "string",
				default: "mr-",
			},
			mrMarginRighthover: {
				type: "string",
				default: "mr-hover",
			},
			mrMarginRightdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrMarginRightlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrMarginRighttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrMarginRightphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomMarginRight: {
				type: "string",
				default: "mr-marginright",
			},
			mrCustomMarginRighthover: {
				type: "string",
				default: "mr-hover-marginright",
			},
			mrCustomMarginRightdesktop: {
				type: "string",
				default: "mr-desktop-marginright",
			},
			mrCustomMarginRightlaptop: {
				type: "string",
				default: "mr-laptop-marginright",
			},
			mrCustomMarginRighttablet: {
				type: "string",
				default: "mr-tablet-marginright",
			},
			mrCustomMarginRightphone: {
				type: "string",
				default: "mr-phone-marginright",
			},
			mrMarginBottom: {
				type: "string",
				default: "mr-",
			},
			mrMarginBottomhover: {
				type: "string",
				default: "mr-hover",
			},
			mrMarginBottomdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrMarginBottomlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrMarginBottomtablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrMarginBottomphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomMarginBottom: {
				type: "string",
				default: "mr-marginbottom",
			},
			mrCustomMarginBottomhover: {
				type: "string",
				default: "mr-hover-marginbottom",
			},
			mrCustomMarginBottomdesktop: {
				type: "string",
				default: "mr-desktop-marginbottom",
			},
			mrCustomMarginBottomlaptop: {
				type: "string",
				default: "mr-laptop-marginbottom",
			},
			mrCustomMarginBottomtablet: {
				type: "string",
				default: "mr-tablet-marginbottom",
			},
			mrCustomMarginBottomphone: {
				type: "string",
				default: "mr-phone-marginbottom",
			},
			mrMarginLeft: {
				type: "string",
				default: "mr-",
			},
			mrMarginLefthover: {
				type: "string",
				default: "mr-hover",
			},
			mrMarginLeftdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrMarginLeftlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrMarginLefttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrMarginLeftphone: {
				type: "string",
				default: "mr-phone",
			},
			mrCustomMarginLeft: {
				type: "string",
				default: "mr-marginleft",
			},
			mrCustomMarginLefthover: {
				type: "string",
				default: "mr-hover-marginleft",
			},
			mrCustomMarginLeftdesktop: {
				type: "string",
				default: "mr-desktop-marginleft",
			},
			mrCustomMarginLeftlaptop: {
				type: "string",
				default: "mr-laptop-marginleft",
			},
			mrCustomMarginLefttablet: {
				type: "string",
				default: "mr-tablet-marginleft",
			},
			mrCustomMarginLeftphone: {
				type: "string",
				default: "mr-phone-marginleft",
			},
			mrPosition: {
				type: "string",
				default: "mr-",
			},
			mrPositiondesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPositionlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPositiontablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPositionphone: {
				type: "string",
				default: "mr-phone",
			},
			mrPositionAlignment: {
				type: "string",
				default: "mr-",
			},
			mrPositionAlignmentdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPositionAlignmentlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPositionAlignmenttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPositionAlignmentphone: {
				type: "string",
				default: "mr-phone",
			},
			mrPositionSides: {
				type: "string",
				default: "mr-",
			},
			mrPositionSidesdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrPositionSideslaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrPositionSidestablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrPositionSidesphone: {
				type: "string",
				default: "mr-phone",
			},
			mrContentAlignment: {
				type: "string",
				default: "mr-",
			},
			mrContentAlignmentdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrContentAlignmentlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrContentAlignmenttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrContentAlignmentphone: {
				type: "string",
				default: "mr-phone",
			},

			mrVerticalOffset: {
				type: "string",
				default: "mr-",
			},
			mrVerticalOffsetdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrVerticalOffsetlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrVerticalOffsettablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrVerticalOffsetphone: {
				type: "string",
				default: "mr-phone",
			},
			mrHorizontalOffset: {
				type: "string",
				default: "mr-",
			},
			mrHorizontalOffsetdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrHorizontalOffsetlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrHorizontalOffsettablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrHorizontalOffsetphone: {
				type: "string",
				default: "mr-phone",
			},
			mrSizeOptions: {
				type: "string",
				default: "mr-",
			},
			mrSizeOptionshover: {
				type: "string",
				default: "mr-hover",
			},
			mrSizeOptionsdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrSizeOptionslaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrSizeOptionstablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrSizeOptionsphone: {
				type: "string",
				default: "mr-phone",
			},
			mrSize: {
				type: "int",
				default: 0,
			},
			mrSizehover: {
				type: "int",
				default: 0,
			},
			mrSizedesktop: {
				type: "int",
				default: 0,
			},
			mrSizelaptop: {
				type: "int",
				default: 0,
			},
			mrSizetablet: {
				type: "int",
				default: 0,
			},
			mrSizephone: {
				type: "int",
				default: 0,
			},
			mrCustomSize: {
				type: "string",
				default: "",
			},
			mrCustomSizehover: {
				type: "string",
				default: "",
			},
			mrCustomSizedesktop: {
				type: "string",
				default: "",
			},
			mrCustomSizelaptop: {
				type: "string",
				default: "",
			},
			mrCustomSizetablet: {
				type: "string",
				default: "",
			},
			mrCustomSizephone: {
				type: "string",
				default: "",
			},
			mrFontSizeOptions: {
				type: "string",
				default: "mr-",
			},
			mrFontSizeOptionshover: {
				type: "string",
				default: "mr-hover",
			},
			mrFontSizeOptionsdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrFontSizeOptionslaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrFontSizeOptionstablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrFontSizeOptionsphone: {
				type: "string",
				default: "mr-phone",
			},
			mrFontSize: {
				type: "int",
				default: 0,
			},
			mrFontSizehover: {
				type: "int",
				default: 0,
			},
			mrFontSizedesktop: {
				type: "int",
				default: 0,
			},
			mrFontSizelaptop: {
				type: "int",
				default: 0,
			},
			mrFontSizetablet: {
				type: "int",
				default: 0,
			},
			mrFontSizephone: {
				type: "int",
				default: 0,
			},
			mrCustomFontSize: {
				type: "string",
				default: "",
			},
			mrCustomFontSizehover: {
				type: "string",
				default: "",
			},
			mrCustomFontSizedesktop: {
				type: "string",
				default: "",
			},
			mrCustomFontSizelaptop: {
				type: "string",
				default: "",
			},
			mrCustomFontSizetablet: {
				type: "string",
				default: "",
			},
			mrCustomFontSizephone: {
				type: "string",
				default: "",
			},
			mrTextAlignment: {
				type: "string",
				default: "mr-",
			},
			mrTextAlignmentdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrTextAlignmentlaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrTextAlignmenttablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrTextAlignmentphone: {
				type: "string",
				default: "mr-phone",
			},
			mrScroll: {
				type: "string",
				default: "mr-",
			},
			mrScrollhover: {
				type: "string",
				default: "mr-hover",
			},
			mrScrolldesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrScrolllaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrScrolltablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrScrollphone: {
				type: "string",
				default: "mr-phone",
			},
		});
	}

	return settings;
}

/**
 * Add Utilities controls.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const mrInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, isSelected } = props;

		const {
			mrAnimation,
			mrAnimationhover,
			mrTransition,
			mrTransitionhover,
			mrPerPage,
			mrPaginationPosition,
			mrComponent,
			mrActiveWhen,
			mrNavPosition,
			mrArrowPagination,
			mrSelectPagination,
			mrRadioPagination,
			mrPerLine,
			mrPerLinedesktop,
			mrPerLinelaptop,
			mrPerLinetablet,
			mrPerLinephone,
			mrOrder,
			mrOrderdesktop,
			mrOrderlaptop,
			mrOrdertablet,
			mrOrderphone,
			mrDisplay,
			mrDisplayhover,
			mrDisplaydesktop,
			mrDisplaylaptop,
			mrDisplaytablet,
			mrDisplayphone,
			mrWrap,
			mrWrapdesktop,
			mrWraplaptop,
			mrWraptablet,
			mrWrapphone,
			mrPaddingTop,
			mrPaddingTophover,
			mrPaddingTopdesktop,
			mrPaddingToplaptop,
			mrPaddingToptablet,
			mrPaddingTopphone,
			mrCustomPaddingTop,
			mrCustomPaddingTophover,
			mrCustomPaddingTopdesktop,
			mrCustomPaddingToplaptop,
			mrCustomPaddingToptablet,
			mrCustomPaddingTopphone,
			mrPaddingRight,
			mrPaddingRighthover,
			mrPaddingRightdesktop,
			mrPaddingRightlaptop,
			mrPaddingRighttablet,
			mrPaddingRightphone,
			mrCustomPaddingRight,
			mrCustomPaddingRighthover,
			mrCustomPaddingRightdesktop,
			mrCustomPaddingRightlaptop,
			mrCustomPaddingRighttablet,
			mrCustomPaddingRightphone,
			mrPaddingBottom,
			mrPaddingBottomhover,
			mrPaddingBottomdesktop,
			mrPaddingBottomlaptop,
			mrPaddingBottomtablet,
			mrPaddingBottomphone,
			mrCustomPaddingBottom,
			mrCustomPaddingBottomhover,
			mrCustomPaddingBottomdesktop,
			mrCustomPaddingBottomlaptop,
			mrCustomPaddingBottomtablet,
			mrCustomPaddingBottomphone,
			mrPaddingLeft,
			mrPaddingLefthover,
			mrPaddingLeftdesktop,
			mrPaddingLeftlaptop,
			mrPaddingLefttablet,
			mrPaddingLeftphone,
			mrCustomPaddingLeft,
			mrCustomPaddingLefthover,
			mrCustomPaddingLeftdesktop,
			mrCustomPaddingLeftlaptop,
			mrCustomPaddingLefttablet,
			mrCustomPaddingLeftphone,
			mrMarginTop,
			mrMarginTophover,
			mrMarginTopdesktop,
			mrMarginToplaptop,
			mrMarginToptablet,
			mrMarginTopphone,
			mrCustomMarginTop,
			mrCustomMarginTophover,
			mrCustomMarginTopdesktop,
			mrCustomMarginToplaptop,
			mrCustomMarginToptablet,
			mrCustomMarginTopphone,
			mrMarginRight,
			mrMarginRighthover,
			mrMarginRightdesktop,
			mrMarginRightlaptop,
			mrMarginRighttablet,
			mrMarginRightphone,
			mrCustomMarginRight,
			mrCustomMarginRighthover,
			mrCustomMarginRightdesktop,
			mrCustomMarginRightlaptop,
			mrCustomMarginRighttablet,
			mrCustomMarginRightphone,
			mrMarginBottom,
			mrMarginBottomhover,
			mrMarginBottomdesktop,
			mrMarginBottomlaptop,
			mrMarginBottomtablet,
			mrMarginBottomphone,
			mrCustomMarginBottom,
			mrCustomMarginBottomhover,
			mrCustomMarginBottomdesktop,
			mrCustomMarginBottomlaptop,
			mrCustomMarginBottomtablet,
			mrCustomMarginBottomphone,
			mrMarginLeft,
			mrMarginLefthover,
			mrMarginLeftdesktop,
			mrMarginLeftlaptop,
			mrMarginLefttablet,
			mrMarginLeftphone,
			mrCustomMarginLeft,
			mrCustomMarginLefthover,
			mrCustomMarginLeftdesktop,
			mrCustomMarginLeftlaptop,
			mrCustomMarginLefttablet,
			mrCustomMarginLeftphone,
			mrPosition,
			mrPositiondesktop,
			mrPositionlaptop,
			mrPositiontablet,
			mrPositionphone,
			mrPositionAlignment,
			mrPositionAlignmentdesktop,
			mrPositionAlignmentlaptop,
			mrPositionAlignmenttablet,
			mrPositionAlignmentphone,
			mrPositionSides,
			mrPositionSidesdesktop,
			mrPositionSideslaptop,
			mrPositionSidestablet,
			mrPositionSidesphone,
			mrContentAlignment,
			mrContentAlignmentdesktop,
			mrContentAlignmentlaptop,
			mrContentAlignmenttablet,
			mrContentAlignmentphone,
			mrVerticalOffset,
			mrVerticalOffsetdesktop,
			mrVerticalOffsetlaptop,
			mrVerticalOffsettablet,
			mrVerticalOffsetphone,
			mrHorizontalOffset,
			mrHorizontalOffsetdesktop,
			mrHorizontalOffsetlaptop,
			mrHorizontalOffsettablet,
			mrHorizontalOffsetphone,
			mrSizeOptions,
			mrSizeOptionshover,
			mrSizeOptionsdesktop,
			mrSizeOptionslaptop,
			mrSizeOptionstablet,
			mrSizeOptionsphone,
			mrSize,
			mrSizehover,
			mrSizedesktop,
			mrSizelaptop,
			mrSizetablet,
			mrSizephone,
			mrCustomSize,
			mrCustomSizehover,
			mrCustomSizedesktop,
			mrCustomSizelaptop,
			mrCustomSizetablet,
			mrCustomSizephone,
			mrFontSizeOptions,
			mrFontSizeOptionshover,
			mrFontSizeOptionsdesktop,
			mrFontSizeOptionslaptop,
			mrFontSizeOptionstablet,
			mrFontSizeOptionsphone,
			mrFontSize,
			mrFontSizehover,
			mrFontSizedesktop,
			mrFontSizelaptop,
			mrFontSizetablet,
			mrFontSizephone,
			mrCustomFontSize,
			mrCustomFontSizehover,
			mrCustomFontSizedesktop,
			mrCustomFontSizelaptop,
			mrCustomFontSizetablet,
			mrCustomFontSizephone,
			mrTextAlignment,
			mrTextAlignmentdesktop,
			mrTextAlignmentlaptop,
			mrTextAlignmenttablet,
			mrTextAlignmentphone,
			mrScroll,
			mrScrollhover,
			mrScrolldesktop,
			mrScrolllaptop,
			mrScrolltablet,
			mrScrollphone,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && mrAllowedBlocks.includes(name) && (
					<InspectorControls key="setting">
						<Panel header="">
							<PanelBody
								title={__("Utilities", "mr-utils")}
								initialOpen={false}
							>
								<TabPanel
									className="mr-backend-tabs"
									activeClass="is-active"
									tabs={[
										{
											name: "",
											title: settings,
											className: "mr-backend-tab mr-backend-tab_all",
										},
										{
											name: "hover",
											title: moveTo,
											className: "mr-backend-tab mr-backend-tab_hover",
										},
										{
											name: "desktop",
											title: aspectRatio,
											className: "mr-backend-tab mr-backend-tab_desktop",
										},
										{
											name: "laptop",
											title: desktop,
											className: "mr-backend-tab mr-backend-tab_laptop",
										},
										{
											name: "tablet",
											title: tablet,
											className: "mr-backend-tab mr-backend-tab_tablet",
										},
										{
											name: "phone",
											title: mobile,
											className: "mr-backend-tab mr-backend-tab_phone",
										},
										{
											name: "more",
											title: plus,
											className: "mr-backend-tab mr-backend-tab_more",
										},
									]}
								>
									{(tab) =>
										tab.name !== "more" ? (
											<>
												{tab.name === "" ? (
													<>
														<PanelBody
															icon={pages}
															title={tab.name + __(" Pagination", "mr-utils")}
															initialOpen={false}
															className="mr-backend-option mr-backend-option_utils_pagination"
														>
															<TextControl
																label={__(
																	"Number of items per page",
																	"mr-utils"
																)}
																value={mrPerPage}
																type="number"
																className="mr-backend-perpage"
																onChange={(val) =>
																	setAttributes({
																		mrPerPage:
																			val === undefined || val === 0 ? "" : val,
																	})
																}
																help={
																	mrPerPage > 0
																		? __(
																				"Pagination was applied but you need to preview the frontend to see the actual result.",
																				"mr-utils"
																		  )
																		: __(
																				"Apply into parent blocks (such as Columns and List blocks) to consider each direct child as a page's item.",
																				"mr-utils"
																		  )
																}
															/>
															{mrPerPage > 0 ? (
																<>
																	<SelectControl
																		label={__(
																			"Pagination position",
																			"mr-utils"
																		)}
																		value={mrPaginationPosition}
																		options={[
																			{
																				value: "mr-" + tab.name,
																				label: "Bottom",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-paginationtop"
																				).replace("--", "-"),
																				label: "Top",
																			},
																		]}
																		onChange={(val) =>
																			setAttributes({
																				mrPaginationPosition:
																					val === undefined || val === ""
																						? ""
																						: val.includes("mr-desktop") ||
																						  val.includes("mr-laptop") ||
																						  val.includes("mr-tablet") ||
																						  val.includes("mr-phone") ||
																						  val.includes("-hover-")
																						? mrPaginationPosition
																						: val.replace("--", "-"),
																			})
																		}
																	/>
																	<ToggleControl
																		label="Arrows"
																		checked={mrArrowPagination}
																		className="mr-backend-perpage"
																		onChange={() =>
																			setAttributes({
																				mrArrowPagination: !mrArrowPagination,
																			})
																		}
																	/>
																	<ToggleControl
																		label="Select dropdown"
																		checked={mrSelectPagination}
																		className="mr-backend-perpage"
																		onChange={() =>
																			setAttributes({
																				mrSelectPagination: !mrSelectPagination,
																			})
																		}
																	/>
																	<ToggleControl
																		label="Radio buttons"
																		checked={mrRadioPagination}
																		className="mr-backend-perpage"
																		onChange={() =>
																			setAttributes({
																				mrRadioPagination: !mrRadioPagination,
																			})
																		}
																	/>
																</>
															) : (
																""
															)}
														</PanelBody>
														<PanelBody
															icon={blockDefault}
															title={tab.name + __(" Components", "mr-utils")}
															initialOpen={false}
															className={
																tab.name === ""
																	? "mr-backend-option mr-backend-option_utils_components"
																	: "mr-backend-option mr-backend-option_utils_" +
																	  tab.name +
																	  "_components"
															}
														>
															<SelectControl
																label={__("Component", "mr-utils")}
																value={mrComponent}
																options={[
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-tabs"
																		).replace("--", "-"),
																		label: "Tabs",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-tabsnav"
																		).replace("--", "-"),
																		label: "Tabs Navigation",
																	},
																]}
																onChange={(val) =>
																	setAttributes({
																		mrComponent:
																			val === undefined || val === ""
																				? ""
																				: val.includes("mr-desktop") ||
																				  val.includes("mr-laptop") ||
																				  val.includes("mr-tablet") ||
																				  val.includes("mr-phone") ||
																				  val.includes("-hover-")
																				? mrComponent
																				: val.replace("--", "-"),
																	})
																}
																help={
																	mrComponent
																		? __(
																				"The component was applied but you need to preview the frontend to see the actual result.",
																				"mr-utils",
																				"mr-utils"
																		  )
																		: __(
																				"Apply into parent blocks (such as Columns and List blocks) to consider each direct child as a component item.",
																				"mr-utils"
																		  )
																}
															/>
															{mrComponent.includes("tabs") ? (
																<SelectControl
																	label={__("Navigation position", "mr-utils")}
																	value={mrNavPosition}
																	options={[
																		{ value: "mr-" + tab.name, label: "Top" },
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-navbottom"
																			).replace("--", "-"),
																			label: "Bottom",
																		},
																	]}
																	onChange={(val) =>
																		setAttributes({
																			mrNavPosition:
																				val === undefined || val === ""
																					? ""
																					: val.includes("mr-desktop") ||
																					  val.includes("mr-laptop") ||
																					  val.includes("mr-tablet") ||
																					  val.includes("mr-phone") ||
																					  val.includes("-hover-")
																					? mrNavPosition
																					: val.replace("--", "-"),
																		})
																	}
																/>
															) : (
																""
															)}
														</PanelBody>
													</>
												) : (
													""
												)}
												{tab.name === "" || tab.name === "hover" ? (
													<PanelBody
														icon={symbol}
														title={tab.name + __(" Animations", "mr-utils")}
														initialOpen={false}
														className={
															tab.name === ""
																? "mr-backend-option mr-backend-option_utils_animations"
																: "mr-backend-option mr-backend-option_utils_" +
																  tab.name +
																  "_animations"
														}
													>
														<SelectControl
															label={__("Animation", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrAnimationhover
																	: mrAnimation
															}
															options={[
																{ value: "mr-" + tab.name, label: "Default" },
																{
																	value: (" mr-" + tab.name + "-fade").replace(
																		"--",
																		"-"
																	),
																	label: "Fade",
																},
																{
																	value: (" mr-" + tab.name + "-slide").replace(
																		"--",
																		"-"
																	),
																	label: "Slide",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-slidetop"
																	).replace("--", "-"),
																	label: "Slide Top",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-slideright"
																	).replace("--", "-"),
																	label: "Slide Right",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-slidebottom"
																	).replace("--", "-"),
																	label: "Slide Bottom",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-slideleft"
																	).replace("--", "-"),
																	label: "Slide Left",
																},
																{
																	value: (" mr-" + tab.name + "-scale").replace(
																		"--",
																		"-"
																	),
																	label: "Scale",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-scaleright"
																	).replace("--", "-"),
																	label: "Scale Right",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-scaleleft"
																	).replace("--", "-"),
																	label: "Scale Left",
																},
																{
																	value: (" mr-" + tab.name + "-zoom").replace(
																		"--",
																		"-"
																	),
																	label: "Zoom",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-zoomright"
																	).replace("--", "-"),
																	label: "Zoom Right",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-zoomleft"
																	).replace("--", "-"),
																	label: "Zoom Left",
																},
															]}
															onChange={(val) =>
																setAttributes({
																	mrAnimation:
																		val === undefined || val === ""
																			? ""
																			: val.includes("mr-desktop") ||
																			  val.includes("mr-laptop") ||
																			  val.includes("mr-tablet") ||
																			  val.includes("mr-phone") ||
																			  val.includes("-hover-")
																			? mrAnimation
																			: val.replace("--", "-"),
																	mrAnimationhover:
																		val !== undefined && val.includes("-hover-")
																			? val
																			: mrAnimationhover,
																})
															}
														/>
														<SelectControl
															label={__("Transition", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrTransitionhover
																	: mrTransition
															}
															options={[
																{ value: "mr-" + tab.name, label: "Default" },
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-transition"
																	).replace("--", "-"),
																	label: "Ease",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-easeinout"
																	).replace("--", "-"),
																	label: "Ease In Out",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-easein"
																	).replace("--", "-"),
																	label: "Ease In",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-easeout"
																	).replace("--", "-"),
																	label: "Ease Out",
																},
																{
																	value: (
																		" mr-" +
																		tab.name +
																		"-linear"
																	).replace("--", "-"),
																	label: "Linear",
																},
															]}
															onChange={(val) =>
																setAttributes({
																	mrTransition:
																		val !== undefined &&
																		!val.includes("mr-hover") &&
																		!val.includes("mr-desktop") &&
																		!val.includes("mr-laptop") &&
																		!val.includes("mr-tablet") &&
																		!val.includes("mr-phone")
																			? val
																			: mrTransition,
																	mrTransitionhover:
																		val !== undefined && val.includes("-hover-")
																			? val
																			: mrTransitionhover,
																})
															}
														/>
													</PanelBody>
												) : (
													""
												)}
												{tab.name === "" ? (
													<>
														<PanelBody
															icon={replace}
															title={tab.name + __(" Dynamic", "mr-utils")}
															initialOpen={false}
															className={
																tab.name === ""
																	? "mr-backend-option mr-backend-option_utils_dynamic"
																	: "mr-backend-option mr-backend-option_utils_" +
																	  tab.name +
																	  "_dynamic"
															}
														>
															<SelectControl
																label={__("Active when:", "mr-utils")}
																value={mrActiveWhen}
																options={[
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-activeinview"
																		).replace("--", "-"),
																		label: "In view",
																	},
																]}
																onChange={(val) =>
																	setAttributes({
																		mrActiveWhen:
																			val === undefined || val === ""
																				? ""
																				: val.includes("mr-desktop") ||
																				  val.includes("mr-laptop") ||
																				  val.includes("mr-tablet") ||
																				  val.includes("mr-phone") ||
																				  val.includes("-hover-")
																				? mrActiveWhen
																				: val.replace("--", "-"),
																	})
																}
																help={
																	mrActiveWhen
																		? __(
																				"The task is ready but you need to preview the frontend to see the actual result.",
																				"mr-utils",
																				"mr-utils"
																		  )
																		: __(
																				"Adds the class 'mr-active' depending of the selected situation. You can combine with animations to decide when the animation should start.",
																				"mr-utils"
																		  )
																}
															/>
														</PanelBody>
													</>
												) : (
													""
												)}
												<PanelBody
													icon={layout}
													title={tab.name + __(" Layout", "mr-utils")}
													initialOpen={false}
													className={
														tab.name === ""
															? "mr-backend-option mr-backend-option_utils_layout"
															: "mr-backend-option mr-backend-option_utils_" +
															  tab.name +
															  "_layout"
													}
												>
													<SelectControl
														label={__("Number of items per line", "mr-utils")}
														value={
															tab.name === "desktop"
																? mrPerLinedesktop
																: tab.name === "laptop"
																? mrPerLinelaptop
																: tab.name === "tablet"
																? mrPerLinetablet
																: tab.name === "phone"
																? mrPerLinephone
																: mrPerLine
														}
														options={
															tab.name === "" ||
															tab.name === "desktop" ||
															tab.name === "laptop" ||
															tab.name === "tablet" ||
															tab.name === "phone"
																? [
																		{ value: "mr-" + tab.name, label: "" },
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-1perline"
																			).replace("--", "-"),
																			label: "1",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-2perline"
																			).replace("--", "-"),
																			label: "2",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-3perline"
																			).replace("--", "-"),
																			label: "3",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-4perline"
																			).replace("--", "-"),
																			label: "4",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-5perline"
																			).replace("--", "-"),
																			label: "5",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-6perline"
																			).replace("--", "-"),
																			label: "6",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-7perline"
																			).replace("--", "-"),
																			label: "7",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-8perline"
																			).replace("--", "-"),
																			label: "8",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-9perline"
																			).replace("--", "-"),
																			label: "9",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-10perline"
																			).replace("--", "-"),
																			label: "10",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-11perline"
																			).replace("--", "-"),
																			label: "11",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-12perline"
																			).replace("--", "-"),
																			label: "12",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-0perline"
																			).replace("--", "-"),
																			label: "∞",
																		},
																  ]
																: ""
														}
														onChange={(val) =>
															setAttributes({
																mrPerLine:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrPerLine,
																mrPerLinelaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrPerLinelaptop,
																mrPerLinetablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrPerLinetablet,
																mrPerLinephone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrPerLinephone,
															})
														}
														help={
															mrPerLine === undefined || mrPerLine === ""
																? "Apply into parent blocks (such as Columns and List blocks) to consider each direct child as a line's item."
																: ""
														}
													/>
													<SelectControl
														label={__("Wrap", "mr-utils")}
														value={
															tab.name === "desktop"
																? mrWrapdesktop
																: tab.name === "laptop"
																? mrWraplaptop
																: tab.name === "tablet"
																? mrWraptablet
																: tab.name === "phone"
																? mrWrapphone
																: mrWrap
														}
														options={
															tab.name === "" ||
															tab.name === "desktop" ||
															tab.name === "laptop" ||
															tab.name === "tablet" ||
															tab.name === "phone"
																? [
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-wrap"
																			).replace("--", "-"),
																			label: "Wrap",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-nowrap"
																			).replace("--", "-"),
																			label: "No Wrap",
																		},
																  ]
																: ""
														}
														onChange={(val) =>
															setAttributes({
																mrWrap:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrWrap,
																mrWrapdesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrWrapdesktop,
																mrWraplaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrWraplaptop,
																mrWraptablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrWraptablet,
																mrWrapphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrWrapphone,
															})
														}
													/>
													<SelectControl
														label={__("Item Size", "mr-utils")}
														value={
															tab.name === "hover"
																? mrSizeOptionshover
																: tab.name === "desktop"
																? mrSizeOptionsdesktop
																: tab.name === "laptop"
																? mrSizeOptionslaptop
																: tab.name === "tablet"
																? mrSizeOptionstablet
																: tab.name === "phone"
																? mrSizeOptionsphone
																: mrSizeOptions
														}
														className="mr-backend-itemsize mr-backend-hascustomoption"
														options={[
															{
																value: "mr-" + tab.name,
																label: "Use a default " + tab.name + " class",
															},
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-sizeoptions"
																).replace("--", "-"),
																label: "Use a custom " + tab.name + " class",
															},
														]}
														onChange={(val) =>
															setAttributes({
																mrSizeOptions:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrSizeOptions,
																mrSizeOptionshover:
																	val !== undefined && val.includes("mr-hover")
																		? val
																		: mrSizeOptionshover,
																mrSizeOptionsdesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrSizeOptionsdesktop,
																mrSizeOptionslaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrSizeOptionslaptop,
																mrSizeOptionstablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrSizeOptionstablet,
																mrSizeOptionsphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrSizeOptionsphone,
															})
														}
													/>

													{(tab.name === "" && mrSizeOptions === "mr-") ||
													(tab.name === "hover" &&
														mrSizeOptionshover === "mr-hover") ||
													(tab.name === "desktop" &&
														mrSizeOptionsdesktop === "mr-desktop") ||
													(tab.name === "laptop" &&
														mrSizeOptionslaptop === "mr-laptop") ||
													(tab.name === "tablet" &&
														mrSizeOptionstablet === "mr-tablet") ||
													(tab.name === "phone" &&
														mrSizeOptionsphone === "mr-phone") ? (
														<RangeControl
															label={__("", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrSizehover
																	: tab.name === "desktop"
																	? mrSizedesktop
																	: tab.name === "laptop"
																	? mrSizelaptop
																	: tab.name === "tablet"
																	? mrSizetablet
																	: tab.name === "phone"
																	? mrSizephone
																	: mrSize
															}
															initialPosition={0}
															allowReset={true}
															min={0}
															max={13}
															onChange={(val) =>
																setAttributes({
																	mrSize:
																		tab.name === ""
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSize,
																	mrSizehover:
																		tab.name === "hover"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSizehover,
																	mrSizedesktop:
																		tab.name === "desktop"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSizedesktop,
																	mrSizelaptop:
																		tab.name === "laptop"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSizelaptop,
																	mrSizetablet:
																		tab.name === "tablet"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSizetablet,
																	mrSizephone:
																		tab.name === "phone"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrSizephone,
																})
															}
															help={
																tab.name == "" && mrSize > 0
																	? "mr-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: tab.name == "hover" && mrSizehover > 0
																	? "mr-hover-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: tab.name == "desktop" && mrSizedesktop > 0
																	? "mr-desktop-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: tab.name == "laptop" && mrSizelaptop > 0
																	? "mr-laptop-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: tab.name == "tablet" && mrSizetablet
																	? "mr-tablet-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: tab.name == "phone" && mrSizephone > 0
																	? "mr-phone-size" +
																	  mrSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue("--size-" + mrSize)
																	: ""
															}
														/>
													) : (
														""
													)}
													{(tab.name === "" &&
														mrSizeOptions.includes("-sizeoptions")) ||
													(tab.name === "hover" &&
														mrSizeOptionshover.includes("-sizeoptions")) ||
													(tab.name === "desktop" &&
														mrSizeOptionsdesktop.includes("-sizeoptions")) ||
													(tab.name === "laptop" &&
														mrSizeOptionslaptop.includes("-sizeoptions")) ||
													(tab.name === "tablet" &&
														mrSizeOptionstablet.includes("-sizeoptions")) ||
													(tab.name === "phone" &&
														mrSizeOptionsphone.includes("-sizeoptions")) ? (
														<TextControl
															label={__("", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrCustomSizehover
																	: tab.name === "desktop"
																	? mrCustomSizedesktop
																	: tab.name === "laptop"
																	? mrCustomSizelaptop
																	: tab.name === "tablet"
																	? mrCustomSizetablet
																	: tab.name === "phone"
																	? mrCustomSizephone
																	: mrCustomSize
															}
															type="text"
															className="mr-backend-custominput mr-backend-customptop"
															placeHolder={(
																"mr-" +
																tab.name +
																"-size{1/13}"
															).replace("--", "-")}
															list={(
																"mrDevUtilsClasses_" +
																tab.name +
																"_size"
															).replace("__", "_")}
															onChange={(val) =>
																setAttributes({
																	mrCustomSize:
																		val !== undefined &&
																		!val.includes("mr-hover") &&
																		!val.includes("mr-desktop") &&
																		!val.includes("mr-laptop") &&
																		!val.includes("mr-tablet") &&
																		!val.includes("mr-phone")
																			? val
																			: mrCustomSize,
																	mrCustomSizehover:
																		val !== undefined &&
																		val.includes("mr-hover")
																			? val
																			: mrCustomSizehover,
																	mrCustomSizedesktop:
																		val !== undefined &&
																		val.includes("mr-desktop")
																			? val
																			: mrCustomSizedesktop,
																	mrCustomSizelaptop:
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrCustomSizelaptop,
																	mrCustomSizetablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrCustomSizetablet,
																	mrCustomSizephone:
																		val !== undefined &&
																		val.includes("mr-phone")
																			? val
																			: mrCustomSizephone,
																})
															}
														/>
													) : (
														""
													)}
													<SelectControl
														label={__("Item order", "mr-utils")}
														value={
															tab.name === "desktop"
																? mrOrderdesktop
																: tab.name === "laptop"
																? mrOrderlaptop
																: tab.name === "tablet"
																? mrOrdertablet
																: tab.name === "phone"
																? mrOrderphone
																: mrOrder
														}
														options={
															tab.name === "" ||
															tab.name === "desktop" ||
															tab.name === "laptop" ||
															tab.name === "tablet" ||
															tab.name === "phone"
																? [
																		{ value: "mr-" + tab.name, label: "" },
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order-1"
																			).replace("--", "-"),
																			label: "-1",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order1"
																			).replace("--", "-"),
																			label: "1",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order2"
																			).replace("--", "-"),
																			label: "2",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order3"
																			).replace("--", "-"),
																			label: "3",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order4"
																			).replace("--", "-"),
																			label: "4",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order5"
																			).replace("--", "-"),
																			label: "5",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order6"
																			).replace("--", "-"),
																			label: "6",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order7"
																			).replace("--", "-"),
																			label: "7",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order8"
																			).replace("--", "-"),
																			label: "8",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order9"
																			).replace("--", "-"),
																			label: "9",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order10"
																			).replace("--", "-"),
																			label: "10",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order11"
																			).replace("--", "-"),
																			label: "11",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-order12"
																			).replace("--", "-"),
																			label: "12",
																		},
																  ]
																: ""
														}
														onChange={(val) =>
															setAttributes({
																mrOrder:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrOrder,
																mrOrderdesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrOrderdesktop,
																mrOrderlaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrOrderlaptop,
																mrOrdertablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrOrdertablet,
																mrOrderphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrOrderphone,
															})
														}
													/>
												</PanelBody>
												<PanelBody
													icon={swatch}
													title={tab.name + __(" Display", "mr-utils")}
													initialOpen={false}
													className={
														tab.name === ""
															? "mr-backend-option mr-backend-option_utils_display"
															: "mr-backend-option mr-backend-option_utils_" +
															  tab.name +
															  "_display"
													}
												>
													<SelectControl
														label={__("Visibility", "mr-utils")}
														value={
															tab.name === "hover"
																? mrDisplayhover
																: tab.name === "desktop"
																? mrDisplaydesktop
																: tab.name === "laptop"
																? mrDisplaylaptop
																: tab.name === "tablet"
																? mrDisplaytablet
																: tab.name === "phone"
																? mrDisplayphone
																: mrDisplay
														}
														options={[
															{ value: "mr-" + tab.name, label: "Default" },
															{
																value: (" mr-" + tab.name + "-hide").replace(
																	"--",
																	"-"
																),
																label: "Hide",
															},
															{
																value: (" mr-" + tab.name + "-show").replace(
																	"--",
																	"-"
																),
																label: "Show",
															},
															{
																value: (" mr-" + tab.name + "-none").replace(
																	"--",
																	"-"
																),
																label: "None",
															},
															{
																value: (" mr-" + tab.name + "-flex").replace(
																	"--",
																	"-"
																),
																label: "Flex",
															},
															{
																value: (" mr-" + tab.name + "-block").replace(
																	"--",
																	"-"
																),
																label: "Block",
															},
															{
																value: (" mr-" + tab.name + "-visible").replace(
																	"--",
																	"-"
																),
																label: "Visible",
															},
															{
																value: (" mr-" + tab.name + "-hidden").replace(
																	"--",
																	"-"
																),
																label: "Hidden",
															},
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-transparent"
																).replace("--", "-"),
																label: "Transparent",
															},
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-semiopaque"
																).replace("--", "-"),
																label: "Semi-opaque",
															},
															{
																value: (" mr-" + tab.name + "-opaque").replace(
																	"--",
																	"-"
																),
																label: "Opaque",
															},
														]}
														onChange={(val) =>
															setAttributes({
																mrDisplay:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrDisplay,
																mrDisplayhover:
																	val !== undefined && val.includes("-hover-")
																		? val
																		: mrDisplayhover,
																mrDisplaydesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrDisplaydesktop,
																mrDisplaylaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrDisplaylaptop,
																mrDisplaytablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrDisplaytablet,
																mrDisplayphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrDisplayphone,
															})
														}
														help={
															mrDisplay === " mr-hidden" ||
															mrDisplay === " mr-hide" ||
															mrDisplay === " mr-none" ||
															mrDisplay === " mr-transparent" ||
															mrDisplayhover === " mr-hover-hidden" ||
															mrDisplayhover === " mr-hover-hide" ||
															mrDisplayhover === " mr-hover-none" ||
															mrDisplaydesktop === " mr-desktop-hidden" ||
															mrDisplaydesktop === " mr-desktop-hide" ||
															mrDisplaydesktop === " mr-desktop-none" ||
															mrDisplaydesktop === " mr-desktop-transparent" ||
															mrDisplaylaptop === " mr-laptop-hidden" ||
															mrDisplaylaptop === " mr-laptop-hide" ||
															mrDisplaylaptop === " mr-laptop-none" ||
															mrDisplaylaptop === " mr-laptop-transparent" ||
															mrDisplaytablet === " mr-tablet-hidden" ||
															mrDisplaytablet === " mr-tablet-hide" ||
															mrDisplaytablet === " mr-tablet-none" ||
															mrDisplaytablet === " mr-tablet-transparent" ||
															mrDisplayphone === " mr-phone-hidden" ||
															mrDisplayphone === " mr-phone-hide" ||
															mrDisplayphone === " mr-phone-none" ||
															mrDisplayphone === " mr-phone-transparent" ? (
																__(
																	"An opacity is applied to the block in the backend so you can still see and select it. Preview the frontend to see the actual result.",
																	"mr-utils"
																)
															) : (
																<a
																	href="https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes#display"
																	target="_blank"
																>
																	Know the differences between visibilities
																</a>
															)
														}
													/>
												</PanelBody>
												<PanelBody
													icon={resizeCornerNE}
													title={tab.name + __(" Spacing", "mr-utils")}
													initialOpen={false}
													className={
														tab.name === ""
															? "mr-backend-option mr-backend-option_utils_spacing"
															: "mr-backend-option mr-backend-option_utils_" +
															  tab.name +
															  "_spacing"
													}
												>
													<PanelRow>
														<TabPanel
															className="mr-width100"
															activeClass="is-active"
															tabs={[
																{
																	name: "paddings",
																	title: "Paddings",
																	className:
																		"mr-backend-tab_paddings mr-width100",
																},
																{
																	name: "margins",
																	title: "Margins",
																	className:
																		"mr-backend-tab_margins mr-width100",
																},
															]}
														>
															{(tab2) =>
																tab2.name === "paddings" ? (
																	<>
																		<p></p>
																		<SelectControl
																			label={__("Padding Top", "mr-utils")}
																			className="mr-backend-padding mr-backend-paddingtop mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrPaddingTophover
																					: tab.name === "desktop"
																					? mrPaddingTopdesktop
																					: tab.name === "laptop"
																					? mrPaddingToplaptop
																					: tab.name === "tablet"
																					? mrPaddingToptablet
																					: tab.name === "phone"
																					? mrPaddingTopphone
																					: mrPaddingTop
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nopaddingtop"
																					).replace("--", "-"),
																					label: "Remove padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-paddingtop"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrPaddingTop:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrPaddingTop,
																					mrPaddingTophover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrPaddingTophover,
																					mrPaddingTopdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrPaddingTopdesktop,
																					mrPaddingToplaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrPaddingToplaptop,
																					mrPaddingToptablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrPaddingToptablet,
																					mrPaddingTopphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrPaddingTopphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrPaddingTop.includes("-paddingtop")) ||
																		(tab.name === "hover" &&
																			mrPaddingTophover.includes(
																				"-paddingtop"
																			)) ||
																		(tab.name === "desktop" &&
																			mrPaddingTopdesktop.includes(
																				"-paddingtop"
																			)) ||
																		(tab.name === "laptop" &&
																			mrPaddingToplaptop.includes(
																				"-paddingtop"
																			)) ||
																		(tab.name === "tablet" &&
																			mrPaddingToptablet.includes(
																				"-paddingtop"
																			)) ||
																		(tab.name === "phone" &&
																			mrPaddingTopphone.includes(
																				"-paddingtop"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomPaddingTophover
																						: tab.name === "desktop"
																						? mrCustomPaddingTopdesktop
																						: tab.name === "laptop"
																						? mrCustomPaddingToplaptop
																						: tab.name === "tablet"
																						? mrCustomPaddingToptablet
																						: tab.name === "phone"
																						? mrCustomPaddingTopphone
																						: mrCustomPaddingTop
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-paddingtop"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_paddingtop"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomPaddingTop:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomPaddingTop,
																						mrCustomPaddingTophover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomPaddingTophover,
																						mrCustomPaddingTopdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomPaddingTopdesktop,
																						mrCustomPaddingToplaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomPaddingToplaptop,
																						mrCustomPaddingToptablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomPaddingToptablet,
																						mrCustomPaddingTopphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomPaddingTopphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Padding Right", "mr-utils")}
																			className="mr-backend-padding mr-backend-paddingright mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrPaddingRighthover
																					: tab.name === "desktop"
																					? mrPaddingRightdesktop
																					: tab.name === "laptop"
																					? mrPaddingRightlaptop
																					: tab.name === "tablet"
																					? mrPaddingRighttablet
																					: tab.name === "phone"
																					? mrPaddingRightphone
																					: mrPaddingRight
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nopaddingright"
																					).replace("--", "-"),
																					label: "Remove padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-paddingright"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrPaddingRight:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrPaddingRight,
																					mrPaddingRighthover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrPaddingRighthover,
																					mrPaddingRightdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrPaddingRightdesktop,
																					mrPaddingRightlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrPaddingRightlaptop,
																					mrPaddingRighttablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrPaddingRighttablet,
																					mrPaddingRightphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrPaddingRightphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrPaddingRight.includes(
																				"-paddingright"
																			)) ||
																		(tab.name === "hover" &&
																			mrPaddingRighthover.includes(
																				"-paddingright"
																			)) ||
																		(tab.name === "desktop" &&
																			mrPaddingRightdesktop.includes(
																				"-paddingright"
																			)) ||
																		(tab.name === "laptop" &&
																			mrPaddingRightlaptop.includes(
																				"-paddingright"
																			)) ||
																		(tab.name === "tablet" &&
																			mrPaddingRighttablet.includes(
																				"-paddingright"
																			)) ||
																		(tab.name === "phone" &&
																			mrPaddingRightphone.includes(
																				"-paddingright"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomPaddingRighthover
																						: tab.name === "desktop"
																						? mrCustomPaddingRightdesktop
																						: tab.name === "laptop"
																						? mrCustomPaddingRightlaptop
																						: tab.name === "tablet"
																						? mrCustomPaddingRighttablet
																						: tab.name === "phone"
																						? mrCustomPaddingRightphone
																						: mrCustomPaddingRight
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-paddingright"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_paddingright"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomPaddingRight:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomPaddingRight,
																						mrCustomPaddingRighthover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomPaddingRighthover,
																						mrCustomPaddingRightdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomPaddingRightdesktop,
																						mrCustomPaddingRightlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomPaddingRightlaptop,
																						mrCustomPaddingRighttablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomPaddingRighttablet,
																						mrCustomPaddingRightphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomPaddingRightphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Padding Bottom", "mr-utils")}
																			className="mr-backend-padding mr-backend-paddingbottom mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrPaddingBottomhover
																					: tab.name === "desktop"
																					? mrPaddingBottomdesktop
																					: tab.name === "laptop"
																					? mrPaddingBottomlaptop
																					: tab.name === "tablet"
																					? mrPaddingBottomtablet
																					: tab.name === "phone"
																					? mrPaddingBottomphone
																					: mrPaddingBottom
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nopaddingbottom"
																					).replace("--", "-"),
																					label: "Remove padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-paddingbottom"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrPaddingBottom:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrPaddingBottom,
																					mrPaddingBottomhover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrPaddingBottomhover,
																					mrPaddingBottomdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrPaddingBottomdesktop,
																					mrPaddingBottomlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrPaddingBottomlaptop,
																					mrPaddingBottomtablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrPaddingBottomtablet,
																					mrPaddingBottomphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrPaddingBottomphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrPaddingBottom.includes(
																				"-paddingbottom"
																			)) ||
																		(tab.name === "hover" &&
																			mrPaddingBottomhover.includes(
																				"-paddingbottom"
																			)) ||
																		(tab.name === "desktop" &&
																			mrPaddingBottomdesktop.includes(
																				"-paddingbottom"
																			)) ||
																		(tab.name === "laptop" &&
																			mrPaddingBottomlaptop.includes(
																				"-paddingbottom"
																			)) ||
																		(tab.name === "tablet" &&
																			mrPaddingBottomtablet.includes(
																				"-paddingbottom"
																			)) ||
																		(tab.name === "phone" &&
																			mrPaddingBottomphone.includes(
																				"-paddingbottom"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomPaddingBottomhover
																						: tab.name === "desktop"
																						? mrCustomPaddingBottomdesktop
																						: tab.name === "laptop"
																						? mrCustomPaddingBottomlaptop
																						: tab.name === "tablet"
																						? mrCustomPaddingBottomtablet
																						: tab.name === "phone"
																						? mrCustomPaddingBottomphone
																						: mrCustomPaddingBottom
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-paddingbottom"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_paddingbottom"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomPaddingBottom:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomPaddingBottom,
																						mrCustomPaddingBottomhover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomPaddingBottomhover,
																						mrCustomPaddingBottomdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomPaddingBottomdesktop,
																						mrCustomPaddingBottomlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomPaddingBottomlaptop,
																						mrCustomPaddingBottomtablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomPaddingBottomtablet,
																						mrCustomPaddingBottomphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomPaddingBottomphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Padding Left", "mr-utils")}
																			className="mr-backend-padding mr-backend-paddingleft mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrPaddingLefthover
																					: tab.name === "desktop"
																					? mrPaddingLeftdesktop
																					: tab.name === "laptop"
																					? mrPaddingLeftlaptop
																					: tab.name === "tablet"
																					? mrPaddingLefttablet
																					: tab.name === "phone"
																					? mrPaddingLeftphone
																					: mrPaddingLeft
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nopaddingleft"
																					).replace("--", "-"),
																					label: "Remove padding",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-paddingleft"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrPaddingLeft:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrPaddingLeft,
																					mrPaddingLefthover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrPaddingLefthover,
																					mrPaddingLeftdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrPaddingLeftdesktop,
																					mrPaddingLeftlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrPaddingLeftlaptop,
																					mrPaddingLefttablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrPaddingLefttablet,
																					mrPaddingLeftphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrPaddingLeftphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrPaddingLeft.includes("-paddingleft")) ||
																		(tab.name === "hover" &&
																			mrPaddingLefthover.includes(
																				"-paddingleft"
																			)) ||
																		(tab.name === "desktop" &&
																			mrPaddingLeftdesktop.includes(
																				"-paddingleft"
																			)) ||
																		(tab.name === "laptop" &&
																			mrPaddingLeftlaptop.includes(
																				"-paddingleft"
																			)) ||
																		(tab.name === "tablet" &&
																			mrPaddingLefttablet.includes(
																				"-paddingleft"
																			)) ||
																		(tab.name === "phone" &&
																			mrPaddingLeftphone.includes(
																				"-paddingleft"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomPaddingLefthover
																						: tab.name === "desktop"
																						? mrCustomPaddingLeftdesktop
																						: tab.name === "laptop"
																						? mrCustomPaddingLeftlaptop
																						: tab.name === "tablet"
																						? mrCustomPaddingLefttablet
																						: tab.name === "phone"
																						? mrCustomPaddingLeftphone
																						: mrCustomPaddingLeft
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-paddingleft"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_paddingleft"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomPaddingLeft:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomPaddingLeft,
																						mrCustomPaddingLefthover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomPaddingLefthover,
																						mrCustomPaddingLeftdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomPaddingLeftdesktop,
																						mrCustomPaddingLeftlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomPaddingLeftlaptop,
																						mrCustomPaddingLefttablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomPaddingLefttablet,
																						mrCustomPaddingLeftphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomPaddingLeftphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}
																	</>
																) : (
																	<>
																		<p></p>
																		<SelectControl
																			label={__("Margin Top", "mr-utils")}
																			className="mr-backend-margin mr-backend-margintop mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrMarginTophover
																					: tab.name === "desktop"
																					? mrMarginTopdesktop
																					: tab.name === "laptop"
																					? mrMarginToplaptop
																					: tab.name === "tablet"
																					? mrMarginToptablet
																					: tab.name === "phone"
																					? mrMarginTopphone
																					: mrMarginTop
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nomargintop"
																					).replace("--", "-"),
																					label: "Remove margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-margintop"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrMarginTop:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrMarginTop,
																					mrMarginTophover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrMarginTophover,
																					mrMarginTopdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrMarginTopdesktop,
																					mrMarginToplaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrMarginToplaptop,
																					mrMarginToptablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrMarginToptablet,
																					mrMarginTopphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrMarginTopphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrMarginTop.includes("-margintop")) ||
																		(tab.name === "hover" &&
																			mrMarginTophover.includes(
																				"-margintop"
																			)) ||
																		(tab.name === "desktop" &&
																			mrMarginTopdesktop.includes(
																				"-margintop"
																			)) ||
																		(tab.name === "laptop" &&
																			mrMarginToplaptop.includes(
																				"-margintop"
																			)) ||
																		(tab.name === "tablet" &&
																			mrMarginToptablet.includes(
																				"-margintop"
																			)) ||
																		(tab.name === "phone" &&
																			mrMarginTopphone.includes(
																				"-margintop"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomMarginTophover
																						: tab.name === "desktop"
																						? mrCustomMarginTopdesktop
																						: tab.name === "laptop"
																						? mrCustomMarginToplaptop
																						: tab.name === "tablet"
																						? mrCustomMarginToptablet
																						: tab.name === "phone"
																						? mrCustomMarginTopphone
																						: mrCustomMarginTop
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-margintop"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_margintop"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomMarginTop:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomMarginTop,
																						mrCustomMarginTophover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomMarginTophover,
																						mrCustomMarginTopdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomMarginTopdesktop,
																						mrCustomMarginToplaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomMarginToplaptop,
																						mrCustomMarginToptablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomMarginToptablet,
																						mrCustomMarginTopphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomMarginTopphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Margin Right", "mr-utils")}
																			className="mr-backend-margin mr-backend-marginright mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrMarginRighthover
																					: tab.name === "desktop"
																					? mrMarginRightdesktop
																					: tab.name === "laptop"
																					? mrMarginRightlaptop
																					: tab.name === "tablet"
																					? mrMarginRighttablet
																					: tab.name === "phone"
																					? mrMarginRightphone
																					: mrMarginRight
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nomarginright"
																					).replace("--", "-"),
																					label: "Remove margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-marginright"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrMarginRight:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrMarginRight,
																					mrMarginRighthover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrMarginRighthover,
																					mrMarginRightdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrMarginRightdesktop,
																					mrMarginRightlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrMarginRightlaptop,
																					mrMarginRighttablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrMarginRighttablet,
																					mrMarginRightphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrMarginRightphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrMarginRight.includes("-marginright")) ||
																		(tab.name === "hover" &&
																			mrMarginRighthover.includes(
																				"-marginright"
																			)) ||
																		(tab.name === "desktop" &&
																			mrMarginRightdesktop.includes(
																				"-marginright"
																			)) ||
																		(tab.name === "laptop" &&
																			mrMarginRightlaptop.includes(
																				"-marginright"
																			)) ||
																		(tab.name === "tablet" &&
																			mrMarginRighttablet.includes(
																				"-marginright"
																			)) ||
																		(tab.name === "phone" &&
																			mrMarginRightphone.includes(
																				"-marginright"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomMarginRighthover
																						: tab.name === "desktop"
																						? mrCustomMarginRightdesktop
																						: tab.name === "laptop"
																						? mrCustomMarginRightlaptop
																						: tab.name === "tablet"
																						? mrCustomMarginRighttablet
																						: tab.name === "phone"
																						? mrCustomMarginRightphone
																						: mrCustomMarginRight
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-marginright"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_marginright"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomMarginRight:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomMarginRight,
																						mrCustomMarginRighthover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomMarginRighthover,
																						mrCustomMarginRightdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomMarginRightdesktop,
																						mrCustomMarginRightlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomMarginRightlaptop,
																						mrCustomMarginRighttablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomMarginRighttablet,
																						mrCustomMarginRightphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomMarginRightphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Margin Bottom", "mr-utils")}
																			className="mr-backend-margin mr-backend-marginbottom mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrMarginBottomhover
																					: tab.name === "desktop"
																					? mrMarginBottomdesktop
																					: tab.name === "laptop"
																					? mrMarginBottomlaptop
																					: tab.name === "tablet"
																					? mrMarginBottomtablet
																					: tab.name === "phone"
																					? mrMarginBottomphone
																					: mrMarginBottom
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nomarginbottom"
																					).replace("--", "-"),
																					label: "Remove margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-marginbottom"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrMarginBottom:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrMarginBottom,
																					mrMarginBottomhover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrMarginBottomhover,
																					mrMarginBottomdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrMarginBottomdesktop,
																					mrMarginBottomlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrMarginBottomlaptop,
																					mrMarginBottomtablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrMarginBottomtablet,
																					mrMarginBottomphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrMarginBottomphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrMarginBottom.includes(
																				"-marginbottom"
																			)) ||
																		(tab.name === "hover" &&
																			mrMarginBottomhover.includes(
																				"-marginbottom"
																			)) ||
																		(tab.name === "desktop" &&
																			mrMarginBottomdesktop.includes(
																				"-marginbottom"
																			)) ||
																		(tab.name === "laptop" &&
																			mrMarginBottomlaptop.includes(
																				"-marginbottom"
																			)) ||
																		(tab.name === "tablet" &&
																			mrMarginBottomtablet.includes(
																				"-marginbottom"
																			)) ||
																		(tab.name === "phone" &&
																			mrMarginBottomphone.includes(
																				"-marginbottom"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomMarginBottomhover
																						: tab.name === "desktop"
																						? mrCustomMarginBottomdesktop
																						: tab.name === "laptop"
																						? mrCustomMarginBottomlaptop
																						: tab.name === "tablet"
																						? mrCustomMarginBottomtablet
																						: tab.name === "phone"
																						? mrCustomMarginBottomphone
																						: mrCustomMarginBottom
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-marginbottom"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_marginbottom"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomMarginBottom:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomMarginBottom,
																						mrCustomMarginBottomhover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomMarginBottomhover,
																						mrCustomMarginBottomdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomMarginBottomdesktop,
																						mrCustomMarginBottomlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomMarginBottomlaptop,
																						mrCustomMarginBottomtablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomMarginBottomtablet,
																						mrCustomMarginBottomphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomMarginBottomphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}

																		<SelectControl
																			label={__("Margin Left", "mr-utils")}
																			className="mr-backend-margin mr-backend-marginleft mr-backend-hascustomoption"
																			value={
																				tab.name === "hover"
																					? mrMarginLefthover
																					: tab.name === "desktop"
																					? mrMarginLeftdesktop
																					: tab.name === "laptop"
																					? mrMarginLeftlaptop
																					: tab.name === "tablet"
																					? mrMarginLefttablet
																					: tab.name === "phone"
																					? mrMarginLeftphone
																					: mrMarginLeft
																			}
																			options={[
																				{
																					value: "mr-" + tab.name,
																					label: "Default margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-nomarginleft"
																					).replace("--", "-"),
																					label: "Remove margin",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-marginleft"
																					).replace("--", "-"),
																					label: "Use " + tab.name + " class",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrMarginLeft:
																						val !== undefined &&
																						!val.includes("mr-hover") &&
																						!val.includes("mr-desktop") &&
																						!val.includes("mr-laptop") &&
																						!val.includes("mr-tablet") &&
																						!val.includes("mr-phone")
																							? val
																							: mrMarginLeft,
																					mrMarginLefthover:
																						val !== undefined &&
																						val.includes("mr-hover")
																							? val
																							: mrMarginLefthover,
																					mrMarginLeftdesktop:
																						val !== undefined &&
																						val.includes("mr-desktop")
																							? val
																							: mrMarginLeftdesktop,
																					mrMarginLeftlaptop:
																						val !== undefined &&
																						val.includes("mr-laptop")
																							? val
																							: mrMarginLeftlaptop,
																					mrMarginLefttablet:
																						val !== undefined &&
																						val.includes("mr-tablet")
																							? val
																							: mrMarginLefttablet,
																					mrMarginLeftphone:
																						val !== undefined &&
																						val.includes("mr-phone")
																							? val
																							: mrMarginLeftphone,
																				})
																			}
																		/>

																		{(tab.name === "" &&
																			mrMarginLeft.includes("-marginleft")) ||
																		(tab.name === "hover" &&
																			mrMarginLefthover.includes(
																				"-marginleft"
																			)) ||
																		(tab.name === "desktop" &&
																			mrMarginLeftdesktop.includes(
																				"-marginleft"
																			)) ||
																		(tab.name === "laptop" &&
																			mrMarginLeftlaptop.includes(
																				"-marginleft"
																			)) ||
																		(tab.name === "tablet" &&
																			mrMarginLefttablet.includes(
																				"-marginleft"
																			)) ||
																		(tab.name === "phone" &&
																			mrMarginLeftphone.includes(
																				"-marginleft"
																			)) ? (
																			<TextControl
																				label={__("", "mr-utils")}
																				value={
																					tab.name === "hover"
																						? mrCustomMarginLefthover
																						: tab.name === "desktop"
																						? mrCustomMarginLeftdesktop
																						: tab.name === "laptop"
																						? mrCustomMarginLeftlaptop
																						: tab.name === "tablet"
																						? mrCustomMarginLefttablet
																						: tab.name === "phone"
																						? mrCustomMarginLeftphone
																						: mrCustomMarginLeft
																				}
																				type="text"
																				className="mr-backend-custominput mr-backend-customptop"
																				placeHolder={(
																					"mr-" +
																					tab.name +
																					"-marginleft"
																				).replace("--", "-")}
																				list={(
																					"mrDevUtilsClasses_" +
																					tab.name +
																					"_marginleft"
																				).replace("__", "_")}
																				onChange={(val) =>
																					setAttributes({
																						mrCustomMarginLeft:
																							val !== undefined &&
																							!val.includes("mr-hover") &&
																							!val.includes("mr-desktop") &&
																							!val.includes("mr-laptop") &&
																							!val.includes("mr-tablet") &&
																							!val.includes("mr-phone")
																								? val
																								: mrCustomMarginLeft,
																						mrCustomMarginLefthover:
																							val !== undefined &&
																							val.includes("mr-hover")
																								? val
																								: mrCustomMarginLefthover,
																						mrCustomMarginLeftdesktop:
																							val !== undefined &&
																							val.includes("mr-desktop")
																								? val
																								: mrCustomMarginLeftdesktop,
																						mrCustomMarginLeftlaptop:
																							val !== undefined &&
																							val.includes("mr-laptop")
																								? val
																								: mrCustomMarginLeftlaptop,
																						mrCustomMarginLefttablet:
																							val !== undefined &&
																							val.includes("mr-tablet")
																								? val
																								: mrCustomMarginLefttablet,
																						mrCustomMarginLeftphone:
																							val !== undefined &&
																							val.includes("mr-phone")
																								? val
																								: mrCustomMarginLeftphone,
																					})
																				}
																			/>
																		) : (
																			""
																		)}
																	</>
																)
															}
														</TabPanel>
													</PanelRow>
												</PanelBody>
												<PanelBody
													icon={typography}
													title={tab.name + __(" Text", "mr-utils")}
													initialOpen={false}
													className={
														tab.name === ""
															? "mr-backend-option mr-backend-option_utils_text"
															: "mr-backend-option mr-backend-option_utils_" +
															  tab.name +
															  "_text"
													}
												>
													<SelectControl
														label={__("Font size", "mr-utils")}
														value={
															tab.name === "hover"
																? mrFontSizeOptionshover
																: tab.name === "desktop"
																? mrFontSizeOptionsdesktop
																: tab.name === "laptop"
																? mrFontSizeOptionslaptop
																: tab.name === "tablet"
																? mrFontSizeOptionstablet
																: tab.name === "phone"
																? mrFontSizeOptionsphone
																: mrFontSizeOptions
														}
														className="mr-backend-fontsize mr-backend-hascustomoption"
														options={[
															{
																value: "mr-" + tab.name,
																label: "Use a default " + tab.name + " class",
															},
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-fontsizeoptions"
																).replace("--", "-"),
																label: "Use a custom " + tab.name + " class",
															},
														]}
														onChange={(val) =>
															setAttributes({
																mrFontSizeOptions:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrFontSizeOptions,
																mrFontSizeOptionshover:
																	val !== undefined && val.includes("mr-hover")
																		? val
																		: mrFontSizeOptionshover,
																mrFontSizeOptionsdesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrFontSizeOptionsdesktop,
																mrFontSizeOptionslaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrFontSizeOptionslaptop,
																mrFontSizeOptionstablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrFontSizeOptionstablet,
																mrFontSizeOptionsphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrFontSizeOptionsphone,
															})
														}
													/>

													{(tab.name === "" && mrFontSizeOptions === "mr-") ||
													(tab.name === "hover" &&
														mrFontSizeOptionshover === "mr-hover") ||
													(tab.name === "desktop" &&
														mrFontSizeOptionsdesktop === "mr-desktop") ||
													(tab.name === "laptop" &&
														mrFontSizeOptionslaptop === "mr-laptop") ||
													(tab.name === "tablet" &&
														mrFontSizeOptionstablet === "mr-tablet") ||
													(tab.name === "phone" &&
														mrFontSizeOptionsphone === "mr-phone") ? (
														<RangeControl
															label={__("", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrFontSizehover
																	: tab.name === "desktop"
																	? mrFontSizedesktop
																	: tab.name === "laptop"
																	? mrFontSizelaptop
																	: tab.name === "tablet"
																	? mrFontSizetablet
																	: tab.name === "phone"
																	? mrFontSizephone
																	: mrFontSize
															}
															initialPosition={0}
															allowReset={true}
															min={0}
															max={7}
															onChange={(val) =>
																setAttributes({
																	mrFontSize:
																		tab.name === ""
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSize,
																	mrFontSizehover:
																		tab.name === "hover"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSizehover,
																	mrFontSizedesktop:
																		tab.name === "desktop"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSizedesktop,
																	mrFontSizelaptop:
																		tab.name === "laptop"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSizelaptop,
																	mrFontSizetablet:
																		tab.name === "tablet"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSizetablet,
																	mrFontSizephone:
																		tab.name === "phone"
																			? val === 0 || val === undefined
																				? ""
																				: val
																			: mrFontSizephone,
																})
															}
															help={
																tab.name == "" && mrFontSize > 0
																	? "mr-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: tab.name == "hover" && mrFontSizehover > 0
																	? "mr-hover-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: tab.name == "desktop" &&
																	  mrFontSizedesktop > 0
																	? "mr-desktop-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: tab.name == "laptop" && mrFontSizelaptop > 0
																	? "mr-laptop-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: tab.name == "tablet" && mrFontSizetablet
																	? "mr-tablet-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: tab.name == "phone" && mrFontSizephone > 0
																	? "mr-phone-fontsize" +
																	  mrFontSize +
																	  " = " +
																	  getComputedStyle(
																			document.documentElement
																	  ).getPropertyValue(
																			"--font-size-" + mrFontSize
																	  )
																	: ""
															}
														/>
													) : (
														""
													)}
													{(tab.name === "" &&
														mrFontSizeOptions.includes("-fontsizeoptions")) ||
													(tab.name === "hover" &&
														mrFontSizeOptionshover.includes(
															"-fontsizeoptions"
														)) ||
													(tab.name === "desktop" &&
														mrFontSizeOptionsdesktop.includes(
															"-fontsizeoptions"
														)) ||
													(tab.name === "laptop" &&
														mrFontSizeOptionslaptop.includes(
															"-fontsizeoptions"
														)) ||
													(tab.name === "tablet" &&
														mrFontSizeOptionstablet.includes(
															"-fontsizeoptions"
														)) ||
													(tab.name === "phone" &&
														mrFontSizeOptionsphone.includes(
															"-fontsizeoptions"
														)) ? (
														<TextControl
															label={__("", "mr-utils")}
															value={
																tab.name === "hover"
																	? mrCustomFontSizehover
																	: tab.name === "desktop"
																	? mrCustomFontSizedesktop
																	: tab.name === "laptop"
																	? mrCustomFontSizelaptop
																	: tab.name === "tablet"
																	? mrCustomFontSizetablet
																	: tab.name === "phone"
																	? mrCustomFontSizephone
																	: mrCustomFontSize
															}
															type="text"
															className="mr-backend-custominput mr-backend-customptop"
															placeHolder={(
																"mr-" +
																tab.name +
																"-fontsize{1/7}"
															).replace("--", "-")}
															list={(
																"mrDevUtilsClasses_" +
																tab.name +
																"_fontsize"
															).replace("__", "_")}
															onChange={(val) =>
																setAttributes({
																	mrCustomFontSize:
																		val !== undefined &&
																		!val.includes("mr-hover") &&
																		!val.includes("mr-desktop") &&
																		!val.includes("mr-laptop") &&
																		!val.includes("mr-tablet") &&
																		!val.includes("mr-phone")
																			? val
																			: mrCustomFontSize,
																	mrCustomFontSizehover:
																		val !== undefined &&
																		val.includes("mr-hover")
																			? val
																			: mrCustomFontSizehover,
																	mrCustomFontSizedesktop:
																		val !== undefined &&
																		val.includes("mr-desktop")
																			? val
																			: mrCustomFontSizedesktop,
																	mrCustomFontSizelaptop:
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrCustomFontSizelaptop,
																	mrCustomFontSizetablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrCustomFontSizetablet,
																	mrCustomFontSizephone:
																		val !== undefined &&
																		val.includes("mr-phone")
																			? val
																			: mrCustomFontSizephone,
																})
															}
														/>
													) : (
														""
													)}

													{tab.name !== "hover" ? (
														<>
															<SelectControl
																label={__("Text Alignment", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrTextAlignmentdesktop
																		: tab.name === "laptop"
																		? mrTextAlignmentlaptop
																		: tab.name === "tablet"
																		? mrTextAlignmenttablet
																		: tab.name === "phone"
																		? mrTextAlignmentphone
																		: mrTextAlignment
																}
																options={
																	(isSelected &&
																		mrAllowedBlocks.name != "core/paragraph") ||
																	(isSelected &&
																		mrAllowedBlocks.name != "core/heading")
																		? __([
																				{
																					value: "mr-" + tab.name,
																					label: "Default",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-alignleft"
																					).replace("--", "-"),
																					label: "Left",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-aligncenter"
																					).replace("--", "-"),
																					label: "Center",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-alignright"
																					).replace("--", "-"),
																					label: "Right",
																				},
																		  ])
																		: ""
																}
																onChange={(val) =>
																	setAttributes({
																		mrTextAlignment:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrTextAlignment,
																		mrTextAlignmentdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrTextAlignmentdesktop,
																		mrTextAlignmentlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrTextAlignmentlaptop,
																		mrTextAlignmenttablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrTextAlignmenttablet,
																		mrTextAlignmentphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrTextAlignmentphone,
																	})
																}
															/>
														</>
													) : (
														""
													)}
												</PanelBody>
												{tab.name !== "hover" ? (
													<>
														<PanelBody
															icon={pullLeft}
															title={tab.name + __(" Placement", "mr-utils")}
															initialOpen={false}
															className={
																tab.name === ""
																	? "mr-backend-option mr-backend-option_utils_placement"
																	: "mr-backend-option mr-backend-option_utils_" +
																	  tab.name +
																	  "_placement"
															}
														>
															<SelectControl
																label={__("Position Type", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrPositiondesktop
																		: tab.name === "laptop"
																		? mrPositionlaptop
																		: tab.name === "tablet"
																		? mrPositiontablet
																		: tab.name === "phone"
																		? mrPositionphone
																		: mrPosition
																}
																options={[
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-relative"
																		).replace("--", "-"),
																		label: "Relative",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-absolute"
																		).replace("--", "-"),
																		label: "Absolute",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-fixed"
																		).replace("--", "-"),
																		label: "Fixed",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-sticky"
																		).replace("--", "-"),
																		label: "Sticky",
																	},
																]}
																onChange={(val) =>
																	setAttributes({
																		mrPosition:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrPosition,
																		mrPositiondesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrPositiondesktop,
																		mrPositionlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrPositionlaptop,
																		mrPositiontablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrPositiontablet,
																		mrPositionphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrPositionphone,
																	})
																}
															/>

															<SelectControl
																label={__("Vertical Alignment", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrPositionAlignmentdesktop
																		: tab.name === "laptop"
																		? mrPositionAlignmentlaptop
																		: tab.name === "tablet"
																		? mrPositionAlignmenttablet
																		: tab.name === "phone"
																		? mrPositionAlignmentphone
																		: mrPositionAlignment
																}
																options={
																	(mrPosition + tab.name).includes(
																		"absolute"
																	) ||
																	(mrPosition + tab.name).includes("fixed") ||
																	(mrPosition + tab.name).includes("sticky")
																		? __([
																				{
																					value: "mr-" + tab.name,
																					label: "Default",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-top"
																					).replace("--", "-"),
																					label: "Top",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-bottom"
																					).replace("--", "-"),
																					label: "Bottom",
																				},
																		  ])
																		: ""
																}
																onChange={(val) =>
																	setAttributes({
																		mrPositionAlignment:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrPositionAlignment,
																		mrPositionAlignmentdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrPositionAlignmentdesktop,
																		mrPositionAlignmentlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrPositionAlignmentlaptop,
																		mrPositionAlignmenttablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrPositionAlignmenttablet,
																		mrPositionAlignmentphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrPositionAlignmentphone,
																	})
																}
															/>
															<SelectControl
																label={__("Horizontal Alignment", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrPositionSidesdesktop
																		: tab.name === "laptop"
																		? mrPositionSideslaptop
																		: tab.name === "tablet"
																		? mrPositionSidestablet
																		: tab.name === "phone"
																		? mrPositionSidesphone
																		: mrPositionSides
																}
																options={
																	(mrPosition + tab.name).includes(
																		"absolute"
																	) ||
																	(mrPosition + tab.name).includes("fixed") ||
																	(mrPosition + tab.name).includes("sticky")
																		? __([
																				{
																					value: "mr-" + tab.name,
																					label: "Default",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-right"
																					).replace("--", "-"),
																					label: "Right",
																				},
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-left"
																					).replace("--", "-"),
																					label: "Left",
																				},
																		  ])
																		: ""
																}
																onChange={(val) =>
																	setAttributes({
																		mrPositionSides:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrPositionSides,
																		mrPositionSidesdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrPositionSidesdesktop,
																		mrPositionSideslaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrPositionSideslaptop,
																		mrPositionSidestablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrPositionSidestablet,
																		mrPositionSidesphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrPositionSidesphone,
																	})
																}
															/>
															<SelectControl
																label={__("Content Alignment", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrContentAlignmentdesktop
																		: tab.name === "laptop"
																		? mrContentAlignmentlaptop
																		: tab.name === "tablet"
																		? mrContentAlignmenttablet
																		: tab.name === "phone"
																		? mrContentAlignmentphone
																		: mrContentAlignment
																}
																options={__([
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-aligntop"
																		).replace("--", "-"),
																		label: "Top",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-floatright"
																		).replace("--", "-"),
																		label: "Right",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-alignbottom"
																		).replace("--", "-"),
																		label: "Bottom",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-floatleft"
																		).replace("--", "-"),
																		label: "Left",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-middle"
																		).replace("--", "-"),
																		label: "Middle",
																	},
																])}
																onChange={(val) =>
																	setAttributes({
																		mrContentAlignment:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrContentAlignment,
																		mrContentAlignmentdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrContentAlignmentdesktop,
																		mrContentAlignmentlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrContentAlignmentlaptop,
																		mrContentAlignmenttablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrContentAlignmenttablet,
																		mrContentAlignmentphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrContentAlignmentphone,
																	})
																}
															/>
															<SelectControl
																label={__("Vertical Offset", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrVerticalOffsetdesktop
																		: tab.name === "laptop"
																		? mrVerticalOffsetlaptop
																		: tab.name === "tablet"
																		? mrVerticalOffsettablet
																		: tab.name === "phone"
																		? mrVerticalOffsetphone
																		: mrVerticalOffset
																}
																options={__([
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-offsettop"
																		).replace("--", "-"),
																		label: "Top",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-offsetbottom"
																		).replace("--", "-"),
																		label: "Bottom",
																	},
																])}
																onChange={(val) =>
																	setAttributes({
																		mrVerticalOffset:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrVerticalOffset,
																		mrVerticalOffsetdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrVerticalOffsetdesktop,
																		mrVerticalOffsetlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrVerticalOffsetlaptop,
																		mrVerticalOffsettablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrVerticalOffsettablet,
																		mrVerticalOffsetphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrVerticalOffsetphone,
																	})
																}
															/>
															<SelectControl
																label={__("Horizontal Offset", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrHorizontalOffsetdesktop
																		: tab.name === "laptop"
																		? mrHorizontalOffsetlaptop
																		: tab.name === "tablet"
																		? mrHorizontalOffsettablet
																		: tab.name === "phone"
																		? mrHorizontalOffsetphone
																		: mrHorizontalOffset
																}
																options={__([
																	{ value: "mr-" + tab.name, label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-offsetleft"
																		).replace("--", "-"),
																		label: "Left",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-offsetright"
																		).replace("--", "-"),
																		label: "Right",
																	},
																])}
																onChange={(val) =>
																	setAttributes({
																		mrHorizontalOffset:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrHorizontalOffset,
																		mrHorizontalOffsetdesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrHorizontalOffsetdesktop,
																		mrHorizontalOffsetlaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrHorizontalOffsetlaptop,
																		mrHorizontalOffsettablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrHorizontalOffsettablet,
																		mrHorizontalOffsetphone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrHorizontalOffsetphone,
																	})
																}
															/>
														</PanelBody>
													</>
												) : (
													""
												)}
												<PanelBody
													icon={plusCircle}
													title={tab.name + __(" Misc.", "mr-utils")}
													initialOpen={false}
													className={
														tab.name === ""
															? "mr-backend-option mr-backend-option_utils_misc"
															: "mr-backend-option mr-backend-option_utils_" +
															  tab.name +
															  "_misc"
													}
												>
													<SelectControl
														label={__("Scroll", "mr-utils")}
														value={
															tab.name === "hover"
																? mrScrollhover
																: tab.name === "desktop"
																? mrScrolldesktop
																: tab.name === "laptop"
																? mrScrolllaptop
																: tab.name === "tablet"
																? mrScrolltablet
																: tab.name === "phone"
																? mrScrollphone
																: mrScroll
														}
														options={[
															{ value: "mr-" + tab.name, label: "Default" },
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-noscroll"
																).replace("--", "-"),
																label: "No scroll",
															},
															{
																value: (
																	" mr-" +
																	tab.name +
																	"-hidescroll"
																).replace("--", "-"),
																label: "Hide scroll",
															},
															{
																value: (" mr-" + tab.name + "-scroll").replace(
																	"--",
																	"-"
																),
																label: "Scroll",
															},
															tab.name != "hover"
																? {
																		value: (
																			" mr-" +
																			tab.name +
																			"-horizontalscroll"
																		).replace("--", "-"),
																		label: "Horizontal scroll",
																  }
																: "",
															tab.name != "hover"
																? {
																		value: (
																			" mr-" +
																			tab.name +
																			"-horizontalscrollcontent"
																		).replace("--", "-"),
																		label: "Horizontal scroll content",
																  }
																: "",
															tab.name != "hover"
																? {
																		value: (
																			" mr-" +
																			tab.name +
																			"-swipe"
																		).replace("--", "-"),
																		label: "Swipe",
																  }
																: "",
															tab.name != "hover"
																? {
																		value: (
																			" mr-" +
																			tab.name +
																			"-swipecontent"
																		).replace("--", "-"),
																		label: "Swipe content",
																  }
																: "",
														]}
														onChange={(val) =>
															setAttributes({
																mrScroll:
																	val !== undefined &&
																	!val.includes("mr-hover") &&
																	!val.includes("mr-desktop") &&
																	!val.includes("mr-laptop") &&
																	!val.includes("mr-tablet") &&
																	!val.includes("mr-phone")
																		? val
																		: mrScroll,
																mrScrollhover:
																	val !== undefined && val.includes("-hover-")
																		? val
																		: mrScrollhover,
																mrScrolldesktop:
																	val !== undefined &&
																	val.includes("mr-desktop")
																		? val
																		: mrScrolldesktop,
																mrScrolllaptop:
																	val !== undefined && val.includes("mr-laptop")
																		? val
																		: mrScrolllaptop,
																mrScrolltablet:
																	val !== undefined && val.includes("mr-tablet")
																		? val
																		: mrScrolltablet,
																mrScrollphone:
																	val !== undefined && val.includes("mr-phone")
																		? val
																		: mrScrollphone,
															})
														}
													/>
												</PanelBody>
											</>
										) : (
											<>
												<h4>Other breakpoints</h4>
												<p>
													You also have the following device breakpoints
													available:
												</p>
												<p class="mr-backend-other_breakpoints">
													<b>landscape, portrait</b>
												</p>
												<p>
													However you cannot select them with the interface. In
													alternative, you can use{" "}
													<a
														href="https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes"
														target="_blank"
													>
														utility classes
													</a>{" "}
													in <b>Advanced - Additional CSS class(es)</b>.
												</p>
												<p>
													<a
														href="https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes"
														target="_blank"
													>
														Know more
													</a>
												</p>
											</>
										)
									}
								</TabPanel>

								<PanelBody
									icon={mrDevIcon}
									title={__("Need more features?", "mr-utils")}
									initialOpen={false}
									className="mr-backend-more_features"
								>
									<PanelRow>
										<div>
											<p>
												<b>Then you need Mr.Dev.'s Framework!</b>
											</p>
											<p>
												The framework will give you an interface to optionally:
											</p>
											<ul>
												<li>
													- Select only the device breakpoints that you want to
													use, avoiding the load of all styles and scripts.
												</li>
												<li>
													- Enable only the components and features that you
													want to use, avoiding unused CSS and JS.
												</li>
												<li>
													- Change the value of each variable (for margin,
													padding, transition-duration, size, font-size and
													more).
												</li>
												<li>
													- Change the media query values of each device
													breakpoint.
												</li>
												<li>- Create custom breakpoints.</li>
												<li>- Create custom variables.</li>
												<li>
													- Create custom utility classes with CSS properties +
													variables and select them within the interface.
												</li>
												<li>
													- Toggle a offcanvas section with reusable blocks
													using a hamburger menu.
												</li>
												<li>- And more framework features...</li>
											</ul>
											<p>
												<a
													href="https://marcosrego.com/development/mrdev-framework/"
													target="_blank"
												>
													Know more
												</a>
											</p>
										</div>
									</PanelRow>
								</PanelBody>
							</PanelBody>
						</Panel>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "mrInspectorControls");

/**
 * Add classes to backend wrapper for styling porpuses.
 *
 * @param {function} BlockListBlock Block edit component.
 *
 * @return {function} BlockListBlock Modified block edit component.
 *
 */
const mrApplyWrapperExtraClass = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const { attributes, blockType } = props;

			const {
				mrAnimation,
				mrAnimationhover,
				mrTransition,
				mrTransitionhover,
				mrPerPage,
				mrPaginationPosition,
				mrComponent,
				mrActiveWhen,
				mrNavPosition,
				mrArrowPagination,
				mrSelectPagination,
				mrRadioPagination,
				mrPerLine,
				mrPerLinedesktop,
				mrPerLinelaptop,
				mrPerLinetablet,
				mrPerLinephone,
				mrOrder,
				mrOrderdesktop,
				mrOrderlaptop,
				mrOrdertablet,
				mrOrderphone,
				mrDisplay,
				mrDisplayhover,
				mrDisplaydesktop,
				mrDisplaylaptop,
				mrDisplaytablet,
				mrDisplayphone,
				mrWrap,
				mrWrapdesktop,
				mrWraplaptop,
				mrWraptablet,
				mrWrapphone,
				mrPaddingTop,
				mrPaddingTophover,
				mrPaddingTopdesktop,
				mrPaddingToplaptop,
				mrPaddingToptablet,
				mrPaddingTopphone,
				mrCustomPaddingTop,
				mrCustomPaddingTophover,
				mrCustomPaddingTopdesktop,
				mrCustomPaddingToplaptop,
				mrCustomPaddingToptablet,
				mrCustomPaddingTopphone,
				mrPaddingRight,
				mrPaddingRighthover,
				mrPaddingRightdesktop,
				mrPaddingRightlaptop,
				mrPaddingRighttablet,
				mrPaddingRightphone,
				mrCustomPaddingRight,
				mrCustomPaddingRighthover,
				mrCustomPaddingRightdesktop,
				mrCustomPaddingRightlaptop,
				mrCustomPaddingRighttablet,
				mrCustomPaddingRightphone,
				mrPaddingBottom,
				mrPaddingBottomhover,
				mrPaddingBottomdesktop,
				mrPaddingBottomlaptop,
				mrPaddingBottomtablet,
				mrPaddingBottomphone,
				mrCustomPaddingBottom,
				mrCustomPaddingBottomhover,
				mrCustomPaddingBottomdesktop,
				mrCustomPaddingBottomlaptop,
				mrCustomPaddingBottomtablet,
				mrCustomPaddingBottomphone,
				mrPaddingLeft,
				mrPaddingLefthover,
				mrPaddingLeftdesktop,
				mrPaddingLeftlaptop,
				mrPaddingLefttablet,
				mrPaddingLeftphone,
				mrCustomPaddingLeft,
				mrCustomPaddingLefthover,
				mrCustomPaddingLeftdesktop,
				mrCustomPaddingLeftlaptop,
				mrCustomPaddingLefttablet,
				mrCustomPaddingLeftphone,
				mrMarginTop,
				mrMarginTophover,
				mrMarginTopdesktop,
				mrMarginToplaptop,
				mrMarginToptablet,
				mrMarginTopphone,
				mrCustomMarginTop,
				mrCustomMarginTophover,
				mrCustomMarginTopdesktop,
				mrCustomMarginToplaptop,
				mrCustomMarginToptablet,
				mrCustomMarginTopphone,
				mrMarginRight,
				mrMarginRighthover,
				mrMarginRightdesktop,
				mrMarginRightlaptop,
				mrMarginRighttablet,
				mrMarginRightphone,
				mrCustomMarginRight,
				mrCustomMarginRighthover,
				mrCustomMarginRightdesktop,
				mrCustomMarginRightlaptop,
				mrCustomMarginRighttablet,
				mrCustomMarginRightphone,
				mrMarginBottom,
				mrMarginBottomhover,
				mrMarginBottomdesktop,
				mrMarginBottomlaptop,
				mrMarginBottomtablet,
				mrMarginBottomphone,
				mrCustomMarginBottom,
				mrCustomMarginBottomhover,
				mrCustomMarginBottomdesktop,
				mrCustomMarginBottomlaptop,
				mrCustomMarginBottomtablet,
				mrCustomMarginBottomphone,
				mrMarginLeft,
				mrMarginLefthover,
				mrMarginLeftdesktop,
				mrMarginLeftlaptop,
				mrMarginLefttablet,
				mrMarginLeftphone,
				mrCustomMarginLeft,
				mrCustomMarginLefthover,
				mrCustomMarginLeftdesktop,
				mrCustomMarginLeftlaptop,
				mrCustomMarginLefttablet,
				mrCustomMarginLeftphone,
				mrPosition,
				mrPositiondesktop,
				mrPositionlaptop,
				mrPositiontablet,
				mrPositionphone,
				mrPositionAlignment,
				mrPositionAlignmentdesktop,
				mrPositionAlignmentlaptop,
				mrPositionAlignmenttablet,
				mrPositionAlignmentphone,
				mrPositionSides,
				mrPositionSidesdesktop,
				mrPositionSideslaptop,
				mrPositionSidestablet,
				mrPositionSidesphone,
				mrContentAlignment,
				mrContentAlignmentdesktop,
				mrContentAlignmentlaptop,
				mrContentAlignmenttablet,
				mrContentAlignmentphone,
				mrVerticalOffset,
				mrVerticalOffsetdesktop,
				mrVerticalOffsetlaptop,
				mrVerticalOffsettablet,
				mrVerticalOffsetphone,
				mrHorizontalOffset,
				mrHorizontalOffsetdesktop,
				mrHorizontalOffsetlaptop,
				mrHorizontalOffsettablet,
				mrHorizontalOffsetphone,
				mrSizeOptions,
				mrSizeOptionshover,
				mrSizeOptionsdesktop,
				mrSizeOptionslaptop,
				mrSizeOptionstablet,
				mrSizeOptionsphone,
				mrSize,
				mrSizehover,
				mrSizedesktop,
				mrSizelaptop,
				mrSizetablet,
				mrSizephone,
				mrCustomSize,
				mrCustomSizehover,
				mrCustomSizedesktop,
				mrCustomSizelaptop,
				mrCustomSizetablet,
				mrCustomSizephone,
				mrFontSizeOptions,
				mrFontSizeOptionshover,
				mrFontSizeOptionsdesktop,
				mrFontSizeOptionslaptop,
				mrFontSizeOptionstablet,
				mrFontSizeOptionsphone,
				mrFontSize,
				mrFontSizehover,
				mrFontSizedesktop,
				mrFontSizelaptop,
				mrFontSizetablet,
				mrFontSizephone,
				mrCustomFontSize,
				mrCustomFontSizehover,
				mrCustomFontSizedesktop,
				mrCustomFontSizelaptop,
				mrCustomFontSizetablet,
				mrCustomFontSizephone,
				mrTextAlignment,
				mrTextAlignmentdesktop,
				mrTextAlignmentlaptop,
				mrTextAlignmenttablet,
				mrTextAlignmentphone,
				mrScroll,
				mrScrollhover,
				mrScrolldesktop,
				mrScrolllaptop,
				mrScrolltablet,
				mrScrollphone,
			} = attributes;

			let mrClassNames = "";
			let mrAttr = "";
			let mrAttrValue = "";

			if (!mrSizeOptions || !mrSizeOptions.includes("-sizeoptions")) {
				if (mrSize) {
					mrClassNames = mrClassNames + " mr-size" + mrSize;
				}
				if (mrSizehover) {
					mrClassNames = mrClassNames + " mr-hover-size" + mrSizehover;
				}
				if (mrSizedesktop) {
					mrClassNames = mrClassNames + " mr-desktop-size" + mrSizedesktop;
				}
				if (mrSizelaptop) {
					mrClassNames = mrClassNames + " mr-laptop-size" + mrSizelaptop;
				}
				if (mrSizetablet) {
					mrClassNames = mrClassNames + " mr-tablet-size" + mrSizetablet;
				}
				if (mrSizephone) {
					mrClassNames = mrClassNames + " mr-phone-size" + mrSizephone;
				}
			} else if (mrSizeOptions && mrSizeOptions.includes("-sizeoptions")) {
				if (mrCustomSize) {
					mrClassNames = mrClassNames + mrCustomSize;
				}
				if (mrCustomSizehover) {
					mrClassNames = mrClassNames + mrCustomSizehover;
				}
				if (mrCustomSizedesktop) {
					mrClassNames = mrClassNames + mrCustomSizedesktop;
				}
				if (mrCustomSizelaptop) {
					mrClassNames = mrClassNames + mrCustomSizelaptop;
				}
				if (mrCustomSizetablet) {
					mrClassNames = mrClassNames + mrCustomSizetablet;
				}
				if (mrCustomSizephone) {
					mrClassNames = mrClassNames + mrCustomSizephone;
				}
			}

			if (
				!mrFontSizeOptions ||
				!mrFontSizeOptions.includes("-fontsizeoptions")
			) {
				if (mrFontSize) {
					mrClassNames = mrClassNames + " mr-fontsize" + mrFontSize;
				}
				if (mrFontSizehover) {
					mrClassNames = mrClassNames + " mr-hover-fontsize" + mrFontSizehover;
				}
				if (mrFontSizedesktop) {
					mrClassNames =
						mrClassNames + " mr-desktop-fontsize" + mrFontSizedesktop;
				}
				if (mrFontSizelaptop) {
					mrClassNames =
						mrClassNames + " mr-laptop-fontsize" + mrFontSizelaptop;
				}
				if (mrFontSizetablet) {
					mrClassNames =
						mrClassNames + " mr-tablet-fontsize" + mrFontSizetablet;
				}
				if (mrFontSizephone) {
					mrClassNames = mrClassNames + " mr-phone-fontsize" + mrFontSizephone;
				}
			} else if (
				mrFontSizeOptions &&
				mrFontSizeOptions.includes("-fontsizeoptions")
			) {
				if (mrCustomFontSize) {
					mrClassNames = mrClassNames + mrCustomFontSize;
				}
				if (mrCustomFontSizehover) {
					mrClassNames = mrClassNames + mrCustomFontSizehover;
				}
				if (mrCustomFontSizedesktop) {
					mrClassNames = mrClassNames + mrCustomFontSizedesktop;
				}
				if (mrCustomFontSizelaptop) {
					mrClassNames = mrClassNames + mrCustomFontSizelaptop;
				}
				if (mrCustomFontSizetablet) {
					mrClassNames = mrClassNames + mrCustomFontSizetablet;
				}
				if (mrCustomFontSizephone) {
					mrClassNames = mrClassNames + mrCustomFontSizephone;
				}
			}

			Object.keys(attributes).forEach(function (value) {
				mrAttr = value;
				mrAttrValue = attributes[value];
				if (
					mrAttrValue !== "mr-" &&
					mrAttrValue !== "mr-hover" &&
					mrAttrValue !== "mr-desktop" &&
					mrAttrValue !== "mr-laptop" &&
					mrAttrValue !== "mr-tablet" &&
					mrAttrValue !== "mr-phone" &&
					!mrAttr.includes("mrCustom") &&
					!mrAttr.includes("mrFontSize") &&
					!mrAttr.includes("mrSize")
				) {
					if (mrAttr == "mrPerPage" && mrAttrValue) {
						if (mrAttrValue > 0) {
							mrClassNames = mrClassNames + " mr-" + mrAttrValue + "perpage";
						}
					} else if (mrAttr == "mrArrowPagination" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-arrowpagination";
					} else if (mrAttr == "mrSelectPagination" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-selectpagination";
					} else if (mrAttr == "mrRadioPagination" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-radiopagination";
					} else if (mrAttr == "mrAnimation" && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue + " mr-active";
					} else if (mrAttr == "mrAnimationhover" && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue + " mr-active";
					} else if (mrAttr == "mrActiveWhen" && mrAttrValue) {
						//mrClassNames = mrClassNames.replace(" mr-active", "");
						mrClassNames = mrClassNames + mrAttrValue;
					} else if (
						mrAttr.includes("mrPadding") &&
						mrAttrValue &&
						mrAttrValue.includes("-padding")
					) {
						if (mrAttr == "mrPaddingTop" && mrCustomPaddingTop) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingTop;
						} else if (
							mrAttr == "mrPaddingTophover" &&
							mrCustomPaddingTophover
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingTophover;
						} else if (
							mrAttr == "mrPaddingTopdesktop" &&
							mrCustomPaddingTopdesktop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingTopdesktop;
						} else if (
							mrAttr == "mrPaddingToplaptop" &&
							mrCustomPaddingToplaptop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingToplaptop;
						} else if (
							mrAttr == "mrPaddingToplaptablet" &&
							mrCustomPaddingToptablet
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingToptablet;
						} else if (
							mrAttr == "mrPaddingToplapphone" &&
							mrCustomPaddingTopphone
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingTopphone;
						} else if (mrAttr == "mrPaddingRight" && mrCustomPaddingRight) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRight;
						} else if (
							mrAttr == "mrPaddingRighthover" &&
							mrCustomPaddingRighthover
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRighthover;
						} else if (
							mrAttr == "mrPaddingRightdesktop" &&
							mrCustomPaddingRightdesktop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRightdesktop;
						} else if (
							mrAttr == "mrPaddingRightlaptop" &&
							mrCustomPaddingRightlaptop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRightlaptop;
						} else if (
							mrAttr == "mrPaddingRightlaptablet" &&
							mrCustomPaddingRighttablet
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRighttablet;
						} else if (
							mrAttr == "mrPaddingRightlapphone" &&
							mrCustomPaddingRightphone
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingRightphone;
						} else if (mrAttr == "mrPaddingBottom" && mrCustomPaddingBottom) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottom;
						} else if (
							mrAttr == "mrPaddingBottomhover" &&
							mrCustomPaddingBottomhover
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottomhover;
						} else if (
							mrAttr == "mrPaddingBottomdesktop" &&
							mrCustomPaddingBottomdesktop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottomdesktop;
						} else if (
							mrAttr == "mrPaddingBottomlaptop" &&
							mrCustomPaddingBottomlaptop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottomlaptop;
						} else if (
							mrAttr == "mrPaddingBottomlaptablet" &&
							mrCustomPaddingBottomtablet
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottomtablet;
						} else if (
							mrAttr == "mrPaddingBottomlapphone" &&
							mrCustomPaddingBottomphone
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingBottomphone;
						} else if (mrAttr == "mrPaddingLeft" && mrCustomPaddingLeft) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLeft;
						} else if (
							mrAttr == "mrPaddingLefthover" &&
							mrCustomPaddingLefthover
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLefthover;
						} else if (
							mrAttr == "mrPaddingLeftdesktop" &&
							mrCustomPaddingLeftdesktop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLeftdesktop;
						} else if (
							mrAttr == "mrPaddingLeftlaptop" &&
							mrCustomPaddingLeftlaptop
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLeftlaptop;
						} else if (
							mrAttr == "mrPaddingLeftlaptablet" &&
							mrCustomPaddingLefttablet
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLefttablet;
						} else if (
							mrAttr == "mrPaddingLeftlapphone" &&
							mrCustomPaddingLeftphone
						) {
							mrClassNames = mrClassNames + " " + mrCustomPaddingLeftphone;
						} else {
							mrClassNames = mrClassNames + mrAttrValue;
						}
					} else if (
						mrAttr.startsWith("mr") &&
						mrAttrValue &&
						mrAttrValue.startsWith("mr")
					) {
						mrClassNames = mrClassNames + " " + mrAttrValue;
					} else if (mrAttr.startsWith("mr") && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue;
					}
				}
			});

			//}

			/*let mrInlineStyles = "";
			  mrAttr = "";
			  mrAttrValue = "";
			  if (mrAllowedBlocks.includes(blockType.name)) {
			  Object.keys(attributes).forEach(function (value) {
				  mrAttr = value;
				  mrAttrValue = attributes[value];
				  if (
					  mrAttrValue !== "mr-" &&
					  mrAttrValue !== "mr-desktop" &&
					  mrAttrValue !== "mr-laptop" &&
					  mrAttrValue !== "mr-tablet" &&
					  mrAttrValue !== "mr-phone" &&
					  mrAttr.includes("mrCustom")
				  ) {
					  if (
						  mrPaddingTop.includes("-custom") &&
						  mrAttr == "mrCustomPaddingTop" &&
						  mrAttrValue
					  ) {
						  mrInlineStyles =
							  mrInlineStyles + "padding-top:" + mrAttrValue + ";";
					  }
				  }
			  });
			  }*/

			return (
				<BlockListBlock
					{...props}
					className={mrClassNames}
					/*style={mrInlineStyles}*/
				/>
			);
		};
	},
	"mrApplyWrapperExtraClass"
);

/**
 * Add custom mrAttrValue class in save mrAttrValue.
 *
 * @param {Object} extraProps     Block mrAttrValue.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block mrAttrValue.
 */
function mrApplyExtraClass(extraProps, blockType, attributes) {
	const {
		mrAnimation,
		mrAnimationhover,
		mrTransition,
		mrTransitionhover,
		mrPerPage,
		mrPaginationPosition,
		mrArrowPagination,
		mrSelectPagination,
		mrRadioPagination,
		mrPerLine,
		mrPerLinedesktop,
		mrPerLinelaptop,
		mrPerLinetablet,
		mrPerLinephone,
		mrOrder,
		mrOrderdesktop,
		mrOrderlaptop,
		mrOrdertablet,
		mrOrderphone,
		mrDisplay,
		mrDisplayhover,
		mrDisplaydesktop,
		mrDisplaylaptop,
		mrDisplaytablet,
		mrDisplayphone,
		mrWrap,
		mrWrapdesktop,
		mrWraplaptop,
		mrWraptablet,
		mrWrapphone,
		mrPaddingTop,
		mrPaddingTophover,
		mrPaddingTopdesktop,
		mrPaddingToplaptop,
		mrPaddingToptablet,
		mrPaddingTopphone,
		mrCustomPaddingTop,
		mrCustomPaddingTophover,
		mrCustomPaddingTopdesktop,
		mrCustomPaddingToplaptop,
		mrCustomPaddingToptablet,
		mrCustomPaddingTopphone,
		mrPaddingRight,
		mrPaddingRighthover,
		mrPaddingRightdesktop,
		mrPaddingRightlaptop,
		mrPaddingRighttablet,
		mrPaddingRightphone,
		mrCustomPaddingRight,
		mrCustomPaddingRighthover,
		mrCustomPaddingRightdesktop,
		mrCustomPaddingRightlaptop,
		mrCustomPaddingRighttablet,
		mrCustomPaddingRightphone,
		mrPaddingBottom,
		mrPaddingBottomhover,
		mrPaddingBottomdesktop,
		mrPaddingBottomlaptop,
		mrPaddingBottomtablet,
		mrPaddingBottomphone,
		mrCustomPaddingBottom,
		mrCustomPaddingBottomhover,
		mrCustomPaddingBottomdesktop,
		mrCustomPaddingBottomlaptop,
		mrCustomPaddingBottomtablet,
		mrCustomPaddingBottomphone,
		mrPaddingLeft,
		mrPaddingLefthover,
		mrPaddingLeftdesktop,
		mrPaddingLeftlaptop,
		mrPaddingLefttablet,
		mrPaddingLeftphone,
		mrCustomPaddingLeft,
		mrCustomPaddingLefthover,
		mrCustomPaddingLeftdesktop,
		mrCustomPaddingLeftlaptop,
		mrCustomPaddingLefttablet,
		mrCustomPaddingLeftphone,
		mrMarginTop,
		mrMarginTophover,
		mrMarginTopdesktop,
		mrMarginToplaptop,
		mrMarginToptablet,
		mrMarginTopphone,
		mrCustomMarginTop,
		mrCustomMarginTophover,
		mrCustomMarginTopdesktop,
		mrCustomMarginToplaptop,
		mrCustomMarginToptablet,
		mrCustomMarginTopphone,
		mrMarginRight,
		mrMarginRighthover,
		mrMarginRightdesktop,
		mrMarginRightlaptop,
		mrMarginRighttablet,
		mrMarginRightphone,
		mrCustomMarginRight,
		mrCustomMarginRighthover,
		mrCustomMarginRightdesktop,
		mrCustomMarginRightlaptop,
		mrCustomMarginRighttablet,
		mrCustomMarginRightphone,
		mrMarginBottom,
		mrMarginBottomhover,
		mrMarginBottomdesktop,
		mrMarginBottomlaptop,
		mrMarginBottomtablet,
		mrMarginBottomphone,
		mrCustomMarginBottom,
		mrCustomMarginBottomhover,
		mrCustomMarginBottomdesktop,
		mrCustomMarginBottomlaptop,
		mrCustomMarginBottomtablet,
		mrCustomMarginBottomphone,
		mrMarginLeft,
		mrMarginLefthover,
		mrMarginLeftdesktop,
		mrMarginLeftlaptop,
		mrMarginLefttablet,
		mrMarginLeftphone,
		mrCustomMarginLeft,
		mrCustomMarginLefthover,
		mrCustomMarginLeftdesktop,
		mrCustomMarginLeftlaptop,
		mrCustomMarginLefttablet,
		mrCustomMarginLeftphone,
		mrPosition,
		mrPositiondesktop,
		mrPositionlaptop,
		mrPositiontablet,
		mrPositionphone,
		mrPositionAlignment,
		mrPositionAlignmentdesktop,
		mrPositionAlignmentlaptop,
		mrPositionAlignmenttablet,
		mrPositionAlignmentphone,
		mrPositionSides,
		mrPositionSidesdesktop,
		mrPositionSideslaptop,
		mrPositionSidestablet,
		mrPositionSidesphone,
		mrContentAlignment,
		mrContentAlignmentdesktop,
		mrContentAlignmentlaptop,
		mrContentAlignmenttablet,
		mrContentAlignmentphone,
		mrVerticalOffset,
		mrVerticalOffsetdesktop,
		mrVerticalOffsetlaptop,
		mrVerticalOffsettablet,
		mrVerticalOffsetphone,
		mrHorizontalOffset,
		mrHorizontalOffsetdesktop,
		mrHorizontalOffsetlaptop,
		mrHorizontalOffsettablet,
		mrHorizontalOffsetphone,
		mrSizeOptions,
		mrSizeOptionshover,
		mrSizeOptionsdesktop,
		mrSizeOptionslaptop,
		mrSizeOptionstablet,
		mrSizeOptionsphone,
		mrSize,
		mrSizehover,
		mrSizedesktop,
		mrSizelaptop,
		mrSizetablet,
		mrSizephone,
		mrCustomSize,
		mrCustomSizehover,
		mrCustomSizedesktop,
		mrCustomSizelaptop,
		mrCustomSizetablet,
		mrCustomSizephone,
		mrFontSizeOptions,
		mrFontSizeOptionshover,
		mrFontSizeOptionsdesktop,
		mrFontSizeOptionslaptop,
		mrFontSizeOptionstablet,
		mrFontSizeOptionsphone,
		mrFontSize,
		mrFontSizehover,
		mrFontSizedesktop,
		mrFontSizelaptop,
		mrFontSizetablet,
		mrFontSizephone,
		mrCustomFontSize,
		mrCustomFontSizehover,
		mrCustomFontSizedesktop,
		mrCustomFontSizelaptop,
		mrCustomFontSizetablet,
		mrCustomFontSizephone,
		mrTextAlignment,
		mrTextAlignmentdesktop,
		mrTextAlignmentlaptop,
		mrTextAlignmenttablet,
		mrTextAlignmentphone,
		mrScroll,
		mrScrollhover,
		mrScrolldesktop,
		mrScrolllaptop,
		mrScrolltablet,
		mrScrollphone,
	} = attributes;

	//check if attribute exists for old Gutenberg version compatibility
	//add mrAllowedBlocks restriction

	let mrClassNames = "";
	let mrAttr = "";
	let mrAttrValue = "";

	if (!mrSizeOptions || !mrSizeOptions.includes("-sizeoptions")) {
		if (mrSize) {
			mrClassNames = mrClassNames + " mr-size" + mrSize;
		}
		if (mrSizehover) {
			mrClassNames = mrClassNames + " mr-hover-size" + mrSizehover;
		}
		if (mrSizedesktop) {
			mrClassNames = mrClassNames + " mr-desktop-size" + mrSizedesktop;
		}
		if (mrSizelaptop) {
			mrClassNames = mrClassNames + " mr-laptop-size" + mrSizelaptop;
		}
		if (mrSizetablet) {
			mrClassNames = mrClassNames + " mr-tablet-size" + mrSizetablet;
		}
		if (mrSizephone) {
			mrClassNames = mrClassNames + " mr-phone-size" + mrSizephone;
		}
	} else if (mrSizeOptions && mrSizeOptions.includes("-sizeoptions")) {
		if (mrCustomSize) {
			mrClassNames = mrClassNames + mrCustomSize;
		}
		if (mrCustomSizehover) {
			mrClassNames = mrClassNames + mrCustomSizehover;
		}
		if (mrCustomSizedesktop) {
			mrClassNames = mrClassNames + mrCustomSizedesktop;
		}
		if (mrCustomSizelaptop) {
			mrClassNames = mrClassNames + mrCustomSizelaptop;
		}
		if (mrCustomSizetablet) {
			mrClassNames = mrClassNames + mrCustomSizetablet;
		}
		if (mrCustomSizephone) {
			mrClassNames = mrClassNames + mrCustomSizephone;
		}
	}

	if (!mrFontSizeOptions || !mrFontSizeOptions.includes("-fontsizeoptions")) {
		if (mrFontSize) {
			mrClassNames = mrClassNames + " mr-fontsize" + mrFontSize;
		}
		if (mrFontSizehover) {
			mrClassNames = mrClassNames + " mr-hover-fontsize" + mrFontSizehover;
		}
		if (mrFontSizedesktop) {
			mrClassNames = mrClassNames + " mr-desktop-fontsize" + mrFontSizedesktop;
		}
		if (mrFontSizelaptop) {
			mrClassNames = mrClassNames + " mr-laptop-fontsize" + mrFontSizelaptop;
		}
		if (mrFontSizetablet) {
			mrClassNames = mrClassNames + " mr-tablet-fontsize" + mrFontSizetablet;
		}
		if (mrFontSizephone) {
			mrClassNames = mrClassNames + " mr-phone-fontsize" + mrFontSizephone;
		}
	} else if (
		mrFontSizeOptions &&
		mrFontSizeOptions.includes("-fontsizeoptions")
	) {
		if (mrCustomFontSize) {
			mrClassNames = mrClassNames + mrCustomFontSize;
		}
		if (mrCustomFontSizehover) {
			mrClassNames = mrClassNames + mrCustomFontSizehover;
		}
		if (mrCustomFontSizedesktop) {
			mrClassNames = mrClassNames + mrCustomFontSizedesktop;
		}
		if (mrCustomFontSizelaptop) {
			mrClassNames = mrClassNames + mrCustomFontSizelaptop;
		}
		if (mrCustomFontSizetablet) {
			mrClassNames = mrClassNames + mrCustomFontSizetablet;
		}
		if (mrCustomFontSizephone) {
			mrClassNames = mrClassNames + mrCustomFontSizephone;
		}
	}

	if (mrAllowedBlocks.includes(blockType.name)) {
		Object.keys(attributes).forEach(function (value) {
			mrAttr = value;
			mrAttrValue = attributes[value];
			if (
				mrAttrValue !== "mr-" &&
				mrAttrValue !== "mr-hover" &&
				mrAttrValue !== "mr-desktop" &&
				mrAttrValue !== "mr-laptop" &&
				mrAttrValue !== "mr-tablet" &&
				mrAttrValue !== "mr-phone" &&
				!mrAttr.includes("mrCustom") &&
				!mrAttr.includes("mrFontSize")
			) {
				if (mrAttr == "mrPerPage" && mrAttrValue) {
					if (mrAttrValue > 0) {
						mrClassNames = mrClassNames + " mr-" + mrAttrValue + "perpage";
					}
				} else if (mrAttr == "mrArrowPagination" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-arrowpagination";
				} else if (mrAttr == "mrSelectPagination" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-selectpagination";
				} else if (mrAttr == "mrRadioPagination" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-radiopagination";
				} else if (mrAttr == "mrAnimation" && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue + " mr-active";
				} else if (mrAttr == "mrAnimationhover" && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue + " mr-active";
				} else if (mrAttr == "mrActiveWhen" && mrAttrValue) {
					mrClassNames = mrClassNames.replace(" mr-active", "");
					mrClassNames = mrClassNames + mrAttrValue;
				} else if (
					mrAttr.includes("mrPadding") &&
					mrAttrValue &&
					mrAttrValue.includes("-padding")
				) {
					if (mrAttr == "mrPaddingTop" && mrCustomPaddingTop) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingTop;
					} else if (mrAttr == "mrPaddingTophover" && mrCustomPaddingTophover) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingTophover;
					} else if (
						mrAttr == "mrPaddingTopdesktop" &&
						mrCustomPaddingTopdesktop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingTopdesktop;
					} else if (
						mrAttr == "mrPaddingToplaptop" &&
						mrCustomPaddingToplaptop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingToplaptop;
					} else if (
						mrAttr == "mrPaddingToplaptablet" &&
						mrCustomPaddingToptablet
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingToptablet;
					} else if (
						mrAttr == "mrPaddingToplapphone" &&
						mrCustomPaddingTopphone
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingTopphone;
					} else if (mrAttr == "mrPaddingRight" && mrCustomPaddingRight) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRight;
					} else if (
						mrAttr == "mrPaddingRighthover" &&
						mrCustomPaddingRighthover
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRighthover;
					} else if (
						mrAttr == "mrPaddingRightdesktop" &&
						mrCustomPaddingRightdesktop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRightdesktop;
					} else if (
						mrAttr == "mrPaddingRightlaptop" &&
						mrCustomPaddingRightlaptop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRightlaptop;
					} else if (
						mrAttr == "mrPaddingRightlaptablet" &&
						mrCustomPaddingRighttablet
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRighttablet;
					} else if (
						mrAttr == "mrPaddingRightlapphone" &&
						mrCustomPaddingRightphone
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingRightphone;
					} else if (mrAttr == "mrPaddingBottom" && mrCustomPaddingBottom) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottom;
					} else if (
						mrAttr == "mrPaddingBottomhover" &&
						mrCustomPaddingBottomhover
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottomhover;
					} else if (
						mrAttr == "mrPaddingBottomdesktop" &&
						mrCustomPaddingBottomdesktop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottomdesktop;
					} else if (
						mrAttr == "mrPaddingBottomlaptop" &&
						mrCustomPaddingBottomlaptop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottomlaptop;
					} else if (
						mrAttr == "mrPaddingBottomlaptablet" &&
						mrCustomPaddingBottomtablet
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottomtablet;
					} else if (
						mrAttr == "mrPaddingBottomlapphone" &&
						mrCustomPaddingBottomphone
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingBottomphone;
					} else if (mrAttr == "mrPaddingLeft" && mrCustomPaddingLeft) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLeft;
					} else if (
						mrAttr == "mrPaddingLefthover" &&
						mrCustomPaddingLefthover
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLefthover;
					} else if (
						mrAttr == "mrPaddingLeftdesktop" &&
						mrCustomPaddingLeftdesktop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLeftdesktop;
					} else if (
						mrAttr == "mrPaddingLeftlaptop" &&
						mrCustomPaddingLeftlaptop
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLeftlaptop;
					} else if (
						mrAttr == "mrPaddingLeftlaptablet" &&
						mrCustomPaddingLefttablet
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLefttablet;
					} else if (
						mrAttr == "mrPaddingLeftlapphone" &&
						mrCustomPaddingLeftphone
					) {
						mrClassNames = mrClassNames + " " + mrCustomPaddingLeftphone;
					} else {
						mrClassNames = mrClassNames + mrAttrValue;
					}
				} else if (
					mrAttr.startsWith("mr") &&
					mrAttrValue &&
					mrAttrValue.startsWith("mr")
				) {
					mrClassNames = mrClassNames + " " + mrAttrValue;
				} else if (mrAttr.startsWith("mr") && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue;
				}
			}
		});
	}

	extraProps.className = classnames(extraProps.className, mrClassNames);

	return extraProps;
}

/*function mrApplyExtraStyles(extraProps, blockType, attributes) {
	  const { mrPaddingTop, mrCustomPaddingTop } = attributes;
  
	  let mrInlineStyles = "";
	  let mrAttr = "";
	  let mrAttrValue = "";
	  if (mrAllowedBlocks.includes(blockType.name)) {
		  Object.keys(attributes).forEach(function (value) {
			  mrAttr = value;
			  mrAttrValue = attributes[value];
			  if (
				  mrAttrValue !== "mr-" &&
				  mrAttrValue !== "mr-desktop" &&
				  mrAttrValue !== "mr-laptop" &&
				  mrAttrValue !== "mr-tablet" &&
				  mrAttrValue !== "mr-phone" &&
				  mrAttr.includes("mrCustom")
			  ) {
				  if (
					  mrPaddingTop.includes("-custom") &&
					  mrAttr == "mrCustomPaddingTop" &&
					  mrAttrValue
				  ) {
					  mrInlineStyles = mrInlineStyles + "padding-top:" + mrAttrValue + ";";
				  }
			  }
		  });
	  }
  
	  if (mrInlineStyles) {
		  return lodash.assign(extraProps, { style: mrInlineStyles });
	  }
  }*/

//add filters

addFilter(
	"blocks.registerBlockType",
	"mr-utils/custom-attributes",
	mrAddAttributes
);

addFilter("editor.BlockEdit", "mr-utils/custom-control", mrInspectorControls);

addFilter(
	"blocks.getSaveContent.extraProps",
	"mr-utils/mrApplyExtraClass",
	mrApplyExtraClass
);

/*addFilter(
	  "blocks.getSaveContent.extraProps",
	  "mr-utils/mrApplyExtraStyles",
	  mrApplyExtraStyles
  );*/

addFilter(
	"editor.BlockListBlock",
	"mr-utils/mrApplyWrapperExtraClass",
	mrApplyWrapperExtraClass
);
