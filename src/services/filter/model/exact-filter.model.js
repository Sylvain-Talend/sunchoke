import SimpleValueFilter from './abstract/simple-value-filter.model.js';
import InFilter from './in-filter.model.js';
import { FILTER_TYPE } from "./filter-const.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:ExactFilter
 * @description class defining an "exact" filter
 */
export default class ExactFilter extends SimpleValueFilter {

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
            if (configuration.options.overwriteMode) {
                return configurationValues.length > 1 ?
                    new InFilter(this.fieldId, this.fieldName, configuration.options) :  new ExactFilter(this.fieldId, this.fieldName, configuration.options);
            } else {
                //process configuration to remove existing value and add new ones
                const newValue = this.processSimpleValueConfiguration(configuration);
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
    
    
    /*setValues(newValues) {
        if(newValues.length) {
            //return new ...
        }
        return null
    }
    
    removeValue(value) {
        //const newValues = ///
        return this.setValues(newValues);
    }
    
    addValue(value) {
        //const newValues = ///
        return this.setValues(newValues);
    }
    
    updateValue(oldValue, newValue) {
        //const newValues = ///
        return this.setValues(newValues);
    }
    
    toggleValue(value) {
        if(values.contains(value)) {
            return this.remove(value);
        }
        else {
            return this.add(value);
        }
    }
    
    getFilterFn() {
        
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