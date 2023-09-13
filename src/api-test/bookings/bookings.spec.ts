import { test, expect } from "@playwright/test";

let bookingId = "e4f2becf-f6c1-4b27-9f22-976cf095b8d1"
let servicePointId = "8fc0f272-83ef-4dd0-9493-79e53cf91ee4"

test.describe.parallel("Verify all POST endpoints for Booking create-indoor", () => {
    test("Verify post booking create indoor ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType:0,
          bookedByUserOrganizationId:"556d2b84-8088-4fb3-a5c0-709f93a7d94c",
          startTeeTime:"2023-10-12T23:00:00",
          duration:"01:00:00",
          servicePointId:`${servicePointId}`
       }
      });
      expect(_response.status()).toBe(200);
      expect(_response.ok()).toBeTruthy();
    });

    test("Verify post booking create indoor does not work without servicePointId ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType:0,
          bookedByUserOrganizationId:"556d2b84-8088-4fb3-a5c0-709f93a7d94c",
          startTeeTime:"2023-10-12T20:30:00",
          duration:"01:00:00"
       }
      });
      expect(_response.status()).toBe(404);
      expect(_response.ok()).toBeFalsy();
    });

    test("Verify post booking create does not work with invalid payload ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType: "here should not be a string",
       }
      });
      expect(_response.status()).toBe(400);
      expect(_response.ok()).toBeFalsy();
    });
})

test.describe.parallel("Verify all PUT endpoints for Booking create-indoor", () => {
  test("Verify that a booking can be updated", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/update-indoor`, {
      data: {
       id: `${bookingId}`,
       startTeeTime:"2023-12-10T15:30:00",
       servicePointId:`${servicePointId}`,
       duration:"01:30:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("Verify a booking can not be updated with invalid payload", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/update-indoor`, {
      data: {
       startTeeTime:"2023-10-10T15:30:00",
      }
    })
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  })

  test("Verify that a booking group with invalid id is not found", async ({request}) => {
    const _response = await request.put(`/bookings/'invalid id'/update-indoor`, {
      data: {
       startTeeTime:"2023-10-12T15:30:00",
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})
  
test.describe.parallel("Verify all PUT endpoints for Booking move-indoor", () => {
  test.skip("Verify booking can be updated", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/move-indoor`, {
      data: {
       id: `${bookingId}`,
       startTeeTime:"2023-10-13T08:00:00",
       servicePointId:`${servicePointId}`,
       duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("Verify that booking move-indoor can not be update with invalid payload", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/move-indoor`, {
      data: {
       startTeeTime:"2023-12-14T15:30:00",
      }
    })
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  })


  test("Verify that booking move-indoor can not be update with invalid id", async ({request}) => {
    const _response = await request.put(`/bookings/'invalid id'/move-indoor`, {
      data: {
       startTeeTime:"2023-12-15T15:30:00",
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})

test.describe.parallel("Verify all POST endpoints for booking/{id}/split", () => {
  test("Verify that a booking split can be created", async ({request}) => {
    const _response = await request.post(`/bookings/${bookingId}/split`, {
      data: {
        id: `${bookingId}`,
        startTeeTime:"2023-12-16T08:00:00",
        servicePointId:`8fc0f272-83ef-4dd0-9493-79e53cf91ee4`,
        duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("Verify that a bookings unexisting-endpoint reports an error", async ({request}) => {
    const _response = await request.post(`/bookings/${bookingId}/unexisting-endpoit`, {
      data: {
        id: `${bookingId}`,
        startTeeTime:"2023-12-16T08:00:00",
        servicePointId:`8fc0f272-83ef-4dd0-9493-79e53cf91ee4`,
        duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})

test.describe.parallel("Verify all PATCH endpoints for booking status", () => {
  test("Verify that the booking status can be modified", async ({request}) => {
    const _response = await request.patch(`/bookings/${bookingId}/status`, {
      data: {
        status: 4
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("Patch booking status unexisting-endpoint reports an error", async ({request}) => {
    const _response = await request.patch(`/bookings/${bookingId}/invalid-endpoint`, {
      data: {
        status: 4
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})