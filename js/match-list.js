function matchListJSON(data) {
    var dataMatchesHTML = '';
    var match = data.matches;
    var max = match.length;

    if (match.length > 16) {
      max = 16;
    }

    for (let i = 0; i < max; i++) {
      dataMatchesHTML += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div center-align>
              <h5 class="center-align">Matchday : ${match[i].matchday}</h5>
              <div class="center-align">Kick Off : ${convertDate(new Date(match[i].utcDate))}</div>
        
              <div class="row" style="margin:20px">
                <div class="col s5 truncate right-align">
                  <span class="blue-text">  ${match[i].homeTeam.name}</span>
                </div>
                <div class="col s2 ">
                  VS
                </div>
                <div class="col s5 truncate left-align">
                  <span class="blue-text">  ${match[i].awayTeam.name}</span>
                </div>
              </div>
              <div class="center-align">
                <a class="blue waves-effect waves-light btn" href="./match_detail.html?id=${match[i].id}">Lihat Detail</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
    };
    document.getElementById("matchList-content").innerHTML = dataMatchesHTML;

}