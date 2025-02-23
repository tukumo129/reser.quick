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
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useGetReserveAvailableDates } from "../../api/UseGetReserveAvailableDates"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingSpinner } from "../../../components/LoadingSpinnerComponent"
import { routePath } from "../../../enums/routePath"


export function AppCreateReserveComponent() {
  const { uuid } = useParams()
  const navigate = useNavigate()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const { availableDates, isLoading, error } = useGetReserveAvailableDates(String(uuid), { date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}` })

  if (isLoading) return <LoadingSpinner />
  if (error) navigate(routePath.AppErrorPage)


  const getDateFormat = (currentDate: Date, day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const handleDateClick = (day: number) => {
    const dateString = getDateFormat(currentDate, day)
    if (isDateAvailable(day)) {
      setSelectedDate(dateString)
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
    return availableDates && availableDates.includes(dateString)
  }

  return (
    <ChakraProvider>
      <Box maxWidth="md" margin="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
        <VStack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center">
            予約日選択
          </Heading>
          <Flex justifyContent="space-between" width="100%" alignItems="center">
            <Button onClick={() => handleMonthChange(-1)} aria-label="前の月">
              <ChevronLeftIcon />
            </Button>
            <Heading as="h2" size="md">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </Heading>
            <Button onClick={() => handleMonthChange(1)} aria-label="次の月">
              <ChevronRightIcon />
            </Button>
          </Flex>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
              <GridItem key={day} textAlign="center" fontWeight="bold">
                {day}
              </GridItem>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <GridItem key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isAvailable = isDateAvailable(day)
              return (
                <GridItem key={day}>
                  <Button
                    onClick={() => handleDateClick(day)}
                    colorScheme={selectedDate === getDateFormat(currentDate, day) ? "blue" : "gray"}
                    width="100%"
                    isDisabled={!isAvailable}
                    aria-label={`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${day}日`}
                  >
                    {day}
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