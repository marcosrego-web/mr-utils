=== MR.Utils ===
Contributors:      Marcos Rego
Tags:              block, editor, utilities, frontend, toolkit, utils, dev, developer, bootstrap, tailwind, css, js, breakpoints, devices
Tested up to:      5.8.2
Stable tag:        0.1.2
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Add a front-end toolkit to the block editor that allows to change device visibility, mouse hover options, animations, convert into components and more...

== Description ==

Easily use [Mr.Utils](https://marcosrego.com/development/mr-utils/) front-end toolkit with the block editor interface without knowing code, the classes or the functions.

You can transform parent blocks (such as Columns or Groups) into components such as Tabs, Swiper or Sliders (with pagination).

You can select what to do when mouse hovering a block (e.g. animations or a semi-opacity).

You can also apply changes to specific devices/breakpoints: Show/hide blocks depending of the device, remove default margins/paddings, apply a global margin/padding, change font-size depending of device and more.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/mrutils` directory, or install the plugin through the WordPress plugins screen directly.

== Frequently Asked Questions ==

= Where can I find more information about Mr.Utils? =

You can find detailed information on the documentation at: [https://github.com/marcosrego-web/mr-utils/wiki](https://github.com/marcosrego-web/mr-utils/wiki)
You can also find some tips & tricks on the blog: [https://marcosrego.com/blog/](https://marcosrego.com/blog/)
General information can be found on: [https://marcosrego.com/development/mr-utils/](https://marcosrego.com/development/mr-utils/)

= How do I contact the developer? =

You can contact me at: [https://marcosrego.com/client-area/contact/](https://marcosrego.com/development/mr-utils/)

== Screenshots ==

1. Mr.Utils options are found inside the "Utilities" section (closed by default), to not obstruct or confuse with the editor's default options.
2. All options are divided into categories.
3. All options opened (except for breakpoints).
4. Example of options that will apply when mouse hovering a block.
5. Example of options that will only apply on phone devices.
6. Using Mr.Dev.'s Framework allows to select which options will be available (reducing HTTP requests and file size).
7. Mr.Dev.'s Framework allows to create custom utilities to select on the block editor.

== Changelog ==

= 0.1.2 =
* Added font-family options (also compatible with custom utility classes added by Mr.Dev.'s Framework).
* Toolkit: Improvements to offcanvas.
* Toolkit: Added offset and element-offset variables.

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
