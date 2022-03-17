import {describe,test,expect} from '@jest/globals';
import request from "supertest";

const ROUTES_SIGN_IN = '/api/sign-in';
const ROUTES_GET_ALL_POST = '/api/get-all-post';


export default (app) => {

    let token = '';
    describe("Test get all post have permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })

        test('Get all post done', async () => {
            const response = await request(app).get(ROUTES_GET_ALL_POST).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body.data).toBeInstanceOf(Array);
        })
    })

    describe("Test get all post no permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })
    
        test('Get all post when no permission', async () => {
            const response = await request(app).get(ROUTES_GET_ALL_POST).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(403);
        })
    })
}