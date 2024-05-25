import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("galeria.db")

export default db