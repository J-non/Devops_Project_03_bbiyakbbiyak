import TodayAlarmContainer from "../molecules/TodayAlarmContainer";

const Medicine = () => (
  <>
    <TodayAlarmContainer title='오늘 먹을 약' />
  </>
)

const Drink = () => (
  <>
    <TodayAlarmContainer title='오늘 마셔야 할 것' />
  </>
)

const Etc = () => (
  <>
    <TodayAlarmContainer title='기타 알림' />
  </>
)

const CalendarTabs = ({ route: { params: { routeName } } }: any) => {
  return (
    <>
      <TodayAlarmContainer routeName={routeName} />
    </>
  )
}

export { Medicine, Drink, Etc, CalendarTabs }