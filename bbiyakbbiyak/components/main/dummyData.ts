// export const dummyData = Array.from({ length: 10 }, (_, index) => ({
//   id: (index + 1).toString(), // 1부터 시작하여 문자열로 변환
//   titles: Array.from({ length: 3 }, (_, index) => ({
//     id: (index + 1).toString(),
//     title: 'aaa'
//   })),
//   time: '오전 8:00'
// }));
// 더미 데이터 타입 정의
interface Title {
  id: string;
  title: string;
}

interface DummyDataItem {
  id: string;
  titles: Title[];
  time: string;
}

// 더미 데이터 생성
export const dummyData: DummyDataItem[] = Array.from({ length: 3 }, (_, index) => ({
  id: (index + 1).toString(),
  titles: Array.from({ length: 3 }, (_, titleIndex) => ({
    id: (titleIndex + 1).toString(),
    title: `Title ${titleIndex + 1}` // 제목을 다르게 설정
  })),
  time: '오전 8:00'
}));
