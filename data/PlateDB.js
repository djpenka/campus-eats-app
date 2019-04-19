import {SQLite} from 'expo'

export default class PlateDB { 

    static getInstance() {
        if (instance === null) {
          instance = new PlateDB();
        }
        return instance;
      }

    constructor() {
        this.db = SQLite.openDatabase('plates.db');
        this.init();
    }

    init() {
        this.db.transaction(tx => {
            tx.executeSql(
            'create table if not exists plates (id integer primary key not null, food_items text, name text, image_uri text, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);'
            );
        });
    }

    addPlate(name, foodItems, imageUri) {
        this.db.transaction(
            tx => {
            tx.executeSql('insert into plates (food_items, name, image_uri) values (?, ?, ?)', [foodItems, name, imageUri]);
            },
            null,
            null
        );
    }

    getAllPlates(callback) {
        let value = ""
        this.db.transaction(
            tx => {
            tx.executeSql('select * from plates', [], (_, { rows }) => {
                value = JSON.stringify(rows)
                callback(value)
            }
            );
            },
            null,
            null,
        );
        return value;
    }

    getPlateById(callback, id) {
        let value = ""
        this.db.transaction(
            tx => {
            tx.executeSql('select * from plates where id = ?', [id], (_, { rows }) => {
                value = JSON.stringify(rows)
                callback(value)
            }
            );
            },
            null,
            null,
        );
        return value;
    }

    deletePlate(id) {
        this.db.transaction(
            tx => {
            tx.executeSql('delete from plates where name = ?', [id]);
            },
            null,
            null
        );
    }

    deleteAllPlates() {
        this.db.transaction(
            tx => {
            tx.executeSql('delete from plates', null);
            },
            null,
            null
        );
    }
}


