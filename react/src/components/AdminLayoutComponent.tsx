import { ReactNode } from "react";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import {
  AdminHeaderContainer,
  AdminMenubarContainer,
} from "../container/AdminLayoutContainer";

type AdminLayoutProps = {
  pageName: string;
  mainContents: ReactNode;
};

export const AdminLayout = ({ pageName, mainContents }: AdminLayoutProps) => {
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useDisclosure();
  return (
    <Flex direction="column" height="100vh">
      <AdminHeaderContainer onMenuToggle={onMenuToggle} />
      <Flex flex="1" overflow="hidden">
        <AdminMenubarContainer isMenuOpen={isMenuOpen} />
        <Flex
          p={{ base: 4, md: 8 }}
          bg="gray.100"
          overflowY="auto"
          w="100%"
          justify="center"
        >
          <Flex w="100%">
            <Box flexShrink={0} width="100%" maxW="1200px">
              <Heading mb={4} size="md">
                {pageName}
              </Heading>
              {mainContents}
            </Box>
            <Box
              flexShrink={0}
              w="250px"
              bg="gray.100"
              p={{ base: 2, md: 4 }}
              display={{ base: "none", md: "block" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
