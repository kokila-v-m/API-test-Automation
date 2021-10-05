import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const faker = require('faker');
const TOKEN =
  "7d6a1104205bf995547faa7284010794b62538937348decad674db400e598561";

  export const createRandomUserWithFaker = async() => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        gender: "male",
        status: "inactive",
      };
      const res = await request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(userData)
        console.log(res.body);
        return res.body.data.id;
  
    
}
export const createRandomUser = async() => {
    const userData = {
        email: `wekaretest-${Math.floor(Math.random() * 555)}@mail.com`,
        name: "wekare",
        gender: "male",
        status: "inactive",
      };
      const res = await request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(userData)
        return res.body.data.id;
  
    
}