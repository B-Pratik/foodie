export default class DomParser {
	constructor(){
		this.parser = new DOMParser();
	}

	parseString(htmlString){
		const parsedElement = this.parser.parseFromString(htmlString, 'text/html');
		return parsedElement.querySelector('template').content;
	}
}
