import {describe,test,expect} from '@jest/globals';
import request from "supertest";

const ROUTES_SIGN_IN = '/api/sign-in';
const ROUTES_GET_ALL_CATEGORY = '/api/get-all-category';
const ROUTES_ADD_CATEGORY = '/api/add-category';


export default (app) => {
    let token = ''
    describe("Test get all category have permission", () => {
        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })

        test('Get all category done', async () => {
            const response = await request(app).get(ROUTES_GET_ALL_CATEGORY).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body.data).toBeInstanceOf(Array);
        })
    })

    describe("Test get all category no permission", () => {
        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan12@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })
        
        test('Get all category when no permission', async () => {
            const response = await request(app).get(ROUTES_GET_ALL_CATEGORY).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(403);
        })
    })


    describe("Test get add category have permission", () => {
        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })

        test('Get all category done', async () => {
            const response = await request(app).post(ROUTES_ADD_CATEGORY).set('Authorization', `Bearer ${token}`).send({
                title: "Java",
                slug: "http://abc.com",
                content : "Test"
            });
            expect(response.statusCode).toEqual(201);
        })
    })

    describe("Test get add category no permission", () => {
        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan12@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })
        
        test('Get all category when no permission', async () => {
            const response = await request(app).get(ROUTES_GET_ALL_CATEGORY).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(403);
        })
    })
}