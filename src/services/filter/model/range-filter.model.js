import ScFilter from './abstract/filter.model.js';
import { FILTER_TYPE } from "./filter-const.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:RangeFilter
 * @description class defining an "range" filter
 */
export default class RangeFilter extends ScFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
        this.sign = 'range';

        //sort value
        this.options.values.sort(this._compareValues);
    }

    /**
     * @ngdoc method
     * @name update
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param configuration the configuration to apply to the filter list
     * @description updates the current filter with the given configuration if the type and field matches
     */
    update(configuration) {
        if(configuration.fieldId === this.fieldId && configuration.type === FILTER_TYPE.INSIDE_RANGE) {

            //overwrite the filter with the current configuration values
            if (configuration.overwriteMode) {
                return new RangeFilter(this.fieldId, this.fieldName, configuration.options);
            } else {
                if (configuration.rangeMergeMode) {
                    //update current filter
                    const newValue = this.mergeRangesWithCurrentOne(configuration.options.values);
                    configuration.options.values = newValue;
                } else {
                    const newValue = this.toggleFilterValues(configuration.options.values);
                    configuration.options.values = newValue;
                }
                //if there's no value left
                if (configuration.options.values.length === 0) {
                    return null;
                } else {
                    return new RangeFilter(this.fieldId, this.fieldName, configuration.options);
                }
            }
        }
        //configuration doesn't concern the current filter
        return this;
    }

    /**
     * @ngdoc method
     * @name toggleFilterValues
     * @methodOf talend.sunchoke.filter.model.abstract:ScFilter
     * @param configuration the configuration to apply to the filter list
     * @description process the configuration for simple value filter
     */
    mergeRangesWithCurrentOne(values) {
        const clone = JSON.parse(JSON.stringify(this.options.values));

        //looking for the given filter value in the current filter
        values.forEach((value) => {
            if (clone[0].min > value.min) {
                //console.log("in smallest min");
                //means the given value is the smallest one around
                clone[0].min = value.min;
            } else if (!this.inAnotherRange(clone, value)) {
                //console.log("not in another range");

                const cloneMap =  clone.filter((filterValue) => {
                    if (filterValue.max < value.max) {
                        return value;
                    }
                });
                //updating the last
                if (cloneMap.length > 0) {
                    //console.log("merging range");
                    //console.log(cloneMap);
                    cloneMap[cloneMap.length - 1].max = value.max;
                }
            }
        });
        //console.log(clone);
        return clone;
    }

    /**
     * @ngdoc method
     * @name setValues
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param newOptions the options for the new filter
     * @description creates a new filter from the current one using the given options object
     * @return the new filter
     */
    setValues(newOptions) {
        if (newOptions.values.length) {
            return new RangeFilter(this.fieldId, this.fieldName, newOptions);

        }
        return null;
    }

    /**
     * @ngdoc method
     * @name removeValue
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param value the value to remove from filter
     * @description remove a value from the filter
     * @return a new filter after removing the given one
     */
    removeValue(value) {
        const options = this.options;
        const newValues = this.options.values.filter((filterValue) => {
            return this._compareValues(filterValue, value) !== 0;
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
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param value the value to add
     * @description add a value to the filter's values
     * @return the new filter with containing the added value
     */
    addValue(value) {
        //add if it does not exist so it's just like a toggle
        return this.toggleValue(value);
    }

    /**
     * @ngdoc method
     * @name addValue
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param value the value to add
     * @description add a value to the filter's values
     * @return the new filter with containing the added value
     */
    updateValue(oldValue, newValue) {
        //adding the value to the list
        const options = this.options;
        const newValues = JSON.parse(JSON.stringify(this.options.values));
        const updateIndex = newValues.findIndex((filterValue) => {
            return this._compareValues(filterValue, oldValue) === 0;
        });

        if (updateIndex > - 1) {
            const updatedValue = newValues.splice(updateIndex, 1);
            updatedValue.min = newValue.min;
            updatedValue.max = newValue.max;

            //if the modified value is not included in other range then adding it
            if (!this.inAnotherRange(this.options.values, updatedValue)) {
                newValues.push(updatedValue);
                //recreating an option object
                const newOptions = {
                    ...options,
                    values: newValues
                };
                return this.setValues(newOptions);
            } else {
                return this;
            }
        } else {
            return this;
        }
    }

    /**
     * @ngdoc method
     * @name toggleValue
     * @methodOf talend.sunchoke.filter.model:RangeFilter
     * @param value the value to toggle
     * @description toggle a value of the filter's values
     * @return the new filter with containing the new filter value list
     */
    toggleValue(value) {
        const options = this.options;
        const newValue = this.toggleFilterValues([value]);
        const newOptions = {
            ...options,
            values: newValue
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

    //-----------------------------------------------------------------------------------------------
    // override method
    //-----------------------------------------------------------------------------------------------

    /**
     * @ngdoc method
     * @name toggleFilterValues
     * @methodOf talend.sunchoke.filter.model.abstract:ScFilter
     * @param configuration the configuration to apply to the filter list
     * @description process the configuration for simple value filter
     */
    toggleFilterValues(values) {
        const clone =  this.options.values.slice(0);

        //looking for the given filter value in the current filter
        values.forEach((value) => {
            const index = clone.findIndex(filterValue => {
                return this._compareValues(value, filterValue) === 0;
            });
            //if exactly the same one is found remove it
            if (index > - 1) {
                //removing them if they were found
                clone.splice(index, 1);
            }
            //else we need to check if it's part of another existing range
            else if(!this.inAnotherRange(clone, value)) {
                clone.push(value);
            }
        });
        return clone;
    }

    /**
     * @ngdoc method
     * @name inAnotherRange
     * @methodOf talend.sunchoke.filter.model.abstract:ScFilter
     * @param { string } filterValues the filter's values
     * @param { object } range given range
     * @description verify if the given range is included in an existing one
     * @return { boolean } true if it exists in current ranges, otherwise false
     */
    inAnotherRange(filterValues, range) {
        const rangeContainingValue = filterValues.filter((filterValue) => {
            return (range.min >= filterValue.min && range.min <= filterValue.max)
                || (range.max >= filterValue.min && range.min <= filterValue.max);
        })

        if (rangeContainingValue.length > 0) {
            //console.log("in another range");
            return true;
        }
        return false;
    }

    /**
     * @override
     *
     * @ngdoc method
     * @name _compareValues
     * @methodOf talend.sunchoke.filter.model.abstract:ScFilter
     * @param { object } colA  first range to compare
     * @param { object } colB second range to compare
     * @description compares two ranges value
     * @return { int } -1 if smaller, 1 if bigger and 0 if equals
     */
    _compareValues(colA, colB) {
        if (colA.max <= colB.min && colA.min < colB.min) {
            return -1;
        }
        if (colA.min >= colB.max &&  colA.max > colB.max) {
            return 1;
        }
        else if (colA.min === colB.min && colA.max === colB.max) {
            return 0;
        }
    }
}