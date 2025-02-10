import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const Item = ({ name,phone,landline }) => (
    <TouchableOpacity style={styles.userItem}>
        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 10 }}>
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.itemText}>{phone}</Text>
                <Text style={styles.itemText}>{landline}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const Search = () => {
    const route = useRoute();
    console.log('SearchScreen', route.params.data.results);
    const [res, setRes] = useState('');
    useEffect(() => {
        setRes(route.params.data.results);
    }, []);
    const renderItem = ({ item }) => (
        <Item name={item.name} phone={item.phone} landline={item.landline}/>
    );
    console.log('res.SearchResults', res.searchResults);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={res.searchResults}
                renderItem={renderItem}
                keyExtractor={item => item.user_id.toString()}
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    userItem: {
        width: '100%',
        backgroundColor: 'purple',
        padding: 5,
        marginTop: 10,
    },
});