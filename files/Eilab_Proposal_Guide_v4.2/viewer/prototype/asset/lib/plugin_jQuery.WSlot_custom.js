/*
 * jQuery WSlot
 * By: Wahyu D
 * Version 0.1
 * Last Modified: 10/22/2015
 * 
 * Copyright 2014 Wahyu D
 * You may use this project under MIT license.
 * 
 * 
 * 
 * remix custom version
 * more api : http://danartinho.github.io/WSlot/
 * 
 */
 
var value = [];
var actived = [];
(function($) {
	
	$.fn.WSlot = function( options ) {

		// s: remix added
		var _this = $(this);

		var $thisType = $('[data-type="select-ios"]');
		var $thisIndexFilterIdx = 'data-select-index';
		var $listIndexFilterIdx = 'data-select-list-index';

		var list = 'wslot-select';

		function firstValue(){
			var commonValue = _this.find('[data-type="value"]').text();
			value.push(commonValue);
		}
		if ( value.length == 0 ) {
			firstValue();
		}

		for ( var i = 0; i < $thisType.length; i++ ){
			$thisType.eq(i).attr(''+$thisIndexFilterIdx+'', i)
		}
		// e: remix added

		if(options=='rollTo'){
			var args = (Array.prototype.slice.call( arguments, 1 ));
			this.trigger(wslot_rollto,args);
			return;
		}

		if(options=='get'){
			// this.trigger('WSlot.get');
			// return this.children('div.'+class_item_selected).index(); //original code
			return $(document).find('[data-select-name="'+this.attr('data-name')+'"] .'+class_item_selected+'').index();
		}

		if(options=='getText'){
			// this.trigger('WSlot.get');
			// return this.children('div.'+class_item_selected).text(); //original code
			return $(document).find('[data-select-name="'+this.attr('data-name')+'"] .'+class_item_selected+'').text();
		}
		// s: remix added
		if ( options == 'show' ){
			$('body').css('overflow', 'hidden');
			return $(document).find('[data-select-name="'+this.attr('data-name')+'"]').addClass('show');
		}

		if ( options == 'hide' ){
			$('body').css('overflow', '');
			return $(document).find('[data-select-name="'+this.attr('data-name')+'"]').removeClass('show');
		}

		if ( options == 'clear' ){
			return this.find('[data-type="value"]').text(value);
		}
		// e: remix added

		var opts = $.extend({},$.fn.WSlot.defaults,options);

		this.off(wslot_rollto).on(wslot_rollto,function(event,to){
			// self = $(this);
			self = $(document).find('[data-select-name="'+$(this).attr('data-name')+'"] .options');
			if(to) {
				rollTo(self,to);
			}
		});

		var style = {};
		style['position'] = 'relative';
		style[xform] = 'rotateY('+opts.rotation+'deg)';
		style[xform+'-style'] = 'preserve-3d';
		// s: original code
		//this.css(style).addClass('wslot-container');
		// e: original code

		// s: remix edited
		var appendSource = '<div class="'+list+'" data-select-name="'+this.attr('data-name')+'" '+$listIndexFilterIdx+'="'+this.attr($thisIndexFilterIdx)+'">';
			appendSource += '<div class="top">';
			appendSource += '<div class="select-confirm">확인</div>';
			appendSource += '</div>'
			appendSource += '<div class="wslot-container">';
			appendSource += '<div class="options"></div>';
			appendSource += '</div>';
			appendSource += '</div>';
		$('.frame .contents').append(appendSource);
		this.find('.wslot-container').css(style);
		
		// e: remix edited

		var item = '';
		comfirmClick();
		//valueClick();
		if(opts.items.length) {
			
			var center_index = 0;
			if(opts.center == 'first') {
				center_index = 0;
			} else if(opts.center == 'last') {
				center_index = opts.items.length - 1;
			} else if(opts.center == 'center') {
				center_index = parseInt(opts.items.length / 2);
			} else if($.isNumeric(opts.center) && (opts.center >= 0) && (opts.center < opts.items.length)) {
				center_index = opts.center;
			} else if(opts.center >= opts.items.length) {
				center_index = opts.items.length-1;
			} else {
				center_index = 0;
			}
			actived.push(opts.center);

			var distance = parseInt(this.height() / 2);
			if($.isNumeric(opts.distance)) {
				distance = opts.distance;
			}

			var style = 'position: absolute;left: 0;width: 100%;height: '+opts.item_height+'px;top: 50%;margin-top: -'+Math.round(opts.item_height/2)+'px;';

			for (var i = 0; i < opts.items.length; i++) {
				var displayed = "";
				if (Math.abs(i - center_index) > opts.displayed_length) {
					displayed = "display:none;";
				}
				var angle = opts.angle * ( center_index - i );
				var opacity = 0;
				// var scale = 0.95;
				var max_angle = opts.angle * opts.displayed_length;
				if(Math.abs(angle) <= max_angle) {
					opacity = 1 - (Math.abs(angle)/(max_angle*2));
					// scale = 1 - (Math.abs(angle)/(max_angle*20));
				}
				var transform = 'transform:rotateX('+angle+'deg) translate3d(0,0,'+distance+'px);-webkit-transform:rotateX('+angle+'deg) translate3d(0,0,'+distance+'px);';
				item += '<div class="wslot-item '+((i==center_index)?class_item_selected:'')+'" style="'+transform+displayed+style+'opacity:'+opacity+';">'+opts.items[i]+'</div>';
			} // remix edited : return this.html(item)
			return $('.frame .contents').find('['+$listIndexFilterIdx+'="'+this.attr(''+$thisIndexFilterIdx+'')+'"] .options').html(item).data('cur-angle',(center_index*opts.angle))
			.off(start).on(start, function(e) {
				//console.log('start '+getEventPos(e).y);
				var ini = $(this);
				ini.addClass('w-roll-touched').data('initialtouch', getEventPos(e).y);
				return false;
			}).off(move).on(move, function(e) {
				var ini = $(this);
				if (ini.is('.w-roll-touched')) {
					var deltaY = ini.data('initialtouch') - getEventPos(e).y;
					// console.log('move '+deltaY);
					var mainAngle = parseInt(ini.data('cur-angle')) + parseInt(deltaY/2);
					var maxAngle = (opts.items.length - 1) * opts.angle;
					if (mainAngle < 0) {
						var excess = 0 - mainAngle;
						mainAngle = -(25*excess/(excess+25));
					} else if (mainAngle > maxAngle) {
						var excess = mainAngle - maxAngle;
						mainAngle = maxAngle + (25*excess/(excess+25));
					} 

					ini.children('div').each(function () {
						var curr = $(this);
						var options = {};
						var currAngle = mainAngle-(curr.index()*opts.angle);
						options['display'] = '';
						if(Math.abs(currAngle) > opts.displayed_length*opts.angle) {
							options['display'] = 'none';
						}
						var opacity = 0;
						// var scale = 0.95;
						var max_angle = opts.angle * opts.displayed_length;
						if(Math.abs(currAngle) <= max_angle) {
							opacity = 1 - (Math.abs(currAngle)/(max_angle*2));
							// scale = 1 - (Math.abs(currAngle)/(max_angle*20));
						}
						options[xform] = 'rotateX('+currAngle+'deg) translateZ('+distance+'px)';
						options['opacity'] = opacity;
						curr.css(options);
						// s: remix added
						if ( curr.css('opacity') > 0.9 ){
							curr.addClass('wslot-item-selected').siblings().removeClass('wslot-item-selected');
						}
						// e: remix added
					});
				}
				return false;
			}).off(end).on(end, function(e) {
				var ini = $(this);
				//console.log('end');
				if (ini.is('.w-roll-touched')) {
					var deltaY = ini.data('initialtouch') - getEventPos(e).y;
					
					var mainAngle = parseInt(ini.data('cur-angle')) + parseInt(deltaY/2);

					var maxAngle = (opts.items.length - 1) * opts.angle;
					
					var index = Math.round(mainAngle / opts.angle);

					if (mainAngle < 0) {
						var excess = 0 - mainAngle;
						mainAngle = -(25*excess/(excess+25));
						index = 0;
					} else if (mainAngle > maxAngle) {
						var excess = mainAngle - maxAngle;
						mainAngle = maxAngle + (25*excess/(excess+25));
						index = (opts.items.length - 1);
					} 

					ini.data('cur-angle',mainAngle);

					rollTo(ini,index);
				}
				ini.removeClass('w-roll-touched')
				return false;
			});
		} else {
			return this;
		}
		// s: remix added
		function comfirmClick(){
			$('.select-confirm').on('click', function(){
				var $this = $(this);

				$this.each(function(){
					var $thisP = $this.parents('.wslot-select');
					$('['+$thisIndexFilterIdx+'="'+$thisP.attr(''+$listIndexFilterIdx+'')+'"]').find('[data-type="value"]').text( $thisP.find('.wslot-item-selected').text() )
					_this.WSlot('hide');
					$thisP.removeClass('show')
				})
			})
		}
		// function valueClick(){
		// 	var selectValue = _this.find('[data-type="value"]');

		// 	selectValue.each(function(){

		// 		var $this = $(this);
		// 		$this.on('click', function(){
		// 			var $thisP = $this.parent();
		// 			$('['+$listIndexFilterIdx+'="'+$thisP.attr($thisIndexFilterIdx)+'"]').addClass('show')
		// 		})
		// 	})
		// }
		// e: remix added

		function rollTo(objek,index){
			if (index < 0) {
				index = 0;
			} else if (index >= opts.items.length) {
				index = opts.items.length - 1;
			}
			var fromAngle = parseInt(objek.data('cur-angle'));
			var toAngle = index * opts.angle;
			var deltaAngle = toAngle - fromAngle;
			animationStep(10,1,function(step,curStep,objek){
				var mainAngle = easeOutQuad(curStep,fromAngle,deltaAngle,step);
				objek.children('div').each(function () {
					var curr = $(this);
					var options = {};
					var currAngle = mainAngle-(curr.index()*opts.angle);
					options['display'] = '';
					if(Math.abs(currAngle) > opts.displayed_length*opts.angle) {
						options['display'] = 'none';
					}
					var opacity = 0;
					// var scale = 0.95;
					var max_angle = opts.angle * opts.displayed_length;
					if(Math.abs(currAngle) <= max_angle) {
						opacity = 1 - (Math.abs(currAngle)/(max_angle*2));
						// scale = 1 - (Math.abs(currAngle)/(max_angle*20));
					}
					options[xform] = 'rotateX('+currAngle+'deg) translateZ('+distance+'px)';
					options['opacity'] = opacity;
					curr.css(options);
				});
			},function(objek){
				objek.children('div').each(function () {
					var curr = $(this).removeClass(class_item_selected);
					var options = {};
					var currAngle = toAngle-(curr.index()*opts.angle);
					options['display'] = '';
					if(Math.abs(currAngle) > opts.displayed_length*opts.angle) {
						options['display'] = 'none';
					}
					var opacity = 0;
					// var scale = 0.95;
					var max_angle = opts.angle * opts.displayed_length;
					if(Math.abs(currAngle) <= max_angle) {
						opacity = 1 - (Math.abs(currAngle)/(max_angle*2));
						// scale = 1 - (Math.abs(currAngle)/(max_angle*20));
					}
					options[xform] = 'rotateX('+currAngle+'deg) translateZ('+distance+'px)';
					options['opacity'] = opacity;
					curr.css(options);
					if(currAngle == 0) {
						curr.addClass(class_item_selected);
					}
				});
				objek.data('cur-angle',toAngle);
				objek.trigger('WSlot.change',[index]);
			},objek);
		};

	};

	$.fn.WSlot.defaults = {
		items : [],
		center : 'first',
		distance : 70,
		displayed_length : 3,
		angle : 25,
		rotation : 0,
		item_height : 30,
	};

	var xform = 'transform';
    ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
		// remix edited
        // if (typeof document.body.style[e] !== 'undefined') {
            xform = e;
        // }
		// remix edited : 조건문 제거

    });

    var start = 'touchstart mousedown';
    var move = 'touchmove mousemove';
    var end = 'touchend mouseup mouseleave';
    var wslot_rollto = 'WSlot.rollTo';
    var class_item_selected = 'wslot-item-selected';

    function animationStep(step, curStep, stepFunc, doneFunc, objek){
		if(curStep <= step)
		{
			if(typeof stepFunc == 'function')
			{
				stepFunc(step,curStep,objek);
			}
			curStep = curStep+1;
			window.requestAnimationFrame(function() {
				animationStep(step,curStep,stepFunc,doneFunc,objek);
			});
		}
		else
		{
			if(typeof doneFunc == 'function')
			{
				doneFunc(objek);
			}
		}
	};

	function getEventPos(e) {
		//jquery event
		if (e.originalEvent) {
			// touch event
			if (e.originalEvent.changedTouches && (e.originalEvent.changedTouches.length >= 1)) {
				return {
					x: e.originalEvent.changedTouches[0].pageX,
					y: e.originalEvent.changedTouches[0].pageY
				};
			}
			// mouse event
			return {
				x: e.originalEvent.clientX,
				y: e.originalEvent.clientY
			};
		} else {
			// touch event
			if (e.changedTouches && (e.changedTouches.length >= 1)) {
				return {
					x: e.changedTouches[0].pageX,
					y: e.changedTouches[0].pageY
				};
			}
			// mouse event
			return {
				x: e.clientX,
				y: e.clientY
			};
		}
	};

	function easeOutQuad(t, b, c, d) {
	    return -c * (t /= d) * (t - 2) + b;
	};


})(jQuery);
