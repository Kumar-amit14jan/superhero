let search_data = document.getElementById("search_super_hero");
const url = "https://www.superheroapi.com/api.php/338148107599656/search/";
const favourite ="./images/starfav.jpg";
const notfavourite ="./images/star.png";



async function search_superHero(search_data){
    const response = await fetch(url + search_data);
    if(response.ok){
      renderData(await response.json());
    }else{
      alert("HTTP-Error: " + response.status);
    }
  }

  search_data.addEventListener('keyup' ,function(event){
    let search_data = event.target.value;
    console.log("your search string",search_data);
    if (search_data.length < 4){  
      document.getElementById("search_super_hero_data").style.fontSize ="25px";
      document.getElementById("search_super_hero_data").innerHTML="Add Some more character";
  }else{
    search_superHero(search_data);
  }
  
    });

    function renderData(data){
      // Checking if there's anything found
      if(data.response=='error' || data.results.length === 0){
        // adding message for client
        document.getElementById("search_super_hero_data").style.fontSize ="25px";
          document.getElementById("search_super_hero_data").innerHTML = data.error;

           
      }
      else{
          // delete previous search super_hero_data
          var previous_data = document.getElementById("search_super_hero_data");
          previous_data.remove();
          // creating new result and data of superhero
          var data_container = document.getElementById("data-container");
          var newdata = document.createElement('DIV');
        newdata.id = 'newdata';
        data_container.appendChild(newdata);
       
        // rendering each heroes
        data.results.forEach((element) => {
            newdata.appendChild(getData(element));
        });
         
      }
  }
  
  function getData(data){
    // data container
    var data_Container = document.createElement('DIV');
    data_Container.id = data.id;
    data_Container.className ="search_string_data";
    let image_location = notfavourite;
    var favourite_super_hero_index = JSON.parse(localStorage.getItem("id_of_favourite"));
    if(favourite_super_hero_index.indexOf(data.id) != -1){
      image_location = favourite;
    }
    
    data_Container.innerHTML = `
        <div class="image">
            <img src="${data.image.url}" width =130px>
        </div>  
      <div id ="some_details_of_super_hero">
        <div id="_hero_name">
        <p>Name : ${data.name}</p>
        <p>Strength : ${data.powerstats.strength}</p>
        <p>Speed : ${data.powerstats.speed}&nbsp&nbsp<a id ="read_more" href="#">Read more</a></p>
        </div>
        <div id ="favourite"><img id="favourite_button" src ="${image_location}" width =25></div>
        </div>
        
    `
    return data_Container;
}

entry_in_localStorage();
function entry_in_localStorage(){
  if(localStorage.getItem("id_of_favourite")==null){
    localStorage.setItem("id_of_favourite"  , JSON.stringify(Array(0)) );
  }
}
// adding favourite list
document.addEventListener('click', (event) => {
  if(event.target.id == 'read_more'){
      var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
      window.open('superhero../pages/superhero.html'+'?id='+id , "_self");
  }else if(event.target.id =="favourite_button"){
    // now add your super hero
    var id = event.target.parentNode.parentNode.parentNode.id;
    console.log(id);
    var all_favourite_list_of_super_hero = JSON.parse(localStorage.getItem("id_of_favourite"));
    console.log(all_favourite_list_of_super_hero.indexOf(id));
      if(all_favourite_list_of_super_hero.indexOf(id) !=-1){
        event.target.src =notfavourite;
        let index = all_favourite_list_of_super_hero.indexOf(id);
        all_favourite_list_of_super_hero.splice(index , 1);
        // send alert
        alert("Remove from your list !!");
      }else{
        all_favourite_list_of_super_hero.push(id);
        event.target.src =favourite;
      //send alert
      alert("Added to your list !!");
      }
      // setting your local storage
      localStorage.setItem("id_of_favourite" ,JSON.stringify(all_favourite_list_of_super_hero));
    
    }

});
