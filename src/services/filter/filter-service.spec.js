/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/
import InFilter from './model/in-filter.model.js';
import ExactFilter from './model/exact-filter.model.js';

import { FILTER_TYPE } from './model/filter-const.js';

describe('Filter service', () => {

    beforeEach(angular.mock.module('talend.sunchoke.services.filter'));

    beforeEach(inject(() => {
    }));

    describe('updating filter', function() {
        it('should add in filter to the current filter', inject(function (FilterService) {
            //given
            const currentFilter = [];
            const configuration = {
                fieldId: 'Col2',
                fieldName: 'Col2',
                type: FILTER_TYPE.IN,
                options: {values: ["tata", "toto", "value1"]}
            };
            //when
            const result = FilterService.updateFilter(currentFilter, configuration);
            //then
            expect(result.length).toBe(1);
            //console.log(result[0]);
            //console.log(result[0].constructor);
            //console.log(InFilter);
            //console.log(result[0].constructor === InFilter);
            //expect(result[0] instanceof InFilter).toBeTruthy();
            expect(result[0].options.values.length).toBe(3);
            expect(result[0].sign).toBe("in");
            expect(result[0].options.values[0]).toBe("tata");
            expect(result[0].options.values[1]).toBe("toto");
            expect(result[0].options.values[2]).toBe("value1");
        }));

        it('should update in filter to exact filter', inject(function (FilterService) {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.IN,
                overwriteMode: true,
                options: {values: ["toto", "tata"]}
            };
            const filter = new InFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            const currentFilter = [filter];
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.IN,
                options: {values: ["tata", "toto", "value1"]}
            };
            //when
            const result = FilterService.updateFilter(currentFilter, newConfiguration);
            //then
            expect(result.length).toBe(1);
            expect(result[0] instanceof ExactFilter).toBeTruthy();
            expect(result[0].options.values.length).toBe(1);
            expect(result[0].sign).toBe("=");
            expect(result[0].options.values[0]).toBe("value1");
        }));

        it('should update exact filter to in filter', inject(function (FilterService) {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.EXACT,
                overwriteMode: true,
                options: {values: ["toto"]}
            };
            const filter = new ExactFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            const currentFilter = [filter];
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.EXACT,
                options: {values: ["tata", "toto", "value1"]}
            };
            //when
            const result = FilterService.updateFilter(currentFilter, newConfiguration);
            //then
            expect(result.length).toBe(1);
            expect(result[0] instanceof InFilter).toBeTruthy();
            expect(result[0].options.values.length).toBe(2);
            expect(result[0].sign).toBe("in");
        }));
    });
});