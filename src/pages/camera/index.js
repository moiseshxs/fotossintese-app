import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Modal, FlatList } from "react-native";
import styles from "./style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import sqLiteFoto from '../../sqlite/sqLiteFoto';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const navigation = useNavigation();

  const [foto, setFoto] = useState("");
  const [fotos, setFotos] = useState([]);

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);

  const cameraRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fotoAll = async (id) => {
    const fotos = await sqLiteFoto.all();
    if (fotos !== false) {
      setFotos(fotos);
    } else {
      return false;
    }
  };

  useEffect(() => {
    fotoAll();
  }, [fotos]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Se não ainda não tiver a permissao da camera
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission} style={{ backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Permissao</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    //Camera frontal ou traseira
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }



  // const autorizar = () => {
  //   (async () => {
  //     MediaLibrary.requestPermissionsAsync();

  //     const cameraStatus = await Camera.requestPermissionsAsync();

  //     setHasCameraPermission(cameraStatus.status === 'granted');
  //   })();
  // }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
        console.log(data.uri);

        // Inserir foto no banco de dados e atualizar estado
        const newFoto = {
          foto: data.base64,
        };
        const insertId = await sqLiteFoto.create(newFoto);
        console.log('Foto inserida com id:', insertId);

        // Atualizar lista de fotos
        setFotos((prevFotos) => [...prevFotos, { id: insertId, ...newFoto }]);

      } catch (error) {
        console.log('Erro ao tirar foto:', error);
      }
    }
  }
  
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.areaHeader}>
        <Ionicons name="flower-outline" size={34} color="white" />
      </View>

      <View style={styles.areaCamera}>
        <CameraView style={styles.areaCamera}
          facing={facing}
          ref={cameraRef}
        >

        </CameraView>
      </View>

      <View style={styles.areaFooter}>
        <View style={styles.areaFoto}>
          <Pressable style={styles.btnFoto} onPress={() => navigation.navigate('Home')}>
            <Image
              source={{ uri: image }} style={styles.imgPrev}
            />
          </Pressable>
        </View>

        <View style={styles.areaBtn}>
          <Pressable style={styles.btnTake} onPress={() => { takePicture() }}>
            <View style={styles.btnTake1}>

            </View>
          </Pressable>
        </View>

        <View style={styles.areaFlip}>
          <Pressable onPress={toggleCameraFacing}>
            <MaterialCommunityIcons name="camera-flip-outline" size={35} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}