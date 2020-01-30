const titleFormatter = (title) => {
	const titleArrary = title.split(' ');
	const formattedTitle = [];

	for (let i = 0; i < titleArrary.length; i++) {
		titleArrary[i].charAt(0).toUpperCase() + titleArrary[i].substr(1, titleArrary[i].length);
		formattedTitle.push(titleArrary[i].charAt(0).toUpperCase() + titleArrary[i].substr(1, titleArrary[i].length)
		);
	}

	return formattedTitle.join(' ');

};

module.exports = titleFormatter;
