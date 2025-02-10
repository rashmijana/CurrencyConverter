import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
let db = openDatabase({ name: 'ContactDatabase2.db' });
const unfill = require('./utils/star.png');
const fill = require('./utils/fav.png');
const FAV = { unfill, fill };
const like = "yes"
const disLike = "no"
const flag = { like, disLike }
const Profile = () => {
  const route = useRoute();
  console.log(route.params.data);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(route.params.data.phone);
  const [landline, setLandline] = useState(route.params.data.landline);
  const [favFlag, setFav] = useState(route.params.data.favorite);

  const [imageSource, setImageSource] = (favFlag === flag.like) ? useState(FAV.fill) : useState(FAV.unfill);
  const handleClick = () => {
    favFlag === flag.disLike ? setFav(flag.like) : setFav(flag.disLike)
  };
  const addFav = () => {
    favFlag === flag.like
      ? setImageSource(FAV.fill)
      : setImageSource(FAV.unfill);
  };
  useEffect(() => {
    addFav()
  }, [favFlag]);
  const updateUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_contact set name=?, phone=? , landline=?, favorite=? where user_id=?',
        [name, phone, landline, favFlag,route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("Successfully Updated!")
          } else
            console.log("Failed!")
        },
      );
    });
  };
  useEffect(() => {
    setName(route.params.data.name);
    setPhone(route.params.data.phone);
    setLandline(route.params.data.landline);
  }, []);
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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <Image
          source={imageSource}
          style={[styles.icons]}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Phone Number"
        value={phone.toString()}
        onChangeText={txt => setPhone(txt)}
        style={[styles.input, { marginTop: 20 }]}
      />
      <TextInput
        placeholder="Enter Landline Number"
        value={landline.toString()}
        onChangeText={txt => setLandline(txt)}
        style={[styles.input, { marginTop: 20 }]}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          updateUser(), navigation.navigate('ContactList');
        }}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteUser(route.params.data.id), navigation.navigate('ContactList');
        }} style={styles.addDelBtn}>
        <Text style={styles.btnText}>Delete</Text>
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
  addDelBtn: {
    backgroundColor: '#CD001A',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  icons: {
    width: 50,
    height: 50,
    marginLeft:180,
    marginTop:20
  }
});

export default Profile;