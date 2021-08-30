
fetch("/disapprovedAppStat")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const allDatas = data.disapprovedapps;
    
    let datas = [];
    let days = [];
    for (let i = 0; i < allDatas.length; i++) {
      console.log(moment(allDatas[i].createdAt).format("Do dddd"));
      days.push(moment(allDatas[i].createdAt).format("Do dddd"));
      datas.push(allDatas[i].count);
      if (
        moment(allDatas[i].createdAt).format("Do dddd") ==
        moment(allDatas[i++].createdAt).format("Do dddd")
      ) {
        days.push(moment(allDatas[i].createdAt).format("Do dddd"));
        datas.push(allDatas[i].count + allDatas[i++].count);
      } else {
        days.push(moment(allDatas[i].createdAt).format("Do dddd"));
        datas.push(allDatas[i].count);
      }
    }
    console.log(days);
    console.log(datas);

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
