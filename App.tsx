/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomDropdown from './src/CustomDropdown';

function App(): React.JSX.Element {
  const [selectedEmployee, setSelectedEmployee] = useState({ label: '', value: '' });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isReportForVisible, setIsReportForVisible] = useState(false);
  const [isAssignVisible, setIsAssignVisible] = useState(false);

  const backgroundStyle = { backgroundColor: Colors.lighter };

  const employees = Array.from({ length: 100 }, (_, i) => ({
    label: `Employee ${i + 1}`,
    value: i + 1,
  }));

  const toggleReportForDropdown = () => setIsReportForVisible(!isReportForVisible);
  const toggleAssignDropdown = () => setIsAssignVisible(!isAssignVisible);

  const updateAssignedEmployees = (value) => {
    setSelectedEmployees(value.map((val) => val));
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
