declare const process: {
  env: {
    MODE: 'debug' | 'test' | 'production';
    PLATFORM: 'Web' | 'H5' | 'App' | 'PC';
    HOST: string;
    NODE_ENV: 'development' | 'production';
  };
};
