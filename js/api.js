
var api_token = '42e9db3411964ea39f14bb9ce9c20d81'
var id_liga = 2021 //id EPL
var base_url = "https://api.football-data.org/v2/";
var endpoint_team = `${base_url}teams/`;
var endpoint_player = `${base_url}players/`;
var endpoint_match = `${base_url}matches/`;
var endpoint_cityMatch = `${base_url}teams/65/matches?status=FINISHED`;
var endpoint_upcomingMatch = `${base_url}teams/65/matches?status=SCHEDULED&limit=1`;
var endpoint_klasemen = `${base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
var endpoint_jadwal_match = `${base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=8`;

var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}

// Blok kode akan dipanggil jika fetch berhasill

function status(response) {
    if (response.status !==200) {
        console.log("Error: " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi promise agar bisa di Then kan
        return Promise.resolve(response);
    }
}

// Blok kode untuk parsing json menjadi Array JS
function json(response) {
    return response.json();
}

// Blok kode untuk menghandle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error: " + error);
}

//Blok kode untuk melakukan request data json
// Yang ini perlu sesuaikan ya
function getCityMatch() {
    // cek cache
    if('caches' in window) {
        caches.match(endpoint_cityMatch).then(function (response) {
            if (response) {
                response.json().then(function(data) {
                    latestMatchJSON(data);
                });
            }
        });
    }

    //fetch api
    fetchApi(endpoint_cityMatch)
    .then(status)
    .then(json)
    .then(function(data) {
        latestMatchJSON(data)
    })
    .catch(error);
}

function getUpcoming() {
    if ('caches' in window) {
        caches.match(endpoint_upcomingMatch).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    cityUpcomingJSON(data);
                });
            }
        });
    }
    fetchApi(endpoint_upcomingMatch)
    .then(status)
    .then(json)
    .then(function (data) {
        cityUpcomingJSON(data)
    })
    .catch(error);
}


function getKlasemen() {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    plKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
        plKlasemenJSON(data)
    })
    .catch(error);
}

function getMatchList() {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(endpoint_jadwal_match).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        matchListJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_jadwal_match)
            .then(status)
            .then(json)
            .then(function (data) {
                matchListJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailTeamById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        var dataSquadHTML = ''
        var tableSquadHTML = ''
        if ("caches" in window) {
            caches.match(endpoint_team + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        detailTeamJSON(data)
                        data.squad.forEach(function (squad, index) {
                            dataSquadJSON = squad;
                            dataSquadHTML += `
                            <tr>
                                <td><a href="./player_detail.html?id=${squad.id}"> ${squad.name}</a></td>
                                <td >${squad.position}</td>
                            </tr>`
                        });
                        tableSquadHTML += `<table><tbody> ${dataSquadHTML}  </tbody></table>`
                        document.getElementById("squad").innerHTML = tableSquadHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                detailTeamJSON(data)
                dataTeamJSON = data;
                data.squad.forEach(function (squad, index) {
                    dataSquadJSON = squad;
                    dataSquadHTML += `
                    <tr>
                        <td>${index+1}. </td>
                        <td><a href="./player_detail.html?id=${squad.id}"> ${squad.name}</a></td>
                        <td>${squad.position}</td>
                    </tr>`
                });
                tableSquadHTML += `
                <table>
                    <thead>
                        <tr>
                            <td class="a-font-bold">No</td>
                            <td class="a-font-bold">Name</td>
                            <td class="a-font-bold">Position</td>
                        </tr>
                    </thead>
                    <tbody> ${dataSquadHTML}  </tbody>
                </table>`

                document.getElementById("squad").innerHTML = tableSquadHTML;
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailPlayerById() {
    return new Promise(function (resolve,reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_player + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        detailPlayerJSON(data);
                        resolve(data)
                    });
                }
            });
        }

        fetchApi(endpoint_player + idParam)
        .then(status)
        .then(json)
        .then(function (data) {
            detailPlayerJSON(data);
            resolve(data);
        })
        .catch(error);
    });
}

function getDetailMatchById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_match + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        detailMatchJSON(data);
                        resolve(data)
                    });
                }
            });
        }

        fetchApi(endpoint_match + idParam)
        .then(status)
        .then(json)
        .then(function (data) {
            detailMatchJSON(data);
            resolve(data);
        })
        .catch(error);
    });
}