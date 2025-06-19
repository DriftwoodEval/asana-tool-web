const colorMap = {
	"dark-green": "#83C9A9",
	"dark-red": "#F06A6A",
	"light-purple": "#CD95EA",
	"dark-purple": "#9E97E7",
	"dark-brown": "#F8DF72",
	"dark-orange": "#EC8D71",
	"light-blue": "#4573D2",
	"dark-teal": "#9EE7E3",
	"light-teal": "#4ECBC4",
	"light-red": "#FC979A",
	"dark-pink": "#F26FB2",
	"light-pink": "#F9AAEF",
	"light-warm-gray": "#6D6E6F",
	none: "#C7C4C4",
};

export function isColorKey(key: string): key is keyof typeof colorMap {
	return key in colorMap;
}

export function getColorFromMap(key: string): string {
	return colorMap[key as keyof typeof colorMap];
}
