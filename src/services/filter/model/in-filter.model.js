import SimpleValueFilter from './abstract/simple-value-filter.model.js';
import ExactFilter from './exact-filter.model.js';
import { FILTER_TYPE } from "./filter-const.js";

/**
 * @ngdoc class
 * @name talend.sunchoke.filter.model:InFilter
 * @description class defining an "IN" filter
 */
export default class InFilter extends SimpleValueFilter {

    constructor(fieldId, fieldName, options, editable) {
        super(fieldId, fieldName, options, editable);
        this.sign = 'in';
    }

    /**
     * @ngdoc method
     * @name update
     * @methodOf talend.sunchoke.filter.model:InFilter
     * @param configuration the configuration to apply to the filter list
     * @description updates the current filter with the given configuration if the type and field matches
     */
    update(configuration) {
        if(configuration.fieldId === this.fieldId && configuration.type === FILTER_TYPE.IN) {

            const configurationValues = configuration.options.values; // all values
            //overwrite the filter with the current configuration values
            if (configuration.options.overwriteMode) {
                return configurationValues.length > 1 ?
                    new InFilter(this.fieldId, this.fieldName, configuration.options) :  new ExactFilter(this.fieldId, this.fieldName, configuration.options);
            }
            else {
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


   setValues(newOptions) {
       if(newOptions.values.length > 1) {
           return new InFilter(this.fieldId, this.fieldName, newOptions);
       } else if (newOptions.values.length) {
           return new ExactFilter(this.fieldId, this.fieldName, newOptions)
       }
       return null;
    }

    removeValue(value) {
        //const newValues = ///
        const newValues = this.options.values.filter((filterValue) => {
            return filterValue !== value;
        });

        //recreating an option object
        const newOptions = _.extend({}, this.options);
        newOptions.values = newValues;
        return this.setValues(newOptions);
    }

   addValue(value) {
       //adding the value to the list
       const newValues = (this.options.values.slice(0));
       newValues.push(value);

       //recreating an option object
       const newOptions = _.extend({}, this.options);
       newOptions.values = newValues;
       return this.setValues(newOptions);
    }

    updateValue(oldValue, newValue) {
        //adding the value to the list
        const newValues = (this.options.values.slice(0));
        const updateIndex = newValues.findIndex((filterValue) => {
            return this._compareValues(filterValue, oldValue);
        });

        if (updateIndex > - 1) {
            newValues[updateIndex] = newValue;
            //recreating an option object
            const newOptions = _.extend({}, this.options);
            newOptions.values = newValues;
            return this.setValues(newOptions);
        } else {
            return this;
        }
    }

    toggleValue(value) {
        const newValues = (this.options.values.slice(0));
        const updateIndex = newValues.findIndex((filterValue) => {
            return this._compareValues(filterValue, value);
        });

        if (updateIndex > - 1) {
            newValues.splice(updateIndex, 1);
        } else {
            newValues.push(value);
        }
        const newOptions = _.extend({}, this.options);
        newOptions.values = newValues;
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