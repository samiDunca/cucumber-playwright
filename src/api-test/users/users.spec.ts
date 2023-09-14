import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let bookingId = "01c16ae8-9feb-4aae-bf43-f918a499a657";
let bookingIdForDelete = "7e4e7e4f-f333-4a5a-ac5f-0070e7434317"
let membershipPlanId = "4b54941c-a4ab-4c84-bb72-59675b7fb76e"
let userEmail = "lorena.moraru@techquarter.io"

test("Verify that the current user can be retrieved", async ({ request }) => {
  const _response = await request.get("/users/current");
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test("Verify that we can open a slot from bookings slot range ", async ({request,}) => {
  const _response = await request.post("/users/search", {
    data: {
      searchValue: null,
      page: {
        size: 10,
        number: 0,
      },
    },
  });
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test("Verify that we can retrieve by id an existing booking", async ({request,}) => {
  const _response = await request.get(`/users/${bookingId}`);
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test("Verify that a booking can be updated by id", async ({request}) => {
  const _response = await request.get(`/users/${bookingId}`, {
    data: {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        phoneNumber: 234524,
    } 
  });
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
})

test.skip("Verify that a booking can be deleted by the id", async ({request}) => {
  const _response = await request.delete(`/users/${bookingIdForDelete}`);
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
})

test("Verify that the member users can be retrieved", async ({request}) => {
  const _response = await request.get(`/users/members?Page.Number=2&Page.Size=20`);
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
})

test("Verify that a member user can be created", async ({request}) => {
    const _response = await request.post(`/users/members`, {
        data: {
            firstName: faker.internet.userName(),
            lastName: faker.internet.userName(),
            email: faker.internet.email(),
            phoneNumbe: 234545234,
            membershipPlanId: `${membershipPlanId}`,
        }
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the customer users can be retrieved", async ({request}) => {
    const _response = await request.get(`/users/customers?Page.Number=2&Page.Size=20`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that a customer user can be created", async ({request}) => {
    const _response = await request.post(`/users/customers`, {
        data: {
            firstName: faker.internet.userName(),
            lastName: faker.internet.userName(),
            email: faker.internet.email(),
            phoneNumbe: 234545234,
        }
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the booking settings for a particular user can be retrieved", async ({request}) => {
    const _response = await request.get(`/users/f8469c41-eaef-456d-8aeb-0295fc1c9879/booking-settings`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the next-reservation can be retrieved", async ({request}) => {
    const _response = await request.get(`/users/0092f4be-4311-4754-85a7-f33f41df3ba2/next-reservation`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})


test("Verify that a booking status for a particular booking can be retrieved", async ({request}) => {
    const _response = await request.get(`/users/${bookingId}/booking-status`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that a membership for a particular booking can be retreived", async ({request}) => {
    const _response = await request.get(`/users/${bookingId}/memberships`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that a membership for a particular booking can be updated", async ({request}) => {
    const _response = await request.put(`/users/${bookingId}/memberships`, {
        data: {
            membershipPlanId:"bc0aa222-632c-461c-be17-f7febd9b81af",
            startDate:"2023-10-01T09:03:02"
         }
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the external subscription for a particular booking can be retreived", async ({request}) => {
    const _response = await request.get(`/users/${bookingId}/external-subscriptions`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the external subscription for a particular booking can be updated", async ({request}) => {
    const _response = await request.put(`/users/a94e61f5-5179-4aaa-8eea-c9857f354d01/external-subscription`, {
        data: {
            externalSubscriptionId:"2d3ca075-6f6d-4eb9-98af-ded8b137ff78"
        }
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the users status can be retreived", async ({request}) => {
    const _response = await request.get(`/users/stats`); 
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test("Verify that the resend-email functionality is working", async ({request}) => {
    const _response = await request.post(`/users/resend-email`, {
        data: {
            email: userEmail
        }
    }); 
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})





  

