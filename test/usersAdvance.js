require('dotenv').config();
import request from '../config/common';
const faker = require('faker');
import { expect } from "chai";
import { createRandomUser, createRandomUserWithFaker } from "../helper/user-helper";

const TOKEN = process.env.USER_TOKEN;
describe("Users", () => {
  let userId;
  describe("POST", () => {
    it("/users", () => {
      const data = {
        email: `wekaretest-${Math.floor(Math.random() * 555)}@mail.com`,
        name: "wekare",
        gender: "male",
        status: "inactive",
      };
      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
          console.log(userId);
        });
    });
  });
  describe("GET", () => {
    it("/users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });
    it("/users/:id", () => {
      return request
        .get(`users/${userId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(userId);
        });
    });
    it(" /users with query params", () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      });
    });
    it(" /users with query params with pagination", () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.meta.pagination).to.not.be.empty;
        expect(res.body.meta.pagination.page).to.eq(5);
      });
    });
  });
  it("POST /users", () => {
    const data = {
      email: `wekaretest-${Math.floor(Math.random() * 555)}@mail.ca`,
      name: "wekare",
      gender: "male",
      status: "inactive",
    };
    return request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data.email).to.eq(data.email);
        expect(res.body.data.status).to.eq(data.status);
      });
  });
  it("POST /users", () => {
    const data = {
      email: `wekaretest-${Math.floor(Math.random() * 555)}@mail.ca`,
      name: "wekare",
      gender: "male",
      status: "inactive",
    };
    return request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
      });
  });
  describe("PUT", () => {
    it("PUT /users/ :id", () => {
      const data = {
        status: "active",
        name: `wekare -${Math.floor(Math.random() * 555)}`,
      };
      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });
  describe("DELETE", () => {
    it("DELETE /users/ :id", () => {
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
});
