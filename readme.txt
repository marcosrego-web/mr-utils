=== MR.Utils ===
Contributors:      marcosrego
Tags:              block editor, utilities, tools, bootstrap, tailwind
Tested up to:      6.6.2
Stable tag:        0.2.6
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Add a front-end toolkit to the block editor to change device visibility, get mouse hover options, animations, convert into components and more...

== Description ==

Easily use [Mr.Utils](https://marcosrego.com/development/mr-utils/) front-end toolkit with the block editor interface without knowing code, the classes or the functions.

You can transform parent blocks (such as Columns or Groups) into components such as Search, Tabs, Swiper or Sliders (with pagination).

You can select what to do when mouse hovering a block (e.g. animations or a semi-opacity).

You can also apply changes to specific devices/breakpoints: Show/hide blocks depending of the device, remove default margins/paddings, apply a global margin/padding, change font-size depending of device and more.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/mrutils` directory, or install the plugin through the WordPress plugins screen directly.

== Frequently Asked Questions ==

= Does the interface of Mr.Utils support all blocks? =

Since version 0.2.0, that the interface of Mr.Utils works with all core blocks. For third-party blocks or if a specific block is not showing the "Utilities" section, you can still use the [utility classes](https://github.com/marcosrego-web/mr-utils/wiki/Utility-Classes) on the "Advanced" section > "Additional CSS class(es)". If a block is not working for you because of Mr.Utils, please [report the issue](https://github.com/marcosrego-web/mr-utils/issues) or [contact me](https://marcosrego.com/client-area/contact/), do let me know which block you are using. 

= Where can I find more information about Mr.Utils? =

You can find detailed information on the documentation at: [https://github.com/marcosrego-web/mr-utils/wiki](https://github.com/marcosrego-web/mr-utils/wiki)
You can also find some tips & tricks on the blog: [https://marcosrego.com/blog/](https://marcosrego.com/blog/)
General information can be found on: [https://marcosrego.com/development/mr-utils/](https://marcosrego.com/development/mr-utils/)

= How do I contact the developer? =

You can contact me at: [https://marcosrego.com/client-area/contact/](https://marcosrego.com/client-area/contact/)

== Screenshots ==

1. Mr.Utils options are found inside the "Utilities" section (closed by default), to not obstruct or confuse with the editor's default options.
2. All options are divided into categories.
3. All options opened (except for breakpoints).
4. Example of options that will apply when mouse hovering a block.
5. Example of options that will only apply on phone devices.
6. Using Mr.Dev.'s Framework allows to select which options will be available (reducing HTTP requests and file size).
7. Mr.Dev.'s Framework allows to create custom utilities to select on the block editor.

== Changelog ==

= 0.2.6 =
* Tested on WP 6.6.2.

= 0.2.5 =
* Added "Border radius" options on the "Appearance" tab.
* Tested on WP 6.4.3.

= 0.2.4 =
* Update Mr.Utils adding mrBefore, mrAfter and mrWrap functions (not available on the block editor for now).
* Tested on WP 6.4.2.

= 0.2.3 =
* Added "Search" component.
* Toolkit: "mr-datalist" class converts a HTML datalist into a search component, allowing styling.

= 0.2.2 =
* Fixed method of getting a class from elements with "mr-activeonlick", when adding it to the body.
* Tested on WP 6.1.

= 0.2.1 =
* Removes gaps on blocks using pagination.
* Add exception to core/tag-cloud.
* Reorder sections to be more friendly (Pagination closer to Layout).

= 0.2.0 =
* **Attention:** If you are starting with this version you are ready to go. If you are updating from a previous version, spacing and size options might have to be reselected and classes on Advanced section might have to be cleared, due to some needed core changes. It is advised to test and make the needed changes on a staging/local environment, or to only update the plugin when you are ready to do so.
* Dynamically add classes (instead of using *blocks.getSaveContent.extraProps*) for the interface to work with all core blocks, as suggested [here](https://github.com/WordPress/gutenberg/issues/36127#issuecomment-1106645202).
* Improve explanation on the differences between "items per line" and "columns".
* When using an automatic tabs navigation: Added fallback when the item does not contain child elements.
* Fixed bug when changing number of columns or items per line on the 'Desktop' breakpoint.

= 0.1.5 =
* Added spacing options to remove or add Gaps.
* Small changes to the icons indicating use of components/pagination.
* Toolkit: Possibility to change red, green, blue and alpha values as an alternative way to set background and text colors.
* Toolkit: Different scroll behaviour when using scroll navigation (arrows).
* Toolkit: Change the utility classes from Other to Appearance.
* Toolkit: If no colors are set for offcanvas background/text/toogle fallback to default background and text colors.

= 0.1.4 =
* Fix preview not working inside block templates and full site editor.
* Fix indication of variable value when using breakpoints (when defined).
* Fix size/font-size on breakpoints not working without a global size/font-size.
* Change the way assets are enqueued following new block functions.
* Toolkit: Added -webkit-animation on offcanvas for better compatibility.
* Toolkit: Added optional properties to the "mrActiveInView" javascript function.
* Fix contact link on plugin description.

= 0.1.3 =
* Added some appearance options to the interface (Background Color and Color).
* Fixed bug when using custom font-sizes.

= 0.1.2 =
* Added "Swipe", "Swipe content" and "Scroll Navigation" to the components section.
* Auto columns option (Layout section).
* Option for global value on columns and on items per line.
* "Active when clicked" option on the "Dynamic" section (adds the class "mr-active").
* Slide animation now works for paragraphs and headings (not only for child elements).
* Added font-family options (also compatible with custom utility classes added by Mr.Dev.'s Framework).
* Improvements to horizontalscroll for better compatibility with blocks.
* Toolkit: Improvements to offcanvas.
* Toolkit: Added offset and offsetelement classes and variables.
* Toolkit: Starting to add classes for appearance and height.

= 0.1.1 =
* Compatibility with Custom Utility Classes added by Mr.Dev.'s Framework.
* Change animation orientation (for the options Slide, Scale and Zoom) when using pagination arrows.
* Fixed: Bug when changing back to any default option on breakpoints.
* Fixed: Semi-opacity not visible on the backend when combined with Components and Pagination.
* Toolkit: Improved offcanvas options to not rely on javascript.
* Toolkit: Fixed missing overlay class when not using offcanvas.
* Toolkit: Fixed SlideOut animation orientation.

= 0.1.0 =
* First release
