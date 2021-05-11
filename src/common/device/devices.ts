const devices = {
  iPhoneX: {
    width: 375,
    height: 812,
  },
  iPhoneXR: {
    // 和 iPhone XS Max 同尺寸
    height: 896,
    width: 414,
  },
  // iphone12新增两种尺寸 390 x 844、428 x 926
  // iphone12 mini尺寸为375 x 812，同iphone 11 pro，无需适配
  iPhone12: {
    width: 390,
    height: 844,
  },
  iphone12Max: {
    width: 428,
    height: 926,
  },
};

export default devices;
