function plKlasemenJSON(data) {
    var tabelKlasemenHTML = ''
    data.standings.forEach(function (klasemen) {
        var dataKlasemen = ''
        klasemen.table.forEach(function (dataClub) {
            dataClub = JSON.parse(JSON.stringify(dataClub).replace(/http:/g, 'https:'));
            dataKlasemen += `<tr>
            <td class="center-align">${dataClub.position}</td>
            <td class="center-align">
            <a href="./team_detail.html?id=${dataClub.team.id}">
                <p class="hide-on-small-only">
                    <img class ="show-on-medium-and-up show-on-medium-and-down img-club-klasemen" src=${dataClub.team.crestUrl}  alt="logo">
                    ${dataClub.team.name}
                </p>
                <p class="hide-on-med-and-up">
                    <img src=${dataClub.team.crestUrl}  alt="logo" class="img-club-klasemen">
                </p>
            </a>
            </td>
            <td class="center-align">${dataClub.playedGames}</td>
            <td class="center-align">${dataClub.won}</td>
            <td class="center-align">${dataClub.draw}</td>
            <td class="center-align">${dataClub.lost}</td>
            <td class="center-align">${dataClub.goalsFor}</td>
            <td class="center-align">${dataClub.goalsAgainst}</td>
            <td class="center-align">${dataClub.goalDifference}</td>
            <td class="center-align">${dataClub.points}</td>
        </tr>`
        })

        tabelKlasemenHTML += `
        <div class="card">
            <div class="card-content">
                <h6 class="font-bold mbot-3 color-theme ">Last Updated: ${convertDate(new Date(data.competition.lastUpdated))}</h6> 
                <table class="responsive-table striped " >
                    <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th>Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                    </thead>
                    <tbody>` + dataKlasemen + `</tbody>
                </table>
            </div>
        </div>`
    });
    document.getElementById("pl-klasemen").innerHTML = tabelKlasemenHTML;
}