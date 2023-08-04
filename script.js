function getDeprems() {
  //  const searchInput = document.getElementById("searchInput").value;

    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=36.0&maxlatitude=42.0&minlongitude=26.0&maxlongitude=45.0&starttime=" + getOneWeekAgo() + "&endtime=" + getCurrentTime();

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayDeprems(data.features);
        })
        .catch(error => console.error(error));
}

function displayDeprems(deprems) {
    const depremListesi = document.getElementById("depremListesi");
    depremListesi.innerHTML = "";

    deprems.forEach(deprem => {
        const tarih = new Date(deprem.properties.time);
        const sehir = deprem.properties.place;
        const buyukluk = deprem.properties.mag;
        const derinlik = deprem.geometry.coordinates[2];

        const depremBilgisi = document.createElement("li");
        depremBilgisi.innerText = `Tarih: ${tarih.toLocaleString("tr-TR")}, Şehir: ${sehir}, Büyüklük: ${buyukluk}, Derinlik: ${derinlik} km`;

        depremListesi.appendChild(depremBilgisi);
    });
}

function getOneWeekAgo() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return oneWeekAgo.toISOString().slice(0, 10);
}

function getCurrentTime() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}
