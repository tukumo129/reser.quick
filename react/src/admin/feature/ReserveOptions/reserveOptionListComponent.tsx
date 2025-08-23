import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/enums/routePath";
import { ReserveOption } from "@/types/ReserveOption";

type ReserveOptionListComponentProps = {
  reserveOptions: ReserveOption[];
};

export const ReserveOptionListComponent = ({
  reserveOptions,
}: ReserveOptionListComponentProps) => {
  const navigate = useNavigate();

  return reserveOptions.length === 0 ? (
    <Box
      bg="yellow.100"
      p={4}
      borderRadius="md"
      textAlign="center"
      role="alert"
    >
      <Text fontWeight="bold" color="gray.600">
        予約オプションがありません
      </Text>
    </Box>
  ) : (
    <Box p={8} bg="white">
      <Table variant="simple" fontSize="lg">
        <Thead>
          <Tr>
            <Th fontSize="lg">ID</Th>
            <Th fontSize="lg">オプション名</Th>
            <Th fontSize="lg">予約枠時間</Th>
            <Th isNumeric fontSize="lg">
              金額
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {reserveOptions.map((reserveOption) => (
            <Tr
              key={reserveOption.id}
              onClick={() =>
                navigate(
                  routePath.ReserveOptionDetail.replace(
                    ":reserveOptionId",
                    String(reserveOption.id),
                  ),
                )
              }
              _hover={{
                background: "gray.300",
                transition: "background 0.2s ease",
              }}
              cursor="pointer"
              borderBottom="1px solid"
              borderColor="gray.500"
            >
              <Td>{reserveOption.id}</Td>
              <Td>{reserveOption.name}</Td>
              <Td>{reserveOption.slotTime}</Td>
              <Td isNumeric>{reserveOption.price.toLocaleString()} 円</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
