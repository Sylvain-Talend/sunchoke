# DatePicker Documentation

### Usage
```html
    <sc-filter-item value="filter" editable="true" on-edit="$ctrl.changeFilter(filter, value)" removable ="$ctrl.removable" on-remove="$ctrl.removeFilter(filter)" ></sc-filter-item>
```

### Inputs

| **Name** | **Type** | **Element** | **Default** | **Description** |
| -- | -- | -- | -- |
| value | variable | sc-filter-item | none | Filter to display
| editable | variable | sc-filter-item | false | indicate if the filter is editable
| removable | variable | sc-filter-item | false | indicate if the filter is removable


### Outputs

| **Name** | **Type** | **Element** | **Description** |
| -- | -- | -- | -- |
| on-edit | function | sc-filter-item  | The callback to execute when edit a filter |
| on-remove | function | sc-filter-item  | The callback to execute when remove a filter |


### Style customisation

| **Name** | **Default** | **Description** |
| -- | -- | -- |
