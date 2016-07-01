import AbstractExactInFilter from "./abstract/exact-in-filter.model.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:InFilter
 * @description class defining an "empty" filter
 */
export default class EmptyFilter extends AbstractExactInFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
        this.sign = 'empty';
    }

}