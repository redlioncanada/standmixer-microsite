'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var MixerDotNav = (function (_Messenger) {
	function MixerDotNav(target) {
		_classCallCheck(this, MixerDotNav);

		_get(Object.getPrototypeOf(MixerDotNav.prototype), 'constructor', this).call(this);
		this.target = target;
		this.images = $(target).find('.mixer img');
		this.element = $(target).find('.mixer-dot-nav');
		this.index = 0;
		this._init();
	}

	_inherits(MixerDotNav, _Messenger);

	_createClass(MixerDotNav, [{
		key: '_init',
		value: function _init() {
			var self = this;

			var _loop = function (i) {
				var id = i;
				var el = i == 0 ? '<li class="selected"><div></div></li>' : '<li><div></div></li>';
				$(self.element).append(el);
				el = $(self.element).find('li').eq(i);
				$(el).click(function () {
					self.Select(id);
				});
			};

			for (var i = 0; i < self.images.length; i++) {
				_loop(i);
			}
		}
	}, {
		key: 'Select',
		value: function Select(id) {
			var self = this;
			if (id > self.images.length - 1 || self.index == id) {
				return;
			}$(self.element).find('.selected').removeClass('selected');
			$(self.element).find('li').eq(id).addClass('selected');
			self.index = id;
			self.emit('selected');
		}
	}]);

	return MixerDotNav;
})(Messenger);