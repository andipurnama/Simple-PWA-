function latestMatchJSON(data) {
    var LatestHTML = ''
    data.matches.forEach(function (latest) {
        latest = JSON.parse(JSON.stringify(latest).replace(/http:/g, 'https:'));
        LatestHTML += `
        <ul class="score color-theme">
            <li>${latest.score.fullTime.homeTeam}</li>
            <li>:</li>
            <li>${latest.score.fullTime.awayTeam}</li>
        </ul>
        <ul class="club-title color-def">
            <li class="font-bold">${latest.homeTeam.name}</li>
            <li class="color-theme">VS</li>
            <li class="font-bold">${latest.awayTeam.name}</li>
        </ul>
        <ul class="competition">
            <li>${latest.competition.name}</li>
        </ul>
        <ul class="date color-theme">
            <li class="font-bold">${convertDate(new Date(latest.utcDate))}</li>
        </ul>`
    });
    document.getElementById("allCity-match").innerHTML = LatestHTML;
}