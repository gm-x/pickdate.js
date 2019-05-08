const path = require('path');
const fs = require('fs');
const translations = {};
let lang = 'unknown';

const jQuery = {
	extend: function(enable, trans) {
		if (enable) {
			translations[lang] = trans;
		}
	},
	fn: {
		pickadate: {
			defaults: true
		},
		pickatime: {
			defaults: false
		}
	}
};


fs.readdir(path.join(__dirname, 'lib/translations'), function (err, files) {
	//handling error
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	files.forEach(function (file) {
		if (path.extname(file) !== '.js') {
			return;
		}
		lang = path.basename(file, '.js').replace(/([a-z]{1,2}).*/, '$1');
		const contents = fs.readFileSync(path.join(__dirname, 'lib/translations', file));
		eval(contents.toString());
	});

	let json = JSON.stringify(translations, null, 4);
	json = json.replace(/\"([^(\")"]+)\":/g,"$1:");

	fs.writeFileSync(path.join(__dirname, 'translations.json'), json, 'utf8');
});