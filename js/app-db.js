function cekData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
        .then(function(db) {
            var transac = db.transaction(storeName, "readonly");
            var store = transac.objectStore(storeName);
            return store.get(id);
        })
        .then(function (data) {
            if (data != undefined) {
                resolve("Data Favorit")
            } else {
                reject("Bukan Data Favorit")
            }
        });
    });
}

function createData(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "player") {
        storeName = "player_fav";
        dataToCreate = {
            id: data.id,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            countryOfBirth: data.countryOfBirth,
            nationality: data.nationality,
            position: data.position
        }
    } else if (dataType == "team") {
        storeName = "team_fav";
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } else if (dataType == "match") {
        storeName = "match_fav";
        dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }

    console.log("data"+ dataToCreate);

    databasePromise(idb).then(db => {
        const transac = db.transaction(storeName, 'readwrite');
        transac.objectStore(storeName).put(dataToCreate);
        return transac.complete;
    }).then(function() {
        console.log("Tim Berhasil Disimpan");
        document.getElementById("iconFav").classList.add('fas');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = "Favorit";
        M.toast({
            html: "Berhasil Di Favoritkan!"
        });
    }).catch(function() {
        M.toast({
            html: "Terjadi Kesalahan"
        });
    });
}

function deleteDataFav(storeName, data) {
    databasePromise(idb).then(function(db) {
        var transac = db.transaction(storeName, 'readwrite');
        var store =transac.objectStore(storeName);
        store.delete(data);
        return transac.complete;
    }).then (function() {
        console.log("Item Berhasil Dihapus");
        document.getElementById("iconFav").classList.remove('fas');
        document.getElementById("iconFav").classList.add('far');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Tambah Ke Favorit";
        M.toast({
            html: 'Data berhasil dihapus dari Favorit!'
        });
    }).catch(function() {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function getSavedDataByID(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var squadHTML = ''
        var tabelSquadHTML = ''
        getDataByID("team_fav", idParam).then(function (team) {
            detailTeamJSON(data)
            dataTeamJSON = team;
            data.squad.forEach(function (squad) {
                squadJSON = squad;
                squadHTML += `
                <tr>
                    <td><a href="./player_detail.html?id=${squad.id}"> ${squad.name}</a></td>
                    <td >${squad.position}</td>
                </tr>`
            });
            tabelSquadHTML += `
            <table><tbody> ${dataSquadHTML}  </tbody></table>`
            document.getElementById("squad").innerHTML = tabelSquadHTML;
            resolve(data);
        });
    } else if (dataType == "player") {
        getDataByID("player_fav", idParam).then(function (player) {
           detailPlayerJSON(player);
        });
    } else if (dataType == "match") {
        getDataByID("match_fav", idParam).then(function (match) {
            detailMatchJSON(match);
        });
    }
}

function getDataByID(storeName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
        .then(function (db) {
            var transac = db.transaction(storeName, 'readonly');
            var store = transac.objectStore(storeName);
            return store.get(id);
        })
        .then(function (data) {
            resolve(data);
        });
    }); 
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var transac = db.transaction(storeName, "readonly");
                var store = transac.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function setupTypeFav(dataType) {
    if (dataType == "team") {
        getAllData("team_fav").then(function (data) {
            resultTeamFav(data);
        });
    } else if (dataType == "player") {
        getAllData("player_fav").then(function (data) {
            resultPlayerFav(data);
        });
    } else if (dataType == "match") {
        getAllData("match_fav").then(function (data) {
            resultMatchFav(data);
        });
    }
}