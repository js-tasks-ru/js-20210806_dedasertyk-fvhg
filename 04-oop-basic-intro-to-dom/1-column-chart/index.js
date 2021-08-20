export default class ColumnChart {

    constructor(options) {
        this.options       = options;
        this.chartHeight   =  50;
        this.render();
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('column-chart');
        element.style = `--chart-height: ${this.chartHeight}`;

        if(this.options !== undefined && this.options.data !== undefined && this.options.data.length !== 0) { 

            const stringColumn = this._createColumnChart(this.options.data);

            element.innerHTML = `
                <div class="column-chart__title">
                Total ${this.options.label}
                ${this.options.link !== undefined ? '<a class="column-chart__link" href=" '+ this.options.link +'">View all</a>' : '' }
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">${this._totalValue()}</div>
                    <div data-element="body" class="column-chart__chart">
                        ${stringColumn}
                    </div>
                </div>
            `
        }
        else {
            element.classList.add('column-chart_loading');
            element.innerHTML = `
                <div class="column-chart__title ">
                Total ${ this.options !== undefined ? this.options.label : ''}
                ${this.options !== undefined ? '<a class="column-chart__link" href=" '+ this.options.link +'">View all</a>' : ' ' }
                </div>
                <div class="column-chart__container " >
                    <div data-element="header" class="column-chart__header">
                    ${this._totalValue()}
                    </div>
                    <div data-element="body" class="column-chart__chart">
                        
                    </div>
                </div>
            `
        }

        this.element = element;
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

    _totalValue() {
        if(this.options === undefined) return '';

        if(this.options.formatHeading !== undefined) {
            return this.options.formatHeading(this.options.value)
        } 
        else if (this.options.formatHeading === undefined) {
            return this.options.value || '';
        }
    }

}
