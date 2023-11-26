import Mock from 'mockjs';

// mock 只能劫持 xhr，不能劫持 fetch
Mock.mock('/api/test', 'get', () => {
  return {
    code: 0,
    data: { date: Date.now() },
    message: 'hello world!',
  };
});
