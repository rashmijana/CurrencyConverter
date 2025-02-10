import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getColorByLetter } from "./utils/index";
import { SearchBar } from "react-native-elements";
let db = openDatabase({ name: 'ContactDatabase2.db' })
const ContactList = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [myContacts, setMyContacts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const getData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_contact', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                setMyContacts(temp);
            });
        });
    };
    useEffect(() => {
        getData();
    }, [isFocused]);
    const deleteUser = id => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM  table_contact where user_id=?',
                [id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        alert("Deleted Successfully")
                        getData();
                    } else {
                        alert('Please insert a valid User Id');
                    }
                },
            );
        });
    };
    const searchFunction = (text) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM table_contact WHERE name LIKE '%${text}%'`,
                [],
                (txn, results) => {
                    console.log(results.rows.length);
                    var len = results.rows.length;
                    if (len > 0) {
                        var temp = [];
                        for (let i = 0; i < len; i++) {
                            console.log(results.rows.item(i));
                            temp.push(results.rows.item(i));
                        }
                        setSearchResults({ searchResults: temp });
                        navigation.navigate('Search', {
                            data: {
                                results: searchResults,
                            },
                        });
                    } else {
                        alert('No user found');
                    }
                })
        })
    }
    return (
        <View style={styles.container}>
            <SearchBar placeholder="Search" lightTheme round onChangeText={(text)=>{searchFunction(text)}} />
            <FlatList
                data={myContacts}
                renderItem={({ item, index }) => {
                    const color = getColorByLetter(item.name[0]);
                    return (
                        <TouchableOpacity style={styles.userItem}>
                            <View style={{ ...styles.iconLogo, backgroundColor: color }}>
                                <Text style={styles.icon}>{item.name[0]}</Text>
                            </View>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <View style={styles.belowView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Update Contact', {
                                            data: {
                                                name: item.name,
                                                phone: item.phone,
                                                landline: item.landline,
                                                favorite:item.favorite,
                                                id: item.user_id,
                                            },
                                        });
                                    }}>
                                    <Image
                                        source={require('./utils/edit.jpg')}
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        deleteUser(item.user_id);
                                    }}>
                                    <Image
                                        source={require('./utils/delete.png')}
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    );
                }}
            />
            <TouchableOpacity
                style={styles.addNewBtn}
                onPress={() => {
                    navigation.navigate('Add Contact');
                }}>
                <Text style={styles.btnText}>Add Contact</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addNewBtn: {
        backgroundColor: 'purple',
        width: 150,
        height: 50,
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
    userItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 8,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        width: '75%',
        marginLeft: 10
    },
    belowView: {
        flexDirection: 'column',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icon: {
        paddingVertical: 5,
        fontSize: 24,
        color: 'white',
        marginHorizontal: 10
    },
    iconLogo: {
        borderRadius: 25,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        backgroundColor: 'purple'
    },
    icons: {
        width: 24,
        height: 24
    }
});
export default ContactList;