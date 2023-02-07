export const dataCharts = [
    {
        name: "Jan",
        storeCustomers: 60,
        onlineCustomers: 40,
        amt: 40
    },
    {
        name: "Jeb",
        storeCustomers: 70,
        onlineCustomers: 45,
        amt: 40
    },
    {
        name: "Mar",
        storeCustomers: 85,
        onlineCustomers: 48,
        amt: 45
    },
    {
        name: "Apr",
        storeCustomers: 100,
        onlineCustomers: 60,
        amt: 65
    },
    {
        name: "May",
        storeCustomers: 130,
        onlineCustomers: 90,
        amt: 92
    },
    {
        name: "Jun",
        storeCustomers: 160,
        onlineCustomers: 70,
        amt: 105
    },
    {
        name: "Jun",
        storeCustomers: 210,
        onlineCustomers: 60,
        amt: 160
    },
    {
        name: "Aug",
        storeCustomers: 266,
        onlineCustomers: 200,
        amt: 210
    },
    {
        name: "Sep",
        storeCustomers: 300,
        onlineCustomers: 198,
        amt: 210
    },
    {
        name: "Oct",
        storeCustomers: 365,
        onlineCustomers: 260,
        amt: 300
    },
    {
        name: "Nov",
        storeCustomers: 410,
        onlineCustomers: 350,
        amt: 400
    },
    {
        name: "Dec",
        storeCustomers: 520,
        onlineCustomers: 499,
        amt: 510
    },
];

export const dataLineChart = {
    series: [
        {
            name: "Buy Product",
            data: [0, 120, 90, 300, 166, 310, 400, 460, 380]
        },
        {
            name: "Sell Product",
            data: [10, 50 , 30, 60, 100, 80, 210, 150, 105]
        }
    ],
    options: {
        colors: ['#ff8084', '#38ada9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            position: 'bottom'
        },
        grid: {
            show: false
        },
        markers: {
            size: [3,5]
        }
    }


}