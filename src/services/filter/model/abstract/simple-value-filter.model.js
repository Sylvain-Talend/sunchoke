import ScFilter from './filter.model.js';

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model.abstract:SimpleValueFilter
 * @description super class for filter which values are simple types
 */
export default class SimpleValueFilter extends ScFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
    }

    /**
     * @ngdoc method
     * @name processSimpleValueConfiguration
     * @methodOf talend.sunchoke.filter.model.abstract:SimpleValueFilter
     * @param configuration the configuration to apply to the filter list
     * @description process the configuration for simple value filter
     */
    processSimpleValueConfiguration(configuration) {
        const clone =  this.options.values.slice(0);
        const newFilterValue = [];

        //looking for the given filter value in the current filter
        configuration.options.values.forEach((value) => {
            const index = clone.findIndex(filterValue => {
                return this._compareValues(value, filterValue);
            });
            if (index > - 1) {
                //removing them if they were found
                clone.splice(index, 1);
            } else {
                newFilterValue.push(value);
            }
        });

        //adding the new values
        clone.push(...newFilterValue);
        return clone;
    }

    /**
     * @ngdoc method
     * @name _compareValues
     * @methodOf talend.sunchoke.filter.model.abstract:SimpleValueFilter
     * @param value  first value to compare
     * @param valueToCompare second value to compare
     * @description compares two simple value
     */
    _compareValues(value, valueToCompare) {
        return value === valueToCompare;
    }
}