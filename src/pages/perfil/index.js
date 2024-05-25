import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Modal, FlatList } from "react-native";
import styles from "./style";
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import sqLiteFoto from '../../sqlite/sqLiteFoto';

export default function App() {
  const [foto, setFoto] = useState("");
  const [fotos, setFotos] = useState([]);

  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  
  const [image, setImage] = useState (null);
  const [image64, setImage64] = useState (null);
  
  const cameraRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fotoAll = async (id) => {
    const fotos = await sqLiteFoto.all();
    if(fotos !== false) {
      setFotos(fotos);
    }else {
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
      <View style={styles.containerPerm}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission} style={{backgroundColor: 'blue'}}>
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
    if(cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);

      sqLiteFoto.create({
        foto: data.base64,
      }).then(insertId => {
        console.log('Foto inserida com id:', insertId);
        console.log('okay');
      }).catch(error => {
        console.log('Erro ao inserir foto:', error);
      });
    }

    if (cameraRef.current) {
      try {
        const options = {quality: 0.5, base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
        console.log(data.uri)
      }catch(error){
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.areaCamera}
      facing={facing}
      ref={cameraRef}
      >
        
      </CameraView>
      <View style={styles.areaOpcoes}>
        <View style={styles.areaBtn}>
        <Pressable style={styles.btnFoto} onPress={() => {setIsModalVisible(true)}}>
          <Image
            source={{uri:image}} style={styles.img}
          />
        </Pressable>
        <Modal visible={isModalVisible}>
          <View style={styles.areaModal}>
          <FlatList 
          data={fotos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.id}</Text>
              <Image
                source={{uri: `data:image/jpeg;base64,${item.foto}`}} style={styles.imgModal}
              />
            </View>
            
          )}
        />
          </View>
        </Modal>

        </View>
        <View style={styles.areaBtn}>
          <Pressable style={styles.btn} onPress={() => {takePicture()}}/>
        </View>
        <View style={styles.areaBtn}>
          <Pressable style={styles.btnPerm} onPress={toggleCameraFacing}>
            <Text style={styles.texto}>frontal</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}