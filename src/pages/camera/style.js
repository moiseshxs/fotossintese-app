import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: 'center',
  },

  areaHeader: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
  },

  areaCamera: {
    flex: 7,
    backgroundColor: "red",
    borderWidth: 2,
  },

  areaFooter: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: "black",
  },
  areaFoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFoto: {
    width: '50%',
    height: '50%',
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
  },
  imgPrev: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },

  areaBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
  },
  btnTake: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTake1: {
    width: 95,
    height: 95,
    borderWidth: 5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },

  areaFlip: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})