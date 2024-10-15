import { SolapiMessageService } from 'solapi';

// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
const apiKey = process.env.SOLAPI_API;
const apiSecret = process.env.SOLAPI_API_SECRET;
const messageService = new SolapiMessageService(apiKey, apiSecret);

// 메시지 구성
const message = {
  // 문자 내용 (최대 2,000Bytes / 90Bytes 이상 장문문자)
  text: '[솔라피 문자 테스트] Hello world!',
  // 수신번호 (문자 받는 이)
  to: '01023682587',
  // 발신번호 (문자 보내는 이)
  from: '01023682587',
};

// 메시지 그룹 발송 요청
messageService.sendOne(message).then(console.log).catch(console.error);

// 이것들을 서비스.ts에서 적어야 함.
