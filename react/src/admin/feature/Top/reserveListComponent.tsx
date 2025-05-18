import {
  Box,
  Checkbox,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
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
import { useNavigate } from "react-router-dom";
import { useUpdateReserveStatusForm } from "../Reserves/updateReserveStatusFormContainer";
import { reserveStatus } from "@/enums/reserveStatus";
import { routePath } from "@/enums/routePath";
import { Reserve } from "@/types/Reserve";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type ReserveListProps = {
  headerText: string;
  reserves: Reserve[];
};

export const ReserveListComponent = ({
  headerText,
  reserves,
}: ReserveListProps) => {
  const navigate = useNavigate();
  const { onSubmit, isLoading } = useUpdateReserveStatusForm();

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
                    isDisabled={isLoading}
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
