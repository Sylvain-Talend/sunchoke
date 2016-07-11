# Filter-list Documentation

### Usage
```html
        <sc-filter-list class="list" filters="$ctrl.filters" on-filter-remove="$ctrl.removeFilter(filter)" on-filter-remove-value="$ctrl.removeFilterValue(filter, value)"  removable="$ctrl.removable"></sc-filter-list>
```

### Inputs

| **Name** | **Type** | **Element** | **Default** | **Description** |
| -- | -- | -- | -- |
| filters | variable | sc-filter-list | none | Filters to display
| removable | object | sc-filter-list | false | indicate if we display remove icon button for a filter value


### Outputs

| **Name** | **Type** | **Element** | **Description** |
| -- | -- | -- | -- |
| on-filter-remove | function | sc-filter-list  | The callback to execute when remove a filter (and all its values) |
| on-filter-remove-value | function | sc-filter-list  | The callback to execute when remove a filter value |
| on-remove | function | sc-filter-list | The callback to execute when click on close button |
