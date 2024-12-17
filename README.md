# react-native-dropdown-multi

react-native-dropdown-multi is supported on both Android and iOS, making it a versatile solution for cross-platform dropdown functionality in React Native applications. Here's a breakdown of its key features

### Key Features

- Multi-Select & Single Select
- Searchable
- Customizable Styling
- Modal Interface
- Clear Selection Option
- Cross-Platform


## Screenshots

![App Screenshot](https://github.com/sonideep239/react-native-dropdown-multi/blob/main/src/assets/1.png)
![App Screenshot](https://github.com/sonideep239/react-native-dropdown-multi/blob/main/src/assets/2.png)
![App Screenshot](https://github.com/sonideep239/react-native-dropdown-multi/blob/main/src/assets/3.png)
![App Screenshot](https://github.com/sonideep239/react-native-dropdown-multi/blob/main/src/assets/4.png)

## Installation

Use the package manager [npm](https://www.npmjs.com) to install react-native-dropdown-multi.

```bash
npm i react-native-dropdown-multi
```
OR
```bash
yarn add react-native-dropdown-multi
```

## Installation Steps
The library has specified dedicated steps for each platform. Please follow their installation guide in order to properly use icon fonts.
```bash
npm i react-native-vector-icons
```

### IOS Installation
Please refer linked document [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons#ios-setup)

### Android Installation
Please refer linked document [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons#android-setup)

## Usage

```react-native
import React, { useState } from 'react';
import CustomDropdown from 'react-native-dropdown-multi';

const [selectedEmployee, setSelectedEmployee] = useState({ label: '', value: '' });
const [selectedEmployees, setSelectedEmployees] = useState([]);
const [isReportForVisible, setIsReportForVisible] = useState(false);
const [isAssignVisible, setIsAssignVisible] = useState(false);

const employees = Array.from({ length: 100 }, (_, i) => ({
    label: `Employee ${i + 1}`,
    value: i + 1,
  }));

const toggleReportForDropdown = () => setIsReportForVisible(!isReportForVisible);
const toggleAssignDropdown = () => setIsAssignVisible(!isAssignVisible);

const updateAssignedEmployees = (value) => {
    setSelectedEmployees(value.map((val) => val));
};

<View style={{ padding: 15, gap: 10 }}>
        <Text>Example 1 </Text>
        <CustomDropdown
          isClearable={true}
          selectedValue={selectedEmployee}
          isSearchEnabled={true}
          data={employees}
          isVisible={isReportForVisible}
          onClose={toggleReportForDropdown}
          onSelect={setSelectedEmployee}
          onPress={toggleReportForDropdown}
          customStyles={{
            pickerWrapper: { borderColor: 'blue' },
            itemText: { color: 'darkblue' },
            buttonText: { color: 'white', fontWeight: 'bold' },
          }}
          customButtonLabels={{ submit: 'Confirm', close: 'Cancel' }}
          dropdownHeight={500}
          searchPlaceholder="Type to search..."
          loading={false}
        />

        <Text>Example 2 (Multiselect)</Text>
        <CustomDropdown
          isClearable={true}
          selectedValue={selectedEmployees}
          isSearchEnabled={true}
          isMultiSelect={true}
          data={employees}
          isVisible={isAssignVisible}
          onClose={toggleAssignDropdown}
          onSelect={updateAssignedEmployees}
          onPress={toggleAssignDropdown}
        />
</View>
```



## Props & Styling
#### Props 
Certainly! Below is a table summarizing all the props, their types, whether they are required, and default values (if applicable). Additionally, I'll include the corresponding styling properties for each prop:

| **Prop**                | **Type**              | **Description**                                                                                                        | **Required** | **Default Value**                              |
|-------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------|--------------|------------------------------------------------|
| `data`                  | `Array<Object>`       | The data array to populate the dropdown. Each object must have a `value` and `label` property.                          | Yes          | **Required.** No default value.                |
| `isVisible`             | `boolean`             | Controls whether the dropdown modal is visible or not.                                                                  | Yes          | **Required.** No default value.                |
| `onClose`               | `Function`            | A function to handle closing the dropdown.                                                                                | Yes          | **Required.** No default value.                |
| `onSelect`              | `Function`            | A function to handle item selection. Receives the selected item or items.                                               | Yes          | **Required.** No default value.                |
| `isSearchEnabled`       | `boolean`             | If `true`, the search bar will be enabled in the dropdown.                                                                | No           | `false`                                        |
| `selectedValue`         | `Object`              | The initially selected item. The object should have a `value` and `label`.                                               | No           | `{}` (empty object)                            |
| `onPress`               | `Function`            | A function to be called when the dropdown is pressed (to open the modal).                                                | Yes          | **Required.** No default value.                |
| `isClearable`           | `boolean`             | If `true`, a clear icon will be displayed to clear the selection.                                                        | No           | `false`                                        |
| `placeholder`           | `string`              | Placeholder text for the dropdown input when no item is selected.                                                       | No           | `"Select an item"`                             |
| `isMultiSelect`         | `boolean`             | If `true`, the dropdown will allow multiple selections.                                                                  | No           | `false`                                        |
| `customStyles`          | `Object`              | A set of custom styles to override default styles. Custom styles can include `pickerWrapper`, `item`, `modalContainer`, and more. | No           | `{}` (empty object)                            |
| `customButtonLabels`    | `Object`              | Custom labels for the buttons. Supports `submit` and `close`.                                                             | No           | `{ submit: "Submit", close: "Close" }`          |
| `customIcons`           | `Object`              | Custom icons for the dropdown button and clear icon. Supports `dropdown` and `clear`.                                    | No           | `{ dropdown: <FontAwesomeIcon>, clear: <FontAwesomeIcon> }` |
| `dropdownHeight`        | `number`              | Defines the height of the dropdown modal.                                                                                 | No           | `height * 0.7`                                  |
| `searchPlaceholder`     | `string`              | Placeholder text for the search input.                                                                                   | No           | `"Search..."`                                   |
| `loading`               | `boolean`             | If `true`, a loading indicator will be shown instead of the dropdown items.                                               | No           | `false`                                        |

#### Custom Styles (for the customStyles prop)
Here are the available custom styles that can be passed within the customStyles prop:

| **Prop**                | **Type**              | **Description**                                                                                                        | **Required** | **Default Value**                              |
|-------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------|--------------|------------------------------------------------|
| `pickerWrapper`         | `Object`              | Custom styles for the wrapper of the dropdown input. This affects the overall outer container of the dropdown.          | No           | `{}` (empty object)                            |
| `contentWrapper`        | `Object`              | Custom styles for the wrapper inside the dropdown input, usually for the layout (row, alignment, etc.).                 | No           | `{}` (empty object)                            |
| `item`                  | `Object`              | Custom styles for individual dropdown items (each option). Can adjust padding, borders, etc.                           | No           | `{}` (empty object)                            |
| `itemText`              | `Object`              | Custom styles for the text inside each dropdown item.                                                                  | No           | `{}` (empty object)                            |
| `selectedColor`         | `string`              | The color applied to the item circle when it's selected.                                                               | No           | `'green'`                                      |
| `selectedTextColor`     | `string`              | Custom text color for selected items (multi-select).                                                                   | No           | `'black'`                                      |
| `modalContainer`        | `Object`              | Custom styles for the outer container of the dropdown modal.                                                           | No           | `{}` (empty object)                            |
| `modalView`             | `Object`              | Custom styles for the modal view, where the dropdown list and buttons reside.                                           | No           | `{}` (empty object)                            |
| `searchContainer`       | `Object`              | Custom styles for the search bar container inside the dropdown modal.                                                  | No           | `{}` (empty object)                            |
| `searchInput`           | `Object`              | Custom styles for the text input inside the search bar of the dropdown modal.                                           | No           | `{}` (empty object)                            |
| `clearButton`           | `Object`              | Custom styles for the clear button (appears when the search input is not empty).                                        | No           | `{}` (empty object)                            |
| `buttonContainer`       | `Object`              | Custom styles for the container holding the submit and close buttons.                                                  | No           | `{}` (empty object)                            |
| `button`                | `Object`              | Custom styles for the individual buttons (submit or close).                                                            | No           | `{}` (empty object)                            |
| `buttonText`            | `Object`              | Custom styles for the text inside the submit and close buttons.                                                       | No           | `{}` (empty object)                            |
| `multiselectText`       | `Object`              | Custom styles for the text inside the multi-select dropdown (when multiple items are selected).                        | No           | `{}` (empty object)                            |
| `placeholderText`       | `Object`              | Custom styles for the placeholder text when no item is selected in the dropdown.                                       | No           | `{}` (empty object)                            |
| `clearIcon`             | `Object`              | Custom styles for the clear icon (for clearing the selection).                                                         | No           | `{}` (empty object)                            |
| `dropdownIcon`          | `Object`              | Custom styles for the dropdown icon (the arrow indicator).                                                             | No           | `{}` (empty object)                            |
| `loadingContainer`      | `Object`              | Custom styles for the loading spinner container when the dropdown is in a loading state.                               | No           | `{}` (empty object)                            |
| `emptyListText`         | `Object`              | Custom styles for the "No data found" text when the filtered list is empty.                                           | No           | `{}` (empty object)                            |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)