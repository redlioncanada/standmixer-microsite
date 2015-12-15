class MixerDotNav extends Messenger {
	constructor(target, mobile=false) {
		super();
		this.target = target;
		this.mobile = mobile;
		this.images = $(target).find('.mixer img');
		this.element = $(target).find('.mixer-dot-nav');
		this.parent = $(target).closest('.mixer-panel');
		$(this.element).attr('data-ga-action', 'Swiped Attachment Type');
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
			let label = $(this.parent).find('.mobile-drawer-description .mobile-content').eq(i).attr('data-ga-label');
			$(el).attr('data-ga-label', label);

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
		$(self.element).find('.selected').removeClass('selected');
		if (id >= self.images.length) {
			self.index = 0;
		} else if (id < 0) {
			self.index = self.images.length - 1;
		} else {
			self.index = id;
		}
		$(self.element).find('li').eq(self.index).addClass('selected');
	}

	_resize() {
		if (this.mobile) $(this.element).css('marginLeft', -$(this.element).width()/2);
	}
}