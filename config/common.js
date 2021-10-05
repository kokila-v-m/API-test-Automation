import supertest from "supertest";
import env from '../config/env';
const request = supertest(env.baseUrl);

export default request;