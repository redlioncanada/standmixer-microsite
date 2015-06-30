class MixerDotNav extends Messenger {
<<<<<<< HEAD
	constructor(target, mobile=false) {
		super();
		this.target = target;
		this.mobile = mobile;
		this.images = $(target).find('.mixer img');
		this.element = $(target).find('.mixer-dot-nav');
		this.parent = $(target).closest('.mixer-panel');
		this.index = 0;
		this._init();
		$(window).resize(this._resize);
=======
	constructor(target) {
		super();
		this.target = target;
		this.images = $(target).find('.mixer img');
		this.element = $(target).find('.mixer-dot-nav');
		this.index = 0;
		this._init();
>>>>>>> fa73c33cedb1605dd2ce35818066b51ca5d87694
	}

	_init() {
		let self = this;
		for (let i = 0; i < self.images.length; i++) {
			let id = i;
			let el = i == 0 ? `<li class="selected"><div></div></li>` : `<li><div></div></li>`;
			$(self.element).append(el);
			el = $(self.element).find('li').eq(i);
<<<<<<< HEAD

			let att = $(this.images).eq(i).attr('data-att');
			$(el).click(function() {
				self.lastClicked = id;
				self.emit('selected');
			}).attr('data-att',att);
		}
		if (this.mobile) $(this.element).css('marginLeft', -$(this.element).width()/2);
=======
			$(el).click(function() {
				self.Select(id);
			})
		}
>>>>>>> fa73c33cedb1605dd2ce35818066b51ca5d87694
	}

	Select(id) {
		let self = this;
		if (id > self.images.length-1 || self.index == id) return;
		$(self.element).find('.selected').removeClass('selected');
		$(self.element).find('li').eq(id).addClass('selected');
		self.index = id;
<<<<<<< HEAD
	}

	_resize() {
		if (this.mobile) $(this.element).css('marginLeft', -$(this.element).width()/2);
=======
		self.emit('selected');
>>>>>>> fa73c33cedb1605dd2ce35818066b51ca5d87694
	}
}