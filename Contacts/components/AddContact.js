import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
let db = openDatabase({ name: 'ContactDatabase2.db' });
const AddContact = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [landline, setLandline] = useState('');
    const [favorite,setFavorite] = useState('');

    const saveContact = () => {
        db.transaction(function (txn) {
            txn.executeSql('INSERT INTO table_contact (name,phone,landline) VALUES (?,?,?)', [name, phone, landline],
                (txn, res) => {
                    console.log('Results:', res.rowsAffected);
                    if (res.rowsAffected > 0) {
                        console.log("Added!")
                    }
                    else
                        console.log('Failed!')
                },
                error => {
                    console.log(error);
                },
            );
        });
    };
    
    useEffect(() => {
        db.transaction(txn => {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_contact'", [],
                (txn, res) => {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_contact', []);
                        txn.executeSql('CREATE TABLE IF NOT EXISTS table_contact(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), phone INT(10), landline INT(10), favorite TEXT DEFAULT "no")', [],);
                    }
                },
                error => {
                    console.log(error);
                },
            );
        });
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Name"
                style={styles.input}
                value={name}
                onChangeText={txt => setName(txt)}
            />
            <TextInput
                placeholder="Enter Phone Number"
                value={phone}
                onChangeText={txt => setPhone(txt)}
                style={[styles.input, { marginTop: 20 }]}
            />
            <TextInput
                placeholder="Enter Landline Number"
                value={landline}
                onChangeText={txt => setLandline(txt)}
                style={[styles.input, { marginTop: 20 }]}
            />
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                    saveContact(), navigation.navigate('ContactList');
                }}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.3,
        alignSelf: 'center',
        paddingLeft: 20,
        marginTop: 100,
    },
    addBtn: {
        backgroundColor: 'purple',
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
    icons:{
        width:20,
        height:20
    }
});

export default AddContact;