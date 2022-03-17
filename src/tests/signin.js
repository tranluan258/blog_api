import {describe,test,expect} from '@jest/globals';
import request from "supertest";

const ROUTES_SIGN_IN = '/api/sign-in';

export default (app) => {
    describe('Test sign-in', () => {
        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            expect(response.statusCode).toEqual(200);
        })
    
        test('Sign-in failed', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan111@gmail.com",
                password: "1234567"
            });
    
            expect(response.body.message).toEqual("Login failed");
        })
    })
}