const searchButton = $(".searchButton");
const searchBar = $(".searchTerm");

function addToTable(){
    $('tbody > tr > td').remove();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=f0649916d953886dc034b0301ce8bb18&query=${searchBar.val().replace(/ /g, "+")}`).then(response => response.json()).then((data) => {
        let results = data.results;
        results.forEach((element, index) => {
            $('.movie > tbody > tr').append(`
                <td>
                    <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}">
                    <div class="info">
                        <span class="title">${element.title}</span>
                        <span class="releasedate">${element.release_date}</span>
                        <span class="voteavg">${element.vote_average}</span>
                    </div>
                    <button class="add" onclick="add('${element.title}', 'movie')">add</button>
                </td>
            `)
        });
    });
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=f0649916d953886dc034b0301ce8bb18&query=${searchBar.val().replace(/ /g, "+")}`).then(response => response.json()).then((data) => {
        let results = data.results;
        results.forEach((element, index) => {
            $('.tv > tbody > tr').append(`
                <td>
                    <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}">
                    <div class="info">
                        <span class="title">${element.name}</span>
                        <span class="releasedate">${element.first_air_date}</span>
                        <span class="voteavg">${element.vote_average}</span>
                    </div>
                    <button class="add" onclick="add('${element.name}', 'tv')">add</button>
                </td>
            `)
        });
    });
}
searchButton.on("click", addToTable);
searchBar.on("keyup", addToTable)
function add(title, type){
    fetch(`https://api.themoviedb.org/3/search/${type}?api_key=f0649916d953886dc034b0301ce8bb18&query=${title.replace(/ /g, "+")}`).then(response => response.json()).then((data) => {    
        console.log(data.results[0]);
        const option = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data.results[0])
        }
        if(type === "movie"){
            fetch('/addm', option);
        }
        else{
            fetch('/addt', option);
        }
    }).then(() => location.href("/"));
}