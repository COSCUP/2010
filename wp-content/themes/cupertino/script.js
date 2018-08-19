/* Google Analytics */

var _gaq = _gaq || [];
_gaq.push(
['_setAccount', 'UA-12923351-1'], // Disable on test site.
 ['_trackPageview']
);


/*
 * jGFeed 1.0 - Google Feed API abstraction plugin for jQuery
 *
 * Copyright (c) 2009 jQuery HowTo
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * URL:
 *   http://jquery-howto.blogspot.com
 *
 * Author URL:
 *   http://me.boo.uz
 *
 */
(function($){$.extend({jGFeed:function(url,fnk,num,key){if(url==null){return false;}var gurl="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&scoring=h&q="+url;if(num!=null){gurl+="&num="+num;}if(key!=null){gurl+="&key="+key;}$.getJSON(gurl,function(data){if(typeof fnk=="function"){ if (data.responseData)fnk.call(this,data.responseData.feed);else fnk.call(this,false);}else{return false;}});}});})(jQuery);


/*
 * monoDate by Evnade
 *
 * http://github.com/monoceroi/monoDate
 *
 */

String.prototype.clone=function(){return this.slice(0)};String.prototype.padToLengthWithPaddingString=function(d,c){if(!d){return String(this)}c=c||"0";if(this.length>=d){return String(this)}var a=""+this;for(var b=0;b<=(d-this.length-1);b++){a=(c+a)}return a};Date.prototype.format=function(a){var d={YEAR:this.getFullYear(),MONTH:this.getMonth()+1,DATE:this.getDate(),DAY:this.getDay(),HOURS:this.getHours(),MINUTES:this.getMinutes(),SECONDS:this.getSeconds()};var e=""+a;var b=function(h){if(!h){return undefined}h=String(h);var g=/(\d+)(})/ig;if(h.match(g)!=null){return Number(String(h.match(g)[0]).replace((g),"$1"))}return undefined};for(templateItemKey in d){if(!d.hasOwnProperty(templateItemKey)){break}var f=new RegExp("(#\\{)("+templateItemKey+")(?:, )?(?:\\d+)?(\\})","ig");templateTagOccurrances=a.match(f);if(templateTagOccurrances==null){continue}for(var c=0;c<templateTagOccurrances.length;c++){templateItemOccurranceString=String(templateTagOccurrances[c]);if(templateItemOccurranceString==""){continue}a=a.replace(templateItemOccurranceString,String(d[templateItemKey]).padToLengthWithPaddingString(b(templateItemOccurranceString),"0"))}}return a};


function updateBlog($) {
	$.jGFeed(
		'http://feeds.feedburner.com/coscup', //?' + parseInt((new Date()).getTime()/30*60*1000), // Don't use this hack coz we need scoring=h
		function (feed) {
			if (!feed) {
				//Failed
				$('#blog-block .noscript-hide').hide();
				return;
			}
			var $b = $('#blog-block').empty();
			var i = 0;
			var appendArticle = function () {
				if (i >= feed.entries.length) return;
				var v = feed.entries[i];
				i++;

				//remove bad content in feed
				if (v.link === 'http://feedproxy.google.com/~r/coscup/~3/KURdOLzQwtc/pingooo-coscup-20108-fred-2009-orz.html') {
					setTimeout(appendArticle, 0);
					return;
				}

				var $e = $(document.createElement('div'));
				$e.attr('id', 'blog-article').html(
					'<h2><a target="_blank" href="' + v.link + '">' + v.title + '</a></h2>'
					+ '<p clss="blog-date">' + (new Date(v.publishedDate)).format('#{YEAR, 4}/#{MONTH, 2}/#{DATE, 2} #{HOURS, 2}:#{MINUTES, 2}') + '</p>'
					+ '<div class="blog-content">'
					+ v.content
					.replace(/(style|cellpadding|border)="([^"])+"/g, '') // remove all inline style
					.replace(/<font[^>]*>(.+?)<\/font>/g, '$1') // remove <font>
					.replace(/<center[^>]*>(.+?)<\/center>/g, '$1') // remove <center>
					.replace(/<(\/?)h3>/g, '<$1h4>')
					.replace(/<(\/?)h2>/g, '<$1h3>') // downgrade titles
					.replace(/<br ?\/?>[\n \t\r]*(<br ?\/?>[\n \t\r]*)+/g, '<br>') // too much <br>
					.replace(/<\/(p|div|span|a)>[\n \t\r]*(<br ?\/?>[\n \t\r]*)+/g, '</$1>') // still too much <br>
					//.replace(/<br ?\/?>\n?/g, '') //remove all <br>
					+ '</div>'
				);
				$b.append($e);

				setTimeout(appendArticle, 50);
			}
			setTimeout(appendArticle, 0);
		},
		8 // 100 max
	);
}

jQuery(function($){
	
	if ($('#blog-block').length) updateBlog($);
	
	// Link tracking
	$('.blogroll a, .sponsor').live(
		'click',
		function () {
			_gaq.push(['_trackPageview', this.href.replace(/http:\/\/(.+)\/?$/, '/adv/2010/$1')]);
			return true;
		}
	);

	if (/Windows.+Chrome/ig.test(navigator.userAgent)) {
		$('#mainMenu ul li a, body #content #article .bubble').css('text-shadow','none');
	}
});

