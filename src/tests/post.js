import {describe,test,expect} from '@jest/globals';
import request from "supertest";
import PostModel  from "../models/post.model.js";

const ROUTES_SIGN_IN = '/api/sign-in';
const ROUTES_GET_ALL_POST = '/api/get-all-post';
const ROUTES_ADD_POST = '/api/add-post'
const ROUTES_DELETE_POST = '/api/delete-post'


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
        })
    })

    describe("Test get all post no permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan12@gmail.com",
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

    describe("Test add post have permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })

        test('Add post done', async () => {
            const response = await request(app).post(ROUTES_ADD_POST).set('Authorization', `Bearer ${token}`).send({
                authorId: 2,
                title: "TestPost",
                slug: "Slug Post"
            });
            expect(response.statusCode).toEqual(201);
        })
    })

    describe("Test add post no permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })
    
        test('Add post when no permission', async () => {
            const response = await request(app).post(ROUTES_ADD_POST).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(403);
        })
    })

    describe("Test delete post have permission", () => {

        test('Sign-in done', async () => {
            const response = await request(app).post(ROUTES_SIGN_IN).send({
                email: "luan1@gmail.com",
                password: "1234567"
            });
            token = response.body.data;
            expect(response.statusCode).toEqual(200);
        })

        test('Delete post done', async () => {
            const result = await PostModel.addPost(2,"Test Post", "Slug", new Date());
            const insertId = result.insertId;
            const response = await request(app).delete(ROUTES_DELETE_POST+`/${insertId}`).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(200);
        })
    })

}