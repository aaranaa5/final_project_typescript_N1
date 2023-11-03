import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  mongo: {
    uri: string;
  };
  server: {
    port: number;
  };
}

export const config: Config = {
  mongo: {
    uri: process.env.MONGO_URI,
  },
  server: {
    port: parseInt(process.env.PORT),
  },
};
