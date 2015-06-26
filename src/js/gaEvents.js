//ga intermediary events
gaw.register('label', {'action': 'Clicked Attachment Categories'}, function(str, element, cb) {
    cb($(element).text());
});

gaw.register('label', {'action': 'Clicked Back to Top'}, function(str, element, cb) {
	cb($(element).closest('.mixer-panel').find('.make-button.selected').text());
});

gaw.register('label', {'action': 'Clicked Attachments Bottom Tabs'}, function(str, element, cb) {
	cb($(element).closest('li').attr('data-att'));
});

gaw.register('label', {'action': 'Clicked Attachment Types'}, function(str, element, cb) {
	cb($(element).text());
});

gaw.register('label', {'action': 'Clicked Specifications Tab'}, function(str, element, cb) {
	let ret = $(element).text();
	if (ret == 'CLICK TO BUY >>') ret = "Where to Buy";
	cb(ret);
});

gaw.register('label', {'action': 'Clicked Attachments Arrows'}, function(str, element, cb) {
	if ($(element).hasClass('nav-left')) cb('Previous Attachment');
	else if ($(element).hasClass('nav-right')) cb('Next Attachment');
	else {cb('');}
});

gaw.register('label', {'action': 'Clicked Image Gallery'}, function(str, element, cb) {
	console.log(str);
	if (!$(element).parent().hasClass('expanded')) cb($(element).closest('li').index().toString());
	else cb(str);
});