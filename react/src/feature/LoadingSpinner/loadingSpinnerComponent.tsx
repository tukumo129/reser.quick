import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Flex justify="center" align="center" height="100%">
      <Spinner
        thickness="4px"
        speed="1s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Flex>
  );
};
