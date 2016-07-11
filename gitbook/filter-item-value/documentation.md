# Filter item value Documentation

### Usage
```html
     <sc-filter-value value="$ctrl.value.getLabel(filterValue)" editable="$ctrl.editable" removable="!($first && $last)" on-edit="$ctrl.edit($index, value)"  on-remove="$ctrl.remove($index)"></sc-filter-value>
```

### Inputs

| **Name** | **Type** | **Element** | **Default** | **Description** |
| -- | -- | -- | -- |
| value | variable | sc-filter-value | none | Filter to display (must be a string)
| editable | variable | sc-filter-value | false | indicate if the filter is editable
| removable | variable | sc-filter-value | false | indicate if the filter is removable


### Outputs

| **Name** | **Type** | **Element** | **Description** |
| -- | -- | -- | -- |
| on-edit | function | sc-filter-value  | The callback to execute when edit a filter |
| on-remove | function | sc-filter-value  | The callback to execute when remove a filter |
