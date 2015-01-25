SimpleAnchors
=============

Part of the simple framework, SimpleAnchors takes a different approach to page scrolling utilizing data attributes. Packed with options, including custom autoBuild function for quick TOC style pages.

// Data Attr scroll to with offset - just under 2k minified

##Usage
    // Example Usage
    <a href="#" data-scroll-to="example-container" data-scroll-offset="100">Go to Section</a>
    <div data-scroll-target="example-container"></div>

    // Can be called with default selector $.simpleAnchors();
    // or set to one $('[data-scroll-to]').simpleAnchors();

	// Options

    duration: 800, 						// vary the speed depending the distance in future update
    easing: 'swing', 					// the easing function for animation; expo, cubic, circ, swing (if jquery easing included)
    activeClass: 'active', 				// class given to the active nav element
    offset: 0,

    autoBuild: false,					// if true, auto wraps elements to create TOC style
    sections: 'h2',						// defaults to <h2> headings, can be anything
    sectionEl: 'section',				// scroll target, defaults to <section>
    wrapper: 'article[role="article"]', // outer wrapper, defaults to <article role="article">

##License
SimpleAnchors is licensed under the GPL v2 license. (http://opensource.org/licenses/GPL-2.0)