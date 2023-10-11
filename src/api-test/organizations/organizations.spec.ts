import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let organizationId = "29ec2d71-9988-4ec5-ae9f-4013d717a622";
let bookingGroupId = "73c3dac5-8b44-4c9d-a265-d4f4d1866aad"
let membershipPlanId = "1d672583-69a6-42d9-af58-c3eee08e1990"
let membershipPlanIdForDelete = "a48ad76b-a23d-4bec-920c-aff6b3f85ff2"
let servicePointsSettingId = "7d8bf11f-f504-467b-90eb-1062e1b31e18"

test("Verify that all organizations can be retrieved", async ({ request }) => {
  const _response = await request.get("/organizations");
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test.describe.parallel('Verify all GET endpoints for get organization by id', () => {
    test("Verify get organization by id", async ({ request }) => {
        const _response = await request.get(`/organizations/${organizationId}`);
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify get organization by false id returns error", async ({ request }) => {
        const _response = await request.get(`/organizations/false-id`);
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    });

    // mising 400 Bad Request response
})


test.describe.parallel('Verify all PUT endpoints for update organization by id', () => {
    test("Verify that an organization can be updated by id", async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}`, {
            data: {
            name: "Sad Valley Indoor Club",
            primaryEmail: faker.internet.email(),
            website: "golfcourse.com",
            language: "en",
            country: "us",
            address1: "123 Main St",
            region: "Utah",
            city: "Bluffdale",
            postalAddress: faker.finance.accountNumber(6),
            servicePointsSettingId: `${servicePointsSettingId}`,
            },
        });
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify that an organization can not be updated with incorect data type", async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}`, {
            data: {
                name: 456
            },
        });
        expect(_response.status()).toBe(400);
        expect(_response.ok()).toBeFalsy();
    });

    test("Verify that a false organization Id returns an error", async ({request}) => {
        const _response = await request.put(`/organizations/false-id`);
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    });
})

// endpoint missing - POST /organization/{organizationId}/bookingSettins

test.describe.parallel('Verify all GET endpoints for retriving memberships whitin an organization', () => {
    test("Verify that all membership plans within an organization can be retrieved", async ({request}) => {
        const _response = await request.get(
            `/organizations/${organizationId}/membershipSettings`
        );
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify that a false organization id returns an error", async ({request}) => {
        const _response = await request.get(
            `/organizations/false-id/membershipSettings`
        );
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    });
})

// endpoint missing - POST /organization/{organizationId}/membershipSettings

test.describe.parallel('Verify all PUT endpoints for updating memberships by organization id', () => {
    test("Verify that membeship Settings can be updated by organization Id", async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}/membershipSettings`,{
            data: {
                maximumMembershipsAllowed: "204",
            },
            }
        );
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify that validation for maximumMembershipAllowed returns Client Error", async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}/membershipSettings`,{
            data: {
                maximumMembershipsAllowed: 0,
            },
            }
        );
        expect(_response.status()).toBe(422);
        expect(_response.ok()).toBeFalsy();
    });

    test("Verify that false organization id returns Not Found status code", async ({request}) => {
        const _response = await request.put(`/organizations/false-id/membershipSettings`,{
            data: {
                maximumMembershipsAllowed: 234,
            },
            }
        );
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    });
})

test.describe.parallel('Verify all POST endpoints for creating a membership Plan', () => {
    test("Verify that a membership plan can be created", async ({request}) => {
        const _response = await request.post(`/organizations/${organizationId}/membershipPlans`, {
            data: {
                color:"#8DCF8B",
                name:faker.internet.userName(),
                bookingGroupId: `${bookingGroupId}`
            }
        });
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test("Verify that a membership plan without bookingGroupId can not be created", async ({request}) => {
        const _response = await request.post(`/organizations/${organizationId}/membershipPlans`, {
            data: {
                color:"#8DCF8B",
                name:faker.internet.userName()
            }
        });
        expect(_response.status()).toBe(422);
        expect(_response.ok()).toBeFalsy();
    });

    test("Verify that a membership plan with false id returns an error", async ({request}) => {
        const _response = await request.post(`/organizations/false-id/membershipPlans`, {
            data: {
                color:"#8DCF8B",
                name:faker.internet.userName(),
                bookingGroupId: `${bookingGroupId}`
            }
        });
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    });
})

test.describe.parallel('Verify all PUT endpoints for updating memberships by organization id', () => {
    test('Verify that a membership plan can be edited', async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}/membershipPlans/${membershipPlanId}`, {
            data: {
                color:"#8DCF8B",
                name:faker.internet.userName(),
                bookingGroupId: `${bookingGroupId}`
            }
        });
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    })

    test('Verify that a membership plan can not be edited without color', async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}/membershipPlans/${membershipPlanId}`, {
            data: {
                name:faker.internet.userName(),
                bookingGroupId: `${bookingGroupId}`
            }
        });
        expect(_response.status()).toBe(422);
        expect(_response.ok()).toBeFalsy();
    })

    test('Verify that a membership plan with false id return an error', async ({request}) => {
        const _response = await request.put(`/organizations/${organizationId}/membershipPlans/false-id`, {
            data: {
                color:"#8DCF8B",
                name:faker.internet.userName(),
                bookingGroupId: `${bookingGroupId}`
            }
        });
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    })
})

test.skip('Verify that a membership plan can be deleted by Id', async ({request}) => {
    const _response = await request.get(`/organizations/${organizationId}/membershipPlans/${membershipPlanIdForDelete}`);
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

