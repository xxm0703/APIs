let name_api = 'http://liveresultat.orientering.se/api.php?method=getcompetitioninfo&comp=';
const print = a => console.log(a);
let comp = window.location.hash.substr(1);
print(comp);
async function name() {
    let json = await fetch(name_api+comp.toString())
        .then(a=>a.json());
    document.getElementById('name').innerText = json.name;
}
name();