//ga intermediary events
'use strict';

gaw.register('label', { action: 'Clicked Attachment Categories' }, function (str, element, cb) {
	cb($(element).text());
});

gaw.register('label', { action: 'Clicked Back to Top' }, function (str, element, cb) {
	cb($(element).closest('.mixer-panel').find('.make-button.selected').text());
});

gaw.register('label', { action: 'Clicked Attachments Bottom Tabs' }, function (str, element, cb) {
	cb($(element).closest('li').attr('data-att'));
});

gaw.register('label', { action: 'Clicked Attachment Types' }, function (str, element, cb) {
	cb($(element).text());
});

gaw.register('label', { action: 'Clicked Specifications Tab' }, function (str, element, cb) {
	var ret = $(element).text();
	if (ret == 'CLICK TO BUY >>') ret = 'Where to Buy';
	cb(ret);
});

gaw.register('label', { action: 'Clicked Attachments Arrows' }, function (str, element, cb) {
	if ($(element).hasClass('nav-left')) cb('Previous Attachment');else if ($(element).hasClass('nav-right')) cb('Next Attachment');else {
		cb(false);
	}
});

gaw.register('label', { action: 'Clicked Image Gallery' }, function (str, element, cb) {
	if (!$(element).parent().hasClass('expanded')) cb($(element).closest('li').index().toString());else cb(str);
});

if (isMobile) {
	gaw.register('label', { action: 'Selected Description Tab' }, function (str, element, cb) {
		cb($(element).closest('.mobile-drawer').find('.mobile-drawer-description .mobile-content.selected').data('ga-label'));
	});

	gaw.register('label', { action: 'Selected Gallery Tab' }, function (str, element, cb) {
		cb($(element).closest('.mobile-drawer').find('.mobile-drawer-description .mobile-content.selected').data('ga-label'));
	});

	gaw.register('label', { action: 'Selected Tips Tab' }, function (str, element, cb) {
		cb($(element).closest('.mobile-drawer').find('.mobile-drawer-description .mobile-content.selected').data('ga-label'));
	});

	gaw.register('label', { action: 'Selected Info Tab' }, function (str, element, cb) {
		cb($(element).closest('.mobile-drawer').find('.mobile-drawer-description .mobile-content.selected').data('ga-label'));
	});
}