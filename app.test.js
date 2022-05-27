const request = require("supertest");
const app = require("./app");
// it("should run", () => {});

describe("ToDos list.", () => {
  it("GET /todos ->>> Array of Todoss", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/id ->>> Get Todo by ID", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todos/id ->>> 404 if not found", () => {
    return request(app).get("/todos/99999999").expect(404);
  });

  it("POST /todos ->>> create todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "do dishes",
      })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "do dishes",
            completed: false,
          })
        );
      });
  });

  it("POST /todos ->>> Validate req body", () => {
    return request(app)
      .post("/todos")
      .send({ id: 2, name: 123, completed: false })
      .expect(422);
  });
});
