class MixerDotNav extends Messenger {
	constructor(target) {
		super();
		this.target = target;
		this.images = $(target).find('.mixer img');
		this.element = $(target).find('.mixer-dot-nav');
		this.index = 0;
		this._init();
	}

	_init() {
		let self = this;
		for (let i = 0; i < self.images.length; i++) {
			let id = i;
			let el = i == 0 ? `<li class="selected"><div></div></li>` : `<li><div></div></li>`;
			$(self.element).append(el);
			el = $(self.element).find('li').eq(i);
			let att = $(this.images).eq(i).attr('data-att');
			$(el).attr('data-att',att).click(function() {
				self.Select(id);
			})
		}
	}

	Select(id) {
		let self = this;
		if (id > self.images.length-1 || self.index == id) return;
		$(self.element).find('.selected').removeClass('selected');
		$(self.element).find('li').eq(id).addClass('selected');
		self.index = id;
		self.emit('selected');
	}
}