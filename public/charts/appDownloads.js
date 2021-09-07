// // Set new default font family and font color to mimic Bootstrap's default styling
// fetch("/chartData")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const allDatas = data.data;
//     console.log(allDatas[0].sleepDuration);
//     let datas = [];
//     for (let i = 0; i < allDatas.length; i++) {
//       datas.push(allDatas[i].sleepDuration);
//     }
//     console.log(datas[0]);

//     (Chart.defaults.global.defaultFontFamily = "Nunito"),
//       '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//     Chart.defaults.global.defaultFontColor = "#858796";

//     var ctx = document.getElementById("myAreaChart");
//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
//         datasets: [
//           {
//             label: "Day Time",
//             lineTension: 0.3,
//             backgroundColor: "rgba(78, 115, 223, 0.5)",
//             borderColor: "rgba(78, 115, 223, 1)",
//             pointRadius: 3,
//             pointBackgroundColor: "rgba(78, 115, 223, 1)",
//             pointBorderColor: "rgba(78, 115, 223, 1)",
//             pointHoverRadius: 3,
//             pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//             pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//             pointHitRadius: 10,
//             pointBorderWidth: 2,
//             data: datas,
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         layout: {
//           padding: {
//             left: 10,
//             right: 25,
//             top: 25,
//             bottom: 0,
//           },
//         },
//         scales: {
//           xAxes: [
//             {
//               time: {
//                 unit: "date",
//               },
//               gridLines: {
//                 display: false,
//                 drawBorder: false,
//               },
//               ticks: {
//                 maxTicksLimit: 7,
//               },
//             },
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 maxTicksLimit: 5,
//                 padding: 10,
//               },
//               gridLines: {
//                 color: "rgb(234, 236, 244)",
//                 zeroLineColor: "rgb(234, 236, 244)",
//                 drawBorder: false,
//                 borderDash: [2],
//                 zeroLineBorderDash: [2],
//               },
//             },
//           ],
//         },
//         legend: {
//           display: false,
//         },
//         tooltips: {
//           backgroundColor: "rgb(255,255,255)",
//           bodyFontColor: "#858796",
//           titleMarginBottom: 10,
//           titleFontColor: "#6e707e",
//           titleFontSize: 14,
//           borderColor: "#dddfeb",
//           borderWidth: 1,
//           xPadding: 15,
//           yPadding: 15,
//           displayColors: false,
//           intersect: false,
//           mode: "index",
//           caretPadding: 10,
//         },
//       },
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ---------------------------------------------------------

    fetch("/chartDownloadData")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const allDatas = data.data;
           // console.log(allDatas[0].sleepDuration);
            let datas = [];
            for (let i = 0; i < allDatas.length; i++) {
                datas.push(allDatas[i].sleepDuration);
            }
          //  console.log(datas[0]);

            var barChartCanvas = document.getElementById("barChart").getContext("2d");

            var barChartCanvas = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Digital Goods",
                        backgroundColor: "rgba(60,141,188,0.9)",
                        borderColor: "rgba(60,141,188,0.8)",
                        pointRadius: false,
                        pointColor: "#3b8bba",
                        pointStrokeColor: "rgba(60,141,188,1)",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(60,141,188,1)",
                        data: [28, 48, 40, 19, 86, 27, 90],
                    },
                    {
                        label: "Electronics",
                        backgroundColor: "rgba(210, 214, 222, 1)",
                        borderColor: "rgba(210, 214, 222, 1)",
                        pointRadius: false,
                        pointColor: "rgba(210, 214, 222, 1)",
                        pointStrokeColor: "#c1c7d1",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40],
                    },
                ],
            };

            var areaChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                },
            };

            // This will get the first returned node in the jQuery collection.
            new Chart(barChartCanvas, {
                type: "line",
                data: areaChartData,
                options: areaChartOptions,
            });
        });

