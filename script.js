var container = document.createElement("div");
container.className = "container";
var row = document.createElement("div");
row.classList.add("row", "m-3");
container.append(row);

var res = fetch("https://restcountries.com/v3.1/all");
res.then((data) => data.json())
    .then((data1) => start(data1))
    .catch((error) => console.log(error));
var countries;

function start(data1) {
    countries = data1;
    console.log(data1);
    for (var i = 0; i < data1.length; i++) {
        var id_val = i;
        try {
            var lat = data1[i].latlng[0];
            var lng = data1[i].latlng[1];
        }
        catch {
            var lat = "no_val";
            var lng = "no_val";
        }
        row.innerHTML +=
            `<div class="col-md-4">
        <div class="card border-primary mb-3 " style="width: 18rem;">
        <h4 align = center color = blue class="card-title1">${data1[i].name.common}</h4>
        <img src="${data1[i].flags.svg}" class="card-img-top" alt="country flags">
          <div class="card-body">
          
          <h5 class="card-title">Capital:${data1[i].capital}</h5>
          <h5 class="card-title">Region:${data1[i].region}</h5>
          <h5 class="card-title">Latlng:${data1[i].latlng}</h5>
          <h5 class="card-title">Country Code:${data1[i].flag}</h5>
                <button class="btn btn-primary" value="${id_val},${lat},${lng}" onclick="weathervalues(value)">Click for Weather</button>
                </div>
            </div>
        </div>`;
    }
    document.body.append(container);
}
var Temperature;

function weathervalues(val, latValue, lngValue) {
    var values = val.split(",");
    var i = +values[0];
    latValue = +values[1];
    lngValue = +values[2];

    var element = document.getElementById(i);
    if (!element) {
        element = document.createElement("div");
        element.id = i;
        document.querySelector(`[value="${val}"]`).parentNode.appendChild(element);
    }

    if (latValue != "no_val" && lngValue != "no_val") {
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lngValue}&appid=957cc80abe6cbfbfb9d37152c0aaf7c2`;
        var res1 = fetch(url);
        res1
            .then((data) => data.json())
            .then((data2) => {
                Temperature = data2.main.temp;
            })
            .catch(() => {
                document.getElementById(i).innerHTML = `
              <h5 class="card-title">Capital:${countries[i].capital}</h5>
              <h5 class="card-title">Latlng:${countries[i].latlng}</h5>
              <h5 class="card-title">Country Code:${countries[i].flag}</h5>
              <h5 class="card-title">Region:${countries[i].region}</h5>
            `;
            });

        if (Temperature != undefined) {
            document.getElementById(i).innerHTML = `
              
              <h5 class="card-title">Temperature : ${Temperature}</h5>
            `;
        }


    } else {
        document.getElementById(i).innerHTML = `
        
        <h5 class="card-text">Sorry We can't get Weather</h5>
      `;
    }
}

