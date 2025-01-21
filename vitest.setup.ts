// handle unhandled promise rejections / errors
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  // console.log('FAILED TO HANDLE PROMISE REJECTION', reason);
  // throw reason;
  return;
});

export default {};