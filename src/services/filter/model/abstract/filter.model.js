export default class ScFilter {
    constructor(fieldId, fieldName, options, editable) {
        /*if (new.target === ScFilter) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }*/

        //affectation
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.options = options;
        this.editable = editable;
    }

    static fromTree(subtree) {

    }

    static fromDSL(subDSL) {

    }
}