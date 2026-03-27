(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('body').addClass('page-loaded');
			$('.preloader').delay(0).fadeOut(0);
		}
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			if (windowpos >= 1) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
		}
	}
	headerStyle();

	//Search Toggle
	if ($('.search-box').length) {
		$('.search-toggle').on('click', function () {
			$('body').toggleClass('visible-search');
		});
		$('.s-close-btn,.search-backdrop').on('click', function () {
			$('body').removeClass('visible-search');
		});
		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('body').removeClass('visible-search');
	        }
	    });
	}

	//Cart Sidebar Toggle
	if ($('.cart-sidebar').length) {
		$('.main-header .header-upper .links-box .cart-btn > a').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('visible-cart-bar');
		});
		$('.cart-sidebar .closer-btn,.cart-backdrop').on('click', function () {
			$('body').removeClass('visible-cart-bar');
		});
		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('body').removeClass('visible-cart-bar');
	        }
	    });
	}
	
	//Hidden Bar Menu Config
	function hiddenBarMenuConfig() {
		var menuWrap = $('.hidden-bar .side-menu');
		// appending expander button
		menuWrap.find('li.dropdown > a').append(function () {
			return '<button type="button" class="btn-expander"><i class="icon sl-icon-arrow-down"></i></button>';
		});
		// hidding submenu
		menuWrap.find('.dropdown').children('ul').hide();

		$(".hidden-bar .side-menu ul li.dropdown .btn-expander").on('click', function(e) {
			e.preventDefault();
			if ($(this).parents('li').children('ul').is(':visible')){
				$(this).parents('li').children('ul').slideUp();
				$(this).find('i').toggleClass('sl-icon-arrow-up');
				return false;
			}else{
				$(this).parents('.navigation').children('li').children('ul').hide();
				$(this).parents('.navigation').children('li').children('a').find('i').removeClass('sl-icon-arrow-up');
				$(this).parents('.navigation').children('li').children('a').find('i').addClass('sl-icon-arrow-down');
				$(this).parents('li').children('ul').slideToggle();
				// toggling arrow of expander
				$(this).find('i').toggleClass('sl-icon-arrow-up');
				return false;
			}
			
		});
	}

	hiddenBarMenuConfig();


	//Custom Scroll for Hidden Sidebar
	if ($('.hidden-bar-wrapper').length) {
		
		$('.hidden-bar-closer,.menu-backdrop').on('click', function () {
			$('.hidden-bar,body').removeClass('visible-sidebar');
			$('.side-menu ul li.dropdown ul').slideUp();
			$('.side-menu ul li.dropdown > a i').removeClass('sl-icon-arrow-up').addClass('sl-icon-arrow-down');
		});
		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
	            $('.hidden-bar,body').removeClass('visible-sidebar');
	            $('.side-menu ul li.dropdown ul').slideUp();
					$('.side-menu ul li.dropdown > a i').removeClass('sl-icon-arrow-up').addClass('sl-icon-arrow-down');
	        }
	    });
		$('.hidden-bar-opener').on('click', function () {
			$('.hidden-bar,body').addClass('visible-sidebar');
		});
	}
	$('.hidden-bar .side-menu a').on('click', function () {

    $('.hidden-bar, body').removeClass('visible-sidebar');

    // Close opened dropdown menus
    $('.side-menu ul li.dropdown ul').slideUp();
    $('.side-menu ul li.dropdown > a i')
        .removeClass('sl-icon-arrow-up')
        .addClass('sl-icon-arrow-down');

});






document.addEventListener("DOMContentLoaded", function () {

  /* ================================
     MOBILE MENU CLOSE ON CLICK
  ================================= */

  document.querySelectorAll('.hidden-bar a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        const hiddenBar = document.querySelector(".hidden-bar");

        if (hiddenBar) {
          hiddenBar.classList.remove("active", "visible", "open", "visible-sidebar");
        }

        document.body.classList.remove("visible-sidebar", "menu-open");
      }, 400);
    });
  });


  /* ================================
     CONTACT FORM VALIDATION
  ================================= */

  const form = document.getElementById("contactForm");

  if (form) {   // IMPORTANT: prevents error if form not found

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let isValid = true;

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      const phonePattern = /^[0-9]{10}$/;

      clearErrors();

      if (name.value.trim() === "") {
        showError(name, "Name is required");
        isValid = false;
      }

      if (!email.value.match(emailPattern)) {
        showError(email, "Enter valid email");
        isValid = false;
      }

      if (!phone.value.match(phonePattern)) {
        showError(phone, "Enter valid 10-digit phone");
        isValid = false;
      }

      if (subject.value.trim() === "") {
        showError(subject, "Subject is required");
        isValid = false;
      }

      if (message.value.trim() === "") {
        showError(message, "Message cannot be empty");
        isValid = false;
      }

      if (isValid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });

    function showError(input, message) {
      const error = input.parentElement.querySelector(".error");
      if (error) error.innerText = message;
      input.style.borderColor = "red";
    }

    function clearErrors() {
      document.querySelectorAll(".error").forEach(el => el.innerText = "");
      document.querySelectorAll("#contactForm input, #contactForm textarea")
        .forEach(el => el.style.borderColor = "#ddd");
    }

  }

});

document.addEventListener("DOMContentLoaded", function () {

  /* ================================
     SMOOTH SCROLL (ALL NAV LINKS)
  ================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {

      const targetId = this.getAttribute("href");

      // Skip empty #
      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

        // CLOSE MOBILE MENU IF OPEN
        const hiddenBar = document.querySelector(".hidden-bar");
        if (hiddenBar) {
          hiddenBar.classList.remove("active", "visible", "open", "visible-sidebar");
        }

        document.body.classList.remove("visible-sidebar", "menu-open");
      }
    });
  });

});
	
	// Odometer
	if ($(".odometer").length) {
		$('.odometer').appear();
		$(document.body).on('appear', '.odometer', function(e) {
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.odometerOptions = {
				format: 'd',
			};
		});
	}
	
	
	//Banner Slider
	if ($('.banner-slider').length) {
		$('.banner-slider').owlCarousel({
			loop:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
			mouseDrag: false,
			touchDrag: false,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn sl-icon-arrow-left"></span>', '<span class="next-btn sl-icon-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}

	//Popular Carousel
	if ($('.popular-carousel').length) {
		$('.popular-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				992:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});    		
	}

	//Testimonials Carousel
	if ($('.testi-carousel').length) {
		$('.testi-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				992:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});    		
	}

	//Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				768:{
					items:3
				},
				992:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});    		
	}

	//Trending Carousel
	if ($('.trending-carousel').length) {
		$('.trending-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:1
				},
				992:{
					items:2
				},
				1200:{
					items:2
				}
			}
		});    		
	}

	//Testimonial Carousel Two
	if ($('.testi-carousel-two').length) {
		$('.testi-carousel-two').bxSlider({
			pagerCustom: '.pager-one',
			auto:true,
			startSlide: 0,
			infiniteLoop: true,
			easing:'swing',
			adaptiveHeight: true,
			pause: 5000,
			slideMargin: 50,
			captions: true,
			nextText: '<span class="next-btn far fa-angle-right"></span>',
    		prevText: '<span class="prev-btn far fa-angle-left"></span>'
		});
	}

	//Reviews Carousel
	if ($('.reviews-carousel').length) {
		$('.reviews-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-long-arrow-left"></span>', '<span class="next-btn far fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				768:{
					items:1
				},
				992:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}

	//Team Carousel
	if ($('.team-carousel').length) {
		$('.team-carousel').owlCarousel({
			loop:false,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				992:{
					items:3
				},
				1200:{
					items:3
				}
			}
		});    		
	}

	//Related Products Carousel
	if ($('.rel-prod-carousel').length) {
		$('.rel-prod-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				992:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});    		
	}

	//Single Item Carousel
	if ($('.related-blog-carousel').length) {
		$('.related-blog-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:1
				},
				992:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}

	//Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			autoplayTimeout:7000,
			navText: [ '<span class="prev-btn far fa-angle-left"></span>', '<span class="next-btn far fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:1
				},
				992:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}

	//Testimonial Carousel Two
	if ($('.shop-single-carousel').length) {
		$('.shop-single-carousel').bxSlider({
			pagerCustom: '.pager-two',
			auto:false,
			startSlide: 0,
			infiniteLoop: true,
			easing:'swing',
			adaptiveHeight: true,
			pause: 5000,
			slideMargin: 50,
			captions: true,
			nextText: '<span class="next-btn far fa-angle-right"></span>',
    		prevText: '<span class="prev-btn far fa-angle-left"></span>'
		});
	}

	//MixitUp Gallery Filters
	 if($('.filter-list').length){
	 	 $('.filter-list').mixItUp({});
	 }

	 //Datepicker
	 if($('.datepicker').length){
	 	 $( '.datepicker' ).datepicker();
	 }

	 //Jquery Spinner / Quantity Spinner
	if($('.qty-spinner').length){
		$("input.qty-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}

	//Default Masonry
	function enableDefaultMasonry() {
		if($('.masonry-container').length){

			var winDow = $(window);
			// Needed variables
			var $container=$('.masonry-container');

			$container.isotope({
				itemSelector: '.masonry-item',
				 masonry: {
					columnWidth : 1
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
		}
	}
	enableDefaultMasonry();

	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		 $('.quantity-spinner .plus').on('click', function() {
			var val = $(this).prev('.prod_qty').val();
			$(this).prev('.prod_qty').val((val*1)+1);
		});
		$('.quantity-spinner .minus').on('click', function(){
			var val = $(this).next('.prod_qty').val();
			if (val != 1 ){
			$(this).next('.prod_qty').val((val*1)-1);
			}
		});
	}

	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).next('.acc-content').is(':visible')){
				//return false;
				$(this).removeClass('active');
				$(this).next('.acc-content').slideUp(300);
				$(outerBox).children('.accordion').removeClass('active-block');
			}else{
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				$(this).next('.acc-content').slideDown(300);
				$(this).parent('.accordion').addClass('active-block');
			}
		});
	}

	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}

	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}
	

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}
	
	

	
	$(window).on('scroll', function() {
		headerStyle();
	});
	

	
	$(window).on('load', function() {
		handlePreloader();
		if($('body.page-loaded').length){
			$('body').addClass('page-done');
		}
		enableDefaultMasonry();
	});


	
	$(window).on('resize', function() {
		enableDefaultMasonry();
	});
	
	

})(window.jQuery);