let name_api = 'http://liveresultat.orientering.se/api.php?method=getcompetitioninfo&comp=';
const print = a => console.log(a);
let comp = getUrlVars()['comp'];
let group = getUrlVars()['class'];
let classes = [];
print(comp);


function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

async function name(url) {
    return fetch(url)
        .then(a => a.json());
}

function sort_classes(json) {
    classes = json;
    for (let i = 0; i < json.length; ++i) {
        let a = document.createElement("A");
        a.href = 'comp.html?comp=' + comp + "&class=" + i;
        a.innerHTML = json[i]['className'];
        let td = document.createElement("TD");
        td.appendChild(a);
        if (a.innerText[0] === "W") {
            document.getElementById("W").appendChild(td);
        } else {
            document.getElementById("M").appendChild(td);
        }
    }
}

function setButtons() {
    let prev = document.getElementById('prev');
    let compet = document.getElementById('comp');
    let next = document.getElementById('next');
    let part = parseInt(comp);
    prev.href = 'comp.html?comp=' + (part - 1) + "&class=0";
    next.href = 'comp.html?comp=' + (part + 1) + "&class=0";
    compet.href = 'index.html';
}

function sort_results(json) {
    json = json['results'];
    for (let i = 0; i < json.length; ++i) {
        let tr = document.createElement("TR");
        let place = document.createElement("TD");
        let name = document.createElement("TD");
        let time = document.createElement("TD");
        place.innerText = json[i]['place'];
        name.innerText = json[i]['name'];
        time.innerText = json[i]['result'];
        tr.appendChild(place);
        tr.appendChild(name);
        tr.appendChild(time);
        let table = document.getElementById('table');
        table.appendChild(tr);
    }
}

window.onload = function () {
    setButtons();

    name(name_api + comp.toString())
        .then(comp_name => document.getElementById('name').innerText = comp_name.name);

    name("http://liveresultat.orientering.se/api.php?method=getclasses&comp=" + comp.toString())
        .then(list => sort_classes(list['classes']))
        .then(() => name('http://liveresultat.orientering.se/api.php?comp=' + comp + '&method=getclassresults&' +
            'unformattedTimes=false&class=' + classes[group]['className'])
            .then(a => sort_results(a))
        )

};

