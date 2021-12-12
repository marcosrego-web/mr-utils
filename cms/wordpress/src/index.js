/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";

import { addFilter } from "@wordpress/hooks";

import { Fragment } from "@wordpress/element";

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
	/*"core/archives",
	"core/categories",
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
				default: "",
			},
			mrAnimationhover: {
				type: "string",
				default: "",
			},
			mrTransition: {
				type: "string",
				default: "",
			},
			mrTransitionhover: {
				type: "string",
				default: "",
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
				type: "string",
				default: "",
			},
			mrSelectPagination: {
				type: "string",
				default: "",
			},
			mrRadioPagination: {
				type: "string",
				default: "",
			},
			mrComponent: {
				type: "string",
				default: "",
			},
			mrActiveWhen: {
				type: "string",
				default: "",
			},
			mrNavPosition: {
				type: "string",
				default: "",
			},
			mrPerLine: {
				type: "string",
				default: "",
			},
			mrPerLinedesktop: {
				type: "string",
				default: "",
			},
			mrPerLinelaptop: {
				type: "string",
				default: "",
			},
			mrPerLinetablet: {
				type: "string",
				default: "",
			},
			mrPerLinephone: {
				type: "string",
				default: "",
			},
			mrOrder: {
				type: "string",
				default: "",
			},
			mrOrderdesktop: {
				type: "string",
				default: "",
			},
			mrOrderlaptop: {
				type: "string",
				default: "",
			},
			mrOrdertablet: {
				type: "string",
				default: "",
			},
			mrOrderphone: {
				type: "string",
				default: "",
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
			mrDisplay: {
				type: "string",
				default: "",
			},
			mrDisplayhover: {
				type: "string",
				default: "",
			},
			mrDisplaydesktop: {
				type: "string",
				default: "",
			},
			mrDisplaylaptop: {
				type: "string",
				default: "",
			},
			mrDisplaytablet: {
				type: "string",
				default: "",
			},
			mrDisplayphone: {
				type: "string",
				default: "",
			},
			mrWrap: {
				type: "string",
				default: "",
			},
			mrWrapdesktop: {
				type: "string",
				default: "",
			},
			mrWraplaptop: {
				type: "string",
				default: "",
			},
			mrWraptablet: {
				type: "string",
				default: "",
			},
			mrWrapphone: {
				type: "string",
				default: "",
			},
			mrPaddingTop: {
				type: "string",
				default: "",
			},
			mrPaddingTophover: {
				type: "string",
				default: "",
			},
			mrPaddingTopdesktop: {
				type: "string",
				default: "",
			},
			mrPaddingToplaptop: {
				type: "string",
				default: "",
			},
			mrPaddingToptablet: {
				type: "string",
				default: "",
			},
			mrPaddingTopphone: {
				type: "string",
				default: "",
			},
			mrPaddingRight: {
				type: "string",
				default: "",
			},
			mrPaddingRighthover: {
				type: "string",
				default: "",
			},
			mrPaddingRightdesktop: {
				type: "string",
				default: "",
			},
			mrPaddingRightlaptop: {
				type: "string",
				default: "",
			},
			mrPaddingRighttablet: {
				type: "string",
				default: "",
			},
			mrPaddingRightphone: {
				type: "string",
				default: "",
			},
			mrPaddingBottom: {
				type: "string",
				default: "",
			},
			mrPaddingBottomhover: {
				type: "string",
				default: "",
			},
			mrPaddingBottomdesktop: {
				type: "string",
				default: "",
			},
			mrPaddingBottomlaptop: {
				type: "string",
				default: "",
			},
			mrPaddingBottomtablet: {
				type: "string",
				default: "",
			},
			mrPaddingBottomphone: {
				type: "string",
				default: "",
			},
			mrPaddingLeft: {
				type: "string",
				default: "",
			},
			mrPaddingLefthover: {
				type: "string",
				default: "",
			},
			mrPaddingLeftdesktop: {
				type: "string",
				default: "",
			},
			mrPaddingLeftlaptop: {
				type: "string",
				default: "",
			},
			mrPaddingLefttablet: {
				type: "string",
				default: "",
			},
			mrPaddingLeftphone: {
				type: "string",
				default: "",
			},
			mrMarginTop: {
				type: "string",
				default: "",
			},
			mrMarginTophover: {
				type: "string",
				default: "",
			},
			mrMarginTopdesktop: {
				type: "string",
				default: "",
			},
			mrMarginToplaptop: {
				type: "string",
				default: "",
			},
			mrMarginToptablet: {
				type: "string",
				default: "",
			},
			mrMarginTopphone: {
				type: "string",
				default: "",
			},
			mrMarginRight: {
				type: "string",
				default: "",
			},
			mrMarginRighthover: {
				type: "string",
				default: "",
			},
			mrMarginRightdesktop: {
				type: "string",
				default: "",
			},
			mrMarginRightlaptop: {
				type: "string",
				default: "",
			},
			mrMarginRighttablet: {
				type: "string",
				default: "",
			},
			mrMarginRightphone: {
				type: "string",
				default: "",
			},
			mrMarginBottom: {
				type: "string",
				default: "",
			},
			mrMarginBottomhover: {
				type: "string",
				default: "",
			},
			mrMarginBottomdesktop: {
				type: "string",
				default: "",
			},
			mrMarginBottomlaptop: {
				type: "string",
				default: "",
			},
			mrMarginBottomtablet: {
				type: "string",
				default: "",
			},
			mrMarginBottomphone: {
				type: "string",
				default: "",
			},
			mrMarginLeft: {
				type: "string",
				default: "",
			},
			mrMarginLefthover: {
				type: "string",
				default: "",
			},
			mrMarginLeftdesktop: {
				type: "string",
				default: "",
			},
			mrMarginLeftlaptop: {
				type: "string",
				default: "",
			},
			mrMarginLefttablet: {
				type: "string",
				default: "",
			},
			mrMarginLeftphone: {
				type: "string",
				default: "",
			},
			mrPosition: {
				type: "string",
				default: "",
			},
			mrPositiondesktop: {
				type: "string",
				default: "",
			},
			mrPositionlaptop: {
				type: "string",
				default: "",
			},
			mrPositiontablet: {
				type: "string",
				default: "",
			},
			mrPositionphone: {
				type: "string",
				default: "",
			},
			mrPositionAlignment: {
				type: "string",
				default: "",
			},
			mrPositionAlignmentdesktop: {
				type: "string",
				default: "",
			},
			mrPositionAlignmentlaptop: {
				type: "string",
				default: "",
			},
			mrPositionAlignmenttablet: {
				type: "string",
				default: "",
			},
			mrPositionAlignmentphone: {
				type: "string",
				default: "",
			},
			mrPositionSides: {
				type: "string",
				default: "",
			},
			mrPositionSidesdesktop: {
				type: "string",
				default: "",
			},
			mrPositionSideslaptop: {
				type: "string",
				default: "",
			},
			mrPositionSidestablet: {
				type: "string",
				default: "",
			},
			mrPositionSidesphone: {
				type: "string",
				default: "",
			},
			mrContentAlignment: {
				type: "string",
				default: "",
			},
			mrContentAlignmentdesktop: {
				type: "string",
				default: "",
			},
			mrContentAlignmentlaptop: {
				type: "string",
				default: "",
			},
			mrContentAlignmenttablet: {
				type: "string",
				default: "",
			},
			mrContentAlignmentphone: {
				type: "string",
				default: "",
			},

			mrVerticalOffset: {
				type: "string",
				default: "",
			},
			mrVerticalOffsetdesktop: {
				type: "string",
				default: "",
			},
			mrVerticalOffsetlaptop: {
				type: "string",
				default: "",
			},
			mrVerticalOffsettablet: {
				type: "string",
				default: "",
			},
			mrVerticalOffsetphone: {
				type: "string",
				default: "",
			},
			mrHorizontalOffset: {
				type: "string",
				default: "",
			},
			mrHorizontalOffsetdesktop: {
				type: "string",
				default: "",
			},
			mrHorizontalOffsetlaptop: {
				type: "string",
				default: "",
			},
			mrHorizontalOffsettablet: {
				type: "string",
				default: "",
			},
			mrHorizontalOffsetphone: {
				type: "string",
				default: "",
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
			mrTextAlignment: {
				type: "string",
				default: "",
			},
			mrTextAlignmentdesktop: {
				type: "string",
				default: "",
			},
			mrTextAlignmentlaptop: {
				type: "string",
				default: "",
			},
			mrTextAlignmenttablet: {
				type: "string",
				default: "",
			},
			mrTextAlignmentphone: {
				type: "string",
				default: "",
			},
			mrScroll: {
				type: "string",
				default: "",
			},
			mrScrollhover: {
				type: "string",
				default: "",
			},
			mrScrolldesktop: {
				type: "string",
				default: "",
			},
			mrScrolllaptop: {
				type: "string",
				default: "",
			},
			mrScrolltablet: {
				type: "string",
				default: "",
			},
			mrScrollphone: {
				type: "string",
				default: "",
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
			mrSize,
			mrSizehover,
			mrSizedesktop,
			mrSizelaptop,
			mrSizetablet,
			mrSizephone,
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
			mrPaddingRight,
			mrPaddingRighthover,
			mrPaddingRightdesktop,
			mrPaddingRightlaptop,
			mrPaddingRighttablet,
			mrPaddingRightphone,
			mrPaddingBottom,
			mrPaddingBottomhover,
			mrPaddingBottomdesktop,
			mrPaddingBottomlaptop,
			mrPaddingBottomtablet,
			mrPaddingBottomphone,
			mrPaddingLeft,
			mrPaddingLefthover,
			mrPaddingLeftdesktop,
			mrPaddingLeftlaptop,
			mrPaddingLefttablet,
			mrPaddingLeftphone,
			mrMarginTop,
			mrMarginTophover,
			mrMarginTopdesktop,
			mrMarginToplaptop,
			mrMarginToptablet,
			mrMarginTopphone,
			mrMarginRight,
			mrMarginRighthover,
			mrMarginRightdesktop,
			mrMarginRightlaptop,
			mrMarginRighttablet,
			mrMarginRightphone,
			mrMarginBottom,
			mrMarginBottomhover,
			mrMarginBottomdesktop,
			mrMarginBottomlaptop,
			mrMarginBottomtablet,
			mrMarginBottomphone,
			mrMarginLeft,
			mrMarginLefthover,
			mrMarginLeftdesktop,
			mrMarginLeftlaptop,
			mrMarginLefttablet,
			mrMarginLeftphone,
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
			mrFontSize,
			mrFontSizehover,
			mrFontSizedesktop,
			mrFontSizelaptop,
			mrFontSizetablet,
			mrFontSizephone,
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
								{props.name === "core/archives" ||
								props.name === "core/categories" ||
								props.name === "core/latest-comments" ||
								props.name === "core/latest-posts" ||
								props.name === "core/latestComments" ||
								props.name === "core/latestPosts" ||
								props.name === "core/rss" ||
								props.name === "core/query" ||
								props.name === "core/post-terms" ||
								props.name === "core/post-template" ||
								props.name === "core/site-logo" ||
								props.name === "core/site-tagline" ||
								props.name === "core/calendar" ||
								props.name === "core/page-list" ||
								props.name === "core/tag-cloud" ||
								props.name === "core/search" ||
								props.name === "core/loginout" ||
								props.name === "core/navigation" ||
								props.name === "core/post-author" ||
								props.name === "core/post-comments" ||
								props.name === "core/post-content" ||
								props.name === "core/post-date" ||
								props.name === "core/post-excerpt" ||
								props.name === "core/post-featured-image" ||
								props.name === "core/post-title" ||
								props.name === "core/template-part" ||
								props.name === "core/term-description" ||
								props.name === "core/post-navigation-link" ? (
									<>
										<p>
											Currently this block does not fully support the utilities
											interface. In alternative, you can use{" "}
											<a
												href="https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes"
												target="_blank"
											>
												utility classes
											</a>{" "}
											in <b>Advanced - Additional CSS class(es)</b>.
										</p>
										<p>
											{" "}
											<a
												href="https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes"
												target="_blank"
											>
												Know more
											</a>{" "}
										</p>
									</>
								) : (
									<>
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
																	title={
																		tab.name + __(" Pagination", "mr-utils")
																	}
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
																					val === undefined || val === 0
																						? ""
																						: val,
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
																					{ value: "", label: "Bottom" },
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
																								: val.includes("-desktop-") ||
																								  val.includes("-laptop-") ||
																								  val.includes("-tablet-") ||
																								  val.includes("-phone-") ||
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
																	title={
																		tab.name + __(" Components", "mr-utils")
																	}
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
																			{ value: "", label: "Default" },
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-tabs"
																				).replace("--", "-"),
																				label: "Tabs",
																			},
																		]}
																		onChange={(val) =>
																			setAttributes({
																				mrComponent:
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-") ||
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
																			label={__(
																				"Navigation position",
																				"mr-utils"
																			)}
																			value={mrNavPosition}
																			options={[
																				{ value: "", label: "Top" },
																				{
																					value: (
																						" mr-" +
																						tab.name +
																						"-tabsbottom"
																					).replace("--", "-"),
																					label: "Bottom",
																				},
																			]}
																			onChange={(val) =>
																				setAttributes({
																					mrNavPosition:
																						val === undefined || val === ""
																							? ""
																							: val.includes("-desktop-") ||
																							  val.includes("-laptop-") ||
																							  val.includes("-tablet-") ||
																							  val.includes("-phone-") ||
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
																		{ value: "", label: "Default" },
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-fade"
																			).replace("--", "-"),
																			label: "Fade",
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
																			value: (
																				" mr-" +
																				tab.name +
																				"-scale"
																			).replace("--", "-"),
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
																			value: (
																				" mr-" +
																				tab.name +
																				"-zoom"
																			).replace("--", "-"),
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
																					: val.includes("-desktop-") ||
																					  val.includes("-laptop-") ||
																					  val.includes("-tablet-") ||
																					  val.includes("-phone-") ||
																					  val.includes("-hover-")
																					? mrAnimation
																					: val.replace("--", "-"),
																			mrAnimationhover:
																				val === undefined || val === ""
																					? ""
																					: val !== undefined &&
																					  val.includes("-hover-")
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
																		{ value: "", label: "Default" },
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
																				val === undefined || val === ""
																					? ""
																					: val.includes("-desktop-") ||
																					  val.includes("-laptop-") ||
																					  val.includes("-tablet-") ||
																					  val.includes("-phone-") ||
																					  val.includes("-hover-")
																					? mrTransition
																					: val.replace("--", "-"),
																			mrTransitionhover:
																				val === undefined || val === ""
																					? ""
																					: val !== undefined &&
																					  val.includes("-hover-")
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
																			{ value: "", label: "Default" },
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
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-") ||
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
																label={__(
																	"Number of items per line",
																	"mr-utils"
																)}
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
																				{ value: "", label: "" },
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
																			val === undefined || val === ""
																				? ""
																				: val.includes("-desktop-") ||
																				  val.includes("-laptop-") ||
																				  val.includes("-tablet-") ||
																				  val.includes("-phone-")
																				? mrPerLine
																				: val.replace("--", "-"),
																		mrPerLinedesktop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-desktop-")
																				? val
																				: mrPerLinedesktop,
																		mrPerLinelaptop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-laptop-")
																				? val
																				: mrPerLinelaptop,
																		mrPerLinetablet:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-tablet-")
																				? val
																				: mrPerLinetablet,
																		mrPerLinephone:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-phone-")
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
															<RangeControl
																label={__("Item size", "mr-utils")}
																value={
																	tab.name === "desktop"
																		? mrSizedesktop
																		: tab.name === "hover"
																		? mrSizehover
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
																		? getComputedStyle(
																				document.documentElement
																		  ).getPropertyValue("--size-" + mrSize) +
																		  " var(--size-" +
																		  mrSize +
																		  ")"
																		: tab.name == "hover" && mrSizehover > 0
																		? "var(--size-" + mrSizehover + ")"
																		: tab.name == "desktop" && mrSizedesktop > 0
																		? "var(--size-" + mrSizedesktop + ")"
																		: tab.name == "laptop" && mrSizelaptop > 0
																		? "var(--size-" + mrSizelaptop + ")"
																		: tab.name == "tablet" && mrSizetablet > 0
																		? "var(--size-" + mrSizetablet + ")"
																		: tab.name == "phone" && mrSizephone > 0
																		? "var(--size-" + mrSizephone + ")"
																		: ""
																}
															/>
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
																				{ value: "", label: "" },
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
																			val === undefined || val === ""
																				? ""
																				: val.includes("-desktop-") ||
																				  val.includes("-laptop-") ||
																				  val.includes("-tablet-") ||
																				  val.includes("-phone-")
																				? mrOrder
																				: val.replace("--", "-"),
																		mrOrderdesktop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-desktop-")
																				? val
																				: mrOrderdesktop,
																		mrOrderlaptop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-laptop-")
																				? val
																				: mrOrderlaptop,
																		mrOrdertablet:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-tablet-")
																				? val
																				: mrOrdertablet,
																		mrOrderphone:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-phone-")
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
																	{ value: "", label: "Default" },
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-hide"
																		).replace("--", "-"),
																		label: "Hide",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-show"
																		).replace("--", "-"),
																		label: "Show",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-none"
																		).replace("--", "-"),
																		label: "None",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-flex"
																		).replace("--", "-"),
																		label: "Flex",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-block"
																		).replace("--", "-"),
																		label: "Block",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-visible"
																		).replace("--", "-"),
																		label: "Visible",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-hidden"
																		).replace("--", "-"),
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
																		value: (
																			" mr-" +
																			tab.name +
																			"-opaque"
																		).replace("--", "-"),
																		label: "Opaque",
																	},
																]}
																onChange={(val) =>
																	setAttributes({
																		mrDisplay:
																			val === undefined || val === ""
																				? ""
																				: val.includes("-desktop-") ||
																				  val.includes("-laptop-") ||
																				  val.includes("-tablet-") ||
																				  val.includes("-phone-")
																				? mrDisplay
																				: val.replace("--", "-"),
																		mrDisplayhover:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-hover-")
																				? val
																				: mrDisplayhover,
																		mrDisplaydesktop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-desktop-")
																				? val
																				: mrDisplaydesktop,
																		mrDisplaylaptop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-laptop-")
																				? val
																				: mrDisplaylaptop,
																		mrDisplaytablet:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-tablet-")
																				? val
																				: mrDisplaytablet,
																		mrDisplayphone:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-phone-")
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
																	mrDisplaydesktop ===
																		" mr-desktop-transparent" ||
																	mrDisplaylaptop === " mr-laptop-hidden" ||
																	mrDisplaylaptop === " mr-laptop-hide" ||
																	mrDisplaylaptop === " mr-laptop-none" ||
																	mrDisplaylaptop ===
																		" mr-laptop-transparent" ||
																	mrDisplaytablet === " mr-tablet-hidden" ||
																	mrDisplaytablet === " mr-tablet-hide" ||
																	mrDisplaytablet === " mr-tablet-none" ||
																	mrDisplaytablet ===
																		" mr-tablet-transparent" ||
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
																				{ value: "", label: "Default" },
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
																			val === undefined || val === ""
																				? ""
																				: val.includes("-desktop-") ||
																				  val.includes("-laptop-") ||
																				  val.includes("-tablet-") ||
																				  val.includes("-phone-")
																				? mrWrap
																				: val.replace("--", "-"),
																		mrWrapdesktop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-desktop-")
																				? val
																				: mrWrapdesktop,
																		mrWraplaptop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-laptop-")
																				? val
																				: mrWraplaptop,
																		mrWraptablet:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-tablet-")
																				? val
																				: mrWraptablet,
																		mrWrapphone:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-phone-")
																				? val
																				: mrWrapphone,
																	})
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
																							value: "",
																							label: "Default padding",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-paddingtop"
																							).replace("--", "-"),
																							label: "Use var(--padding)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nopaddingtop"
																							).replace("--", "-"),
																							label: "Remove padding",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrPaddingTop:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrPaddingTop
																									: val.replace("--", "-"),
																							mrPaddingTophover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrPaddingTophover,
																							mrPaddingTopdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrPaddingTopdesktop,
																							mrPaddingToplaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrPaddingToplaptop,
																							mrPaddingToptablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrPaddingToptablet,
																							mrPaddingTopphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrPaddingTopphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__(
																						"Padding Right",
																						"mr-utils"
																					)}
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
																							value: "",
																							label: "Default padding",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-paddingright"
																							).replace("--", "-"),
																							label: "Use var(--padding)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nopaddingright"
																							).replace("--", "-"),
																							label: "Remove padding",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrPaddingRight:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrPaddingRight
																									: val.replace("--", "-"),
																							mrPaddingRighthover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrPaddingRighthover,
																							mrPaddingRightdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrPaddingRightdesktop,
																							mrPaddingRightlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrPaddingRightlaptop,
																							mrPaddingRighttablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrPaddingRighttablet,
																							mrPaddingRightphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrPaddingRightphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__(
																						"Padding Bottom",
																						"mr-utils"
																					)}
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
																							value: "",
																							label: "Default padding",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-paddingbottom"
																							).replace("--", "-"),
																							label: "Use var(--padding)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nopaddingbottom"
																							).replace("--", "-"),
																							label: "Remove padding",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrPaddingBottom:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrPaddingBottom
																									: val.replace("--", "-"),
																							mrPaddingBottomhover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrPaddingBottomhover,
																							mrPaddingBottomdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrPaddingBottomdesktop,
																							mrPaddingBottomlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrPaddingBottomlaptop,
																							mrPaddingBottomtablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrPaddingBottomtablet,
																							mrPaddingBottomphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrPaddingBottomphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__("Padding Left", "mr-utils")}
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
																							value: "",
																							label: "Default padding",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-paddingleft"
																							).replace("--", "-"),
																							label: "Use var(--padding)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nopaddingleft"
																							).replace("--", "-"),
																							label: "Remove padding",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrPaddingLeft:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrPaddingLeft
																									: val.replace("--", "-"),
																							mrPaddingLefthover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrPaddingLefthover,
																							mrPaddingLeftdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrPaddingLeftdesktop,
																							mrPaddingLeftlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrPaddingLeftlaptop,
																							mrPaddingLefttablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrPaddingLefttablet,
																							mrPaddingLeftphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrPaddingLeftphone,
																						})
																					}
																				/>
																			</>
																		) : (
																			<>
																				<p></p>
																				<SelectControl
																					label={__("Margin Top", "mr-utils")}
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
																							value: "",
																							label: "Default margin",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-margintop"
																							).replace("--", "-"),
																							label: "Use var(--margin)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nomargintop"
																							).replace("--", "-"),
																							label: "Remove margin",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrMarginTop:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrMarginTop
																									: val.replace("--", "-"),
																							mrMarginTophover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrMarginTophover,
																							mrMarginTopdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrMarginTopdesktop,
																							mrMarginToplaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrMarginToplaptop,
																							mrMarginToptablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrMarginToptablet,
																							mrMarginTopphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrMarginTopphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__("Margin Right", "mr-utils")}
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
																							value: "",
																							label: "Default margin",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-marginright"
																							).replace("--", "-"),
																							label: "Use var(--margin)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nomarginright"
																							).replace("--", "-"),
																							label: "Remove margin",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrMarginRight:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrMarginRight
																									: val.replace("--", "-"),
																							mrMarginRighthover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrMarginRighthover,
																							mrMarginRightdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrMarginRightdesktop,
																							mrMarginRightlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrMarginRightlaptop,
																							mrMarginRighttablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrMarginRighttablet,
																							mrMarginRightphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrMarginRightphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__(
																						"Margin Bottom",
																						"mr-utils"
																					)}
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
																							value: "",
																							label: "Default margin",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-marginbottom"
																							).replace("--", "-"),
																							label: "Use var(--margin)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nomarginbottom"
																							).replace("--", "-"),
																							label: "Remove margin",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrMarginBottom:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrMarginBottom
																									: val.replace("--", "-"),
																							mrMarginBottomhover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrMarginBottomhover,
																							mrMarginBottomdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrMarginBottomdesktop,
																							mrMarginBottomlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrMarginBottomlaptop,
																							mrMarginBottomtablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrMarginBottomtablet,
																							mrMarginBottomphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrMarginBottomphone,
																						})
																					}
																				/>

																				<SelectControl
																					label={__("Margin Left", "mr-utils")}
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
																							value: "",
																							label: "Default margin",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-marginleft"
																							).replace("--", "-"),
																							label: "Use var(--margin)",
																						},
																						{
																							value: (
																								" mr-" +
																								tab.name +
																								"-nomarginleft"
																							).replace("--", "-"),
																							label: "Remove margin",
																						},
																					]}
																					onChange={(val) =>
																						setAttributes({
																							mrMarginLeft:
																								val === undefined || val === ""
																									? ""
																									: val.includes("-desktop-") ||
																									  val.includes("-laptop-") ||
																									  val.includes("-tablet-") ||
																									  val.includes("-phone-")
																									? mrMarginLeft
																									: val.replace("--", "-"),
																							mrMarginLefthover:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-hover-")
																									? val
																									: mrMarginLefthover,
																							mrMarginLeftdesktop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-desktop-")
																									? val
																									: mrMarginLeftdesktop,
																							mrMarginLeftlaptop:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-laptop-")
																									? val
																									: mrMarginLeftlaptop,
																							mrMarginLefttablet:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-tablet-")
																									? val
																									: mrMarginLefttablet,
																							mrMarginLeftphone:
																								val === undefined || val === ""
																									? ""
																									: val !== undefined &&
																									  val.includes("-phone-")
																									? val
																									: mrMarginLeftphone,
																						})
																					}
																				/>
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
															<RangeControl
																label={__("Font Size", "mr-utils")}
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
																		? "var(--font-size-" + mrFontSize + ")"
																		: tab.name == "hover" && mrFontSizehover > 0
																		? "var(--font-size-" + mrFontSizehover + ")"
																		: tab.name == "desktop" &&
																		  mrFontSizedesktop > 0
																		? "var(--font-size-" +
																		  mrFontSizedesktop +
																		  ")"
																		: tab.name == "laptop" &&
																		  mrFontSizelaptop > 0
																		? "var(--font-size-" +
																		  mrFontSizelaptop +
																		  ")"
																		: tab.name == "tablet" &&
																		  mrFontSizetablet > 0
																		? "var(--font-size-" +
																		  mrFontSizetablet +
																		  ")"
																		: tab.name == "phone" && mrFontSizephone > 0
																		? "var(--font-size-" + mrFontSizephone + ")"
																		: ""
																}
															/>

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
																				mrAllowedBlocks.name !=
																					"core/paragraph") ||
																			(isSelected &&
																				mrAllowedBlocks.name != "core/heading")
																				? __([
																						{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrTextAlignment
																						: val.replace("--", "-"),
																				mrTextAlignmentdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrTextAlignmentdesktop,
																				mrTextAlignmentlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrTextAlignmentlaptop,
																				mrTextAlignmenttablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrTextAlignmenttablet,
																				mrTextAlignmentphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																	title={
																		tab.name + __(" Placement", "mr-utils")
																	}
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
																			{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrPosition
																						: val.replace("--", "-"),
																				mrPositiondesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrPositiondesktop,
																				mrPositionlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrPositionlaptop,
																				mrPositiontablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrPositiontablet,
																				mrPositionphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																			(mrPosition + tab.name).includes(
																				"fixed"
																			) ||
																			(mrPosition + tab.name).includes("sticky")
																				? __([
																						{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrPositionAlignment
																						: val.replace("--", "-"),
																				mrPositionAlignmentdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrPositionAlignmentdesktop,
																				mrPositionAlignmentlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrPositionAlignmentlaptop,
																				mrPositionAlignmenttablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrPositionAlignmenttablet,
																				mrPositionAlignmentphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
																						? val
																						: mrPositionAlignmentphone,
																			})
																		}
																	/>
																	<SelectControl
																		label={__(
																			"Horizontal Alignment",
																			"mr-utils"
																		)}
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
																			(mrPosition + tab.name).includes(
																				"fixed"
																			) ||
																			(mrPosition + tab.name).includes("sticky")
																				? __([
																						{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrPositionSides
																						: val.replace("--", "-"),
																				mrPositionSidesdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrPositionSidesdesktop,
																				mrPositionSideslaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrPositionSideslaptop,
																				mrPositionSidestablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrPositionSidestablet,
																				mrPositionSidesphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																			{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrContentAlignment
																						: val.replace("--", "-"),
																				mrContentAlignmentdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrContentAlignmentdesktop,
																				mrContentAlignmentlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrContentAlignmentlaptop,
																				mrContentAlignmenttablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrContentAlignmenttablet,
																				mrContentAlignmentphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																			{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrVerticalOffset
																						: val.replace("--", "-"),
																				mrVerticalOffsetdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrVerticalOffsetdesktop,
																				mrVerticalOffsetlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrVerticalOffsetlaptop,
																				mrVerticalOffsettablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrVerticalOffsettablet,
																				mrVerticalOffsetphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																			{ value: "", label: "Default" },
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
																					val === undefined || val === ""
																						? ""
																						: val.includes("-desktop-") ||
																						  val.includes("-laptop-") ||
																						  val.includes("-tablet-") ||
																						  val.includes("-phone-")
																						? mrHorizontalOffset
																						: val.replace("--", "-"),
																				mrHorizontalOffsetdesktop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-desktop-")
																						? val
																						: mrHorizontalOffsetdesktop,
																				mrHorizontalOffsetlaptop:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-laptop-")
																						? val
																						: mrHorizontalOffsetlaptop,
																				mrHorizontalOffsettablet:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-tablet-")
																						? val
																						: mrHorizontalOffsettablet,
																				mrHorizontalOffsetphone:
																					val === undefined || val === ""
																						? ""
																						: val !== undefined &&
																						  val.includes("-phone-")
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
																	{ value: "", label: "Default" },
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
																		value: (
																			" mr-" +
																			tab.name +
																			"-scroll"
																		).replace("--", "-"),
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
																			val === undefined || val === ""
																				? ""
																				: val.includes("-desktop-") ||
																				  val.includes("-laptop-") ||
																				  val.includes("-tablet-") ||
																				  val.includes("-phone-")
																				? mrScroll
																				: val.replace("--", "-"),
																		mrScrollhover:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-hover-")
																				? val
																				: mrScrollhover,
																		mrScrolldesktop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-desktop-")
																				? val
																				: mrScrolldesktop,
																		mrScrolllaptop:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-laptop-")
																				? val
																				: mrScrolllaptop,
																		mrScrolltablet:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-tablet-")
																				? val
																				: mrScrolltablet,
																		mrScrollphone:
																			val === undefined || val === ""
																				? ""
																				: val !== undefined &&
																				  val.includes("-phone-")
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
															However you cannot select them with the interface.
															In alternative, you can use{" "}
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
									</>
								)}

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
											<p>The framework will give you an interface to:</p>
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
				mrSize,
				mrSizehover,
				mrSizedesktop,
				mrSizelaptop,
				mrSizetablet,
				mrSizephone,
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
				mrPaddingRight,
				mrPaddingRighthover,
				mrPaddingRightdesktop,
				mrPaddingRightlaptop,
				mrPaddingRighttablet,
				mrPaddingRightphone,
				mrPaddingBottom,
				mrPaddingBottomhover,
				mrPaddingBottomdesktop,
				mrPaddingBottomlaptop,
				mrPaddingBottomtablet,
				mrPaddingBottomphone,
				mrPaddingLeft,
				mrPaddingLefthover,
				mrPaddingLeftdesktop,
				mrPaddingLeftlaptop,
				mrPaddingLefttablet,
				mrPaddingLeftphone,
				mrMarginTop,
				mrMarginTophover,
				mrMarginTopdesktop,
				mrMarginToplaptop,
				mrMarginToptablet,
				mrMarginTopphone,
				mrMarginRight,
				mrMarginRighthover,
				mrMarginRightdesktop,
				mrMarginRightlaptop,
				mrMarginRighttablet,
				mrMarginRightphone,
				mrMarginBottom,
				mrMarginBottomhover,
				mrMarginBottomdesktop,
				mrMarginBottomlaptop,
				mrMarginBottomtablet,
				mrMarginBottomphone,
				mrMarginLeft,
				mrMarginLefthover,
				mrMarginLeftdesktop,
				mrMarginLeftlaptop,
				mrMarginLefttablet,
				mrMarginLeftphone,
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
				mrFontSize,
				mrFontSizehover,
				mrFontSizedesktop,
				mrFontSizelaptop,
				mrFontSizetablet,
				mrFontSizephone,
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
			Object.keys(attributes).forEach(function (value) {
				mrAttr = value;
				mrAttrValue = attributes[value];
				if (
					mrAttrValue !== "mr-" &&
					mrAttrValue !== "mr-desktop" &&
					mrAttrValue !== "mr-laptop" &&
					mrAttrValue !== "mr-tablet" &&
					mrAttrValue !== "mr-phone"
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
					} else if (mrAttr == "mrSize" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-size" + mrAttrValue;
					} else if (mrAttr == "mrSizehover" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-hover-size" + mrAttrValue;
					} else if (mrAttr == "mrSizedesktop" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-desktop-size" + mrAttrValue;
					} else if (mrAttr == "mrSizelaptop" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-laptop-size" + mrAttrValue;
					} else if (mrAttr == "mrSizetablet" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-tablet-size" + mrAttrValue;
					} else if (mrAttr == "mrSizephone" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-phone-size" + mrAttrValue;
					} else if (mrAttr == "mrFontSize" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrFontSizehover" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-hover-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrFontSizedesktop" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-desktop-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrFontSizelaptop" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-laptop-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrFontSizetablet" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-tablet-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrFontSizephone" && mrAttrValue) {
						mrClassNames = mrClassNames + " mr-phone-fontsize" + mrAttrValue;
					} else if (mrAttr == "mrAnimation" && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue + " mr-active";
					} else if (mrAttr == "mrAnimationhover" && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue + " mr-active";
					} else if (mrAttr == "mrActiveWhen" && mrAttrValue) {
						//mrClassNames = mrClassNames.replace(" mr-active", "");
						mrClassNames = mrClassNames + mrAttrValue;
					} else if (mrAttr.startsWith("mr") && mrAttrValue) {
						mrClassNames = mrClassNames + mrAttrValue;
					}
				}
			});

			//}

			return <BlockListBlock {...props} className={mrClassNames} />;
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
		mrSize,
		mrSizehover,
		mrSizedesktop,
		mrSizelaptop,
		mrSizetablet,
		mrSizephone,
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
		mrPaddingRight,
		mrPaddingRighthover,
		mrPaddingRightdesktop,
		mrPaddingRightlaptop,
		mrPaddingRighttablet,
		mrPaddingRightphone,
		mrPaddingBottom,
		mrPaddingBottomhover,
		mrPaddingBottomdesktop,
		mrPaddingBottomlaptop,
		mrPaddingBottomtablet,
		mrPaddingBottomphone,
		mrPaddingLeft,
		mrPaddingLefthover,
		mrPaddingLeftdesktop,
		mrPaddingLeftlaptop,
		mrPaddingLefttablet,
		mrPaddingLeftphone,
		mrMarginTop,
		mrMarginTophover,
		mrMarginTopdesktop,
		mrMarginToplaptop,
		mrMarginToptablet,
		mrMarginTopphone,
		mrMarginRight,
		mrMarginRighthover,
		mrMarginRightdesktop,
		mrMarginRightlaptop,
		mrMarginRighttablet,
		mrMarginRightphone,
		mrMarginBottom,
		mrMarginBottomhover,
		mrMarginBottomdesktop,
		mrMarginBottomlaptop,
		mrMarginBottomtablet,
		mrMarginBottomphone,
		mrMarginLeft,
		mrMarginLefthover,
		mrMarginLeftdesktop,
		mrMarginLeftlaptop,
		mrMarginLefttablet,
		mrMarginLeftphone,
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
		mrFontSize,
		mrFontSizehover,
		mrFontSizedesktop,
		mrFontSizelaptop,
		mrFontSizetablet,
		mrFontSizephone,
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
	if (mrAllowedBlocks.includes(blockType.name)) {
		Object.keys(attributes).forEach(function (value) {
			mrAttr = value;
			mrAttrValue = attributes[value];
			if (
				mrAttrValue !== "mr-" &&
				mrAttrValue !== "mr-desktop" &&
				mrAttrValue !== "mr-laptop" &&
				mrAttrValue !== "mr-tablet" &&
				mrAttrValue !== "mr-phone"
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
				} else if (mrAttr == "mrSize" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-size" + mrAttrValue;
				} else if (mrAttr == "mrSizehover" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-hover-size" + mrAttrValue;
				} else if (mrAttr == "mrSizedesktop" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-desktop-size" + mrAttrValue;
				} else if (mrAttr == "mrSizelaptop" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-laptop-size" + mrAttrValue;
				} else if (mrAttr == "mrSizetablet" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-tablet-size" + mrAttrValue;
				} else if (mrAttr == "mrSizephone" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-phone-size" + mrAttrValue;
				} else if (mrAttr == "mrFontSize" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrFontSizehover" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-hover-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrFontSizedesktop" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-desktop-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrFontSizelaptop" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-laptop-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrFontSizetablet" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-tablet-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrFontSizephone" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-phone-fontsize" + mrAttrValue;
				} else if (mrAttr == "mrAnimation" && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue + " mr-active";
				} else if (mrAttr == "mrAnimationhover" && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue + " mr-active";
				} else if (mrAttr == "mrActiveWhen" && mrAttrValue) {
					mrClassNames = mrClassNames.replace(" mr-active", "");
					mrClassNames = mrClassNames + mrAttrValue;
				} else if (mrAttr.startsWith("mr") && mrAttrValue) {
					mrClassNames = mrClassNames + mrAttrValue;
				}
			}
		});
	}

	extraProps.className = classnames(extraProps.className, mrClassNames);

	return extraProps;
}

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

addFilter(
	"editor.BlockListBlock",
	"mr-utils/mrApplyWrapperExtraClass",
	mrApplyWrapperExtraClass
);
