/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/
import { FILTER_TYPE } from './filter-const.js';
import RangeFilter from './range-filter.model.js';

describe('range filter model', () => {
    describe('when creating', () => {
        it('should sort all the filter values', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min:20, max:30}, {min:0, max:10}, {min:11, max:19}]}
            };

            //when
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //then
            expect(filter instanceof RangeFilter).toBeTruthy();

            expect(filter.sign).toBe("range");
            expect(filter.fieldId).toBe("Col1");
            expect(filter.fieldName).toBe("Col1");
            expect(filter.options.values.length).toBe(3);
            expect(filter.options.values[0].min).toBe(0);
            expect(filter.options.values[0].max).toBe(10);
            expect(filter.options.values[1].min).toBe(11);
            expect(filter.options.values[1].max).toBe(19);
            expect(filter.options.values[2].min).toBe(20);
            expect(filter.options.values[2].max).toBe(30);
        }));
    });
    describe('when updating filter not in merge mode and not in overwrite mode', () => {
        it('should return null when toggling existing value', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min:20, max:30}, {min:0, max:10}]}
            };
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //when
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min:20, max:30}, {min:0, max:10}]}
            };
            const result = filter.update(newConfiguration);
            //then
            expect(result).toBeNull();
        }));

        it('should toggle filter value and ignore ranges which are part of another range', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min:20, max:30}, {min:80, max:90}]}
            };
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //when
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min:25, max:29}, {min:25, max:50}, {min:0, max:10},  {min:80, max:90}, {min:40, max:50}]}
            };
            const result = filter.update(newConfiguration);

            //then
            expect(result instanceof RangeFilter).toBeTruthy();
            expect(result.options.values.length).toBe(3);
            expect(result.options.values[0].min).toBe(0);
            expect(result.options.values[0].max).toBe(10);
            expect(result.options.values[1].min).toBe(20);
            expect(result.options.values[1].max).toBe(30);
            expect(result.options.values[2].min).toBe(40);
            expect(result.options.values[2].max).toBe(50);
        }));
    });

    describe('when updating filter in overwrite mode', () => {
        it('should overwrite current filter value by the given one', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min: 20, max: 30}, {min: 0, max: 10}]}
            };
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //when
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                overwriteMode: true,
                options: {values: [{min: 25, max: 30}, {min: 9, max: 20}]}
            };
            const result = filter.update(newConfiguration);

            //then
            expect(result instanceof RangeFilter).toBeTruthy();
            expect(result.options.values.length).toBe(2);
            expect(result.options.values[0].min).toBe(9);
            expect(result.options.values[0].max).toBe(20);
            expect(result.options.values[1].min).toBe(25);
            expect(result.options.values[1].max).toBe(30);
        }));
    });

    describe('when updating filter in range merge mode', () => {
        it('should modify smallest range min when giving a smaller range', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min: 20, max: 30}, {min: 5, max: 10}]}
            };
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //when
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                rangeMergeMode: true,
                options: {values: [{min: 1, max: 5}]}
            };
            const result = filter.update(newConfiguration);

            //then
            expect(result instanceof RangeFilter).toBeTruthy();
            expect(result.options.values.length).toBe(2);
            expect(result.options.values[0].min).toBe(1);
            expect(result.options.values[0].max).toBe(10);
            expect(result.options.values[1].min).toBe(20);
            expect(result.options.values[1].max).toBe(30);
        }));

        it('should modify biggest range which is smaller than the given one', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                options: {values: [{min: 5, max: 10}, {min: 20, max: 30}]}
            };
            const filter = new RangeFilter(configuration.fieldId, configuration.fieldName, configuration.options);

            //when
            const newConfiguration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.INSIDE_RANGE,
                rangeMergeMode: true,
                options: {values: [{min: 11, max: 17}, {min: 18, max: 19}, {min: 25, max: 50}, {min: 31, max: 40}]}
            };
            const result = filter.update(newConfiguration);

            //then
            expect(result instanceof RangeFilter).toBeTruthy();
            expect(result.options.values.length).toBe(2);
            expect(result.options.values[0].min).toBe(5);
            expect(result.options.values[0].max).toBe(19);
            expect(result.options.values[1].min).toBe(20);
            expect(result.options.values[1].max).toBe(40);
        }));
    });
});