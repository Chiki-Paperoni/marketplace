# Testing Strategy

## Backend Testing

- **Unit Tests:** Services and utility functions (Jest)
- **Integration Tests:** API endpoints (Supertest)
- **Coverage Goal:** 70%+

## Frontend Testing

**Angular:**

- Component tests (Jasmine)
- Service tests
- Coverage: 60%+

**Next.js:**

- Component tests (Vitest + RTL)
- Hook tests
- Coverage: 60%+

## E2E Testing (Optional)

Critical user flows with Playwright:

- Registration → Login → Browse → Add to Cart → Checkout
- Vendor: Create Product → Receive Order → Update Status
- Admin: Approve Vendor → Manage Users
