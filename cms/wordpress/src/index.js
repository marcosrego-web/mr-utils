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
	brush,
} from "@wordpress/icons";

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
		d: "M11.361,13.455c0,0.252-0.51,0.456-1.141,0.456s-1.141-0.204-1.141-0.456c0-0.252,0.51-0.457,1.141-0.457   S11.361,13.203,11.361,13.455z M20.029,12.448c0,1.34-0.843,2.479-2.002,2.859c-1.487,2.854-4.476,4.697-7.792,4.697   c-3.313,0-6.299-1.837-7.786-4.686c-1.177-0.368-2.037-1.515-2.037-2.87c0-0.828,0.325-1.577,0.844-2.12   C0.89,9.954,0.612,9.477,0.451,8.916C0.177,7.969,0.26,6.904,0.686,5.918C1.194,4.739,2.13,3.852,3.18,3.485   c0.237-2.627,4.676-3.569,7.611-3.478c4.147,0.13,5.12,2.016,5.292,3.322c1.331,0.148,2.594,1.146,3.215,2.589   c0.424,0.986,0.509,2.051,0.236,2.998c-0.129,0.449-0.334,0.845-0.597,1.177C19.6,10.639,20.029,11.493,20.029,12.448z    M11.434,17.606l-0.216-0.967H9.236l-0.222,0.964c0.304-0.136,0.73-0.223,1.207-0.223C10.7,17.38,11.129,17.468,11.434,17.606z    M18.203,12.448c0-0.646-0.454-1.169-1.021-1.169c0,0-0.001,0-0.002,0c-0.155,0.25-0.333,0.489-0.534,0.718   c0.126-0.409,0.21-0.826,0.256-1.244c0-0.006-0.001-0.012-0.001-0.018c-0.595-0.317-1.205-1-1.625-1.901   c-0.438-0.939-0.562-1.886-0.395-2.549c-1.687,1.07-4.545,0.562-4.545,0.562c-1.71,0.114-2.167,2.281-2.167,2.281   C7.374,8.952,6.549,8.401,5.831,7.79C5.754,8.129,5.635,8.482,5.47,8.834c-0.489,1.05-1.237,1.805-1.917,2.026   c0.047,0.382,0.127,0.762,0.242,1.135c-0.202-0.229-0.379-0.468-0.534-0.718c-0.001,0-0.001-0.001-0.002-0.001   c-0.568,0-1.022,0.523-1.022,1.17c0,0.646,0.455,1.168,1.022,1.168c0.142,0,0.276-0.032,0.399-0.091   c0.124,0.361,0.279,0.708,0.459,1.038c1.016,0.359,2.496,1.069,3.199,2.279l0.304-1.321c0.095-0.414,0.464-0.708,0.889-0.708h3.44   c0.428,0,0.799,0.296,0.891,0.714l0.291,1.301c0.713-1.216,2.214-1.925,3.227-2.279c0.177-0.324,0.329-0.663,0.449-1.016   c0.115,0.051,0.241,0.083,0.373,0.083C17.749,13.616,18.203,13.092,18.203,12.448z M7.121,9.929c-0.566,0-1.027,0.46-1.027,1.026   s0.461,1.026,1.027,1.026s1.026-0.461,1.026-1.026S7.687,9.929,7.121,9.929z M13.32,9.929c-0.566,0-1.027,0.46-1.027,1.026   s0.461,1.026,1.027,1.026c0.565,0,1.026-0.461,1.026-1.026S13.885,9.929,13.32,9.929z",
	})
);

/**
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function mrAttributes(settings) {
	//check if object exists for old Gutenberg version compatibility
	//add mrDisallowedBlocks restriction
	if (
		typeof settings.attributes !== "undefined" &&
		settings.name.includes("core/") &&
		settings.name !== "core/archives" &&
		settings.name !== "core/tag-cloud"
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
				type: "string",
				default: "",
			},
			mrPaginationPosition: {
				type: "string",
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
			mrVerticalScrollNavigation: {
				type: "boolean",
				default: false,
			},
			mrHorizontalScrollNavigation: {
				type: "boolean",
				default: false,
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
			mrColumns: {
				type: "string",
				default: "mr-",
			},
			mrColumnsdesktop: {
				type: "string",
				default: "mr-desktop",
			},
			mrColumnslaptop: {
				type: "string",
				default: "mr-laptop",
			},
			mrColumnstablet: {
				type: "string",
				default: "mr-tablet",
			},
			mrColumnsphone: {
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
			mrRowGap: {
				type: "string",
				default: "",
			},
			mrRowGaphover: {
				type: "string",
				default: "",
			},
			mrRowGapdesktop: {
				type: "string",
				default: "",
			},
			mrRowGaplaptop: {
				type: "string",
				default: "",
			},
			mrRowGaptablet: {
				type: "string",
				default: "",
			},
			mrRowGapphone: {
				type: "string",
				default: "",
			},
			mrColumnGap: {
				type: "string",
				default: "",
			},
			mrColumnGaphover: {
				type: "string",
				default: "",
			},
			mrColumnGapdesktop: {
				type: "string",
				default: "",
			},
			mrColumnGaplaptop: {
				type: "string",
				default: "",
			},
			mrColumnGaptablet: {
				type: "string",
				default: "",
			},
			mrColumnGapphone: {
				type: "string",
				default: "",
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
			mrSize: {
				type: "string",
				default: "",
			},
			mrSizehover: {
				type: "string",
				default: "",
			},
			mrSizedesktop: {
				type: "string",
				default: "",
			},
			mrSizelaptop: {
				type: "string",
				default: "",
			},
			mrSizetablet: {
				type: "string",
				default: "",
			},
			mrSizephone: {
				type: "string",
				default: "",
			},
			mrBackgroundColor: {
				type: "string",
				default: "",
			},
			mrColor: {
				type: "string",
				default: "",
			},
			mrBorderTopLeftRadius: {
				type: "string",
				default: "",
			},
			mrBorderTopRightRadius: {
				type: "string",
				default: "",
			},
			mrBorderBottomRightRadius: {
				type: "string",
				default: "",
			},
			mrBorderBottomLeftRadius: {
				type: "string",
				default: "",
			},
			mrBackgroundColorhover: {
				type: "string",
				default: "",
			},
			mrColorhover: {
				type: "string",
				default: "",
			},
			mrBorderTopLeftRadiushover: {
				type: "string",
				default: "",
			},
			mrBorderTopRightRadiushover: {
				type: "string",
				default: "",
			},
			mrBorderBottomRightRadiushover: {
				type: "string",
				default: "",
			},
			mrBorderBottomLeftRadiushover: {
				type: "string",
				default: "",
			},
			mrFontFamily: {
				type: "string",
				default: "",
			},
			mrFontSize: {
				type: "string",
				default: "",
			},
			mrFontSizehover: {
				type: "string",
				default: "",
			},
			mrFontSizedesktop: {
				type: "string",
				default: "",
			},
			mrFontSizelaptop: {
				type: "string",
				default: "",
			},
			mrFontSizetablet: {
				type: "string",
				default: "",
			},
			mrFontSizephone: {
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
			mrVerticalScrollNavigation,
			mrHorizontalScrollNavigation,
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
			mrColumns,
			mrColumnsdesktop,
			mrColumnslaptop,
			mrColumnstablet,
			mrColumnsphone,
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
			mrRowGap,
			mrRowGaphover,
			mrRowGapdesktop,
			mrRowGaplaptop,
			mrRowGaptablet,
			mrRowGapphone,
			mrColumnGap,
			mrColumnGaphover,
			mrColumnGapdesktop,
			mrColumnGaplaptop,
			mrColumnGaptablet,
			mrColumnGapphone,
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
			mrSize,
			mrSizehover,
			mrSizedesktop,
			mrSizelaptop,
			mrSizetablet,
			mrSizephone,
			mrBackgroundColor,
			mrColor,
			mrBorderTopLeftRadius,
			mrBorderTopRightRadius,
			mrBorderBottomRightRadius,
			mrBorderBottomLeftRadius,
			mrBackgroundColorhover,
			mrColorhover,
			mrBorderTopLeftRadiushover,
			mrBorderTopRightRadiushover,
			mrBorderBottomRightRadiushover,
			mrBorderBottomLeftRadiushover,
			mrFontFamily,
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
				{isSelected &&
					name.includes("core/") &&
					name !== "core/archives" &&
					name !== "core/tag-cloud" && (
						<InspectorControls key="setting">
							<Panel header="">
								<PanelBody
									title={__("Utilities", "mr-utils")}
									initialOpen={false}
									className="utilities_panelbody"
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
																			"-slide"
																		).replace("--", "-"),
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
																			!val || val === "mr-" + tab.name
																				? ""
																				: val.includes("mr-desktop") ||
																				  val.includes("mr-laptop") ||
																				  val.includes("mr-tablet") ||
																				  val.includes("mr-phone") ||
																				  val.includes("-hover-")
																				? mrAnimation
																				: val.replace("--", "-"),
																		mrAnimationhover:
																			val !== undefined &&
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
																			val !== undefined &&
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
																		{ value: "mr-" + tab.name, label: " " },
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-activeinview"
																			).replace("--", "-"),
																			label: "In view",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-activeonclick"
																			).replace("--", "-"),
																			label: "Clicked",
																		},
																	]}
																	onChange={(val) =>
																		setAttributes({
																			mrActiveWhen:
																				!val || val === "mr-" + tab.name
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
																		!mrActiveWhen || mrActiveWhen === "mr-"
																			? __(
																					"Adds the class 'mr-active' depending of the selected situation. You can combine with animations to decide when the animation should start.",
																					"mr-utils"
																			  )
																			: __(
																					"The task is ready but you need to preview the frontend to see the actual result.",
																					"mr-utils",
																					"mr-utils"
																			  )
																	}
																/>
															</PanelBody>
														</>
													) : (
														""
													)}
													{tab.name === "" ? (
														<>
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
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
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
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-swipe"
																			).replace("--", "-"),
																			label: "Swipe",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-swipecontent"
																			).replace("--", "-"),
																			label: "Swipe Content",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-search"
																			).replace("--", "-"),
																			label: "Search",
																		},
																	]}
																	onChange={(val) =>
																		setAttributes({
																			mrComponent:
																				!val || val === "mr-" + tab.name
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
																		!mrComponent || mrComponent === "mr-"
																			? __(
																					"Apply into parent blocks (such as Columns and List blocks) to consider each direct child as a component item.",
																					"mr-utils"
																			  )
																			: mrComponent.includes("scrollnav")
																			? __(
																					"Tip: You can combine 'Scroll Navigation' with the scroll options found on the 'Misc.' section.",
																					"mr-utils"
																			  ) +
																			  " " +
																			  __(
																					"The component was applied but you need to preview the frontend to see the actual result.",
																					"mr-utils"
																			  )
																			: __(
																					"The component was applied but you need to preview the frontend to see the actual result.",
																					"mr-utils"
																			  )
																	}
																/>
																{mrComponent.includes("tabs") ||
																mrComponent.includes("swipe") ||
																mrComponent.includes("search") ? (
																	<SelectControl
																		label={__(
																			"Navigation position",
																			"mr-utils"
																		)}
																		value={mrNavPosition}
																		options={[
																			{
																				value: "mr-" + tab.name,
																				label: "Default",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-navtop"
																				).replace("--", "-"),
																				label: "Top",
																			},
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
																					!val || val === "mr-" + tab.name
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
																<p>{__("Scroll navigation", "mr-utils")}</p>
																<ToggleControl
																	label="Vertical Arrows"
																	checked={mrVerticalScrollNavigation}
																	className="mr-backend-scrollnav"
																	onChange={() =>
																		setAttributes({
																			mrVerticalScrollNavigation:
																				!mrVerticalScrollNavigation,
																		})
																	}
																/>
																<ToggleControl
																	label="Horizontal Arrows"
																	checked={mrHorizontalScrollNavigation}
																	className="mr-backend-scrollnav"
																	onChange={() =>
																		setAttributes({
																			mrHorizontalScrollNavigation:
																				!mrHorizontalScrollNavigation,
																		})
																	}
																	help={
																		mrHorizontalScrollNavigation ||
																		mrVerticalScrollNavigation
																			? __(
																					"The navigation was applied but you need to preview the frontend to see the actual result.",
																					"mr-utils"
																			  )
																			: __(
																					"Add an alternative navigation to elements with scroll.",
																					"mr-utils"
																			  )
																	}
																/>
															</PanelBody>
															<PanelBody
																icon={pages}
																title={tab.name + __(" Pagination", "mr-utils")}
																initialOpen={false}
																className="mr-backend-option mr-backend-option_utils_pagination"
															>
																<TextControl
																	label={__("Items per page", "mr-utils")}
																	value={mrPerPage}
																	type="number"
																	className="mr-backend-perpage"
																	onChange={(val) =>
																		setAttributes({
																			mrPerPage: !val ? "" : val,
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

																<SelectControl
																	label={__("Pagination position", "mr-utils")}
																	value={mrPaginationPosition}
																	options={[
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-paginationtop"
																			).replace("--", "-"),
																			label: "Top",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-paginationbottom"
																			).replace("--", "-"),
																			label: "Bottom",
																		},
																	]}
																	onChange={(val) =>
																		setAttributes({
																			mrPaginationPosition:
																				!val || val === "mr-" + tab.name
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
															label={__("Items per line", "mr-utils")}
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
																					"-perline"
																				).replace("--", "-"),
																				label: "Global",
																			},
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
																	mrPerLinedesktop:
																		val !== undefined &&
																		val.includes("mr-desktop")
																			? val
																			: mrPerLinedesktop,
																	mrPerLinelaptop:
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrPerLinelaptop,
																	mrPerLinetablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrPerLinetablet,
																	mrPerLinephone:
																		val !== undefined &&
																		val.includes("mr-phone")
																			? val
																			: mrPerLinephone,
																})
															}
															help={
																!mrPerLine || mrPerLine === "mr-"
																	? "Apply into parent blocks (such as Columns and List blocks) to organize the set number of direct childs on different lines."
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
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrWraplaptop,
																	mrWraptablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrWraptablet,
																	mrWrapphone:
																		val !== undefined &&
																		val.includes("mr-phone")
																			? val
																			: mrWrapphone,
																})
															}
														/>

														<SelectControl
															label={__(
																"Columns to create on this item",
																"mr-utils"
															)}
															value={
																tab.name === "desktop"
																	? mrColumnsdesktop
																	: tab.name === "laptop"
																	? mrColumnslaptop
																	: tab.name === "tablet"
																	? mrColumnstablet
																	: tab.name === "phone"
																	? mrColumnsphone
																	: mrColumns
															}
															help={
																!mrColumns || mrColumns === "mr-"
																	? "Divide the current item into a set number of new columns automatically."
																	: ""
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
																					"-columns"
																				).replace("--", "-"),
																				label: "Global",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-1column"
																				).replace("--", "-"),
																				label: "1",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-2columns"
																				).replace("--", "-"),
																				label: "2",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-3columns"
																				).replace("--", "-"),
																				label: "3",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-4columns"
																				).replace("--", "-"),
																				label: "4",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-5columns"
																				).replace("--", "-"),
																				label: "5",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-6columns"
																				).replace("--", "-"),
																				label: "6",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-7columns"
																				).replace("--", "-"),
																				label: "7",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-8columns"
																				).replace("--", "-"),
																				label: "8",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-9columns"
																				).replace("--", "-"),
																				label: "9",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-10columns"
																				).replace("--", "-"),
																				label: "10",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-11columns"
																				).replace("--", "-"),
																				label: "11",
																			},
																			{
																				value: (
																					" mr-" +
																					tab.name +
																					"-12columns"
																				).replace("--", "-"),
																				label: "12",
																			},
																	  ]
																	: ""
															}
															onChange={(val) =>
																setAttributes({
																	mrColumns:
																		val !== undefined &&
																		!val.includes("mr-hover") &&
																		!val.includes("mr-desktop") &&
																		!val.includes("mr-laptop") &&
																		!val.includes("mr-tablet") &&
																		!val.includes("mr-phone")
																			? val
																			: mrColumns,
																	mrColumnsdesktop:
																		val !== undefined &&
																		val.includes("mr-desktop")
																			? val
																			: mrColumnsdesktop,
																	mrColumnslaptop:
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrColumnslaptop,
																	mrColumnstablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrColumnstablet,
																	mrColumnsphone:
																		val !== undefined &&
																		val.includes("mr-phone")
																			? val
																			: mrColumnsphone,
																})
															}
														/>

														{tab.name === "" ||
														tab.name === "hover" ||
														tab.name === "desktop" ||
														tab.name === "laptop" ||
														tab.name === "tablet" ||
														tab.name === "phone" ? (
															<TextControl
																label={__("Item Size", "mr-utils")}
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
																		mrSize:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrSize,
																		mrSizehover:
																			val !== undefined &&
																			val.includes("mr-hover")
																				? val
																				: mrSizehover,
																		mrSizedesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrSizedesktop,
																		mrSizelaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrSizelaptop,
																		mrSizetablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrSizetablet,
																		mrSizephone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrSizephone,
																	})
																}
															/>
														) : (
															""
														)}
														<SelectControl
															label={__("Item Order", "mr-utils")}
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
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrOrderlaptop,
																	mrOrdertablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrOrdertablet,
																	mrOrderphone:
																		val !== undefined &&
																		val.includes("mr-phone")
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
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrDisplaylaptop,
																	mrDisplaytablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrDisplaytablet,
																	mrDisplayphone:
																		val !== undefined &&
																		val.includes("mr-phone")
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
													{tab.name === "" || tab.name === "hover" ? (
														<PanelBody
															icon={brush}
															title={tab.name + __(" Appearance", "mr-utils")}
															initialOpen={false}
															className="mr-backend-option mr-backend-option_utils_appearance"
														>
															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__("Background Color", "mr-utils")}
																	value={
																		tab.name === "hover"
																			? mrBackgroundColorhover
																			: mrBackgroundColor
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-custombackgroundcolor"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-backgroundcolor"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_backgroundcolor"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrBackgroundColor:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrBackgroundColor,
																			mrBackgroundColorhover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrBackgroundColorhover,
																		})
																	}
																/>
															) : (
																""
															)}

															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__("Color", "mr-utils")}
																	value={
																		tab.name === "hover"
																			? mrColorhover
																			: mrColor
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-customcolor"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-color"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_color"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrColor:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrColor,
																			mrColorhover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrColorhover,
																		})
																	}
																/>
															) : (
																""
															)}

															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__(
																		"Border Top Left Radius",
																		"mr-utils"
																	)}
																	value={
																		tab.name === "hover"
																			? mrBorderTopLeftRadiushover
																			: mrBorderTopLeftRadius
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-custombordertopleftradius"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-bordertopleftradius | " +
																		"mr-" +
																		tab.name +
																		"-nobordertopleftradius"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_bordertopleftradius"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrBorderTopLeftRadius:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrBorderTopLeftRadius,
																			mrBorderTopLeftRadiushover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrBorderTopLeftRadiushover,
																		})
																	}
																/>
															) : (
																""
															)}

															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__(
																		"Border Top Right Radius",
																		"mr-utils"
																	)}
																	value={
																		tab.name === "hover"
																			? mrBorderTopRightRadiushover
																			: mrBorderTopRightRadius
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-custombordertoprightradius"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-bordertoprightradius | " +
																		"mr-" +
																		tab.name +
																		"-nobordertoprightradius"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_bordertoprightradius"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrBorderTopRightRadius:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrBorderTopRightRadius,
																			mrBorderTopRightRadiushover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrBorderTopRightRadiushover,
																		})
																	}
																/>
															) : (
																""
															)}

															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__(
																		"Border Bottom Right Radius",
																		"mr-utils"
																	)}
																	value={
																		tab.name === "hover"
																			? mrBorderBottomRightRadiushover
																			: mrBorderBottomRightRadius
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-customborderbottomrightradius"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-borderbottomrightradius | " +
																		"mr-" +
																		tab.name +
																		"-noborderbottomrightradius"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_borderbottomrightradius"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrBorderBottomRightRadius:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrBorderBottomRightRadius,
																			mrBorderBottomRightRadiushover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrBorderBottomRightRadiushover,
																		})
																	}
																/>
															) : (
																""
															)}

															{tab.name === "" || tab.name === "hover" ? (
																<TextControl
																	label={__(
																		"Border Bottom Left Radius",
																		"mr-utils"
																	)}
																	value={
																		tab.name === "hover"
																			? mrBorderBottomLeftRadiushover
																			: mrBorderBottomLeftRadius
																	}
																	type="text"
																	className="mr-backend-custominput mr-backend-customborderbottomleftradius"
																	placeHolder={(
																		"mr-" +
																		tab.name +
																		"-borderbottomleftradius | " +
																		"mr-" +
																		tab.name +
																		"-noborderbottomleftradius"
																	).replace("--", "-")}
																	list={(
																		"mrDevUtilsClasses_" +
																		tab.name +
																		"_borderbottomleftradius"
																	).replace("__", "_")}
																	onChange={(val) =>
																		setAttributes({
																			mrBorderBottomLeftRadius:
																				val !== undefined &&
																				!val.includes("mr-hover") &&
																				!val.includes("mr-desktop") &&
																				!val.includes("mr-laptop") &&
																				!val.includes("mr-tablet") &&
																				!val.includes("mr-phone")
																					? val
																					: mrBorderBottomLeftRadius,
																			mrBorderBottomLeftRadiushover:
																				val !== undefined &&
																				val.includes("mr-hover")
																					? val
																					: mrBorderBottomLeftRadiushover,
																		})
																	}
																/>
															) : (
																""
															)}
														</PanelBody>
													) : (
														""
													)}
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
																	{
																		name: "gaps",
																		title: "Gaps",
																		className:
																			"mr-backend-tab_gaps mr-width100",
																	},
																]}
															>
																{(tab2) =>
																	tab2.name === "gaps" ? (
																		<>
																			<p></p>

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
																					label={__("Row Gap", "mr-utils")}
																					value={
																						tab.name === "hover"
																							? mrRowGaphover
																							: tab.name === "desktop"
																							? mrRowGapdesktop
																							: tab.name === "laptop"
																							? mrRowGaplaptop
																							: tab.name === "tablet"
																							? mrRowGaptablet
																							: tab.name === "phone"
																							? mrRowGapphone
																							: mrRowGap
																					}
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-rowgap"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-norowgap"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_rowgap"
																					).replace("__", "_")}
																					onChange={(val) =>
																						setAttributes({
																							mrRowGap:
																								val !== undefined &&
																								!val.includes("mr-hover") &&
																								!val.includes("mr-desktop") &&
																								!val.includes("mr-laptop") &&
																								!val.includes("mr-tablet") &&
																								!val.includes("mr-phone")
																									? val
																									: mrRowGap,
																							mrRowGaphover:
																								val !== undefined &&
																								val.includes("mr-hover")
																									? val
																									: mrRowGaphover,
																							mrRowGapdesktop:
																								val !== undefined &&
																								val.includes("mr-desktop")
																									? val
																									: mrRowGapdesktop,
																							mrRowGaplaptop:
																								val !== undefined &&
																								val.includes("mr-laptop")
																									? val
																									: mrRowGaplaptop,
																							mrRowGaptablet:
																								val !== undefined &&
																								val.includes("mr-tablet")
																									? val
																									: mrRowGaptablet,
																							mrRowGapphone:
																								val !== undefined &&
																								val.includes("mr-phone")
																									? val
																									: mrRowGapphone,
																						})
																					}
																				/>
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
																					label={__("Column Gap", "mr-utils")}
																					value={
																						tab.name === "hover"
																							? mrColumnGaphover
																							: tab.name === "desktop"
																							? mrColumnGapdesktop
																							: tab.name === "laptop"
																							? mrColumnGaplaptop
																							: tab.name === "tablet"
																							? mrColumnGaptablet
																							: tab.name === "phone"
																							? mrColumnGapphone
																							: mrColumnGap
																					}
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-columngap"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nocolumngap"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_columngap"
																					).replace("__", "_")}
																					onChange={(val) =>
																						setAttributes({
																							mrColumnGap:
																								val !== undefined &&
																								!val.includes("mr-hover") &&
																								!val.includes("mr-desktop") &&
																								!val.includes("mr-laptop") &&
																								!val.includes("mr-tablet") &&
																								!val.includes("mr-phone")
																									? val
																									: mrColumnGap,
																							mrColumnGaphover:
																								val !== undefined &&
																								val.includes("mr-hover")
																									? val
																									: mrColumnGaphover,
																							mrColumnGapdesktop:
																								val !== undefined &&
																								val.includes("mr-desktop")
																									? val
																									: mrColumnGapdesktop,
																							mrColumnGaplaptop:
																								val !== undefined &&
																								val.includes("mr-laptop")
																									? val
																									: mrColumnGaplaptop,
																							mrColumnGaptablet:
																								val !== undefined &&
																								val.includes("mr-tablet")
																									? val
																									: mrColumnGaptablet,
																							mrColumnGapphone:
																								val !== undefined &&
																								val.includes("mr-phone")
																									? val
																									: mrColumnGapphone,
																						})
																					}
																				/>
																			) : (
																				""
																			)}
																		</>
																	) : tab2.name === "paddings" ? (
																		<>
																			<p></p>
																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-paddingtop"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nopaddingtop"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_paddingtop"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
																					label={__(
																						"Padding right",
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-paddingright"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nopaddingright"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_paddingright"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-paddingbottom"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nopaddingbottom"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_paddingbottom"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-paddingleft"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nopaddingleft"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_paddingleft"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}
																		</>
																	) : (
																		<>
																			<p></p>

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-margintop"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nomargintop"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_margintop"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-marginright"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nomarginright"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_marginright"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-marginbottom"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nomarginbottom"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_marginbottom"
																					).replace("__", "_")}
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
																			) : (
																				""
																			)}

																			{tab.name === "" ||
																			tab.name === "hover" ||
																			tab.name === "desktop" ||
																			tab.name === "laptop" ||
																			tab.name === "tablet" ||
																			tab.name === "phone" ? (
																				<TextControl
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
																					type="text"
																					placeHolder={
																						(
																							"mr-" +
																							tab.name +
																							"-marginleft"
																						).replace("--", "-") +
																						(
																							" | mr-" +
																							tab.name +
																							"-nomarginleft"
																						).replace("--", "-")
																					}
																					list={(
																						"mrDevUtilsClasses_" +
																						tab.name +
																						"_marginleft"
																					).replace("__", "_")}
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
														{tab.name === "" ? (
															<TextControl
																label={__("Font Family", "mr-utils")}
																value={mrFontFamily}
																type="text"
																className="mr-backend-custominput mr-backend-customfontfamily"
																placeHolder={"mr-font{1/2}"}
																list={"mrDevUtilsClasses_fontfamily".replace(
																	"__",
																	"_"
																)}
																onChange={(val) =>
																	setAttributes({
																		mrFontFamily:
																			val !== undefined ? val : mrFontFamily,
																	})
																}
															/>
														) : (
															""
														)}

														{tab.name === "" ||
														tab.name === "hover" ||
														tab.name === "desktop" ||
														tab.name === "laptop" ||
														tab.name === "tablet" ||
														tab.name === "phone" ? (
															<TextControl
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
																		mrFontSize:
																			val !== undefined &&
																			!val.includes("mr-hover") &&
																			!val.includes("mr-desktop") &&
																			!val.includes("mr-laptop") &&
																			!val.includes("mr-tablet") &&
																			!val.includes("mr-phone")
																				? val
																				: mrFontSize,
																		mrFontSizehover:
																			val !== undefined &&
																			val.includes("mr-hover")
																				? val
																				: mrFontSizehover,
																		mrFontSizedesktop:
																			val !== undefined &&
																			val.includes("mr-desktop")
																				? val
																				: mrFontSizedesktop,
																		mrFontSizelaptop:
																			val !== undefined &&
																			val.includes("mr-laptop")
																				? val
																				: mrFontSizelaptop,
																		mrFontSizetablet:
																			val !== undefined &&
																			val.includes("mr-tablet")
																				? val
																				: mrFontSizetablet,
																		mrFontSizephone:
																			val !== undefined &&
																			val.includes("mr-phone")
																				? val
																				: mrFontSizephone,
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
																	options={__([
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
																	])}
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
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
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
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
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
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
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
																				"-offsetelementtop"
																			).replace("--", "-"),
																			label: "Element Top",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-offsetelementbottom"
																			).replace("--", "-"),
																			label: "Element Bottom",
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
																		{
																			value: "mr-" + tab.name,
																			label: "Default",
																		},
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
																				"-offsetelementleft"
																			).replace("--", "-"),
																			label: "Element Left",
																		},
																		{
																			value: (
																				" mr-" +
																				tab.name +
																				"-offsetelementright"
																			).replace("--", "-"),
																			label: "Element Right",
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
																		val !== undefined &&
																		val.includes("mr-laptop")
																			? val
																			: mrScrolllaptop,
																	mrScrolltablet:
																		val !== undefined &&
																		val.includes("mr-tablet")
																			? val
																			: mrScrolltablet,
																	mrScrollphone:
																		val !== undefined &&
																		val.includes("mr-phone")
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
													The framework will give you an interface to
													optionally:
												</p>
												<ul>
													<li>
														- Select classes/options on text fields besides
														writting them (for spacing, sizes, colors and more).
													</li>
													<li>
														- Select only the device breakpoints that you want
														to use, avoiding the load of all styles and scripts.
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
														- Create custom utility classes with CSS properties
														+ variables and select them within the interface.
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
const mrBackendExtraClasses = createHigherOrderComponent((BlockListBlock) => {
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
			mrVerticalScrollNavigation,
			mrHorizontalScrollNavigation,
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
			mrColumns,
			mrColumnsdesktop,
			mrColumnslaptop,
			mrColumnstablet,
			mrColumnsphone,
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
			mrRowGap,
			mrColumnGap,
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
			mrSize,
			mrSizehover,
			mrSizedesktop,
			mrSizelaptop,
			mrSizetablet,
			mrSizephone,
			mrBackgroundColor,
			mrColor,
			mrBorderTopLeftRadius,
			mrBorderTopRightRadius,
			mrBorderBottomRightRadius,
			mrBorderBottomLeftRadius,
			mrBackgroundColorhover,
			mrColorhover,
			mrBorderTopLeftRadiushover,
			mrBorderTopRightRadiushover,
			mrBorderBottomRightRadiushover,
			mrBorderBottomLeftRadiushover,
			mrFontFamily,
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
				mrAttrValue !== "mr-hover" &&
				mrAttrValue !== "mr-desktop" &&
				mrAttrValue !== "mr-laptop" &&
				mrAttrValue !== "mr-tablet" &&
				mrAttrValue !== "mr-phone" &&
				!mrAttr.includes("mrCustom")
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
				} else if (mrAttr == "mrVerticalScrollNavigation" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-verticalscrollnav";
				} else if (mrAttr == "mrHorizontalScrollNavigation" && mrAttrValue) {
					mrClassNames = mrClassNames + " mr-horizontalscrollnav";
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
					if (mrAttr == "mrPaddingTop" && mrPaddingTop) {
						mrClassNames = mrClassNames + " " + mrPaddingTop;
					} else if (mrAttr == "mrPaddingTophover" && mrPaddingTophover) {
						mrClassNames = mrClassNames + " " + mrPaddingTophover;
					} else if (mrAttr == "mrPaddingTopdesktop" && mrPaddingTopdesktop) {
						mrClassNames = mrClassNames + " " + mrPaddingTopdesktop;
					} else if (mrAttr == "mrPaddingToplaptop" && mrPaddingToplaptop) {
						mrClassNames = mrClassNames + " " + mrPaddingToplaptop;
					} else if (mrAttr == "mrPaddingToplaptablet" && mrPaddingToptablet) {
						mrClassNames = mrClassNames + " " + mrPaddingToptablet;
					} else if (mrAttr == "mrPaddingToplapphone" && mrPaddingTopphone) {
						mrClassNames = mrClassNames + " " + mrPaddingTopphone;
					} else if (mrAttr == "mrPaddingRight" && mrPaddingRight) {
						mrClassNames = mrClassNames + " " + mrPaddingRight;
					} else if (mrAttr == "mrPaddingRighthover" && mrPaddingRighthover) {
						mrClassNames = mrClassNames + " " + mrPaddingRighthover;
					} else if (
						mrAttr == "mrPaddingRightdesktop" &&
						mrPaddingRightdesktop
					) {
						mrClassNames = mrClassNames + " " + mrPaddingRightdesktop;
					} else if (mrAttr == "mrPaddingRightlaptop" && mrPaddingRightlaptop) {
						mrClassNames = mrClassNames + " " + mrPaddingRightlaptop;
					} else if (
						mrAttr == "mrPaddingRightlaptablet" &&
						mrPaddingRighttablet
					) {
						mrClassNames = mrClassNames + " " + mrPaddingRighttablet;
					} else if (
						mrAttr == "mrPaddingRightlapphone" &&
						mrPaddingRightphone
					) {
						mrClassNames = mrClassNames + " " + mrPaddingRightphone;
					} else if (mrAttr == "mrPaddingBottom" && mrPaddingBottom) {
						mrClassNames = mrClassNames + " " + mrPaddingBottom;
					} else if (mrAttr == "mrPaddingBottomhover" && mrPaddingBottomhover) {
						mrClassNames = mrClassNames + " " + mrPaddingBottomhover;
					} else if (
						mrAttr == "mrPaddingBottomdesktop" &&
						mrPaddingBottomdesktop
					) {
						mrClassNames = mrClassNames + " " + mrPaddingBottomdesktop;
					} else if (
						mrAttr == "mrPaddingBottomlaptop" &&
						mrPaddingBottomlaptop
					) {
						mrClassNames = mrClassNames + " " + mrPaddingBottomlaptop;
					} else if (
						mrAttr == "mrPaddingBottomlaptablet" &&
						mrPaddingBottomtablet
					) {
						mrClassNames = mrClassNames + " " + mrPaddingBottomtablet;
					} else if (
						mrAttr == "mrPaddingBottomlapphone" &&
						mrPaddingBottomphone
					) {
						mrClassNames = mrClassNames + " " + mrPaddingBottomphone;
					} else if (mrAttr == "mrPaddingLeft" && mrPaddingLeft) {
						mrClassNames = mrClassNames + " " + mrPaddingLeft;
					} else if (mrAttr == "mrPaddingLefthover" && mrPaddingLefthover) {
						mrClassNames = mrClassNames + " " + mrPaddingLefthover;
					} else if (mrAttr == "mrPaddingLeftdesktop" && mrPaddingLeftdesktop) {
						mrClassNames = mrClassNames + " " + mrPaddingLeftdesktop;
					} else if (mrAttr == "mrPaddingLeftlaptop" && mrPaddingLeftlaptop) {
						mrClassNames = mrClassNames + " " + mrPaddingLeftlaptop;
					} else if (
						mrAttr == "mrPaddingLeftlaptablet" &&
						mrPaddingLefttablet
					) {
						mrClassNames = mrClassNames + " " + mrPaddingLefttablet;
					} else if (mrAttr == "mrPaddingLeftlapphone" && mrPaddingLeftphone) {
						mrClassNames = mrClassNames + " " + mrPaddingLeftphone;
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
			  if (mrDisallowedBlocks.includes(blockType.name)) {
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
						  mrAttr == "mrPaddingTop" &&
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
}, "mrBackendExtraClasses");

//Add filters

addFilter(
	"blocks.registerBlockType",
	"mr-utils/custom-attributes",
	mrAttributes
);

addFilter("editor.BlockEdit", "mr-utils/custom-control", mrInspectorControls);

addFilter(
	"editor.BlockListBlock",
	"mr-utils/mrBackendExtraClasses",
	mrBackendExtraClasses
);
