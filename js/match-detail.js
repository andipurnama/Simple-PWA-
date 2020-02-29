function detailMatchJSON(data) {
    var mD = data.match.matchday;
    var kO = convertDate(new Date(data.match.utcDate));
    var hTeamName = data.match.homeTeam.name;
    var aTeamName = data.match.awayTeam.name;
    var hTeamDraw = data.head2head.homeTeam.draws;
    var aTeamDraw = data.head2head.awayTeam.draws;
    var hTeamLose = data.head2head.homeTeam.losses;
    var aTeamLose = data.head2head.awayTeam.losses;
    var hTeamWin = data.head2head.homeTeam.wins;
    var aTeamWin = data.head2head.awayTeam.wins;
    var numMatch = data.head2head.numberOfMatches;
    var totGoals = data.head2head.totalGoals;
    var venue = data.match.venue;

    document.getElementById("matchDay").innerHTML = `Matchday : ${mD}`;
    document.getElementById("kickOff").innerHTML = `Kick Off : ${kO}`;
    document.getElementById("homeTeamName").innerHTML = hTeamName;
    document.getElementById("awayTeamName").innerHTML = aTeamName;
    document.getElementById("numberOfMatches").innerHTML = `Number Of Matches: ${numMatch}`;
    document.getElementById("totalGoals").innerHTML = `Total Goals: ${totGoals}`;
    document.getElementById("homeTeamWins").innerHTML = hTeamWin;
    document.getElementById("awayTeamWins").innerHTML = aTeamWin;
    document.getElementById("homeTeamDraws").innerHTML = hTeamDraw;
    document.getElementById("awayTeamDraws").innerHTML = aTeamDraw;
    document.getElementById("homeTeamLosses").innerHTML = hTeamLose;
    document.getElementById("awayTeamLosses").innerHTML = aTeamLose;
    document.getElementById("venue").innerHTML = venue;
    document.getElementById("preloader").innerHTML = '';
}

function resultMatchFav(data) {
    var dataFavMatchHTML = ''
    data.forEach(function(match) {
        dataFavMatchHTML += `
        <div class="col s12 m6 l6">
        <div class="card">
            <div class="card-content">
                <div center-align>
                    <h5 class="center-align color-theme">Matchday : ${match.match.matchday}</h5>
                    <div class="center-align color-theme">Kick Off : ${convertDate(new Date(match.match.utcDate))}</div>

                    <div class="row" style="margin:20px">
                        <div class="col s5 truncate right-align">
                            <span class="blue-text text-darken-2">  ${match.match.homeTeam.name}</span>
                        </div>
                        <div class="col s2 color-def">
                            VS
                        </div>
                        <div class="col s5 truncate left-align">
                            <span class="blue-text text-darken-2">  ${match.match.awayTeam.name}</span>
                        </div>
                    </div>
                    <div class="center-align">
                        <a class="blue waves-effect waves-light btn" href="./detail_match.html?id=${match.id}">Lihat Detail</a>
                    </div>  
                </div>
            </div>
        </div>
    </div>`
    });
    document.getElementById("data-favorit").innerHTML = dataFavMatchHTML;
}