jQuery(document).ready(function() {
	/* check for image elements where only one preview image should be shown */
	jQuery('div.firstimageaspreview div.csc-textpic-imagewrap').find('.csc-textpic-imagerow:first').siblings().hide();

	/* QP chat */
	//qpChatTimer();

	/* check tracking-info state and show it if needed */
	//checkTrackingInfo();

	/* searchstring input field logic */
	jQuery('div.search input.input').focusin(function() {
		/* clear input value only if value is default */
		if(jQuery(this).val() === 'Suche')
			jQuery(this).val('').css('color', '#312b58');
	});
	jQuery('div.search input.input').focusout(function() {
		/* set input default value only if no user input */
		if(!jQuery(this).val())
			jQuery(this).css('color', '#888888').val('Suche');
	});

	/* register click handler for stabikat+ label in search mask */
	jQuery('div.search p.radio').find('label:eq(1)').click(function() {
		track_stabikatplus(1);
	});

	/* register click handler for stabikat+ link in main navigation */
	jQuery('div.navigation-main ul.nav').find('li:eq(2)').click(function() {
		track_stabikatplus(2);
	});

  /* show user poll */
  //userpoll('userpoll');
});

function aufzu(id) {
  jQuery('#' + id).slideToggle();
}

function aufzup(id) {
  jQuery('#' + id).slideToggle();
}

function socialBookmarks(type) {
  var bookmarksContainer = 'div#bm_container';

  if(type == 'show') {
    jQuery(bookmarksContainer).css('display', 'block').css('left', 'auto');
  }
  else if(type == 'hide') {
    jQuery(bookmarksContainer).css('display', 'none').css('left', '-999em');
  }
}

function showSocialBookmarks() {
  var selector = 'div#bm_container';

  if(jQuery(selector).is(':visible')) {
    jQuery(selector).css('left', '-999em');
    jQuery(selector).css('display', 'none');
  }
  else {
    jQuery(selector).css('display', 'block');
    jQuery(selector).css('left', 'auto');
  }

}

function libconnect_accordion(obj) {
  if(jQuery(obj).siblings('div.accordion-content').is(':visible')) {
    jQuery(obj).removeClass('active');
    jQuery(obj).siblings('div.accordion-content').slideUp();
  }
  else {
    jQuery(obj).addClass('active');
    jQuery(obj).siblings('div.accordion-content').slideDown();
  }
}

function showOne(showID) {
    var show = document.getElementById(showID);

    show.style.display = 'block';
}

function hideOne(hideID) {
    var hide = document.getElementById(hideID);

    hide.style.display = 'none';
}

/* Hide QP-Chat if not available */
/*  available from monday - friday, 2pm - 4pm */
function qpChatTimer() {
	var timeClient = new Date(),
		onlineDayStart = 1,
		onlineDayEnd = 5,
		onlineHourStart = 13,
		onlineHourEnd = 17;

	if((timeClient.getDay() >= onlineDayStart && timeClient.getDay() <= onlineDayEnd) && (timeClient.getHours() >= onlineHourStart && timeClient.getHours() < onlineHourEnd)) {
		if(jQuery('div.news-list-item-headline-mbe').length === 1)
			jQuery('div#c84996 div').css('margin-bottom', '+=18');

		jQuery('div#c84996 div').show();
		jQuery('div#c84995 a').show();
	}
}

/* function to close tracking info and set cookie to hide info on next visit */
function trinfo_close() {
	jQuery('div#tracking-info').slideUp();

	/* set "permanent" cookie to hide tracking info (expires after 1000 days) */
	setCookie('accepted_tracking_info', 1, 1000);
}

/* check if Piwik tracking info cookie values are present */
/*   This is needed to show the tracking info otherwise */
function checkTrackingInfo() {
	var visited = getCookie('visited'),
		accepted_tracking_info = getCookie('accepted_tracking_info');

	/* check for empty cookie values ("null" is type object) */
	if(typeof visited === 'object' && typeof accepted_tracking_info === 'object') {
		jQuery('div#tracking-info').slideDown();

		/* set cookie to hide tracking info on following pages (expires after 1 day) */
		setCookie('visited', 1, 1);
	}
}

/* function to read a cookie */
function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(' ' + c_name + '=');

	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + '=');
	}

	if (c_start == -1) {
		c_value = null;
	}
	else {
		c_start = c_value.indexOf('=', c_start) + 1;
		var c_end = c_value.indexOf(';', c_start);

		if (c_end == -1) {
			c_end = c_value.length;
		}

		c_value = unescape(c_value.substring(c_start,c_end));
	}

	return c_value;
}

/* function to set a cookie */
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString() + '; path=/');
	document.cookie = c_name + '=' + c_value;
}

/* handle stabikatplus campaign calls */
/*  1 = search, 2 = navi, 3 = news */
function track_stabikatplus(type) {
	switch(type) {
		case 1:
			_paq.push(['trackPageView', 'stabikatplus/Suchmaske']);
			break;
		case 2:
			_paq.push(['trackPageView', 'stabikatplus/Navigation']);
			break;
		case 3:
			_paq.push(['trackPageView', 'stabikatplus/News']);
			break;
	}
}

function swap_image(image_id, new_image_src) {
  var object = document.getElementById(image_id);
  object.src = new_image_src;
}

function userpoll(id) {
  var div = document.getElementById(id);

  if(getCookie('poll')) {
    return;
  }
  else {
    div.style.display = 'block';
    /* set the cookie that expires after one month */
    setCookie('poll', 1, 30);
  }
}

function setFormAction(e, form, languageUid) {
	let searchType = form.elements['searchtype'].options[form.elements['searchtype'].selectedIndex].value;
	let query = form.elements['q'].value;

	switch (searchType) {
		case 'sk':
			e.preventDefault();
			window.location.href = 'http://stabikat.de/CHARSET=UTF-8/DB=1/LNG=DU/CMD?ACT=SRCHA&IKT=1016&SRT=YOP&TRM=' + query;
			break;
		case 'skplus':
			e.preventDefault();
			window.location.href = 'http://search.ebscohost.com/login.aspx?direct=true&scope=site&site=eds-live&authtype=ip,guest,cookie,uid&custid=s2872380&groupid=SBB-EDS&profile=main&bquery=' + query;
			break;
		default:
			if (languageUid === 0) {
				form.action = '/seitensuche';
			} else {
				form.action = '/en/site-search';
			}
	}
}

/**
 * Make tab and accordion elements referencable via URL.
 * Hint: This does only work on a new/full page (re)load.
 */
jQuery(function() {
	let hash = document.location.hash;

	if (hash.match('#tabcontent')) {
		jQuery('.nav-tabs a[href="#' + hash.split('#')[1] + '"]').tab('show');
		window.scrollTo(0, jQuery('#tab-' + hash.split('#tabcontent-')[1]).offset().top);
	} else if (hash.match('#accordion')) {
		jQuery('.accordion a[href="#' + hash.split('#')[1] + '"]').click();
		window.scrollTo(0, jQuery('#accordion-heading-' + hash.split('#accordion-')[1]).offset().top);
	}
});
