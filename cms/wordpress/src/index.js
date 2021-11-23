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
} from "@wordpress/icons";

const allowedBlocks = [
	"core/archives",
	"core/audio",
	"core/buttons",
	"core/button",
	"core/categories",
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
	"core/latest-comments",
	"core/latest-posts",
	"core/latestComments",
	"core/latestPosts",
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
	"core/post-terms",
	"core/post-template",
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
	//add allowedBlocks restriction
	if (
		typeof settings.attributes !== "undefined" &&
		allowedBlocks.includes(settings.name)
	) {
		settings.attributes = Object.assign(settings.attributes, {
			mrAnimation: {
				type: "string",
				default: "",
			},
			mrPerPage: {
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
			mrPerPage,
			mrArrowPagination,
			mrSelectPagination,
			mrRadioPagination,
			mrPerLine,
			mrPerLinedesktop,
			mrPerLinelaptop,
			mrPerLinetablet,
			mrPerLinephone,
			mrSize,
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
			mrPaddingTopdesktop,
			mrPaddingToplaptop,
			mrPaddingToptablet,
			mrPaddingTopphone,
			mrPaddingRight,
			mrPaddingRightdesktop,
			mrPaddingRightlaptop,
			mrPaddingRighttablet,
			mrPaddingRightphone,
			mrPaddingBottom,
			mrPaddingBottomdesktop,
			mrPaddingBottomlaptop,
			mrPaddingBottomtablet,
			mrPaddingBottomphone,
			mrPaddingLeft,
			mrPaddingLeftdesktop,
			mrPaddingLeftlaptop,
			mrPaddingLefttablet,
			mrPaddingLeftphone,
			mrMarginTop,
			mrMarginTopdesktop,
			mrMarginToplaptop,
			mrMarginToptablet,
			mrMarginTopphone,
			mrMarginRight,
			mrMarginRightdesktop,
			mrMarginRightlaptop,
			mrMarginRighttablet,
			mrMarginRightphone,
			mrMarginBottom,
			mrMarginBottomdesktop,
			mrMarginBottomlaptop,
			mrMarginBottomtablet,
			mrMarginBottomphone,
			mrMarginLeft,
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
			mrScrolldesktop,
			mrScrolllaptop,
			mrScrolltablet,
			mrScrollphone,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && allowedBlocks.includes(name) && (
					<InspectorControls key="setting">
						<Panel header="">
							<PanelBody title={__("Utilities", "mrutils")} initialOpen={false}>
								{props.name === "core/latest-posts" ||
								props.name === "core/latest-comments" ||
								props.name === "core/latestPosts" ||
								props.name === "core/latestComments" ||
								props.name === "core/post-template" ||
								props.name === "core/post-terms" ? (
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
															<PanelBody
																icon={symbol}
																title={__("Animations", "mrutils")}
																initialOpen={false}
																className="mr-backend-option mr-backend-option_utils_animations"
															>
																<SelectControl
																	label={__("Animation", "mrutils")}
																	value={mrAnimation}
																	options={[
																		{ value: "", label: "Default" },
																		{
																			value: " mr-fade active",
																			label: "Fade",
																		},
																		{
																			value: " mr-slidetop active",
																			label: "Slide Top",
																		},
																		{
																			value: " mr-slideright active",
																			label: "Slide Right",
																		},
																		{
																			value: " mr-slidebottom active",
																			label: "Slide Bottom",
																		},
																		{
																			value: " mr-slideleft active",
																			label: "Slide Left",
																		},
																		{
																			value: " mr-scale active",
																			label: "Scale",
																		},
																		{
																			value: " mr-scaleright active",
																			label: "Scale Right",
																		},
																		{
																			value: " mr-scaleleft active",
																			label: "Scale Left",
																		},
																		{
																			value: " mr-zoom active",
																			label: "Zoom",
																		},
																		{
																			value: " mr-zoomright active",
																			label: "Zoom Right",
																		},
																		{
																			value: " mr-zoomleft active",
																			label: "Zoom Left",
																		},
																	]}
																	onChange={(val) =>
																		setAttributes({
																			mrAnimation: val === undefined ? "" : val,
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
																	icon={pages}
																	title={
																		tab.name + __(" Pagination", "mrutils")
																	}
																	initialOpen={false}
																	className="mr-backend-option mr-backend-option_utils_pagination"
																>
																	<TextControl
																		label={__(
																			"Number of items per page",
																			"mrutils"
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
																						"mrutils"
																				  )
																				: ""
																		}
																	/>
																	{mrPerPage > 0 ? (
																		<>
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
															</>
														) : (
															""
														)}
														<PanelBody
															icon={layout}
															title={tab.name + __(" Layout", "mrutils")}
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
																	"mrutils"
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
															/>
															<RangeControl
																label={__("Item size", "mrutils")}
																value={
																	tab.name === "desktop"
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
															/>
															<SelectControl
																label={__("Item order", "mrutils")}
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
															title={tab.name + __(" Display", "mrutils")}
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
																label={__("Visibility", "mrutils")}
																value={
																	tab.name === "desktop"
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
																	mrDisplaydesktop === " mr-hidden" ||
																	mrDisplaydesktop === " mr-hide" ||
																	mrDisplaydesktop === " mr-none" ||
																	mrDisplaylaptop === " mr-hidden" ||
																	mrDisplaylaptop === " mr-hide" ||
																	mrDisplaylaptop === " mr-none" ||
																	mrDisplaytablet === " mr-hidden" ||
																	mrDisplaytablet === " mr-hide" ||
																	mrDisplaytablet === " mr-none" ||
																	mrDisplayphone === " mr-hidden" ||
																	mrDisplayphone === " mr-hide" ||
																	mrDisplayphone === " mr-none"
																		? __(
																				"An opacity was applied to the block in the backend so you can still see and select it. Preview the frontend to see the actual result.",
																				"mrutils"
																		  )
																		: __("")
																}
															/>
															<SelectControl
																label={__("Wrap", "mrutils")}
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
															title={tab.name + __(" Spacing", "mrutils")}
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
																					label={__("Padding Top", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																					label={__("Padding Right", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																						"mrutils"
																					)}
																					value={
																						tab.name === "desktop"
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
																					label={__("Padding Left", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																					label={__("Margin Top", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																					label={__("Margin Right", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																					label={__("Margin Bottom", "mrutils")}
																					value={
																						tab.name === "desktop"
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
																					label={__("Margin Left", "mrutils")}
																					value={
																						tab.name === "desktop"
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
															title={tab.name + __(" Text", "mrutils")}
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
																label={__("Font Size", "mrutils")}
																value={
																	tab.name === "desktop"
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
															/>

															<SelectControl
																label={__("Text Alignment", "mrutils")}
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
																		allowedBlocks.name != "core/paragraph") ||
																	(isSelected &&
																		allowedBlocks.name != "core/heading")
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
														</PanelBody>

														<PanelBody
															icon={pullLeft}
															title={tab.name + __(" Placement", "mrutils")}
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
																label={__("Position Type", "mrutils")}
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
																label={__("Vertical Alignment", "mrutils")}
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
																label={__("Horizontal Alignment", "mrutils")}
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
																label={__("Content Alignment", "mrutils")}
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
																label={__("Vertical Offset", "mrutils")}
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
																label={__("Horizontal Offset", "mrutils")}
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
														<PanelBody
															icon={plusCircle}
															title={tab.name + __(" Misc.", "mrutils")}
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
																label={__("Scroll", "mrutils")}
																value={
																	tab.name === "desktop"
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
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-horizontalscroll"
																		).replace("--", "-"),
																		label: "Horizontal scroll",
																	},
																	{
																		value: (
																			" mr-" +
																			tab.name +
																			"-horizontalscrollcontent"
																		).replace("--", "-"),
																		label: "Horizontal scroll content",
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
																		label: "Swipe content",
																	},
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
									title={__("Need more features?", "mrutils")}
									initialOpen={false}
									className="mr-backend-more_features"
								>
									<PanelRow>
										<div>
											<p>
												<b>Then you need Mr.Dev.'s Framework!</b>
											</p>
											<ul>
												<li>
													- Select only the device breakpoints that you want to
													use, avoiding the load of all styles and scripts.
												</li>
												<li>
													- Enable only the categories and components that you
													want to use, avoiding unused CSS and JS.
												</li>
												<li>
													- Change the media query values of each device
													breakpoint.
												</li>
												<li>- Create custom breakpoints.</li>
												<li>
													- Change the value of each variable (for margin,
													padding, transition-duration, font-size and more).
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
				mrPerPage,
				mrArrowPagination,
				mrSelectPagination,
				mrRadioPagination,
				mrPerLine,
				mrPerLinedesktop,
				mrPerLinelaptop,
				mrPerLinetablet,
				mrPerLinephone,
				mrSize,
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
				mrPaddingTopdesktop,
				mrPaddingToplaptop,
				mrPaddingToptablet,
				mrPaddingTopphone,
				mrPaddingRight,
				mrPaddingRightdesktop,
				mrPaddingRightlaptop,
				mrPaddingRighttablet,
				mrPaddingRightphone,
				mrPaddingBottom,
				mrPaddingBottomdesktop,
				mrPaddingBottomlaptop,
				mrPaddingBottomtablet,
				mrPaddingBottomphone,
				mrPaddingLeft,
				mrPaddingLeftdesktop,
				mrPaddingLeftlaptop,
				mrPaddingLefttablet,
				mrPaddingLeftphone,
				mrMarginTop,
				mrMarginTopdesktop,
				mrMarginToplaptop,
				mrMarginToptablet,
				mrMarginTopphone,
				mrMarginRight,
				mrMarginRightdesktop,
				mrMarginRightlaptop,
				mrMarginRighttablet,
				mrMarginRightphone,
				mrMarginBottom,
				mrMarginBottomdesktop,
				mrMarginBottomlaptop,
				mrMarginBottomtablet,
				mrMarginBottomphone,
				mrMarginLeft,
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
				mrScrolldesktop,
				mrScrolllaptop,
				mrScrolltablet,
				mrScrollphone,
			} = attributes;

			let mrClassNames = "";
			if (
				mrPerPage &&
				mrPerPage > 0 /*&&
				allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + "mr-" + mrPerPage + "perpage";
			}

			if (mrArrowPagination /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-arrowpagination";
			}

			if (mrSelectPagination /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-selectpagination";
			}

			if (mrRadioPagination /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-radiopagination";
			}

			if (mrPerLine /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPerLine;
			}

			if (mrPerLinedesktop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPerLinedesktop;
			}

			if (mrPerLinelaptop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPerLinelaptop;
			}

			if (mrPerLinetablet /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPerLinetablet;
			}

			if (mrPerLinephone /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPerLinephone;
			}

			if (mrSize /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-size" + mrSize;
			}

			if (mrSizedesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-desktop-size" + mrSizedesktop;
			}

			if (mrSizelaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-laptop-size" + mrSizelaptop;
			}

			if (mrSizetablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-tablet-size" + mrSizetablet;
			}

			if (mrSizephone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-phone-size" + mrSizephone;
			}

			if (mrOrder /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrOrder;
			}

			if (mrOrderdesktop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrOrderdesktop;
			}

			if (mrOrderlaptop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrOrderlaptop;
			}

			if (mrOrdertablet /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrOrdertablet;
			}

			if (mrOrderphone /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrOrderphone;
			}

			if (mrAnimation /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrAnimation;
			}

			if (mrDisplay /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrDisplay;
			}

			if (mrDisplaydesktop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrDisplaydesktop;
			}

			if (mrDisplaylaptop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrDisplaylaptop;
			}

			if (mrDisplaytablet /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrDisplaytablet;
			}

			if (mrDisplayphone /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrDisplayphone;
			}

			if (mrWrap /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrWrap;
			}

			if (mrWrapdesktop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrWrapdesktop;
			}

			if (mrWraplaptop /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrWraplaptop;
			}

			if (mrWraptablet /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrWraptablet;
			}

			if (mrWrapphone /*&&
				allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrWrap;
			}

			if (mrPaddingTop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingTop;
			}

			if (mrPaddingTopdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingTopdesktop;
			}

			if (mrPaddingToplaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingToplaptop;
			}

			if (mrPaddingToptablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingToptablet;
			}

			if (mrPaddingTopphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingTopphone;
			}

			if (mrPaddingRight /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingRight;
			}

			if (mrPaddingRightdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingRightdesktop;
			}

			if (mrPaddingRightlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingRightlaptop;
			}

			if (mrPaddingRighttablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingRighttablet;
			}

			if (mrPaddingRightphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingRightphone;
			}

			if (mrPaddingBottom /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingBottom;
			}

			if (
				mrPaddingBottomdesktop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrPaddingBottomdesktop;
			}

			if (mrPaddingBottomlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingBottomlaptop;
			}

			if (mrPaddingBottomtablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingBottomtablet;
			}

			if (mrPaddingBottomphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingBottomphone;
			}

			if (mrPaddingLeft /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingLeft;
			}

			if (mrPaddingLeftdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingLeftdesktop;
			}

			if (mrPaddingLeftlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingLeftlaptop;
			}

			if (mrPaddingLefttablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingLefttablet;
			}

			if (mrPaddingLeftphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPaddingLeftphone;
			}

			if (mrMarginTop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginTop;
			}

			if (mrMarginTopdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginTopdesktop;
			}

			if (mrMarginToplaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginToplaptop;
			}

			if (mrMarginToptablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginToptablet;
			}

			if (mrMarginTopphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginTopphone;
			}

			if (mrMarginRight /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginRight;
			}

			if (mrMarginRightdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginRightdesktop;
			}

			if (mrMarginRightlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginRightlaptop;
			}

			if (mrMarginRighttablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginRighttablet;
			}

			if (mrMarginRightphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginRightphone;
			}

			if (mrMarginBottom /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginBottom;
			}

			if (mrMarginBottomdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginBottomdesktop;
			}

			if (mrMarginBottomlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginBottomlaptop;
			}

			if (mrMarginBottomtablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginBottomtablet;
			}

			if (mrMarginBottomphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginBottomphone;
			}

			if (mrMarginLeft /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginLeft;
			}

			if (mrMarginLeftdesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginLeftdesktop;
			}

			if (mrMarginLeftlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginLeftlaptop;
			}

			if (mrMarginLefttablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginLefttablet;
			}

			if (mrMarginLeftphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrMarginLeftphone;
			}

			if (mrPosition /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPosition;
			}

			if (mrPositiondesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPositiondesktop;
			}

			if (mrPositionlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPositionlaptop;
			}

			if (mrPositiontablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPositiontablet;
			}

			if (mrPositionphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrPositionphone;
			}

			if (
				mrPosition === " mr-absolute" ||
				mrPosition === " mr-fixed" ||
				mrPosition === " mr-sticky"
			) {
				if (mrPositionAlignment /*&& allowedBlocks.includes(blockType.name)*/) {
					mrClassNames = mrClassNames + mrPositionAlignment;
				}
				if (mrPositionSides /*&& allowedBlocks.includes(blockType.name)*/) {
					mrClassNames = mrClassNames + mrPositionSides;
				}
			}

			if (
				mrPositiondesktop === " mr-desktop-absolute" ||
				mrPositiondesktop === " mr-desktop-fixed" ||
				mrPositiondesktop === " mr-desktop-sticky"
			) {
				if (
					mrPositionAlignmentdesktop /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionAlignmentdesktop;
				}
				if (
					mrPositionSidesdesktop /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionSidesdesktop;
				}
			}

			if (
				mrPositionlaptop === " mr-laptop-absolute" ||
				mrPositionlaptop === " mr-laptop-fixed" ||
				mrPositionlaptop === " mr-laptop-sticky"
			) {
				if (
					mrPositionAlignmentlaptop /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionAlignmentlaptop;
				}
				if (
					mrPositionSideslaptop /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionSideslaptop;
				}
			}

			if (
				mrPositiontablet === " mr-tablet-absolute" ||
				mrPositiontablet === " mr-tablet-fixed" ||
				mrPositiontablet === " mr-tablet-sticky"
			) {
				if (
					mrPositionAlignmenttablet /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionAlignmenttablet;
				}
				if (
					mrPositionSidestablet /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionSidestablet;
				}
			}

			if (
				mrPositionphone === " mr-phone-absolute" ||
				mrPositionphone === " mr-phone-fixed" ||
				mrPositionphone === " mr-phone-sticky"
			) {
				if (
					mrPositionAlignmentphone /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionAlignmentphone;
				}
				if (
					mrPositionSidesphone /*&& allowedBlocks.includes(blockType.name)*/
				) {
					mrClassNames = mrClassNames + mrPositionSidesphone;
				}
			}

			if (mrContentAlignment /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrContentAlignment;
			}

			if (
				mrContentAlignmentdesktop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrContentAlignmentdesktop;
			}

			if (
				mrContentAlignmentlaptop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrContentAlignmentlaptop;
			}

			if (
				mrContentAlignmenttablet /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrContentAlignmenttablet;
			}

			if (
				mrContentAlignmentphone /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrContentAlignmentphone;
			}

			if (mrVerticalOffset /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrVerticalOffset;
			}

			if (
				mrVerticalOffsetdesktop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrVerticalOffsetdesktop;
			}

			if (
				mrVerticalOffsetlaptop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrVerticalOffsetlaptop;
			}

			if (
				mrVerticalOffsettablet /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrVerticalOffsettablet;
			}

			if (mrVerticalOffsetphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrVerticalOffsetphone;
			}

			if (mrHorizontalOffset /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrHorizontalOffset;
			}

			if (
				mrHorizontalOffsetdesktop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrHorizontalOffsetdesktop;
			}

			if (
				mrHorizontalOffsetlaptop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrHorizontalOffsetlaptop;
			}

			if (
				mrHorizontalOffsettablet /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrHorizontalOffsettablet;
			}

			if (
				mrHorizontalOffsetphone /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrHorizontalOffsetphone;
			}

			if (mrFontSize /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-fontsize" + mrFontSize;
			}

			if (mrFontSizedesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames =
					mrClassNames + " mr-desktop-fontsize" + mrFontSizedesktop;
			}

			if (mrFontSizelaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-laptop-fontsize" + mrFontSizelaptop;
			}

			if (mrFontSizetablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-tablet-fontsize" + mrFontSizetablet;
			}

			if (mrFontSizephone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + " mr-phone-fontsize" + mrFontSizephone;
			}

			if (mrTextAlignment /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrTextAlignment;
			}

			if (
				mrTextAlignmentdesktop /*&& allowedBlocks.includes(blockType.name)*/
			) {
				mrClassNames = mrClassNames + mrTextAlignmentdesktop;
			}

			if (mrTextAlignmentlaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrTextAlignmentlaptop;
			}

			if (mrTextAlignmenttablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrTextAlignmenttablet;
			}

			if (mrTextAlignmentphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrTextAlignmentphone;
			}

			if (mrScroll /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrScroll;
			}

			if (mrScrolldesktop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrScrolldesktop;
			}

			if (mrScrolllaptop /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrScrolllaptop;
			}

			if (mrScrolltablet /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrScrolltablet;
			}

			if (mrScrollphone /*&& allowedBlocks.includes(blockType.name)*/) {
				mrClassNames = mrClassNames + mrScrollphone;
			}

			return <BlockListBlock {...props} className={mrClassNames} />;
		};
	},
	"mrApplyWrapperExtraClass"
);

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function mrApplyExtraClass(extraProps, blockType, attributes) {
	const {
		mrAnimation,
		mrPerPage,
		mrArrowPagination,
		mrSelectPagination,
		mrRadioPagination,
		mrPerLine,
		mrPerLinedesktop,
		mrPerLinelaptop,
		mrPerLinetablet,
		mrPerLinephone,
		mrSize,
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
		mrPaddingTopdesktop,
		mrPaddingToplaptop,
		mrPaddingToptablet,
		mrPaddingTopphone,
		mrPaddingRight,
		mrPaddingRightdesktop,
		mrPaddingRightlaptop,
		mrPaddingRighttablet,
		mrPaddingRightphone,
		mrPaddingBottom,
		mrPaddingBottomdesktop,
		mrPaddingBottomlaptop,
		mrPaddingBottomtablet,
		mrPaddingBottomphone,
		mrPaddingLeft,
		mrPaddingLeftdesktop,
		mrPaddingLeftlaptop,
		mrPaddingLefttablet,
		mrPaddingLeftphone,
		mrMarginTop,
		mrMarginTopdesktop,
		mrMarginToplaptop,
		mrMarginToptablet,
		mrMarginTopphone,
		mrMarginRight,
		mrMarginRightdesktop,
		mrMarginRightlaptop,
		mrMarginRighttablet,
		mrMarginRightphone,
		mrMarginBottom,
		mrMarginBottomdesktop,
		mrMarginBottomlaptop,
		mrMarginBottomtablet,
		mrMarginBottomphone,
		mrMarginLeft,
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
		mrScrolldesktop,
		mrScrolllaptop,
		mrScrolltablet,
		mrScrollphone,
	} = attributes;

	//check if attribute exists for old Gutenberg version compatibility
	//add allowedBlocks restriction

	let mrClassNames = "";
	if (mrPerPage && mrPerPage > 0 /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + "mr-" + mrPerPage + "perpage";
	}

	if (mrArrowPagination /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + " mr-arrowpagination";
	}

	if (mrSelectPagination /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + " mr-selectpagination";
	}

	if (mrRadioPagination /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + " mr-radiopagination";
	}

	if (mrPerLine /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrPerLine;
	}

	if (mrPerLinedesktop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrPerLinedesktop;
	}

	if (mrPerLinelaptop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrPerLinelaptop;
	}

	if (mrPerLinetablet /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrPerLinetablet;
	}

	if (mrPerLinephone /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrPerLinephone;
	}

	if (mrSize && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-size" + mrSize;
	}

	if (mrSizedesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-desktop-size" + mrSizedesktop;
	}

	if (mrSizelaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-laptop-size" + mrSizelaptop;
	}

	if (mrSizetablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-tablet-size" + mrSizetablet;
	}

	if (mrSizephone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-phone-size" + mrSizephone;
	}

	if (mrOrder /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrOrder;
	}

	if (mrOrderdesktop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrOrderdesktop;
	}

	if (mrOrderlaptop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrOrderlaptop;
	}

	if (mrOrdertablet /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrOrdertablet;
	}

	if (mrOrderphone /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrOrderphone;
	}

	if (mrAnimation /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrAnimation;
	}

	if (mrDisplay /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrDisplay;
	}

	if (mrDisplaydesktop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrDisplaydesktop;
	}

	if (mrDisplaylaptop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrDisplaylaptop;
	}

	if (mrDisplaytablet /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrDisplaytablet;
	}

	if (mrDisplayphone /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrDisplayphone;
	}

	if (mrWrap /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrWrap;
	}

	if (mrWrapdesktop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrWrapdesktop;
	}

	if (mrWraplaptop /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrWraplaptop;
	}

	if (mrWraptablet /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrWraptablet;
	}

	if (mrWrapphone /*&&
		allowedBlocks.includes(blockType.name)*/) {
		mrClassNames = mrClassNames + mrWrap;
	}

	if (mrPaddingTop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingTop;
	}

	if (mrPaddingTopdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingTopdesktop;
	}

	if (mrPaddingToplaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingToplaptop;
	}

	if (mrPaddingToptablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingToptablet;
	}

	if (mrPaddingTopphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingTopphone;
	}

	if (mrPaddingRight && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingRight;
	}

	if (mrPaddingRightdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingRightdesktop;
	}

	if (mrPaddingRightlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingRightlaptop;
	}

	if (mrPaddingRighttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingRighttablet;
	}

	if (mrPaddingRightphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingRightphone;
	}

	if (mrPaddingBottom && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingBottom;
	}

	if (mrPaddingBottomdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingBottomdesktop;
	}

	if (mrPaddingBottomlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingBottomlaptop;
	}

	if (mrPaddingBottomtablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingBottomtablet;
	}

	if (mrPaddingBottomphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingBottomphone;
	}

	if (mrPaddingLeft && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingLeft;
	}

	if (mrPaddingLeftdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingLeftdesktop;
	}

	if (mrPaddingLeftlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingLeftlaptop;
	}

	if (mrPaddingLefttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingLefttablet;
	}

	if (mrPaddingLeftphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPaddingLeftphone;
	}

	if (mrMarginTop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginTop;
	}

	if (mrMarginTopdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginTopdesktop;
	}

	if (mrMarginToplaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginToplaptop;
	}

	if (mrMarginToptablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginToptablet;
	}

	if (mrMarginTopphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginTopphone;
	}

	if (mrMarginRight && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginRight;
	}

	if (mrMarginRightdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginRightdesktop;
	}

	if (mrMarginRightlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginRightlaptop;
	}

	if (mrMarginRighttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginRighttablet;
	}

	if (mrMarginRightphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginRightphone;
	}

	if (mrMarginBottom && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginBottom;
	}

	if (mrMarginBottomdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginBottomdesktop;
	}

	if (mrMarginBottomlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginBottomlaptop;
	}

	if (mrMarginBottomtablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginBottomtablet;
	}

	if (mrMarginBottomphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginBottomphone;
	}

	if (mrMarginLeft && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginLeft;
	}

	if (mrMarginLeftdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginLeftdesktop;
	}

	if (mrMarginLeftlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginLeftlaptop;
	}

	if (mrMarginLefttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginLefttablet;
	}

	if (mrMarginLeftphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrMarginLeftphone;
	}

	if (mrPosition && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPosition;
	}

	if (mrPositiondesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPositiondesktop;
	}

	if (mrPositionlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPositionlaptop;
	}

	if (mrPositiontablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPositiontablet;
	}

	if (mrPositionphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrPositionphone;
	}

	if (
		mrPosition === " mr-absolute" ||
		mrPosition === " mr-fixed" ||
		mrPosition === " mr-sticky"
	) {
		if (mrPositionAlignment && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionAlignment;
		}
		if (mrPositionSides && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionSides;
		}
	}

	if (
		mrPositiondesktop === " mr-desktop-absolute" ||
		mrPositiondesktop === " mr-desktop-fixed" ||
		mrPositiondesktop === " mr-desktop-sticky"
	) {
		if (mrPositionAlignmentdesktop && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionAlignmentdesktop;
		}
		if (mrPositionSidesdesktop && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionSidesdesktop;
		}
	}

	if (
		mrPositionlaptop === " mr-laptop-absolute" ||
		mrPositionlaptop === " mr-laptop-fixed" ||
		mrPositionlaptop === " mr-laptop-sticky"
	) {
		if (mrPositionAlignmentlaptop && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionAlignmentlaptop;
		}
		if (mrPositionSideslaptop && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionSideslaptop;
		}
	}

	if (
		mrPositiontablet === " mr-tablet-absolute" ||
		mrPositiontablet === " mr-tablet-fixed" ||
		mrPositiontablet === " mr-tablet-sticky"
	) {
		if (mrPositionAlignmenttablet && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionAlignmenttablet;
		}
		if (mrPositionSidestablet && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionSidestablet;
		}
	}

	if (
		mrPositionphone === " mr-phone-absolute" ||
		mrPositionphone === " mr-phone-fixed" ||
		mrPositionphone === " mr-phone-sticky"
	) {
		if (mrPositionAlignmentphone && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionAlignmentphone;
		}
		if (mrPositionSidesphone && allowedBlocks.includes(blockType.name)) {
			mrClassNames = mrClassNames + mrPositionSidesphone;
		}
	}

	if (mrContentAlignment && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrContentAlignment;
	}

	if (mrContentAlignmentdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrContentAlignmentdesktop;
	}

	if (mrContentAlignmentlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrContentAlignmentlaptop;
	}

	if (mrContentAlignmenttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrContentAlignmenttablet;
	}

	if (mrContentAlignmentphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrContentAlignmentphone;
	}

	if (mrVerticalOffset && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrVerticalOffset;
	}

	if (mrVerticalOffsetdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrVerticalOffsetdesktop;
	}

	if (mrVerticalOffsetlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrVerticalOffsetlaptop;
	}

	if (mrVerticalOffsettablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrVerticalOffsettablet;
	}

	if (mrVerticalOffsetphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrVerticalOffsetphone;
	}

	if (mrHorizontalOffset && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrHorizontalOffset;
	}

	if (mrHorizontalOffsetdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrHorizontalOffsetdesktop;
	}

	if (mrHorizontalOffsetlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrHorizontalOffsetlaptop;
	}

	if (mrHorizontalOffsettablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrHorizontalOffsettablet;
	}

	if (mrHorizontalOffsetphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrHorizontalOffsetphone;
	}

	if (mrFontSize && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-fontsize" + mrFontSize;
	}

	if (mrFontSizedesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-desktop-fontsize" + mrFontSizedesktop;
	}

	if (mrFontSizelaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-laptop-fontsize" + mrFontSizelaptop;
	}

	if (mrFontSizetablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-tablet-fontsize" + mrFontSizetablet;
	}

	if (mrFontSizephone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + " mr-phone-fontsize" + mrFontSizephone;
	}

	if (mrTextAlignment && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrTextAlignment;
	}

	if (mrTextAlignmentdesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrTextAlignmentdesktop;
	}

	if (mrTextAlignmentlaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrTextAlignmentlaptop;
	}

	if (mrTextAlignmenttablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrTextAlignmenttablet;
	}

	if (mrTextAlignmentphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrTextAlignmentphone;
	}

	if (mrScroll && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrScroll;
	}

	if (mrScrolldesktop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrScrolldesktop;
	}

	if (mrScrolllaptop && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrScrolllaptop;
	}

	if (mrScrolltablet && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrScrolltablet;
	}

	if (mrScrollphone && allowedBlocks.includes(blockType.name)) {
		mrClassNames = mrClassNames + mrScrollphone;
	}

	extraProps.className = classnames(extraProps.className, mrClassNames);

	return extraProps;
}

//add filters

addFilter(
	"blocks.registerBlockType",
	"mrutils/custom-attributes",
	mrAddAttributes
);

addFilter("editor.BlockEdit", "mrutils/custom-control", mrInspectorControls);

addFilter(
	"blocks.getSaveContent.extraProps",
	"mrutils/mrApplyExtraClass",
	mrApplyExtraClass
);

addFilter(
	"editor.BlockListBlock",
	"mrutils/mrApplyWrapperExtraClass",
	mrApplyWrapperExtraClass
);
