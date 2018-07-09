const print = (d) => console.log(d);
let api = 'http://liveresultat.orientering.se/api.php?method=getcompetitions';

const request = async () => {
    const response = await fetch(api);
    let json = await response.json();
    json = json.competitions;
    print(json[1012].organizer);
    for (let i = 0; i < json.length; i++) {
        let row = document.createElement('TR');
        row.id = 'comp' + i.toString();
        let name = document.createElement('TD');
        let name_url = document.createElement('A');
        name_url.href = 'comp.html#'+json[i].id.toString();
        name_url.innerText = json[i].name;
        name.appendChild(name_url);
        let organizer = document.createElement('TD');
        organizer.innerText = json[i].organizer;
        row.appendChild(name);
        row.appendChild(organizer);
        document.getElementById('table').appendChild(row);
    }
};
const data = request();
