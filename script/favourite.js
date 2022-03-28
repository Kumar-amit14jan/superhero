const api_url = "https://www.superheroapi.com/api.php/338148107599656/";
list_of_super_hero();
function list_of_super_hero(){
    const list = JSON.parse(localStorage.getItem('id_of_favourite'));
    console.log(list);
    for(var i = 0 ; i< list.length ; i++){
        getData(list[i]);
    }
}
async function getData(id){
    let data = await fetch(api_url+id);
    if(data.ok){
        render_favourite_superHero_List(await data.json());
    }else{
        alert("data.status");
    }
}
// render your list
function render_favourite_superHero_List(data){
    console.log(data);
    var list_of_favourite = document.createElement('DIV');
    list_of_favourite.className = "super_hero_";
    list_of_favourite.id =data.id;
    list_of_favourite.innerHTML =`<div class="super_hero_list">
    <div class ="super" id=${data.id}>
    
    <img  id ="fav_image"src="${data.image.url}">
    <div class ="data_of_super_hero">
    <h2 id ="name">${data.name}</h2>
    <p>Strength : ${data.powerstats.strength}</p>
    <p>Power : ${data.powerstats.power}</p>
    <p>Speed : ${data.powerstats.speed}</p>
    </div>
    <div id ="remove_button"><button id =${data.id}>Remove</button><div>
    </div>

</div>`
    document.getElementById("your_List").appendChild(list_of_favourite);
}

// handle remove event and move to another page event
document.addEventListener('click' ,(event)=>{
    if(event.target.id =="fav_image"){
        var id = event.target.parentNode.id;
        console.log(event.target.parentNode.id);
        window.open('./superhero.html'+'?id='+id , "_self");
    }
    if(event.target.id >0){
        var remove_list =event.target.parentNode.parentNode.id;
        console.log(remove_list);
        document.getElementById(remove_list).remove();
        let remove_id = JSON.parse(localStorage.getItem("id_of_favourite"));
        remove_id.splice(remove_id.indexOf(event.target.id) , 1);
        localStorage.setItem("id_of_favourite" , JSON.stringify(remove_id));
        // send alert
        alert("Remove from your list !!");
    }
})