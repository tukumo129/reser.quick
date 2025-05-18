import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettingsRecoil } from "@/app/recoils/AppSettingsRecoil";
import { useAppUuidRecoil } from "@/app/recoils/AppUuidRecoil";
import { getRoutePath, routePath } from "@/enums/routePath";

type AppLayoutProps = {
  pageName: string;
  children: ReactNode;
};

export const AppLayoutComponent = ({ pageName, children }: AppLayoutProps) => {
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
        <Box flex="1">{children}</Box>
      </Box>
    </Flex>
  );
};
