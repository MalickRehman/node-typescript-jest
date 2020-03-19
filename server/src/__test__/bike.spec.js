const supertest = require( 'supertest');
let app =require( '../../src/server.ts');

describe("Testing the movies API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/');
		if(response)
		{
			expect(response.status).toBe(200);
		}
	},30000);

});