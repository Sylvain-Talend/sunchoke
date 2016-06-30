import FilterModelFactory from './factory/filter-model-factory.js';

/**
 * @ngdoc service
 * @name talend.sunchoke.filter:FilterService
 * @description Filter service. This service provide the entry point to manipulate filters
 */
export default class FilterService {

    constructor() {
        this.FilterModelFactory = new FilterModelFactory();
    }

    /**
     * @ngdoc method
     * @name updateFilter
     * @methodOf talend.sunchoke.filter.service:FilterService
     * @param actualFilter the current filter list
     * @param configuration the configuration to apply to the filter list
     * @description updates the current filter list with the given configuration
     */
    updateFilter(actualFilter, configuration /*{ type: '', options: { value: [], overwriteMode : true }, ... }*/, event) {
        let hasChanged = false;
        //const configuration = processConfiguration(newConfiguration/*({ filterType: '', values: [], ... }*/, event);
        //processing filter to look for modifications
        const result = actualFilter
            .map(filter => {
                const newFilter = filter.update(configuration);
                hasChanged = newFilter !== filter;
                return newFilter
            })
            //removing the filter which were removed
            .filter(filter => filter !== null);

        if (hasChanged) {
            return result;
        }
        else {
            //creating new filter
            const newFilter = this.FilterModelFactory.createFilter(configuration);
            return result.concat(newFilter);
        }
        //state.filters = ScFilter.fromTQL(tql);
    }

    removeFilter(filter) {
        // facile
    }

    //-----------------------------------------------------------------------------------------------
    // values
    //-----------------------------------------------------------------------------------------------
    addFilterValue(filter, value) { // triggered by other components
        //const actualFilters = //get
        /*return actualFilter.map(nextFilter => {
         if(filter === nextFilter) {
         return nextFilter.addValue(value);
         }
         return nextFilter;
         });*/
    }

    updateFilterValue(actualFilters, configuration /*filter, oldValue, newValue*/) {
        const { filter, oldValue, newValue } = configuration;

        return actualFilters.map(nextFilter => {
            if(filter === nextFilter) {
                return filter.updateFilterValue(oldValue, newValue);
            }
            return nextFilter;
        });
    }

    /**
     * @ngdoc method
     * @name removeFilterValue
     * @methodOf talend.sunchoke.filter.service:FilterService
     * @param actualFilter the current filter list
     * @param configuration the configuration to apply to the filter list
     * @description updates the current filter list with the given configuration
     */
    removeFilterValue(filter, value) {
        return filter.removeValue(value);
    }

    // triggered by filter-value-component
    /*toggleFilterValue(filter, value) {
        return filter.toggleValue(value);
    }*/

    // triggered by other components
        setFilterValues(filter, values) {}

    // triggered by other components
}