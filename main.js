document.addEventListener('DOMContentLoaded', init);

function init() {
	loadURL();

	const input = document.querySelector('#url');
	generateQR(input.value ?? input.placeholder);

	showFooterGreeting();
}

document.querySelector('#url').addEventListener(
	'input',
	event => generateQR(event.target.value)
);

function generateQR(URL) {
	if (URL === '') {
		URL = document.querySelector('#url').placeholder;
	}

	QRCode.toCanvas(
		document.querySelector('#canvas'),
		URL,
		function (error) {
			if (error) {
				console.error(error);
			} else {
				console.log('success!');
			}
		}
	);
}

document.querySelector('#url').addEventListener(
	'input',
	event => updateURL(event.target)
);

function loadURL() {
	const params = new URLSearchParams(window.location.search);
	const url = params.get('url');
	if (!url) {
		return;
	}
	document.querySelector('#url').value = params.get('url');
}

function updateURL(input) {
	const encodedURI = encodeURIComponent(input.value);
	let currentURL = window.location.href;

	if (currentURL.includes('?')) {
		currentURL = currentURL.replace(/(\?|&)url=([^&]*)/, `$1url=${encodedURI}`);
	} else {
		currentURL += `?url=${encodedURI}`;
	}

	window.history.pushState({ path: currentURL }, '', currentURL);
}

function showFooterGreeting() {
	const userLanguage = navigator.language || navigator.userLanguage;
	const currentDate = new Date();
	const dayOfWeekName = currentDate.toLocaleDateString(
		userLanguage,
		{ weekday: 'long' }
	);
	document.querySelector('#day').textContent = dayOfWeekName;
}
