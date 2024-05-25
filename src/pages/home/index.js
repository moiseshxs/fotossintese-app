import { StyleSheet, Text, View, Pressable, Image, Modal, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import styles from "./style";
import sqLiteFoto from '../../sqlite/sqLiteFoto';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function App() {
  const [fotos, setFotos] = useState([]);
  const isFocused = useIsFocused();

  const fotoAll = async () => {
    const fotos = await sqLiteFoto.all();
    if (fotos !== false) {
      setFotos(fotos);
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isFocused) {
      fotoAll();
    }
  }, [isFocused]);

  // Agrupar os itens em subarrays de 3
  const groupFotosInRows = (data, numColumns) => {
    const rows = [];
    for (let i = 0; i < data.length; i += numColumns) {
      rows.push(data.slice(i, i + numColumns));
    }
    return rows;
  };

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map((foto) => (
        <View key={foto.id} style={styles.itemContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${foto.foto}` }}
            style={styles.imgFeed}
          />
        </View>
      ))}
    </View>
  );

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaHeader}>
        <Ionicons name="flower-outline" size={34} color="white" />
        <Text style={styles.titulo}>Fotosintese</Text>
      </View>

      <View style={styles.areaBtn}>
        <Pressable style={styles.btnCamera} onPress={() => navigation.navigate('Camera')}>
          <Ionicons name="camera-outline" size={34} color="white" />
          <Text style={styles.titulo}>Camera</Text>
        </Pressable>
      </View>

      <View style={styles.areaFeed}>
        <FlatList
          data={groupFotosInRows(fotos, 3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRow}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}