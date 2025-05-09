import { ReactNode } from "react";
import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { getRoutePath, routePath } from "../../enums/routePath";
import { useNavigate } from "react-router-dom";
import { useAppUuidRecoil } from "../recoils/AppUuidRecoil";
import { useAppSettingsRecoil } from "../recoils/AppSettingsRecoil";

type AppLayoutProps = {
  pageName: string;
  mainContents: ReactNode;
};

export const AppLayout = ({ pageName, mainContents }: AppLayoutProps) => {
  const { appUuid } = useAppUuidRecoil();
  const { appSettings } = useAppSettingsRecoil();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" height="100vh">
      <Box
        bg="yellow.300"
        p={4}
        height={16}
        color="black"
        borderBottom="1px"
        borderColor="yellow.500"
        display="flex"
        alignItems="center"
        textAlign={isMobile ? "center" : "left"}
      >
        <Heading
          flex="1"
          size="lg"
          onClick={() => navigate(getRoutePath(routePath.AppTop, appUuid))}
        >
          {appSettings.storeName}
        </Heading>
      </Box>
      <Box flex="1" p={{ base: 4, md: 8 }} bg="gray.100" overflowY="auto">
        <Heading mb={4} size="md" textAlign={isMobile ? "center" : "left"}>
          {pageName}
        </Heading>
        <Box flex="1">{mainContents}</Box>
      </Box>
    </Flex>
  );
};
