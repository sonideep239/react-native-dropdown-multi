import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const CustomDropdown = React.memo(({
    data,
    isVisible,
    onClose,
    onSelect,
    isSearchEnabled = false,
    selectedValue,
    onPress,
    isClearable = false,
    placeholder = 'Select an item',
    isMultiSelect = false,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (isMultiSelect && selectedValue) {
            const updatedItems = selectedValue.map(item => item);
            setSelectedItems(updatedItems);
        }
    }, [selectedValue, isMultiSelect]);

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.label?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const handleSelectItem = useCallback((item) => {
        if (isMultiSelect) {
            setSelectedItems(prevSelected => {
                const isSelected = prevSelected.some(selectedItem => selectedItem.value === item.value);
                return isSelected
                    ? prevSelected.filter(selectedItem => selectedItem.value !== item.value)
                    : [...prevSelected, item];
            });
        } else {
            onSelect(item);
            onClose(item);
        }
    }, [onSelect, onClose, isMultiSelect]);

    const clearSearch = useCallback(() => setSearchQuery(''), []);

    const handleClearSelection = useCallback(() => {
        if (isMultiSelect) {
            setSelectedItems([]);
            onSelect([]);
        } else {
            setSelectedItems([]);
            onSelect({ value: '', label: '' });
        }
    }, [onSelect, isMultiSelect]);

    const renderItem = ({ item }) => {
        const isSelected = isMultiSelect
            ? selectedItems.some(selectedItem => selectedItem.value === item.value)
            : selectedValue?.value === item.value;

        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <View style={styles.item}>
                    <View style={[
                        styles.circle,
                        {
                            backgroundColor: isSelected ? 'green' : 'white',
                            borderColor: isSelected ? 'green' : 'gray',
                        },
                    ]} />
                    <Text style={styles.itemText}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSelected = () => {
        if (isMultiSelect) {
            return selectedItems.length > 0 ? (
                <Text numberOfLines={1} style={styles.multiselectText}>
                    {selectedItems.map(item => item.label).join(', ')}
                </Text>
            ) : (
                <Text style={styles.placeholderText}>
                    {placeholder}
                </Text>
            );
        } else {
            return selectedValue?.value ? (
                <Text numberOfLines={1} style={styles.selectedText}>
                    {selectedValue.label}
                </Text>
            ) : (
                <Text style={styles.placeholderText}>
                    {placeholder}
                </Text>
            );
        }
    };

    return (
        <TouchableOpacity
            disabled={isVisible}
            style={styles.pickerWrapper}
            onPress={onPress}
        >
            <View style={styles.contentWrapper}>
                {isVisible ? (
                    <Modal
                        animationType="fade"
                        transparent
                        visible={isVisible}
                        onRequestClose={onClose}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                {isSearchEnabled && (
                                    <View style={styles.searchContainer}>
                                        <TextInput
                                            placeholderTextColor="gray"
                                            style={styles.searchInput}
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChangeText={setSearchQuery}
                                        />
                                        {searchQuery && (
                                            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                                                <MaterialIcons name="clear" size={20} color="red" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                <FlatList
                                    keyboardShouldPersistTaps="handled"
                                    data={filteredData}
                                    ListEmptyComponent={() => (
                                        <Text style={styles.emptyListText}>No data found!</Text>
                                    )}
                                    keyExtractor={item => item.id || item.value}
                                    renderItem={renderItem}
                                    getItemLayout={(data, index) => ({
                                        length: 50,
                                        offset: 50 * index,
                                        index,
                                    })}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: 'gray' }]}
                                        onPress={onClose}
                                    >
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                    {(isMultiSelect ? selectedItems.length > 0 : selectedValue?.value) && (
                                        <TouchableOpacity
                                            style={[styles.button, { backgroundColor: 'green' }]}
                                            onPress={() => {
                                                if (isMultiSelect) {
                                                    onSelect(selectedItems);
                                                } else {
                                                    onSelect(selectedValue);
                                                }
                                                onClose();
                                            }}
                                        >
                                            <Text style={styles.buttonText}>Submit</Text>
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    renderSelected()
                )}
                {(isMultiSelect ? selectedItems.length > 0 : selectedValue?.value) && isClearable ? (
                    <TouchableOpacity onPress={handleClearSelection} style={styles.clearIcon}>
                        <FontAwesome name="times" size={16} color="red" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.dropdownIcon}>
                        <FontAwesome name="caret-down" size={16} color="black" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        flex: 1,
        maxHeight: '80%',
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    pickerWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: 'black',
    },
    clearButton: {
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 2,
    },
    itemText: {
        color: 'black',
    },
    emptyListText: {
        color: 'red',
        textAlign: 'center',
        paddingVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 15,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: width * 0.3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedText: {
        color: 'black',
        fontSize: 16,
    },
    multiselectText: {
        flex: 0.90,
        color: 'black',
        fontSize: 16,
    },
    placeholderText: {
        color: 'gray',
        fontSize: 16,
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
});

export default CustomDropdown;
