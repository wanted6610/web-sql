let items = {
    id: document.getElementById("controls-form__id"),
    formInput: document.getElementById("form-input"),
    date: document.getElementById("controls-form__date"),
    providerName: document.getElementById("controls-form__providername"),
    order: document.getElementById("controls-form__order"),
    productName: document.getElementById("controls-form__productname"),
    count: document.getElementById("controls-form__count"),
    price: document.getElementById("controls-form__price"),
    addBtn: document.getElementById("add-data"),
    updateBtn: document.getElementById("update-data"),
    removeBtn: document.getElementById("remove-data"),
    nameBtn: null
}

function AddControls() {
    if (!CheckDisplay()) {
        ShowControls();
        if (items.nameBtn == "addbtn")
            return;
    }
    let AddShow = [items.formInput, items.date, items.providerName, items.order, items.productName, items.count, items.price, items.addBtn];
    for (let item of AddShow) (
        item.classList.toggle("active")
    )

    items.nameBtn = "addbtn"
}

function CheckDisplay() {
    let elem = items.formInput;
    return (getComputedStyle(elem).display == "none");
}

function UpdateControls() {
    if (!CheckDisplay()) {
        ShowControls();
        if (items.nameBtn == "updbtn")
            return;
    }
    let UpdateShow = [items.id, items.formInput, items.date, items.providerName, items.order, items.productName, items.count, items.price, items.updateBtn];
    for (let item of UpdateShow) (
        item.classList.toggle("active")
    )

    items.nameBtn = "updbtn"
}

function RemoveControls() {
    if (!CheckDisplay()) {
        ShowControls();
        if (items.nameBtn == "delbtn")
            return;
    }
    let RemoveShow = [items.id, items.formInput, items.removeBtn];
    for (let item of RemoveShow) (
        item.classList.toggle("active")
    )

    items.nameBtn = "delbtn"
}

function ShowControls() {
    let checkArray = [items.id, items.formInput, items.date, items.providerName, items.order, items.productName, items.count, items.price, items.updateBtn, items.removeBtn, items.addBtn]
    for (let e of checkArray) {
        if (e.classList.contains("active")) {
            e.classList.remove("active");
        }
    }
}