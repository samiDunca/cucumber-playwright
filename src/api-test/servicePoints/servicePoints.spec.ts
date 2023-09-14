import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let firstServicePointId = "341c919d-1913-47a4-9259-015ec992f978"
let secondServicePointId = "252e4a31-04a9-4066-b625-26e467214df3"
let thirdServicePointId = "9f1a84e3-edb0-4f53-91c2-70934d8db879"

test("Verify get all service points", async ({ request }) => {
    const _response = await request.get(`/servicePoints`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
});

test.describe.parallel('Verify all GET endpoints for retriving all service points with their bookings', () => {
    test("Verify get all bookings for each service point", async ({ request }) => {
        const _response = await request.get(`/servicePoints/bookings?servicePointIds=${firstServicePointId}&servicePointIds=${secondServicePointId}&servicePointIds=${thirdServicePointId}&date=2023-08-08T08:47:07`);
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify get all bookings for each service point does not work without query params", async ({ request }) => {
        const _response = await request.get(`/servicePoints/bookings`);
        expect(_response.status()).toBe(400);
        expect(_response.ok()).toBeFalsy();
    });
})

test.describe.parallel('Verify all PUT endpoints for servicePoints', () => {
    test('Verify service point can be updated by id', async ({ request }) => {
        const _response = await request.put(`/servicePoints/${firstServicePointId}`, {
            data: {
                name: 'S'
            }
        })
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    })

    test('Verify that updating an unexisting service point id returns an error', async ({ request }) => {
        const _response = await request.put(`/servicePoints/false-id`, {
            data: {
                name: 'S'
            }
        })
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    })

    test('Verify that updating aservice point with wrong data type returns an error', async ({ request }) => {
        const _response = await request.put(`/servicePoints/${firstServicePointId}`, {
            data: {
                name: 234
            }
        })
        expect(_response.status()).toBe(400);
        expect(_response.ok()).toBeFalsy();
    })
})
