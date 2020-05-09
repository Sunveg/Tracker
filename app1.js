const api_url = 'https://coronavirus-19-api.herokuapp.com/countries/India';
const api_url2 = 'https://coronavirus-19-api.herokuapp.com/all';
const api_url3 = 'https://api.covid19india.org/data.json';



function getDatag() {
    fetch(api_url2).then(function (response) {
        return response.json();
    }).then(function (datag) {

        document.getElementById('total-cases').textContent = datag.cases;
        document.getElementById('recovered').textContent = datag.recovered;
        document.getElementById('deaths').textContent = datag.deaths;
    })
        .catch(function (error) {
            console.log('OH! something went wrong');
            document.getElementById('err').textContent = "Oops! Check system time and try again!";
            document.getElementById('err2').textContent = "Or the data is being updated. Try again after some time :)";
        })
}

async function getCSV() {
    const response = await fetch('./world.csv');
    const datacsv = await response.text();

    const table = datacsv.split('\n').slice(1);
    table.forEach(row => {
        const col = row.split(',');
        const date = col[0];
        const cases = col[1];
        xlabels.push(date);
        ylabels.push(cases);
        //console.log(date, cases);
    })
}

async function getCSV2() {
    const response = await fetch('./india_small.csv');
    const datacsv2 = await response.text();

    const table2 = datacsv2.split('\n').slice(1);
    table2.forEach(row2 => {
        const col2 = row2.split(',');
        const date2 = col2[0];
        const cases2 = col2[2];
        xlabels2.push(date2);
        ylabels2.push(cases2);
        //console.log(date2, cases2);
    })
}

function getDataStates() {
    fetch(api_url3).then(function (response) {
        return response.json();
    }).then(function (data) {
        // console.log(data.statewise[0].state);
        document.getElementById('total-cases-india').textContent = data.statewise[0].confirmed;
        document.getElementById('recovered-india').textContent = data.statewise[0].recovered;
        document.getElementById('deaths-india').textContent = data.statewise[0].deaths;
        var tableHead = [];
        var table = document.createElement("table");
        var tr = table.insertRow(-1);
        tableHead = ['State', 'Confirmed', 'Active', 'Recovered', 'Deaths', 'New cases', 'New recoveries', 'New deceased'];

        for (var i = 0; i < 8; i++) {
            var th = document.createElement("th");
            th.innerHTML = tableHead[i];
            tr.appendChild(th);
        }

        for (var j = 0; j < data.statewise.length - 7; j++) {
            tr = table.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data.statewise[j].state;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data.statewise[j].confirmed;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data.statewise[j].active;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data.statewise[j].recovered;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data.statewise[j].deaths;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = '<span style="color:#FF0000">+' + data.statewise[j].deltaconfirmed;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = '<span style="color:#0F47B6">+' + data.statewise[j].deltarecovered;
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = '<span style="color:#FF0000">+' + data.statewise[j].deltadeaths;
        }

        var divContainer = document.getElementById("showtable");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        //document.getElementById('totcases').textContent = data.cases;
        //document.getElementById('totrecov').textContent = data.recovered;
        //document.getElementById('totdeaths').textContent = data.deaths;
    })
        .catch(function (error) {
            console.log('OH! something went wrong');
            document.getElementById('err').textContent = "Oops! Check Internet connection and try again!";
            document.getElementById('err2').textContent = "Or the data is being updated. Try again after some time :)";
        })
}




createChart();
createChart2();
document.getElementById('chartglobal').hidden = false;
document.getElementById('chartindia').hidden = false;
document.getElementById('chart').hidden = false;
document.getElementById('chart2').hidden = false;


// function disableGraphs() {

//     document.getElementById('chartglobal').hidden = true;
//     document.getElementById('chartindia').hidden = true;
//     document.getElementById('chart').hidden = true;
//     document.getElementById('chart2').hidden = true;
// }

// document.getElementById('chartglobal').hidden = true;
// document.getElementById('chartindia').hidden = true;
// document.getElementById('chart').hidden = true;
// document.getElementById('chart2').hidden = true;

//getData();
getDatag();
getDataStates();

const xlabels = [];
const ylabels = [];
const xlabels2 = [];
const ylabels2 = [];


DoughnutChart();
DoughnutChartg();

async function createChart() {
    await getCSV();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Total Cases- Global',
                data: ylabels,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function createChart2() {
    await getCSV2();
    const ctx = document.getElementById('chart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels2,
            datasets: [{
                label: 'Total Cases- India',
                data: ylabels2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


async function DoughnutChart() {
    fetch(api_url3).then(function (response) {
        return response.json();
    }).then(function (data) {
        var ctx = document.getElementById('chartD1').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Total confirmed', 'Recovered', 'Deaths'],
                datasets: [{
                    data: [data.statewise[0].confirmed, data.statewise[0].recovered, data.statewise[0].deaths],
                    backgroundColor: [
                        '#87CEEB',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ],

                    borderColor: [
                        '#87CEEB',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    borderWidth: 1,
                    hidden: false
                }]
            },
            options: {
                responsive: true,
                display: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
}


function DoughnutChartg() {
    fetch(api_url2).then(function (response) {
        return response.json();
    }).then(function (datag) {
        var ctx = document.getElementById('chartD2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total confirmed', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'Till 4 May',
                    data: [datag.cases, datag.recovered, datag.deaths],
                    backgroundColor: [
                        '#87CEEB',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    borderColor: [
                        '#87CEEB',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    borderWidth: 1,
                    hidden: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    })

}


//https://coronavirus-19-api.herokuapp.com/countries/India
