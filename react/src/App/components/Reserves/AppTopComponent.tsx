import { useState } from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Button,
  Grid,
  GridItem,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useGetReserveAvailableDates } from "../../api/UseGetReserveAvailableDates"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../../../components/LoadingSpinnerComponent"
import { getRoutePath, routePath } from "../../../enums/routePath"
import { useAppSettingsRecoil } from "../../recoils/AppSettingsRecoil"
import { useAppUuidRecoil } from "../../recoils/AppUuidRecoil"

export function AppTopComponent() {
  const { appUuid } = useAppUuidRecoil()
  const navigate = useNavigate()
  const { appSettings } = useAppSettingsRecoil()

  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const { availableDates, isLoading, error } = useGetReserveAvailableDates(appUuid, { date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}` })
  const reserveMonthsLimit = Number(appSettings.reserveMonthsLimit)

  if (isLoading) return <LoadingSpinner />
  if (error) navigate(getRoutePath(routePath.AppErrorPage, appUuid))

  const getDateFormat = (currentDate: Date, day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const handleDateClick = (day: number) => {
    const dateString = getDateFormat(currentDate, day)
    if (isDateAvailable(day)) {
      setSelectedDate(dateString)
      navigate(getRoutePath(routePath.AppReserveCreate, appUuid))
    }
  }

  const handleMonthChange = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + increment)
      return newDate
    })
  }

  // 日付が有効か
  const isDateAvailable = (day: number) => {
    const dateString = getDateFormat(currentDate, day)
    return availableDates.some(availableDate => availableDate.date === dateString);
  }

  // 営業しているが予約が開いていない
  const isDateNotEmpty = (day: number) => {
    const dateString = getDateFormat(currentDate, day)
    return availableDates.some(availableDate => (availableDate.date === dateString) && (!availableDate.available));
  }

  return (
    <ChakraProvider>
      <Box maxWidth="md" margin="auto" mt={8} p={{ base: 2, md: 6 }} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
        <VStack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center">
            予約日選択
          </Heading>
          <Flex justifyContent="space-between" width="100%" alignItems="center">
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handleMonthChange(-1)}
              aria-label="前の月"
              size="sm"
              isDisabled={currentDate <= today} // 今日以前には戻れない
            />
            <Heading as="h2" size="md">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </Heading>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handleMonthChange(1)}
              aria-label="次の月"
              size="sm"
              isDisabled={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1) > new Date(today.getFullYear(), today.getMonth() + reserveMonthsLimit)}
            />
          </Flex>
          <Grid templateColumns="repeat(7, 1fr)" gap={1}>
            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
              <GridItem key={day} textAlign="center" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                {day}
              </GridItem>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <GridItem key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isAvailable = isDateAvailable(day)
              const isNotEmpty = isDateNotEmpty(day)
              const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

              // 予約可能期間の終了日
              const maxReserveDate = new Date(today)
              maxReserveDate.setMonth(today.getMonth() + reserveMonthsLimit)

              const isPastDate = targetDate.getTime() < today.setHours(0, 0, 0, 0)
              const isOverReserveLimit = targetDate.getTime() > maxReserveDate.getTime()

              return (
                <GridItem key={day}>
                  <Button
                    onClick={() => handleDateClick(day)}
                    colorScheme={selectedDate === getDateFormat(currentDate, day) ? "blue" : "gray"}
                    width={{ base: "35px", md: "30px" }}
                    py={1}
                    isDisabled={!isAvailable || isNotEmpty || isPastDate || isOverReserveLimit}
                    aria-label={`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${day}日`}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {day}
                    {isNotEmpty ? (
                      <Text color="red" fontSize="sm">×</Text>
                    ) : (
                      <Text fontSize="sm">&nbsp;</Text>
                    )}
                  </Button>
                </GridItem>
              )
            })}
          </Grid>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
