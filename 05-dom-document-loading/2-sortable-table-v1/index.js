export default class SortableTable {

  element = null;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = Array.isArray(data) ? data : data.data;

    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements();
  }

  getSubElements() {

    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for(const elem of elements) {
      result[elem.dataset.element] = elem;
    }
    
    return result;

  }

  get template() {
    return `<div class="sortable-table">
              ${this.templateHeader}
              ${this.templateBody}
           </div>`;
  }

  get templateHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.headerConfig.map(conf => this.getTemplateHeaderRow(conf)).join('')}
          </div>`;
  }

  getTemplateHeaderRow({id, title, sortable}) {
    return      `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
                  <span>${title}</span>

                  <span data-element="arrow" class="sortable-table__sort-arrow">
                    <span class="sort-arrow"></span>
                  </span>
                </div>`;
  }

  get templateBody() {
    return  `<div data-element="body" class="sortable-table__body">
               ${this.data.map(row => this.getBodyRows(row)).join('')}
            </div>`;
  }

  getBodyRows(row) {
    return `<a href="/products/${row.id}" class="sortable-table__row">
            ${this.getBodyRow(row)}
          </a>`;
  }


  getBodyRow(row) {
    const blocks = this.headerConfig.map(conf => {
      return { id: conf.id, template: conf.template }
    });

    return blocks.map(block => block.template !== undefined ? block.template(row[block.id]) : `<div class="sortable-table__cell">${row[block.id]}</div>`).join('');
  }

  sort(field, order) {
    const sortedRows = this.sortRows(field, order);
    
    const columns = this.element.querySelectorAll('[data-id]');
    const column  = this.element.querySelector(`[data-id="${field}"]`);

    for(const elem of columns) {
      elem.dataset.order = '';
    }

    column.dataset.order = order;

    this.subElements.body.innerHTML = sortedRows.map(row => this.getBodyRows(row)).join('')
  }

  sortRows(field, order) {
    const innerData = [...this.data];

    const {sortType} = this.headerConfig.find(conf => conf.id === field);

    const orderBy = {
      'asc': 1,
      'desc': -1
    }

    const multiplier = orderBy[order];

    return innerData.sort( (first, second) => {
      switch(sortType) {
        case 'number' :
          return multiplier * (first[field] - second[field]);
          break;
        case 'string' : 
          return  multiplier * first[field].localeCompare(second[field], 'RU-en', {caseFirst: multiplier === 1 ? 'upper' : 'lower', sensitivity: 'variant'}) ;
      }
    });
  }

  remove() {
    if(this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}