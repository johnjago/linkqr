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

generateQR(document.querySelector('#url').placeholder);

const userLanguage = navigator.language || navigator.userLanguage;
const currentDate = new Date();
const dayOfWeekName = currentDate.toLocaleDateString(userLanguage, { weekday: 'long' });
document.querySelector('#day').textContent = dayOfWeekName;
