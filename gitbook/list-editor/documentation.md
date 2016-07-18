# ListEditor Documentation

### Usage
```html
    <sc-list-editor delete-handler="deleteHandler()"
                       groups="groups"
                       ng-model="ngModel"
                       placeholder="placeholderText"
                       title="defaultTitle"
                       title-placeholder="TitleInputPlaceholder"
                       title-editable="true/false"
                       removable="true/false">
    </sc-list-editor>
```

### Inputs

| **Name** | **Type** | **Element** | **Default** | **Description** |
| -- | -- | -- | -- |
| deleteHandler | function | sc-list-editor | none | The function called when trash button is pressed
| deleteButtonTitle | string | sc-list-editor | none | The title on delete button
| editButtonTitle | string | sc-list-editor | none | The title on edit title button
| ngModel | variable | sc-list-editor | none | The ngModel value, this is the value updated when an element is choosen. The ngModel value is an array of each selected item's id
| groups | array | sc-list-editor | none | The array of data to fill in the dropdown
| title | string | sc-list-editor | none | The default title shown
| titlePlaceholder | string | sc-list-editor | none | When editing the title, this map the placeholder of the input
| titleEditable | boolean | sc-list-editor | none | set the title editable or not
| removable | boolean | sc-list-editor | none | Allow to display the trash icon
| validateButtonTitle | string | sc-list-editor | none | The title on validate button

### Group format

Each group in input is on this format :

```
    groups: [
        {
            icon: 'path to an svg',
            badgeBackgroundColor: 'exadecimal color',
            items: [
                {id: "id1", label: "label1"}
            ]
        },
        {
            items: [
                {id: "id2", label: "Label2"}
            ]
        }
    ]
```