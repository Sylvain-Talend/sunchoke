/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/
import FilterModelFactory from './filter-model-factory.js';
import { FILTER_TYPE } from './../model/filter-const.js';
import ExactFilter from '../model/exact-filter.model.js';
import InFilter from "../model/in-filter.model.js";

describe('filter factory', () => {
    describe('creating an Exact filter', () => {
        it('should create Exact type filter ', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.EXACT,
                options: {values: ["toto"]}
            };

            //when
            const result = new FilterModelFactory().createFilter(configuration);
            //then
            expect(result instanceof ExactFilter).toBeTruthy();
            expect(result instanceof InFilter).toBeFalsy();

            expect(result.sign).toBe("=");
            expect(result.fieldId).toBe("Col1");
            expect(result.fieldName).toBe("Col1");
            expect(result.options.values[0]).toBe("toto");
        }));

        it('should convert to an in type filter ', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.EXACT,
                options: {values: ["toto", "tata"]}
            };

            //when
            const result = new FilterModelFactory().createFilter(configuration);
            //then
            expect(result instanceof ExactFilter).toBeFalsy();
            expect(result instanceof InFilter).toBeTruthy();

            expect(result.sign).toBe("in");
            expect(result.fieldId).toBe("Col1");
            expect(result.fieldName).toBe("Col1");
            expect(result.options.values[0]).toBe("toto");
            expect(result.options.values[1]).toBe("tata");
        }));
    });

    describe('creating an In type filter', () => {
        it('should create in type filter ', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.IN,
                options: {values: ["toto", "tata"]}
            };

            //when
            const result = new FilterModelFactory().createFilter(configuration);
            //then
            expect(result instanceof ExactFilter).toBeFalsy();
            expect(result instanceof InFilter).toBeTruthy();

            expect(result.sign).toBe("in");
            expect(result.fieldId).toBe("Col1");
            expect(result.fieldName).toBe("Col1");
            expect(result.options.values[0]).toBe("toto");
            expect(result.options.values[1]).toBe("tata");
        }));

        it('should convert to an exact type filter ', inject(function () {
            //given
            const configuration = {
                fieldId: 'Col1',
                fieldName: 'Col1',
                type: FILTER_TYPE.IN,
                options: {values: ["toto"]}
            };

            //when
            const result = new FilterModelFactory().createFilter(configuration);
            //then
            expect(result instanceof ExactFilter).toBeTruthy();
            expect(result instanceof InFilter).toBeFalsy();

            expect(result.sign).toBe("=");
            expect(result.fieldId).toBe("Col1");
            expect(result.fieldName).toBe("Col1");
            expect(result.options.values.length).toBe(1);
            expect(result.options.values[0]).toBe("toto");
        }));
    });
});