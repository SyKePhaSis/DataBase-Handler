const DB = require('../../core/db')
const db = new DB()


db.makeTable('test', ['lol', 'testing', 'xd']);

function createTable(name) {
    var inc_num = 0 
    const tableHead = document.getElementById("tableHead")
    var fields = db.returnFields(name);
    var rows = db.getTable(name);
    var headElement = document.createElement('tr')
    var childElement = document.createElement('th');
    childElement.setAttribute('scope', 'column');
    childElement.innerHTML = "#";
    headElement.appendChild(childElement)
    for (var i = 0; i < fields.length; i++) {
        var childElement = document.createElement('th');
        childElement.setAttribute('scope', 'column');
        childElement.innerHTML = `${fields[i]}`;
        headElement.appendChild(childElement)
    }
    tableHead.appendChild(headElement)
    const tableBody = document.getElementById("tableBody")
    for (var i = 0; i < rows.length; i++) {
        inc_num++
        var element = document.createElement('tr'); 
        var childElement = document.createElement('th');
        childElement.innerHTML = inc_num;
        element.appendChild(childElement)
        for (var j = 0; j < (Object.keys(rows[i]).length - 1); j++) {
            var objkeys = Object.keys(rows[i]);
            var childElement = document.createElement('th');
            childElement.innerHTML = rows[i][`${objkeys[j]}`];
            element.appendChild(childElement)
        }
        tableBody.appendChild(element);
    }
    document.getElementById('loadingAnim').style.display = 'none'
}

function addRow(){

}

createTable('test')