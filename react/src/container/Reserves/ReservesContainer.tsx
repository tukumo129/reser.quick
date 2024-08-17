import { format } from "date-fns";
import { Box, Flex, Text, useBreakpointValue,  Button, useStyleConfig, Select, Stack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { Reserve } from "../../types/Reserve";
import { routePath } from "../../enums/routePath";
import { Pagination } from "../../types/Pagination";

type ReserveListProps = {
  reserves: Reserve[];
}

export const ReserveList = ({ reserves }: ReserveListProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  return (
    reserves.length === 0 ? (
      <Box bg="yellow.200" p={4}role="alert">
        <Text>予約がありません</Text>
      </Box>
    ) : (
      <Box>
        <Flex direction={isMobile ? 'column' : 'row'} wrap="wrap" gap={4}>
          {reserves.map((reserve, index) => (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              key={index}
              cursor="pointer"
              bg="white"
              borderColor="gray.300"
              onClick={() => navigate(routePath.ReserveDetail.replace(':reserveId', String(reserve.id)))}
            >
              <Stack spacing={2}>
                <Text fontWeight="bold">予約番号: {reserve.id}</Text>
                <Text>名前: {reserve.name}</Text>
                <Text>人数: {reserve.guest_number}</Text>
                <Text>
                    予約時間: {`${format(new Date(reserve.start_date_time), 'yyyy/MM/dd HH:mm')} ～ ${format(new Date(reserve.end_date_time), 'yyyy/MM/dd HH:mm')}`}
                </Text>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Box>
    )
  );
}

type PaginationContainerProps = {
  pagination: Pagination;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};
export const PaginationContainer = ({
  pagination,
  setPage,
  limit,
  setLimit,
}: PaginationContainerProps) => {
  const pageNumbers = [];
  pageNumbers.push(1)

  if(pagination.last_page > 1) {
    if (pagination.page > 6) {
      pageNumbers.push("...");
    }
    const startPage = Math.max(2, pagination.page - 5);
    const endPage = Math.min(pagination.last_page - 1, pagination.page + 5);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (pagination.page + 5 < pagination.last_page - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(pagination.last_page);  
  }
  const buttonStyles = useStyleConfig('Button', { variant: 'outline' });

  return (
    <Flex direction="row" align="center" justify="space-between" mt={4} px={{ base: 2, md: 4 }} >
      <Box flex="1" />
      <Flex direction="row" align="center" justify="center" flex="1" gap={2} >
        <Button
          onClick={() => setPage(pagination.page - 1)}
          colorScheme="yellow"
          isDisabled={pagination.page === 1}        
          sx={buttonStyles}
          borderRadius="md"
          variant="solid"
        >
          &lt;
        </Button>
        {pageNumbers.map((number, index) =>
          typeof number === 'number' ? (
            <Button
              key={index}
              onClick={() => setPage(number)}
              colorScheme="yellow"
              bg='yellow.400'
              isDisabled={number === pagination.page}
              sx={buttonStyles}
              borderRadius="md"
              variant={number === pagination.page ? 'solid' : 'outline'}
            >
              {number}
            </Button>
          ) : (
            <Text key={index} px={3} py={1} borderRadius="md" >
              {number}
            </Text>
          )
        )}
        <Button
          onClick={() => setPage(pagination.page + 1)}
          isDisabled={pagination.page === pagination.last_page}
          colorScheme='yellow'
          sx={buttonStyles}
          borderRadius="md"
          variant="solid"
        >
          &gt;
        </Button>
      </Flex>
      <Box flex="1" />
      <Select
        value={limit}
        onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
        borderRadius="md"
        borderColor="gray.300"
        p={2}
        ml={2}
        bg="white"
        w='auto'
      >
        <option value={10}>10件</option>
        <option value={50}>50件</option>
        <option value={100}>100件</option>
      </Select>
    </Flex>
  );
};
