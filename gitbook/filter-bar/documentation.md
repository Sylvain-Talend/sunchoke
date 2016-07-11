# Filter bar Documentation

### Usage
```html
    <sc-filter-bar filters="$ctrl.filters" on-filter-change='$ctrl.filterChange' on-filter-remove='$ctrl.filterRemove' on-filter-remove-value='$ctrl.filterRemoveValue' on-remove-all-filters="$ctrl.removeAllFilters" removable="true"></sc-filter-bar>
```

### Inputs

| **Name** | **Type** | **Element** | **Default** | **Description** |
| -- | -- | -- | -- |
| filters | variable | sc-filter-bar | none | The filters to display


### Outputs

| **Name** | **Type** | **Element** | **Description** |
| -- | -- | -- | -- |
| on-filter-change | function | sc-filter-bar  | The callback to execute when edit filter |
| on-filter-remove | function | sc-filter-bar  | The callback to execute when remove filter |
| on-filter-remove-value | function | sc-filter-bar  | The callback to execute when remove filter value |
| on-remove-all-filters | function | sc-filter-bar  | The callback to execute when remove all filters |
