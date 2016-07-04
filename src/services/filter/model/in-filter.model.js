import ExactFilter from './exact-filter.model.js'; //eslint-disable-line no-unused-vars
import { FILTER_TYPE } from "./filter-const.js"; //eslint-disable-line no-unused-vars
import AbstractExactInFilter from "./abstract/exact-in-filter.model.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:InFilter
 * @description class defining an "IN" filter
 */
export default class InFilter extends AbstractExactInFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
        this.sign = 'in';
    }

    /**
     * @ngdoc method
     * @name removeValue
     * @methodOf talend.sunchoke.filter.model:InFilter
     * @param value the value to remove from filter
     * @description remove a value from the filter
     * @return a new filter after removing the given one
     */
    removeValue(value) {
        const options = this.options;
        const newValues = this.options.values.filter((filterValue) => {
            return filterValue !== value;
        });

        //recreating an option object
        const newOptions = {
            ...options,
            values: newValues
        };
        return this.setValues(newOptions);
    }

    /**
     * @ngdoc method
     * @name addValue
     * @methodOf talend.sunchoke.filter.model:InFilter
     * @param value the value to add
     * @description add a value to the filter's values
     * @return the new filter with containing the added value
     */
    addValue(value) {
       const options = this.options;
       const newOptions = {
           ...options,
           values: options.values.concat(value)
       };
       return this.setValues(newOptions);
    }

    /**
     * @ngdoc method
     * @name addValue
     * @methodOf talend.sunchoke.filter.model:InFilter
     * @param value the value to add
     * @description add a value to the filter's values
     * @return the new filter with containing the added value
     */
    updateValue(oldValue, newValue) {
        //adding the value to the list
        const options = this.options;
        const newValues = (this.options.values.slice(0));
        const updateIndex = newValues.findIndex((filterValue) => {
            return this._compareValues(filterValue, oldValue);
        });

        if (updateIndex > - 1) {
            newValues[updateIndex] = newValue;
            //recreating an option object
            const newOptions = {
                ...options,
                values: newValues
            };
            return this.setValues(newOptions);
        } else {
            return this;
        }
    }

    /**
     * @ngdoc method
     * @name toggleValue
     * @methodOf talend.sunchoke.filter.model:InFilter
     * @param value the value to toggle
     * @description toggle a value of the filter's values
     * @return the new filter with containing the new filter value list
     */
    toggleValue(value) {
        const options = this.options;
        const newValues = (this.options.values.slice(0));
        const updateIndex = newValues.findIndex((filterValue) => {
            return this._compareValues(filterValue, value);
        });

        if (updateIndex > - 1) {
            //removing the filter value
            newValues.splice(updateIndex, 1);
        } else {
            //adding the filter value
            newValues.push(value);
        }
        const newOptions = {
            ...options,
            values: newValues
        };
        return this.setValues(newOptions);
    }

    /*getFilterFn() {

    }

    toTree() {

    }

    static fromTree(subtree) {

    }

    toDSL() {

    }

    static fromDSL(subDSL) {

    }*/
}