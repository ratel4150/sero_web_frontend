import React from "react";
import Chart from "react-apexcharts";


const StackedAreaChart = ({ adeudos, pagos }) => {
  const categories = adeudos.map((item) => item.fechaActualizacion);
  const seriesAdeudo = adeudos.map((item) => item.montoAdeudo);
  const seriesPagos = pagos?.map((item) => item.montoPagado);

  const chartOptions = {
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Monto",
      },
    },
    stroke: {

      width: 1,
    },
  };

  const chartSeries = [
    {
      name: "Adeudo",
      data: seriesAdeudo,
      color: "#ff6384"

    },
    {
      name: "Pagos",
      data: seriesPagos,
      color: "#48bd98"
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      height={350}
    />
  );
};

export default StackedAreaChart;
