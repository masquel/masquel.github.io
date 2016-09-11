;(function($){
	$(document).ready(function(){
		

		$('.form__control').on('input', inputControl);

		
		$('.select').on('click', function(){
			var _this = this;
			var baseClass = "select";
			var baseClassSelector = "."+baseClass;
			var boxClass = baseClass+'__box';

			var current = $(this).find(baseClassSelector+'__current');
			var box = $(this).find(baseClassSelector+'__box');
			var items = $(this).find(baseClassSelector+'__item');

			

			$(_this).addClass('form__control--filled');
			box.addClass(boxClass+'--active');

			$(items).each(function(){
				$(this).on('click', function(){
					var value = $(this).html();
					$('[name="service"]').val(value)
					current.fadeIn().html(value);
				});
			})
		})

		$(document).on('click', function(event){
			console.log($(event.target).closest('.select'));
			if($(event.target).closest('.select').length) return;

			var baseClass = "select";
			var baseClassSelector = "."+baseClass;
			var boxClass = baseClass+'__box';

			var box = $(this).find(baseClassSelector+'__box');
			box.removeClass(boxClass+'--active');

			console.log(box);

		});
	});

	function inputControl(){
		console.log(this);
		if(this.value) $(this).addClass('form__control--filled');
	}



})(jQuery);