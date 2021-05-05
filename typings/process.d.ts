declare const process: {
  env: {
    MODE: 'debug' | 'test' | 'production';
    PLATFORM: 'H5' | 'App' | 'PC';
    HOST: string;
    NODE_ENV: 'development' | 'production';
  };
};
