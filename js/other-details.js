function detailTeamJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    document.getElementById("clubName").innerHTML = data.name;
    document.getElementById("clubLogo").src = data.crestUrl;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("shortName").innerHTML = data.shortName;
    document.getElementById("tla").innerHTML = data.tla;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("founded").innerHTML = data.founded;
    document.getElementById("clubColor").innerHTML = data.clubColors;
    document.getElementById("venue").innerHTML = data.venue;
    document.getElementById("preloader").innerHTML = '';
}

function detailPlayerJSON(data) {
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("firstName").innerHTML = data.firstName;
    if (data.lastName == null) {
        data.lastName = "-"
    }
    document.getElementById("lastName").innerHTML = data.lastName;
    document.getElementById("dateOfBirth").innerHTML = data.dateOfBirth;
    document.getElementById("countryOfBirth").innerHTML = data.countryOfBirth;
    document.getElementById("nationality").innerHTML = data.nationality;
    document.getElementById("position").innerHTML = data.position;
    document.getElementById("preloader").innerHTML = '';
}

function resultTeamFav(data) {
    var dataTeamFavHtml = ''
    data.forEach(function (team) {
        dataTeamFavHtml += `
        <div class="col s12 m6 l6">
            <div class="card">
                <div class="card-content blue darken-2">
                    <div center-align>
                        <h5 class="center-align">
                            <span>  
                                <a class="white-text" href="./team_detail.html?id=${team.id}">${team.name}</a>
                            </span>
                        </h5>          
                    </div>
                </div>
            </div>
        </div>
        `
    });

    document.getElementById("data-favorit").innerHTML = dataTeamFavHtml;
}

function resultPlayerFav(data) {
    var dataPlayerFavHtml = ''
    data.forEach(function (player) {
        dataPlayerFavHtml += `
        <div class="col s12 m6 l6">
            <div class="card">
                <div class="card-content blue darken-1">
                    <div center-align>
                        <h5 class="center-align">
                        <span> 
                            <a class="white-text" href="./player_detail.html?id=${player.id}">${player.name}</a>
                        </span>
                        </h5>
                    </div>
                </div>
            </div>
        </div>`
    });

    document.getElementById("data-favorit").innerHTML = dataPlayerFavHtml;
}