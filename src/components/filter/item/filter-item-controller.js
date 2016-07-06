/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/

/**
 * @ngdoc controller
 * @name data-prep.filter-item.controller:FilterItemCtrl
 * @description FilterItem controller.
 */
export default class ScFilterItemCtrl {

    constructor($translate) {
        'ngInject';
        this.$translate = $translate;
    }

    $onInit() {
        this.filter = this.value;
        this.filterValues = this.filter.options.values;
        this._setSign();

    }

    $onChanges(changes) {
        const model = changes.value;
        if (model) {
            const newModel = model.currentValue;
            if (newModel) {
                this.filter = newModel;
                this._setSign();
                this.filterValues = newModel.options.values;
            }
        }
    }


    _setSign() {
        if (this.filter) {
            switch (this.filter.sign) {
                case 'in':
                    this.sign = ' ≅ ';
                    break;
                case '=':
                    this.sign = ' = ';
                    break;
                case 'inside_range':
                    this.sign = ' in ';
                    break;
                default:
                    this.sign = this.$translate.instant('COLON');
            }
        }
    }

    /**
     * @ngdoc method
     * @name submit
     * @methodOf data-prep.filter-item:FilterItemCtrl
     * @description Apply changes
     */
    edit(index, value) {
         const filterValue = this.filterValues[index];
         if (filterValue) {
            filterValue.value = value;
            this.submit();
         }

    }

    /**
     * @ngdoc method
     * @name remove
     * @methodOf data-prep.filter-item:FilterItemCtrl
     * @description Remove criterion from a multi-valued filter
     * @param indexToRemove Position into the multi-valued list
     */
    remove(indexToRemove) {
        const valueToDelete = this.filterValues.filter((value, index) => index === indexToRemove)[0];
        this.onEdit({
            filter: this.filter,
            value: valueToDelete
        });
    }

    /**
     * @ngdoc method
     * @name submit
     * @methodOf data-prep.filter-item:FilterItemCtrl
     * @description Submit updated filter values
     */
    submit() {
         this.onEdit({
         filter: this.filter,
         value: this.filterValues
         });
    }

    /**
     * @ngdoc method
     * @name close
     * @methodOf data-prep.filter-item:FilterItemCtrl
     * @description Trigger the close callback
     */
    close() {
        this.onRemove({
            filter: this.filter
        });
    }
}