// fetch("/approvedAppStat")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const approvedAppData = data.approvedapps;
//   //  console.log("===============" + allDatas);

//     let datas = [];
//     let days = [];
//     for (let i = 0; i < approvedAppData.length; i++) {
//       datas.push(i + 1);
//       days.push(moment(approvedAppData[i].createdAt).format("dddd"));
//     }

//     var areaChartCanvas = document.getElementById("barChart").getContext("2d");

//     var areaChartData = {
//       labels: ["days", "jnj", "vyy"],
//       datasets: [
//         {
//           label: "Approved Apps",
//           backgroundColor: "rgba(60,141,188,0.9)",
//           borderColor: "rgba(60,141,188,0.8)",
//           pointRadius: false,
//           pointColor: "#3b8bba",
//           pointStrokeColor: "rgba(60,141,188,1)",
//           pointHighlightFill: "#fff",
//           pointHighlightStroke: "rgba(60,141,188,1)",
//           data: [0, 9, 7],
//         },
//         {
//           label: "Disapproved Apps",
//           backgroundColor: "rgba(210, 214, 222, 1)",
//           borderColor: "rgba(210, 214, 222, 1)",
//           pointRadius: false,
//           pointColor: "rgba(210, 214, 222, 1)",
//           pointStrokeColor: "#c1c7d1",
//           pointHighlightFill: "#fff",
//           pointHighlightStroke: "rgba(220,220,220,1)",
//           data: [65, 59, 80, 81, 56, 55, 40],
//         },
//       ],
//     };

//     var areaChartOptions = {
//       maintainAspectRatio: false,
//       responsive: true,
//       legend: {
//         display: false,
//       },
//       scales: {
//         xAxes: [
//           {
//             gridLines: {
//               display: false,
//             },
//           },
//         ],
//         yAxes: [
//           {
//             gridLines: {
//               display: false,
//             },
//           },
//         ],
//       },
//     };

//     // This will get the first returned node in the jQuery collection.
//     new Chart(areaChartCanvas, {
//       type: "bar",
//       data: areaChartData,
//       options: areaChartOptions,
//     });
//   });
// fetch("/approvedAppStat")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const approvedAppData = data.approvedapps;
//     //  console.log("===============" + allDatas);

//     let datas = [];
//     let days = [];
//     for (let i = 0; i < approvedAppData.length; i++) {
//       datas.push(i + 1);
//       days.push(moment(approvedAppData[i].createdAt).format("dddd"));
//     }

    // var ctx1 = document.getElementById("barChart11").getContext("2d");

    // var barChartCanvas = {
    //   type: "bar",
    //   labels: ["days", "kmk", "jbj"],
    //   datasets: [
    //     {
    //       label: "Approved Apps",
    //       backgroundColor: "rgba(60,141,188,0.9)",
    //       borderColor: "rgba(60,141,188,0.8)",
    //       pointRadius: false,
    //       pointColor: "#3b8bba",
    //       pointStrokeColor: "rgba(60,141,188,1)",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(60,141,188,1)",
    //       data: [0, 9, 7],
    //     },
    //     {
    //       label: "Disapproved Apps",
    //       backgroundColor: "rgba(241, 169, 160, 1)",
    //       borderColor: "rgba(210, 214, 222, 1)",
    //       pointRadius: false,
    //       pointColor: "rgba(210, 214, 222, 1)",
    //       pointStrokeColor: "#c1c7d1",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(220,220,220,1)",
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     },
    //   ],
    // };
    // var areaChartOptions = {
    //   maintainAspectRatio: false,
    //   responsive: true,
    //   legend: {
    //     display: false,
    //   },
    //   scales: {
    //     xAxes: [
    //       {
    //         gridLines: {
    //           display: false,
    //         },
    //       },
    //     ],
    //     yAxes: [
    //       {
    //         gridLines: {
    //           display: false,
    //         },
    //       },
    //     ],
    //   },
    // };

    // // This will get the first returned node in the jQuery collection.
    // new Chart(ctx1, {
    //   type: "bar",
    //   data: barChartCanvas,
    //   options: areaChartOptions,
    // });
  
     fetch("/approvedAppStat")
       .then((response) => {
         return response.json();
       })
       .then((data) => {
         const allDatas = data.approvedapps;
       //  const dateDatas = data.dateData;

         console.log("===============" + allDatas.length);
        
         let datas = [];
         let days = [];
         for (let i = 0; i < allDatas.length; i++) {
           datas.push(allDatas[i].count);
           days.push(moment(allDatas[i].createdAt).format("Do dddd"));
         }
    
         var ctx = document.getElementById("barChart11").getContext("2d");
         new Chart(ctx, {
           type: "bar",
           data: {
             labels: days,
             datasets: [
               {
                 label: days,
                 data: datas,
                 backgroundColor: [
                   "rgba(255, 99, 132, 0.2)",
                   "rgba(54, 162, 235, 0.2)",
                   "rgba(255, 206, 86, 0.2)",
                   "rgba(75, 192, 192, 0.2)",
                   "rgba(153, 102, 255, 0.2)",
                   "rgba(255, 159, 64, 0.2)",
                 ],
                 borderColor: [
                   "rgba(255, 99, 132, 1)",
                   "rgba(54, 162, 235, 1)",
                   "rgba(255, 206, 86, 1)",
                   "rgba(75, 192, 192, 1)",
                   "rgba(153, 102, 255, 1)",
                   "rgba(255, 159, 64, 1)",
                 ],
                 borderWidth: 1,
               },
             ],
           },
           options: {
             scales: {
               y: {
                 beginAtZero: true,
               },
             },
           },
         });
       });
