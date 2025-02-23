import { ReactNode } from "react";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { AdminHeaderContainer, AdminMenubarContainer } from "../container/AdminLayoutContainer";

type AdminLayoutProps = {
  pageName: string;
  mainContents: ReactNode;
}

export const AdminLayout = ({ pageName, mainContents }: AdminLayoutProps) => {
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useDisclosure();
  return (
    <Flex direction="column" height="100vh">
      <AdminHeaderContainer onMenuToggle={onMenuToggle} />
      <Flex flex="1" overflow="hidden" >
        <AdminMenubarContainer isMenuOpen={isMenuOpen} />
        <Box flex="1" p={{ base: 4, md: 8 }} bg="gray.100" overflowY="auto">
          <Heading mb={4} size="md">{pageName}</Heading>
          {mainContents}
        </Box>
      </Flex>
    </Flex>
  );
};