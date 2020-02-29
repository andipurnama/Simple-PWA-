document.addEventListener("DOMContentLoaded", function() {
    // active sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    var typeFavorit = "";
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });


                // daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        //tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //muat halaman konten yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }


    // load page content

    var page = window.location.hash.substr(1);
    loadPage(setupPage(page));

    function setupPage() {
        if (page =="" || page =="#") {
            page = "home";
        } else if (page === "favorit" || page === "team-fav") {
            page = "favorit";
            typeFavorit = "team";
        } else if (page === "player-fav") {
            page = "favorit";
            typeFavorit = "player";
        } else if (page === "match-fav") {
            page = "favorit";
            typeFavorit = "match";
        }
        return page;
    }

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            var content = document.querySelector("#body-content");

            if (this.readyState == 4) {
                if (page === "home") {
                    getCityMatch();
                    getUpcoming();
                } else if (page === "klasemen") {
                    getKlasemen();
                } else if (page === "match") {
                    getMatchList();
                } else if (page === "favorit") {
                    setupTypeFav(typeFavorit); 
                } else {
                    tipeFavorit = "";
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Upss... Halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page +".html", true);
        xhttp.send();
    }

});
