function databasePromise(idb) {
    var dbPromise = idb.open("db_city-app", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_fav")) {
            var idxFavTeam = upgradeDb.createObjectStore("team_fav",{
                keyPath: "id"
            });
            idxFavTeam.createIndex("teamName", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("player_fav")) {
            var idxFavPlayer = upgradeDb.createObjectStore("player_fav", {
                keyPath: "id"
            });
            idxFavPlayer.createIndex("playerName", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("match_fav")) {
            var idxFavmatch = upgradeDb.createObjectStore("match_fav", {
                keyPath: "id"
            });
            idxFavmatch.createIndex("hTeam", "match.homeTeam.name", {
                unique: false
            });
            idxFavmatch.createIndex("aTeam", "match.awayTeam.name", {
                unique: false
            });
        }
    });
    return dbPromise;
}