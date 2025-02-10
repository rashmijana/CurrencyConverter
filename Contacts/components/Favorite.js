import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useIsFocused, } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'ContactDatabase2.db' });

const Item = ({ name, phone,landline }) => (
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

const Favorite = () => {
    const isFocused = useIsFocused();
    const [favoriteList, setfavoriteList] = useState([]);
    useEffect(() => {
        getList();
    }, [isFocused]);
    const getList = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_contact WHERE favorite =? ', ["yes"], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                setfavoriteList(temp);
            });
        });
    };
    const renderItem = ({ item }) => (
        <Item name={item.name} phone={item.phone} landline={item.landline} />
    );
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={favoriteList}
                renderItem={renderItem}
                keyExtractor={item => item.user_id.toString()}
            />
        </View>
    );
};
export default Favorite;

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