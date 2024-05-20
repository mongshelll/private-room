
$(document).ready(function() {
	frameLayout.init();
});

var frameLayout = (function(){
	return {
		init : function() {
			this.resizable();
		},
		resizable : function() {
			var $frame = $(document).find('.frame'),
				$frameList = $frame.find('.frame-list'),
				$frameView = $frame.find('.frame-view');
			var getHandleParent = null;

			if ( $frame.children().eq(0).hasClass('frame-list') ){ getHandleParent = $frameList; } 
			else { getHandleParent = $frameView; }
			
			getHandleParent.resizable({
				handles: 'e',
				start : function(event, ui) {
					$('iframe').css('pointer-events','none');
				},
				stop : function(event, ui) {
					$('iframe').css('pointer-events','auto');
				}
			});

		}
	}
})();