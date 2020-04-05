export const getChartOptions = (minDate: number) => ({
    chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
            autoScaleYaxis: true
        }
    },
    annotations: {
        yaxis: [
            {
                y: 30,
                borderColor: "#999",
                label: {
                    show: true,
                    text: "",
                    style: {
                        color: "#fff",
                        background: "#00E396"
                    }
                }
            }
        ],
        xaxis: [
            {
                x: new Date(minDate).getTime(),
                borderColor: "#999",
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: "",
                    style: {
                        color: "#fff",
                        background: "#775DD0"
                    }
                }
            }
        ]
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
        style: "hollow"
    },
    xaxis: {
        type: "datetime",
        min: new Date(minDate).getTime(),
        tickAmount: 1
    },
    tooltip: {
        x: {
            format: "dd MMM yyyy"
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    }
});
