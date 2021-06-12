const request = require("supertest");
const index = require("./index");

describe("Subscribe", () => {
    test("should allow user to subscribe when no previous streams started", async () => {
        const response = await request(index).get("/subscribe");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");

        await request(index).get("/unsubscribe");
    });

    test("should allow user to subscribe when 2 previous streams already started", async () => {
        await request(index).get("/subscribe");

        const response = await request(index).get("/subscribe");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");

        await request(index).get("/unsubscribe");
        await request(index).get("/unsubscribe");
    });

    test("should not allow user to subscribe when 3 previous streams already started", async () => {
        await request(index).get("/subscribe");
        await request(index).get("/subscribe");
        await request(index).get("/subscribe");

        const response = await request(index).get("/subscribe");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("failed");

        await request(index).get("/unsubscribe");
        await request(index).get("/unsubscribe");
        await request(index).get("/unsubscribe");
        await request(index).get("/unsubscribe");
    });
});

describe("Unsubscribe", () => {
    test("should allow user to unsubscribe when IP address has at least 1 stream running", async () => {
        await request(index).get("/subscribe");
        const response = await request(index).get("/unsubscribe");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
    });

    test("should not allow user to unsubscribe when IP address has 0 streams running", async () => {
        const response = await request(index).get("/unsubscribe");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("failed");
    });
});
