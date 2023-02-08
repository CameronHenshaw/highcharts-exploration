// function getData() {
//     let dataExceededTransferLimit = true;
//     let dataForProcessing = [];
//     let recordOffset = 0;
//     let myCount = 0
//     while (dataExceededTransferLimit) {
//         fetch(`https://services.arcgis.com/aJ16ENn1AaqdFlqx/ArcGIS/rest/services/EmployeeBaseSalary/FeatureServer/0/query?where=1%3D1&outFields=*&resultOffset=${recordOffset}&f=pjson`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.exceededTransferLimit)
//             data.features.forEach(function(feature) {
//                 dataForProcessing.push(feature.attributes);
//                 });
//             dataExceededTransferLimit = data.exceededTransferLimit;
//             recordOffset +=1000;
//             myCount ++
//             }),
//     }; 
//     console.log(dataForProcessing.length);
//     const dataProcessed = dataForProcessing.reduce((acc, row) => {
//         if (!row.department) {
//         } else if (acc[row.department]) {
//             acc[row.department]++;
//         } else {
//             acc[row.department] = 1;
//         }
//         return acc
//         }, {})
//     console.log(dataProcessed)
//     let dataFormatted = {departments:Object.keys(dataProcessed), values:Object.values(dataProcessed)};
//     console.log(dataFormatted.departments)
//     console.log(dataFormatted.values)
//     renderChart1(dataFormatted)
// };


/// function below works and renders chart

function getData(recordOffset = 0) {
    fetch(`https://services.arcgis.com/aJ16ENn1AaqdFlqx/ArcGIS/rest/services/EmployeeBaseSalary/FeatureServer/0/query?where=1%3D1&outFields=*&resultOffset=${recordOffset}&f=pjson`)
    .then(response => response.json())
    .then(data => {
        let dataForProcessing = []
        data.features.forEach(function(feature) {
            dataForProcessing.push(feature.attributes);
        });
        const dataProcessed = dataForProcessing.reduce((acc, row) => {
            if (!row.department) {
            } else if (acc[row.department]) {
                acc[row.department]++;
            } else {
                acc[row.department] = 1;
            }
            return acc
        }, {})
        console.log(dataProcessed)
        let dataFormatted = {departments:Object.keys(dataProcessed), values:Object.values(dataProcessed)};
        console.log(dataFormatted.departments)
        console.log(dataFormatted.values)
        renderChart1(dataFormatted)
        });
}



function getData1(recordOffset = 0) {
    fetch(`https://services.arcgis.com/aJ16ENn1AaqdFlqx/ArcGIS/rest/services/EmployeeBaseSalary/FeatureServer/0/query?where=1%3D1&outFields=*&resultOffset=${recordOffset}&f=pjson`)
    .then(response => response.json())
    .then(data => {
        let dataForProcessing = []
        data.features.forEach(function(feature) {
            dataForProcessing.push(feature.attributes);
        });
        const dataProcessed = dataForProcessing.reduce((acc, row) => {
            if (!row.department || acc[row.department]) {
                // do nothing
            } else {
                acc[row.department] = {};
            }
            if (!row.division) {
                // do nothing
            } else if (acc[row.department][row.division]){
                acc[row.department][row.division]['count'] ++;
                acc[row.department][row.division]['average'] = acc[row.department][row.division]['average'] + (Number(row.annual_base_pay) - acc[row.department][row.division]['average']) / (acc[row.department][row.division]['count']);

            } else {
                acc[row.department][row.division] = {};
                acc[row.department][row.division]['average'] = Number(row.annual_base_pay);
                acc[row.department][row.division]['count'] = 1;
            }
            return acc
        }, {})
        //console.log(dataProcessed)
        console.log(dataProcessed)
        let dataFormatted = {departments:Object.keys(dataProcessed), values:Object.values(dataProcessed)};
        // console.log(dataFormatted.departments)
        // console.log(dataFormatted.values)
        renderChart1(dataFormatted);
        return dataProcessed
        });
}

async function getData1Async(recordOffset = 0) {
    const response = await fetch(`https://services.arcgis.com/aJ16ENn1AaqdFlqx/ArcGIS/rest/services/EmployeeBaseSalary/FeatureServer/0/query?where=1%3D1&outFields=*&resultOffset=${recordOffset}&f=pjson`)
    let data = response.json()
    console.log(data)
    let dataForProcessing = []
    data.features.forEach(function(feature) {
        dataForProcessing.push(feature.attributes);
    });
    const dataProcessed = dataForProcessing.reduce((acc, row) => {
        if (!row.department || acc[row.department]) {
            // do nothing
        } else {
            acc[row.department] = {};
        }
        if (!row.division) {
            // do nothing
        } else if (acc[row.department][row.division]){
            acc[row.department][row.division]['count'] ++;
            acc[row.department][row.division]['average'] = acc[row.department][row.division]['average'] + (Number(row.annual_base_pay) - acc[row.department][row.division]['average']) / (acc[row.department][row.division]['count']);

        } else {
            acc[row.department][row.division] = {};
            acc[row.department][row.division]['average'] = Number(row.annual_base_pay);
            acc[row.department][row.division]['count'] = 1;
        }
        return acc
    }, {})
    //console.log(dataProcessed)
    console.log(dataProcessed)
    return dataProcessed
    //let dataFormatted = {departments:Object.keys(dataProcessed), values:Object.values(dataProcessed)};
    // console.log(dataFormatted.departments)
    // console.log(dataFormatted.values)
    //renderChart1(dataFormatted)
}

// define getdata1 as async function
// use await in createDropDown

async function createDropDown() {
    let thingy = await getData1Async()
    console.log(thingy);
    doThing();
}



function doThing() {
    console.log('woooow')
}

/// Problem: getData() must return something OUTSIDE of the .then() method in order for "async" to work in 
/// createDropDown(). But it can't??


// //         let departmentNames = Object.keys(dataProcessed);
// //         var select = document.getElementById("selectNumber");
    
// //         for(var i = 0; i < departmentNames.length; i++) {
// //             var opt = departmentNames[i];
// //             var el = document.createElement("option");
// //             el.textContent = opt;
// //             el.value = opt;
// //             select.appendChild(el);
// //         }
// //     })
// // }



// function renderChart() {
//     var myChart = Highcharts.chart('container', {
//         chart: {
//             type: 'bar'
//         },
//         title: {
//             text: 'Fruit Consumption'
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Oranges']
//         },
//         yAxis: {
//             title: {
//                 text: 'Fruit eaten'
//             }
//         },
//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }]
//     });
// };

function renderChart1(dataFormatted) {
    let departmentValues = dataFormatted.departments;
    let numberValues = dataFormatted.values;
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'DIFFERENT CHART'
        },
        xAxis: {
            categories: departmentValues
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: numberValues
        }]
    });
};