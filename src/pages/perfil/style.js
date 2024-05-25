import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      containerPerm: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
      },
      areaCamera: {
        flex: 6,
      },
      areaOpcoes: {
        backgroundColor: "black",
        flex: 1,
        flexDirection: "row",
      },
      areaBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btn: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: "#FFF",
      },
      btnFoto: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnPerm: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
      },
      texto:{
        color: 'white',
        fontWeight: 'bold',
      },
      img: {
        height: 80,
        width: 80,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 5,
      },
      areaModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imgModal: {
        height: 350,
        width: 350,
      },

      bordaFim: {
        marginBottom: 20,
      }
})