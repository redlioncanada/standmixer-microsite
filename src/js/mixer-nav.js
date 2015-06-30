class MixerDotNav extends Messenger {
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
	}

	_init() {
		let self = this;
		for (let i = 0; i < self.images.length; i++) {
			let id = i;
			let el = i == 0 ? `<li class="selected"><div></div></li>` : `<li><div></div></li>`;
			$(self.element).append(el);
			el = $(self.element).find('li').eq(i);

			let att = $(this.images).eq(i).attr('data-att');
			$(el).click(function() {
				self.lastClicked = id;
				self.emit('selected');
			}).attr('data-att',att);
		}
		if (this.mobile) $(this.element).css('marginLeft', -$(this.element).width()/2);
	}

	Select(id) {
		let self = this;
		if (id > self.images.length-1 || self.index == id) return;
		$(self.element).find('.selected').removeClass('selected');
		$(self.element).find('li').eq(id).addClass('selected');
		self.index = id;
	}

	_resize() {
		if (this.mobile) $(this.element).css('marginLeft', -$(this.element).width()/2);
	}
}