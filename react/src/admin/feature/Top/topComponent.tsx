import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { AdminLayoutComponent } from "../AdminLayout/adminLayoutComponent";
import { ErrorComponent } from "../ErrorPage/errorComponent";
import { ReserveListComponent } from "./reserveListComponent";
import { useGetReserves } from "@/admin/api/Reserve/getReserves";
import { useGetReservesCount } from "@/admin/api/Reserve/getReservesCount";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const TopComponent = () => {
  const navigate = useNavigate();
  const nowDateTime = new Date();
  const startDateTime = format(
    new Date(nowDateTime.getTime() - 30 * 60 * 1000),
    "yyyy-MM-dd HH:mm",
  );
  const endDateTime = format(
    new Date(nowDateTime.getTime() + 30 * 60 * 1000),
    "yyyy-MM-dd HH:mm",
  );

  const {
    reserves: currentReserves,
    isLoading: currentIsLoading,
    error: currentError,
  } = useGetReserves({
    period_criteria: {
      start_date_time: startDateTime,
      end_date_time: format(nowDateTime, "yyyy-MM-dd HH:mm"),
    },
    page: "1",
    limit: "6",
  });
  const {
    reserves: nextReserves,
    isLoading: nextIsLoading,
    error: nextError,
  } = useGetReserves({
    period_criteria: {
      start_date_time: format(nowDateTime, "yyyy-MM-dd HH:mm"),
      end_date_time: endDateTime,
    },
    page: "1",
    limit: "6",
  });

  const {
    dailyReserveCountPerHour,
    weeklyReserveCountPerDay,
    monthlyReserveCountPerDay,
    isLoading: getCountIsLoading,
    error: getCountError,
  } = useGetReservesCount({
    date_time: format(new Date(), "yyyy-MM-dd HH:mm"),
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const dailyLabels = dailyReserveCountPerHour.map((item) =>
    format(parseISO(item.dateTime), "HH:mm"),
  );
  const dailyData = dailyReserveCountPerHour.map((item) => item.count);

  const weeklyLabels = weeklyReserveCountPerDay.map(
    (item) => format(parseISO(item.dateTime), "eee", { locale: ja }), // 曜日 (例: "月", "火")
  );
  const weeklyData = weeklyReserveCountPerDay.map((item) => item.count);

  const monthlyLabels = monthlyReserveCountPerDay.map((item) =>
    format(parseISO(item.dateTime), "d日"),
  );
  const monthlyData = monthlyReserveCountPerDay.map((item) => item.count);

  const dailyGraphData = {
    labels: dailyLabels,
    datasets: [
      {
        label: "予約数 (時間別)",
        data: dailyData,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };
  const weeklyGraphData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: "予約数 (曜日別)",
        data: weeklyData,
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };
  const monthlyGraphData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "予約数 (日別)",
        data: monthlyData,
        fill: false,
        borderColor: "purple",
        tension: 0.1,
      },
    ],
  };

  if (currentIsLoading || nextIsLoading || getCountIsLoading)
    return <LoadingSpinner />;
  if (currentError || nextError || getCountError) return <ErrorComponent />;

  return (
    <AdminLayoutComponent pageName={"TOP"}>
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">ダッシュボード</Heading>
          <Button
            onClick={() => navigate("/reserve/create")}
            leftIcon={<AddIcon />}
            colorScheme="blue"
            size="md"
            borderRadius="full"
            boxShadow="md"
          >
            予約新規登録
          </Button>
        </Flex>

        <VStack spacing={8} align="stretch">
          <ReserveListComponent
            reserves={currentReserves}
            headerText={"今の時間帯の予約一覧"}
          ></ReserveListComponent>
          <ReserveListComponent
            reserves={nextReserves}
            headerText={"次の時間帯の予約一覧"}
          ></ReserveListComponent>

          <Divider />

          <Box>
            <Flex gap={4} mb={4} flexWrap="wrap">
              <Box
                flex="1"
                minW="300px"
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="md" mb={4}>
                  当日の予約数推移
                </Heading>
                <Line data={dailyGraphData} options={options} />
              </Box>

              <Box
                flex="1"
                minW="300px"
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="md" mb={4}>
                  1週間の予約数推移
                </Heading>
                <Line data={weeklyGraphData} options={options} />
              </Box>
            </Flex>

            <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
              <Heading size="md" mb={4}>
                1か月の予約数推移
              </Heading>
              <Line data={monthlyGraphData} options={options} />
            </Box>
          </Box>
        </VStack>
      </Box>
    </AdminLayoutComponent>
  );
};
