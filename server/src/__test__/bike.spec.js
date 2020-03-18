const supertest = require( 'supertest');

const data =require( '../../src/index.ts');

describe("Testing the movies API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(data).get('/');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);

	});

});