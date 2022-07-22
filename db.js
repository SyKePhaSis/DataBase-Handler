const electronDB = require("electron-db")

class Table {
    constructor(name,fields) {
        this.name = name;
        this.fields = fields;
    }

    returnFields() {
        return this.fields
    }
}

class DB {
    
    constructor() {
        this.tables = [];
        this.db = electronDB;
    }

    getTables() {
        return this.tables;
    }

    makeTable(name, fields) {
        this.tables.push(new Table(name,fields));
        this.db.createTable(name, (succ, msg) => {
            if (succ) {
                return true
            }
            else {
                return false
            }
        });
    }

    getTable(name) {
        var rows 
        this.db.getAll(name, (succ, msg) => {
            if (succ) {
                rows = msg
            }
            else {
                return false
            }
        });
        return rows
    }

    returnFields(name) {
        const table = this.tables.find((element) => element.name = name);
        return table.fields;
    }

    addRow(tableName, entry) {
        var fields = this.tables.find((element) => element.name = tableName).fields;
        var obj = new Object();
        for (var i = 0; i < fields.length; i++) {
            obj[`${fields[i]}`] = entry[i];
        }
        console.log(obj)
        this.db.insertTableContent(tableName, obj, (succ, msg) => {
            if (succ) {
                return true;
            }
            else {
                return false;
            }
        })
    }

    searchTable(name , key, entry) {
        this.db.search(name, key, entry, (succ, data) => {
        if (succ) {
            return data;
        } else {
            return false
        }});
    }

    updateRow(name, key, entry) {
        this.db.updateRow(name, key, entry, (succ, msg) => {
        if (succ) {
            return true;
        } else {
            return false;
        }});
    }

    deleteTable(name) {
        this.db.clearTable(name,(succ, msg) => {
            if (succ) {
                return true
            } else {
                return false
            }
        });
    }

    deleteRow(name, key, entry) {
        obj = new Object();
        for (i = 0; i < key.length; i++){
            obj[key[i]] = entry[i]
        }
        this.db.deleteRow(name, obj, (succ, msg) => {
            if (succ) {
                return true;
            } else {
                return false;
            }
        });
    }
}

module.exports = DB