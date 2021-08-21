export default class ColumnChart {

    chartHeight = 50;

    constructor(options) {

        this.label = '';
        this.value = 0;
        this.data = [];
        this.link = '';

        if(options !== undefined) {
            this.label = options.label || '';
            this.value = options.value || 0;
            this.link  = options.link   || '';
            this.data  = options.data   || [];
            this.formatHeading = options.formatHeading;
    
            this.value = this.formatHeading !== undefined ? this.formatHeading(this.value) : this.value ;
        }

        this.render();
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }

    getTemplate() {

        let loadClass = '';
        if (this.data.length === 0) loadClass = 'column-chart_loading';

        return `
                <div class="column-chart ${loadClass}" style="--chart-height: ${this.chartHeight}">
                    <div class="column-chart__title">
                    Total ${this.label}
                    <a class="column-chart__link" href="${this.link}">${this.link ? 'View all' : ''}</a>
                    </div>
                    <div class="column-chart__container">
                        <div data-element="header" class="column-chart__header">${this.value}</div>
                        <div data-element="body" class="column-chart__chart">${this._createColumnChart(this.data)}</div>
                    </div>
                </div>
        `;

    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;
    }

    update(arrCol) {
        const columnChart = this.element.querySelector('.column-chart__chart');
        columnChart.innerHTML = this._createColumnChart(arrCol);
    }

    _createColumnChart(arrCol) {
        let stringColumn = '';

        for( const elem of arrCol) {
            const factor = this.chartHeight / Math.max(...arrCol);

            const sizeColumn = Math.floor(elem * factor);
            stringColumn = stringColumn + `<div style="--value: ${sizeColumn}" data-tooltip="${Math.round(elem * factor / this.chartHeight * 100)}%"></div>`;
        }

        return stringColumn;
    }

}
