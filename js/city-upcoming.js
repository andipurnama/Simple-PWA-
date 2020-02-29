function cityUpcomingJSON(data) {
    var upcomingHTML = ''
    data.matches.forEach(function(upcoming) {
        upcoming = JSON.parse(JSON.stringify(upcoming).replace(/http:/g, 'https:'));
        upcomingHTML = `
        <ul class="club-title">
            <li class="font-bold color-theme">${upcoming.homeTeam.name}</li>
            <li class="color-def">VS</li>
            <li class="font-bold color-theme">${upcoming.awayTeam.name}</li>
        </ul>
        <ul class="competition">
            <li>${upcoming.competition.name}</li>
        </ul>
        <ul class="date color-theme">
            <li class="font-bold">${convertDate(new Date(upcoming.utcDate))}</li>
        </ul>`
    });
    document.getElementById("upcoming-match").innerHTML = upcomingHTML;
}