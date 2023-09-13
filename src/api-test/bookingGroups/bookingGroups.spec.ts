import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";


let bookingGroupId = "78b0b183-30cf-4357-b687-88b2403de00e";
const bookingGroupIdForDelete = "9869903f-181b-46bd-aa2d-28775f7b34e21"
// POST Booking Group
test.describe.parallel("Verify all POST endpoints for Booking Group", () => {
  test("Verify that a booking group can be created", async ({ request }) => {
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

  test("Verify that a booking group can not be created with bad data", async ({ request }) => {
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

  test("Verify that a booking group can not be created without rateId", async ({ request }) => {
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
test.describe.parallel("Verify all GET endpoints for Booking Groups/{id}", () => {
  test("Verify get booking group by Id", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Verify that you can not retrieve booking group by false ID", async ({ request }) => {
    const _response = await request.get(
      `/bookingGroups/${faker.finance.accountNumber(7)}`
    );
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });
});

// "PUT Booking Groups/{id}
test.describe.parallel("Verify all PUT endpoints for Booking Groups/{id}", () => {
  test("Verify edit booking group by id", async ({ request }) => {
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

  test("Verify you can not edit booking group without providing rateId", async ({ request }) => {
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

  test("Verify you can not edit booking group with incorect data type", async ({ request }) => {
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
test.describe.parallel("Verify all GET endpoints for Booking Groups/{id}/mebershipPlans", () => {
  test("Verify get Membership Plans assigned for given booking Group Id", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}/membershipPlans`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Verify get Membership Plans assigned for given booking Group Id - Assert Invalid Endpoint ", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/${bookingGroupId}/non-valid-endpoint`);
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });
})

// GET Booking Groups/{id}/public-status
test("Verify if booking group public-status can be retrieved", async ({ request }) => {
    const _response = await request.get(`/bookingGroups/public-status`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
});

// DELETE BookingGroups/{id}
test.skip("Verify delete Booking Group works", async ({ request }) => {
    const _response = await request.delete(`/bookingGroups/${bookingGroupIdForDelete}`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
});
