import { format } from "date-fns";
import { useGetReserves } from "../services/ReserveService/UseGetReserves";
import { LoadingSpinner } from "./LoadingSpinnerComponent";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { Line } from "react-chartjs-2";
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
import { reserveStatus } from "../enums/reserveStatus";
import { routePath } from "../enums/routePath";
import { useReserveUpdateStatusForm } from "../container/Reserves/ReserveUpdateStatusFormContainer";
import { Reserve } from "../types/Reserve";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const graphData = {
  labels: ["月", "火", "水", "木", "金", "土", "日"],
  datasets: [
    {
      label: "予約数",
      data: [12, 19, 3, 5, 2, 3, 7],
      fill: false,
      borderColor: "blue",
      tension: 0.1,
    },
  ],
};

export const TopContents = () => {
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

  if (currentIsLoading || nextIsLoading) return <LoadingSpinner />;
  if (currentError || nextError) return <div>Error reserves</div>;

  return (
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
        <ReserveList
          reserves={currentReserves}
          headerText={"今の時間帯の予約一覧"}
        ></ReserveList>
        <ReserveList
          reserves={nextReserves}
          headerText={"次の時間帯の予約一覧"}
        ></ReserveList>

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
              <Line data={graphData} />
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
              <Line data={graphData} />
            </Box>
          </Flex>

          <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={4}>
              1か月の予約数推移
            </Heading>
            <Line data={graphData} />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

type ReserveListProps = {
  headerText: string;
  reserves: Reserve[];
};

const ReserveList = ({ headerText, reserves }: ReserveListProps) => {
  const navigate = useNavigate();
  const { onSubmit } = useReserveUpdateStatusForm();

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Heading size="md" mb={4}>
        {headerText}
      </Heading>
      {reserves.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {reserves.map((reserve) => {
            return (
              <Box
                key={reserve.id}
                position="relative"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                bg={
                  reserve.status == reserveStatus.Complete
                    ? "gray.400"
                    : "white"
                }
                borderColor="gray.300"
                boxShadow="md"
                _hover={{ boxShadow: "lg", borderColor: "blue.400" }}
              >
                <Flex align="center">
                  <Checkbox
                    mr={3}
                    colorScheme="blue"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      onSubmit(reserve.id, e.target.checked);
                      window.location.reload();
                    }}
                    isChecked={reserve.status == reserveStatus.Complete}
                  />

                  <Stack
                    spacing={0}
                    flex="1"
                    cursor="pointer"
                    onClick={() =>
                      navigate(
                        routePath.ReserveDetail.replace(
                          ":reserveId",
                          String(reserve.id),
                        ),
                      )
                    }
                  >
                    <Text fontSize="md">
                      名前: {reserve.name} 人数: {reserve.guestNumber} 人
                    </Text>
                    <Text fontSize="md">予約番号: {reserve.reserveId}</Text>
                  </Stack>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        <Text color="gray.500">予約はありません</Text>
      )}
    </Box>
  );
};
