function addEp(index){
    let watched = Number(document.getElementsByClassName("watched")[index].innerHTML);
    let total = Number(document.getElementsByClassName("total")[index].innerHTML);
    if(watched < total){
        document.getElementsByClassName("watched")[index].innerHTML = watched+1;
        const option = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({indx: index})
        }
        fetch('/addep', option);
    }
}
function changeScore(index){
    document.getElementsByClassName("score-label")[index].classList.toggle("hidden");
    document.getElementsByTagName("select")[index].classList.toggle("hidden");

}

function changeRating(index){
    document.getElementsByClassName("score-label")[index].innerHTML = document.getElementsByTagName("select")[index].value;
    const option = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({indx: index, rating: document.getElementsByTagName("select")[index].value})
    }
    fetch('/chrate', option);
}

function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');

    // reload page with new params
    document.location.search = params;
}