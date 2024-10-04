import TodayAlarmContainer from "../molecules/TodayAlarmContainer";

const Medicine = () => (
  <>
    <TodayAlarmContainer title='오늘 먹을 약' />
  </>
)

const Drink = () => (
  <>
    <TodayAlarmContainer title='????' />
  </>
)

const Etc = () => (
  <>
    <TodayAlarmContainer title='기타 알림' />
  </>
)

export { Medicine, Drink, Etc }