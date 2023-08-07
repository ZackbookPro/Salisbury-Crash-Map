function createDiv() {
    const createChartDiv = document.createElement("canvas")
    createChartDiv.setAttribute("id", "myChart")
    document.getElementById('chart').appendChild(createChartDiv)
}

createDiv()

function createChart(){
    
    const chartie = document.getElementById('myChart');
    
        new Chart(chartie, {
        type: 'bar',
                data: {
                labels: [2020,2021,2022],
                datasets: [
                    {
                    label: 'Injury Crash',
                    data: [injury2020, injury2021, injury2022],
                    backgroundColor: 'rgba(243, 156, 15)',
                    borderWidth: 1
                    },
                    {
                        label: 'Property Damage Crash',
                        data: [prop2020, prop2021, prop2022],
                        backgroundColor: 'rgba(46, 46, 253)'
                    }, 
                    {
                        label: 'Fatal Crash',
                        data: [fatal2020, fatal2021, fatal2022],
                        backgroundColor: 'rgba(253, 46, 46)'
                    }
                ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    
                scales: {
                    y: {
                        ticks: {
                            
                        }
                    
                    }
                }
                }
            });
            console.log('chart created')
    
    
    }
    
    setTimeout(createChart, 300)
    



function resetCanvas() {
    document.querySelector("#myChart")
    var chart =  document.getElementById("myChart")
    chart.remove()
}


function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
