import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";


let bookingGroupId = "78b0b183-30cf-4357-b687-88b2403de00e";
const bookingGroupIdForDelete = "9869903f-181b-46bd-aa2d-28775f7b34e21"
// POST Booking Group
test.describe.parallel("POST Booking Group", () => {
  test("Create a booking Group", async ({ request }) => {
    const _response = await request.post(`/bookingGroups`, {
      data: {
        color: "#C1ECC0",
        name: faker.internet.userName(),
        daysInAdvance: faker.number.int({ min: 10, max: 99 }),
        time: "22:29:24",
        maxConcurrentBookings: "34",
        maxConcurrentlyBookedHours: faker.number.int({ min: 1, max: 9 }),
        maxHoursPerDay: faker.number.int({ min: 1, max: 9 }),
        maxHoursPerMonth: faker.number.int({ min: 10, max: 99 }),
        rateId: "f175ddf1-32d9-4f68-9022-436beb1eee1d",
        bookingSettingsId: "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0",
      },
    });

    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Create a booking Group with bad data", async ({ request }) => {
    const _response = await request.post(`/bookingGroups`, {
      data: {
        color: "#C1ECC0",
        name: faker.number.int({ min: 10, max: 99 }),
        rateId: "f175ddf1-32d9-4f68-9022-436beb1eee1d",
        bookingSettingsId: "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0",
      },
    });

    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  });

  test("Create a booking group without rateId", async ({ request }) => {
    const _response = await request.post(`/bookingGroups`, {
      data: {
        color: "#C1ECC0",
        name: faker.internet.userName(),
        bookingSettingsId: "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0",
      },
    });

    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });

  test("Create a booking group - Assert Invalid Endpoint", async ({
    request,
  }) => {
    const _response = await request.post(`/bookingGroup/non-existing-endpoit`);
    expect(_response.status()).toBe(404);
  });
});


// GET Booking Groups/{id}
test.describe.parallel("GET Booking Groups/{id}", () => {
  test("Get booking group by Id", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Get booking group by False Id", async ({ request }) => {
    const _response = await request.get(
      `/bookingGroups/${faker.finance.accountNumber(7)}`
    );
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });
});

// "PUT Booking Groups/{id}
test.describe.parallel("PUT Booking Groups/{id}", () => {
  test("PUT booking group by Id", async ({ request }) => {
    const _response = await request.put(`/bookingGroups/${bookingGroupId}`, {
      data: {
        id: `${bookingGroupId}`,
        name: "Radu Negru",
        color: "#82c6dc",
        bookingSettingsId: "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0",
        rateId: "1c57a921-74a0-40aa-8d22-dcc87adc9e9f",
      },
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("PUT booking group by Id without rateId", async ({ request }) => {
    const _response = await request.put(`/bookingGroups/${bookingGroupId}`, {
      data: {
        id: `${bookingGroupId}`,
        name: "Radu Negru",
        color: "#82c6dc",
        bookingSettingsId: "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0",
      },
    });
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });

  test("PUT booking group by Id with incorect data type", async ({ request }) => {
    const _response = await request.put(`/bookingGroups/${bookingGroupId}`, {
      data: {
       rateId: "asdf"
      }
    });
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  });
});

// GET Booking Groups/{id}/mebershipPlans
test.describe.parallel("GET Booking Groups/{id}/mebershipPlans", () => {
  test("GET Membership Plans assigned for given booking Group Id", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}/membershipPlans`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("GET Membership Plans assigned for given booking Group Id - Assert Invalid Endpoint ", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}/non-valid-endpoint`);
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });
})

// GET Booking Groups/{id}/public-status
test.describe.parallel("GET Booking Groups/{id}/public-status", () => {
  test("GET Public-status ", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/public-status`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });
})

// DELETE BookingGroups/{id}
// test.describe.parallel("DELETE Booking Groups/{id}/public-status", () => {
//   test("DELETE Booking Group ", async ({ request }) => {
//     const _response = await request.delete(`/bookingGroups/${bookingGroupIdForDelete}`);
//     expect(_response.status()).toBe(200);
//     expect(_response.ok()).toBeTruthy();
//   });
// })