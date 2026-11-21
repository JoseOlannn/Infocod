import { describe, it, expect } from "vitest";
import { BRAND } from "@/constants/brand";

describe("Brand constants", () => {
  it("defines official Infocod hex tokens", () => {
    expect(BRAND.blue).toBe("#4F8EF7");
    expect(BRAND.purple).toBe("#6C2BFF");
    expect(BRAND.green).toBe("#00C96B");
    expect(BRAND.ink).toBe("#0f172a");
  });
});
