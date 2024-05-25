import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  areaHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  titulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  areaBtn: {
    flex: 2,
    backgroundColor: '#FFF',
    padding: 10,
  },
  btnCamera: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  areaCamera: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },

  areaFeed: {
    flex: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imgFeed: {
    width: 110,
    height: 110,
  },
})