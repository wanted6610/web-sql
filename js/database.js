let db = openDatabase("test_db", "1.0", "Тестовая база", 200000);




class Data {
    constructor(date, providerName, storage, productName, count, price) {
        this.id = null;
        this.date = date;
        this.providerName = providerName;
        this.storage = storage;
        this.productName = productName;
        this.count = count;
        this.price = price;
    }
}

db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS Catalog (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, providerName TEXT, storage TEXT, productName TEXT, count INTEGER, price DECIMAL)`, []);
}, err => console.error("Не могу создать базу!", err), () => CheckData());

function CheckData() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT count(*) co from Catalog', [], function (tx, result) {
            let item = result.rows.item(0);
            if (item.co == 0) {
                CreateData();
            } else {
                GetData();
            }
        });
    });
}

function CreateData() {
    let item1 = new Data('01.02.2020', 'ООО РУС', 'nn_2', 'Тормозная жидкость', 4, 10500);
    let item2 = new Data('02.04.2020', 'ОАО ОРГСИНТЕЗ', 'nn_1', 'Домкрат', 7, 3435);
    let item3 = new Data('02.05.2020', 'ОАО ПромАвто', 'nn_2', 'Корзина сцепления', 11, 4534);
    let item4 = new Data('22.05.2020', 'ООО Нител', 'nn_4', 'Аккумулятор', 2, 7361);
    let item5 = new Data('15.08.2020', 'ПАО Сбер', 'nn_3', 'Огнетушитель', 5, 6542);

    let items = [item1, item2, item3, item4, item5];

    for (let item of items) {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Catalog (date,providerName,storage,productName,count,price) 
            VALUES (?, ?, ?, ?, ?, ?);`, [`${item.date}`, `${item.providerName}`, `${item.storage}`, `${item.productName}`, `${item.count}`, `${item.price}`])
        },
            err => console.error("Не могу создать запись!", err)
        );
    }
    GetData();
}

function AddData() {

    let addItem = new Data(GetValueById("inputDate"), GetValueById("inputProviderName"), GetValueById("inputOrder"),
        GetValueById("inputProductName"), GetValueById("inputCount"), GetValueById("inputPrice"));

    if ((addItem.date == "") || (addItem.providerName == "") || (addItem.storage == "") || (addItem.productName == "") || (addItem.count == "") || (addItem.price == "")) {
        alert('Необходимо заполнить все поля');
        return;
    }
    db.transaction((tx) => {
        tx.executeSql(`INSERT INTO Catalog (date,providerName,storage,productName,count,price) 
            VALUES (?, ?, ?, ?, ?, ?);`, [`${new Date(addItem.date).toLocaleDateString()}`, `${addItem.providerName}`, `${addItem.storage}`, `${addItem.productName}`, `${addItem.count}`, `${addItem.price}`])
    },
        err => console.error("Не могу создать запись!", err)
    );

    alert('Данные добавлены');

    GetData();
}

function GetValueById(nameId) {
    return document.getElementById(nameId).value;
}

function RemoveData() {
    let id = document.getElementById("inputId").value;
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM Catalog WHERE id=?;', [id])
    },
        err => console.error("Не могу удалить запись!", err)
    );

    alert('Данные удалены');

    GetData();
}

function UpdateData() {
    let updateItem = new Data(GetValueById("inputDate"), GetValueById("inputProviderName"), GetValueById("inputOrder"),
        GetValueById("inputProductName"), GetValueById("inputCount"), GetValueById("inputPrice"));
    if (updateItem.date !== '') {
        UpdateDataDB("date", new Date(updateItem.date).toLocaleDateString(), document.getElementById("inputId").value);
    }

    if (updateItem.providerName !== '') {
        UpdateDataDB("providerName", updateItem.providerName, document.getElementById("inputId").value);
    }

    if (updateItem.storage !== '') {
        UpdateDataDB("storage", updateItem.storage, document.getElementById("inputId").value);
    }

    if (updateItem.productName !== '') {
        UpdateDataDB("productName", updateItem.productName, document.getElementById("inputId").value);
    }

    if (updateItem.count !== '') {
        UpdateDataDB("count", updateItem.count, document.getElementById("inputId").value);
    }

    if (updateItem.price !== '') {
        UpdateDataDB("price", updateItem.price, document.getElementById("inputId").value);
    }

    alert('Данные обновлены');

    GetData();
}

function UpdateDataDB(propertyName, propertyUpdate, id) {
    {
        db.transaction(function (tx) {
            tx.executeSql(`UPDATE Catalog SET ${propertyName}=? WHERE id=?;`, [propertyUpdate, id]);
        });
    }
}

//id,date,providerName,storage,productName,count,price

function GetData() {
    document.getElementById("base-table").innerHTML = GetHTML();
    db.transaction(function (tx) {
        tx.executeSql('SELECT * from Catalog', [], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                let item = result.rows.item(i);
                OutRow(item.id, item.date, item.providerName, item.storage, item.productName, item.count, item.price);
            }
        });
    });
}

function GetHTML() {
    return `<tr class="header-table search-visibility">
                <th>Идентификатор</th>
                <th>Дата</th>
                <th>Наименование поставщика</th>
                <th>Склад приемки</th>
                <th>Наименование товара</th>
                <th>Количество</th>
                <th>Сумма</th>
            </tr>    
            <tr class="header-search no-print search-visibility">           
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
                <th>
                    <input type="text" placeholder="Поиск..">
                </th>
        </tr>`
}

function OutRow(id, date, providerName, storage, productName, count, price) {
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let dateCell = document.createElement("td");
    let providerNameCell = document.createElement("td");
    let storageCell = document.createElement("td");
    let productNameCell = document.createElement("td");
    let countCell = document.createElement("td");
    let priceCell = document.createElement("td");
    idCell.textContent = id;
    dateCell.textContent = date;
    providerNameCell.textContent = providerName;
    storageCell.textContent = storage;
    productNameCell.textContent = productName;
    countCell.textContent = count;
    priceCell.textContent = price;
    row.appendChild(idCell);
    row.appendChild(dateCell);
    row.appendChild(providerNameCell);
    row.appendChild(storageCell);
    row.appendChild(productNameCell);
    row.appendChild(countCell);
    row.appendChild(priceCell);
    document.getElementById("base-table").appendChild(row);
}

/*function ClearTable() {
    let div = document.getElementById('base-table'); while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
} */