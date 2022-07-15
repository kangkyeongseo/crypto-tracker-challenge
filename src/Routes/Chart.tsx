import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { getCoinHistory, ICoinHistory } from "../api";
import { IOutletContext } from "./Price";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

function Chart() {
  const { coinId } = useOutletContext<IOutletContext>();
  const { data, isLoading } = useQuery<ICoinHistory[]>(
    ["history", coinId],
    () => getCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      {isLoading ? null : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((info) => {
                return {
                  x: new Date(Number(info.time_open) * 1000),
                  y: [info.open, info.high, info.low, info.close],
                };
              }) as any,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: isDark ? "2c3e50" : "ecf0f1",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
