export const dummyData = Array.from({ length: 10 }, (_, index) => ({
  id: (index + 1).toString(), // 1부터 시작하여 문자열로 변환
  titles: Array.from({ length: 5 }, (_, index) => ({
    id: (index + 1).toString(),
    title: 'aaa'
  })),
  time: '오전 8:00'
}));
