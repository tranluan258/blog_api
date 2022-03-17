import {describe,test,expect} from '@jest/globals';
import request from "supertest";

const ROUTES_ADD_PERMISSION = '/api/add-permission';
const ROUTES_DELETE_PERMISSION = '/api/delete-permission';

export default (app) => {
    describe("Test add permission", () => {
        test('Add permission done', async () => {
            const response = await (await request(app).post(ROUTES_ADD_PERMISSION)).send({
                userId : 3,
                permissionId: 3,
            });
            expect(response.statusCode).toEqual(201);
        })
    
        test('Add permission failed', async () => {
            // Duplicate data
            const response = await request(app).post(ROUTES_ADD_PERMISSION).send({
                userId: 2,
                permissionId: 2
            });
            expect(response.statusCode).toEqual(500);
        })
    })
    
    describe("Test delete permission", () => {
        test('Delete permission done', async () => {
            const response = await (await request(app).delete(ROUTES_DELETE_PERMISSION)).send({
                userId : 3,
                permissionId: 3,
            });
            expect(response.statusCode).toEqual(200);
        })
    })
}