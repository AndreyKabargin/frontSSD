
let object = {

    workCenter: '',
    shift: '',
    operator: '',
    order: '',
    stage: '', 
    stamp: '',
    carton: '',
    pressrun: '',
    countEnter: '',
    countExit: '',
    earlyProd: '',
    speed: '',
    counter: '',
    plan: '',
    fact: '',
    eff: '',
    events: [],
    team: [],

};

let elements = {

    workCenter: document.getElementById('workCenter'),
    shift: document.getElementById('shift'),
    operator: document.getElementById('operator'),
    order: document.getElementById('order'),
    stage: document.getElementById('stage'),
    stamp: document.getElementById('stamp'),
    carton: document.getElementById('carton'),
    pressrun: document.getElementById('pressrun'),
    countEnter: document.getElementById('countEnter'),
    countExit: document.getElementById('countExit'),
    earlyProd: document.getElementById('earlyProd'),
    speed: document.getElementById('speed'),
    counter: document.getElementById('counter'),
    plan: document.getElementById('plan'),
    fact: document.getElementById('fact'),
    eff: document.getElementById('eff'),
    table_events: document.getElementById('table-events'),
    table_team: document.getElementById('table-team'),
    menuButtons: document.querySelectorAll('.menu-btn'),
    menu_btn_main: document.getElementById('menu-btn-main'),
    menu_btn_team: document.getElementById('menu-btn-team'),
    menu_btn_label: document.getElementById('menu-btn-label'),
    menu_btn_production: document.getElementById('menu-btn-production'),
    page_main: document.querySelector('.page-main'),
    page_team: document.querySelector('.page-team'),
    page_label: document.querySelector('.page-label'),
    page_production: document.querySelector('.page-production'),
    events_btn_up: document.getElementById('events-btn-up'),
    events_btn_down: document.getElementById('events-btn-down'),

}

function getObject() {

    let workCenter = 1;

    fetch('http://localhost:3000/SSD_Postgres/hs/SSD/API/GetData/' + workCenter, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Basic T2JtZW46T2JtZW4=',
        },
    }).then(res => res.json()
    ).then(json => refreshForm(json));

}

let i = 0;
function refreshForm(json) {

    object.workCenter = json.workCenter;
    elements.workCenter.textContent = object.workCenter;

    object.shift = json.shift;
    elements.shift.textContent = object.shift;

    object.operator = json.operator;
    elements.operator.textContent = object.operator;

    object.order = json.order;
    elements.order.textContent = object.order;

    object.stage = json.stage;
    elements.stage.textContent = object.stage;

    object.stamp = json.stamp;
    elements.stamp.textContent = object.stamp;

    object.carton = json.carton;
    elements.carton.textContent = object.carton;

    object.pressrun = json.pressrun;
    elements.pressrun.textContent = object.pressrun;

    object.countEnter = json.countEnter;
    elements.countEnter.textContent = object.countEnter;

    object.countExit = json.countExit;
    elements.countExit.textContent = object.countExit;

    object.earlyProd = json.earlyProd;
    elements.earlyProd.textContent = object.earlyProd;

    object.speed = json.speed;
    elements.speed.textContent = object.speed;

    object.counter = json.counter;
    elements.counter.textContent = object.counter;

    object.plan = json.plan;
    elements.plan.textContent = object.plan;

    object.fact = json.fact;
    elements.fact.textContent = object.fact;

    object.eff = json.eff;
    elements.eff.textContent = object.eff;

    refreshTable(elements.table_events, object.events, json.events);
    object.events = json.events ? json.events : [];

    //refreshTable(elements.table_team, object.team, json.team);
    //object.team = json.team ? json.team : [];

    console.log(i);
    i++;

}

function refreshTable(element, objectTable, jsonTable) {

    let rows = element.querySelectorAll('.row');

    let startRow = rows[0];
    let endRow = rows[rows.length - 1];
    let currentRow = element.querySelector('.row-selected');

    let startRowId = startRow.cells[0].textContent;
    let endRowId = endRow.cells[0].textContent;
    let currentRowId = (currentRow ? currentRow.cells[0].textContent : '');

    let startRowIndex = startRow.rowIndex;
    let endRowIndex = endRow.rowIndex;
    let currentRowIndex = (currentRow ? currentRow.rowIndex : startRowIndex);

    let dec = 0; //декремент
    if (jsonTable && objectTable) { dec = jsonTable.length - objectTable.length; }
    if (dec < 0) { dec = 0; }
    if (objectTable && objectTable.length == 0) { dec = 0; }
    if (currentRowIndex == endRowIndex) { dec = 0; }
    if (objectTable && objectTable.length > 0 && currentRowId != objectTable[0].id && currentRowIndex == startRowIndex) { dec = 0; }
    if (objectTable && objectTable.length > 0 && currentRowId != objectTable[0].id && dec > endRowIndex - currentRowIndex) { dec = endRowIndex - currentRowIndex; }

    let i = 0;
    let count = 0; //цикл до
    if (jsonTable) { count = jsonTable.length; }

    do {

        if (!jsonTable ||
            !objectTable ||
            !startRowId ||
            jsonTable.length < objectTable.length ||
            startRowId == jsonTable[i].id) {

            let isCurrentRow = false;

            for (let j = 0; j < rows.length; j++) {

                let index = i + j - dec;

                if (element == elements.table_events) {

                    fillValuesRowTableEvents(rows[j], index < jsonTable.length ? jsonTable[index] : '');

                }

                if (element == elements.table_team) {

                    fillValuesRowTableTeam(rows[j], index < jsonTable.length ? jsonTable[index] : '');

                }

                rows[j].classList.remove('row-selected'); //удалить тек строку

                if (!isCurrentRow) { //добавить строку

                    if (!jsonTable ||
                        !objectTable ||
                        jsonTable.length < objectTable.length ||
                        (objectTable && objectTable.length == 0) ||
                        (objectTable && objectTable.length > 0 && currentRowId == objectTable[0].id) ||
                        //currentRowIndex == endRowIndex ||
                        (jsonTable && jsonTable.length >= index && currentRowId == jsonTable[index].id)) {

                        rows[j].classList.add('row-selected');

                        isCurrentRow = true;

                    }

                }

            }

            break;

        }

        i++;

    } while (i < count)

}

function fillValuesRowTableEvents(row, data) {

    row.cells[0].textContent = data ? data.id : '';
    row.cells[1].textContent = data ? data.stage : '';
    row.cells[2].textContent = data ? data.operation : '';
    row.cells[3].textContent = data ? data.status : '';
    row.cells[4].textContent = data ? data.count : '';
    row.cells[5].textContent = data ? data.dateStart : '';
    row.cells[6].textContent = data ? data.duration : '';
    row.cells[7].textContent = data ? data.dateEnd : '';

}

function fillValuesRowTableTeam(row, data) {

    row.cells[0].textContent = data ? data.id : '';
    row.cells[1].textContent = data ? data.employee : '';
    row.cells[2].textContent = data ? data.dateStart : '';
    row.cells[3].textContent = data ? data.duration : '';
    row.cells[4].textContent = data ? data.dateEnd : '';

}

function clickUp(element, objectTable) {

    if (!objectTable) { return; }

    let rows = element.querySelectorAll('.row');
    let currentRow = element.querySelector('.row-selected');
    let currentRowId = currentRow.cells[0].textContent;
    let currentRowIndex = currentRow.rowIndex;

    if (currentRowIndex == 1) {

        for (let i = 0; i < objectTable.length; i++) {

            if (i > 0 && currentRowId == objectTable[i].id) {

                for (let j = 0; j < rows.length; j++) {

                    let index = i + j - 1;

                    if (element == elements.table_events) {

                        fillValuesRowTableEvents(rows[j], index < objectTable.length ? objectTable[index] : '');

                    }

                    if (element == elements.table_team) {

                        fillValuesRowTableTeam(rows[j], index < objectTable.length ? objectTable[index] : '');

                    }

                }

            }

        }
    }

    if (currentRowIndex > 1) {

        //let id = rows[currentRowIndex - 2].cells[0].textContent;

        currentRow.classList.remove('row-selected');
        rows[currentRowIndex - 2].classList.add(('row-selected'));

    }

}

function clickDown(element, objectTable) {

    if (!objectTable) { return; }

    let rows = element.querySelectorAll('.row');
    let currentRow = element.querySelector('.row-selected');
    let currentRowId = currentRow.cells[0].textContent;
    let currentRowIndex = currentRow.rowIndex;

    let endRow = rows[rows.length - 1];
    let endRowIndex = endRow.rowIndex;

    if (currentRowIndex == endRowIndex) {

        for (let i = 0; i < objectTable.length; i++) {

            if (currentRowId == objectTable[i].id && i < objectTable.length - 1) {

                for (let j = 0; j < rows.length; j++) {

                    let index = i + j - rows.length + 2;

                    if (element == elements.table_events) {

                        fillValuesRowTableEvents(rows[j], index < objectTable.length ? objectTable[index] : '');

                    }

                    if (element == elements.table_team) {

                        fillValuesRowTableTeam(rows[j], index < objectTable.length ? objectTable[index] : '');

                    }

                }

            }

        }
    }

    if (currentRowIndex < endRowIndex && rows[currentRowIndex].cells[0].textContent != '') {

        //let id = rows[currentRowIndex - 2].cells[0].textContent;

        currentRow.classList.remove('row-selected');
        rows[currentRowIndex].classList.add(('row-selected'));

    }



}

function initiateForm() {

    //++ При выборе кнопок меню
    for (let i = 0; i < elements.menuButtons.length; i++) {

        let button = elements.menuButtons[i];

        button.addEventListener('click', () => {

            elements.menu_btn_main.classList.remove('menu-btn-selected');
            elements.menu_btn_team.classList.remove('menu-btn-selected');
            elements.menu_btn_label.classList.remove('menu-btn-selected');
            elements.menu_btn_production.classList.remove('menu-btn-selected');

            button.classList.add('menu-btn-selected');

            elements.page_main.classList.add('hidden');
            elements.page_team.classList.add('hidden');
            elements.page_label.classList.add('hidden');
            elements.page_production.classList.add('hidden');

            elements['page_' + button.id.replace('menu-btn-', '')].classList.remove('hidden');

        });

    }

    //++ При нажатии на кнопки Вверх
    elements.events_btn_up.addEventListener('click', () => {

        clickUp(elements.table_events, object.events);

    })

    //++ При нажатии на кнопки Вниз
    elements.events_btn_down.addEventListener('click', () => {

        clickDown(elements.table_events, object.events);

    })

}

initiateForm();

getObject();

setInterval(getObject, 10000);
