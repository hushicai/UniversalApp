declare const process: {
  env: {
    MODE: 'debug' | 'test' | 'production';
    TARGET: 'rn' | 'web';
    CONTAINER: 'H5' | 'App' | 'PC';
    HOST: string;
    NODE_ENV: 'development' | 'production';
  };
};
