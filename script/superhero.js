const api_url = "https://www.superheroapi.com/api.php/338148107599656/";
datainfo();
async function datainfo(){
    const id = getId();
    console.log(id);
    const data = await getData(id);
    renderSuperHeroPage(data);
}

function getId(){
    const url = location.search;
    console.log(url);
    return url.substring(url.indexOf('=')+1);

}

async function getData(id){
    let data = await fetch(api_url+id);
    if(data.ok){
        const json_data = await data.json();
        console.log(json_data);
        return json_data;
    }else{
        alert("data.status");
    }
}

// render the page
function renderSuperHeroPage(data){
    document.getElementById("details_data").name = data.id;
    console.log(data.id);
    var image = document.getElementById("image");
    image.src =`${data.image.url}`;

    // powerstat 
    var intelligence = document.getElementById('intelligence');
    intelligence.innerHTML +=":"+ `${data.powerstats.intelligence}`;
    var strength = document.getElementById('strength');
    strength.innerHTML +=":"+`${data.powerstats.strength}`;
    var speed =document.getElementById('speed');
    speed.innerHTML +=":"+`${data.powerstats.speed}`;
    var durability =document.getElementById('durability');
    durability.innerHTML+=":"+`${data.powerstats.durability}`;
    var power =document.getElementById('power');
    power.innerHTML+=":"+`${data.powerstats.power}`;
   
    // biography
    document.getElementById("Biography").innerHTML =make_data_in_paragraph(data.biography);
     // appereance
    document.getElementById('Appearance').innerHTML = make_data_in_paragraph(data.appearance);
    // occupation
    document.getElementById("Occupation").innerHTML =make_data_in_paragraph(data.work);
    // connections
    document.getElementById("Connections").innerHTML =make_data_in_paragraph(data.connections);

}

// to access all data in paragraph formate
function make_data_in_paragraph(data){
    var string='';
    for (var key in data){
        string += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ data[key]+ '</p>';
    }
    return string;
}