/*!
 * simpleAnchors.js
 * Original author: @kiriaze
 * Further changes, comments: @kiriaze
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    // Data Attr scroll to with offset - just under 2k minified
    // Example Usage
    // <a href="#" data-scroll-to="example-container" data-scroll-offset="100">Go to Section</a>
    // <div data-scroll-target="example-container"></div>

    // Can be called with default selector $.simpleAnchors();
    // or set to one $('[data-scroll-to]').simpleAnchors();


    // Create the defaults once
    var pluginName = "simpleAnchors",
        defaults = {
            duration: 800, // vary the speed depending the distance in future update
            easing: 'swing', // the easing function for animation // expo, cubic, circ, swing
            activeClass: 'active', // class given to the active nav element
            offset: 0,

            autoBuild: false,
            // upKey           = 38,            // key code to navigate to the next section
            // downKey         = 40,            // key code to navigate to the previous section
            sections: 'h2',                     // the elements auto build targets to generate links from
            // subSections: false,
            sectionEl: 'section',               // the elements auto build searchs for the section arg
            wrapper: '.test',                   // wrapper of all the auto build sections
            navEl: '#nav',                      // to place auto build links in

            // showHeadline: true,
            // showTopLink: true,
            // topLinkText: 'Top',
            // insertLocation: 'insertBefore'
        };

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.element    = element;
        this.$elem      = $(this.element);
        this.options    = $.extend( {}, defaults, options );

        this._defaults  = defaults;
        this._name      = pluginName;

        this.link       = element.selector ? element.selector : '[data-scroll-to]';
        this.$link      = $(this.link);

        this.init();

    }

    $.extend(Plugin.prototype, {

        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            // console.log(this.element.selector);
            // console.log(this.options);

            var activeClass = this.options.activeClass,
                offset      = this.options.offset;

            // set data attr to body tag of parent theme
            $('body').attr('data-scroll-target','top');

            $('body').on('click', this.link, { myOptions: this.options }, function(e) {

                e.preventDefault();                                                     // prevent hash click. Disabled for linking from other pages

                var $self           = $(this),                                          // cache this
                    scrollTo        = $self.data('scroll-to'),                          // set destination to data attr
                    scrollTarget    = $('[data-scroll-target=' + scrollTo + ']'),       // set scrollTarget to scroll-target
                    scrollOffset    = ($self.data('scroll-offset')) ? $self.data('scroll-offset') : offset;  // set offset to data attr

                // console.log($self,scrollTarget,scrollOffset);

                var $options    = e.data.myOptions;
                var duration    = $options.duration;
                var easing      = $options.easing;

                // if scrollTarget is valid, scroll to
                if ( scrollTarget && scrollTarget.offset() ) {
                    if(/(iPhone|iPod)\sOS\s6/.test(navigator.userAgent)){
                        $('html, body').animate({
                            scrollTop: scrollTarget.offset().top
                        }, duration, easing);
                    } else {
                        $('html, body').animate({
                            scrollTop: scrollTarget.offset().top - scrollOffset
                        }, duration, easing);
                    }
                }
            });

            this.autoBuild();
            this.scrollSpy();

        },

        scrollSpy: function(el, options) {

            var activeClass = this.options.activeClass,
                $link       = this.$link,
                offset      = this.options.offset + 1;

            // on scroll, check to see if the element has reached the top,
            // and if so add class to nav element
            $(window).scroll(function() {

                var scrollPos = $(window).scrollTop();
                $('[data-scroll-to]').each(function() {

                    var currLink = $(this),
                        target     = currLink.data('scroll-to'),
                        refElement = $('[data-scroll-target='+ target +']');

                    if ( !refElement.length ) {
                        return;
                    }

                    if (
                        ( refElement.position().top - offset <= scrollPos ) &&
                        ( refElement.position().top - offset + refElement.outerHeight() > scrollPos )
                    ) {

                        $('[data-scroll-to]').removeClass(activeClass);

                        if ( target != 'top' ) // exclude back to top anchor
                            currLink.addClass(activeClass);

                    } else {
                        currLink.removeClass(activeClass);
                    }

                });

            });

        },

        autoBuild: function(el, options) {

            if ( this.options.autoBuild ) {

                var sections = this.options.sections, // <h2>
                    container = this.options.sectionEl, // <section>
                    wrapper   = this.options.wrapper, // article[role="article"]
                    navEl     = this.options.navEl, // #nav
                    navList   = $('<ul />').prependTo(navEl);

                $(wrapper).find(sections).each(function() {
                    var listElem     = $('<li />').appendTo(navList),
                        scrollToName = $(this).text(),
                        scrollTo     = $(this).text().toLowerCase().replace(/ /g,"_"),
                        link = $('<a href="javascript:;" />').attr( 'data-scroll-to', scrollTo ).text( scrollToName ).appendTo(listElem);
                    $(this).nextUntil(sections).addBack().wrapAll( '<' + container + ' data-scroll-target="' + scrollTo + '" />' );
                });

            }

        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {

        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        }

    };

    // Made into selectorless call
    $[pluginName] = function(options) {
        var $window = $(window);
        return $window.simpleAnchors.apply($window, Array.prototype.slice.call(arguments, 0));
    };

})( jQuery, window, document );
