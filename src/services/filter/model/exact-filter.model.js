import ScFilter from './abstract/filter.model.js';
import InFilter from './in-filter.model.js';
import { FILTER_TYPE } from "./filter-const.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:ExactFilter
 * @description class defining an "exact" filter
 */
export default class ExactFilter extends ScFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
        this.sign = '=';
    }

    /**
     * @ngdoc method
     * @name update
     * @methodOf talend.sunchoke.filter.model:ExactFilter
     * @param configuration the configuration to apply to the filter list
     * @description updates the current filter with the given configuration if the type and field matches
     */
    update(configuration) {
        if(configuration.fieldId === this.fieldId && configuration.type === FILTER_TYPE.EXACT) {

            const configurationValues = configuration.options.values; // all values
            //overwrite the filter with the current configuration values
            if (configuration.overwriteMode) {
                return configurationValues.length > 1 ?
                    new InFilter(this.fieldId, this.fieldName, configuration.options) :  new ExactFilter(this.fieldId, this.fieldName, configuration.options);
            } else {
                //process configuration to remove existing value and add new ones
                const newValue = this.toggleFilterValues(configuration.options.values);
                configuration.options.values = newValue;

                if (configuration.options.values.length === 0) {
                    return null;
                } else {
                    return configuration.options.values.length > 1 ? new InFilter(this.fieldId, this.fieldName, configuration.options) :  new ExactFilter(this.fieldId, this.fieldName, configuration.options);
                }
            }
        }
        //configuration doesn't concern the current filter
        return this;
    }
    
    
    setValues(newOptions) {
        if(newOptions.values.length > 1) {
            return new InFilter(this.fieldId, this.fieldName, newOptions);
        } else if (newOptions.values.length) {
            return new ExactFilter(this.fieldId, this.fieldName, newOptions)
        }
        return null;
    }
    
    removeValue(value) {
        //whatever the value there can be only one value in exact filter
        //so the filter has to be deleted
        return null;
    }
    
    addValue(value) {
        const options = this.options;
        //adding the value to the list
        const newValues = (this.options.values.slice(0));
        newValues.push(value);
        //recreating an option object
        const newOptions = {
            ...options,
            values: newValues
        };
        return this.setValues(newOptions);
    }

    updateValue(oldValue, newValue) {
        const options = this.options;
        //adding the value to the list
        const newValues = (this.options.values.slice(0));
        if (this._compareValues(newValues[0], oldValue)) {
            newValues[0] = newValue;
            //recreating an option object
            const newOptions = {
                ...options,
                values: newValues
            };
            return this.setValues(newOptions);
        }
        else {
            return this;
        }
    }
    
    toggleValue(value) {
        const newValues = (this.options.values.slice(0));
        if (this._compareValues(newValues[0], value)) {
           return null;
        }
        else {
            return this.addValue(value);
        }
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