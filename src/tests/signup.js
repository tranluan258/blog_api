import {describe,test,expect} from '@jest/globals';
import request from "supertest";
import casual from 'casual';

const ROUTES_SIGN_UP = '/api/sign-up';

export default (app) => {
    describe('Test sign-up', () => {
        test('Sign-up done', async () => {
            const response = await request(app).post(ROUTES_SIGN_UP).send({
                email: casual.email,
                password: "1234567"
            });
            expect(response.statusCode).toEqual(201);
        })
    
        test('Sign-in failed', async () => {
            //email unique
            const response = await request(app).post(ROUTES_SIGN_UP).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
    
            expect(response.statusCode).toEqual(500);
        })
    })
    
}