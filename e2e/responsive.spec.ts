import { test, expect } from "@playwright/test";

test.use({ channel: "chrome" });

const ROUTES = [
  "/",
  "/nosotros",
  "/servicios",
  "/productos?p=agenda",
  "/productos?p=masticod",
  "/productos?p=datapilot",
  "/contacto",
];

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812, isMobile: true },
  { name: "tablet-768", width: 768, height: 1024, isMobile: true },
  { name: "desktop-1440", width: 1440, height: 900, isMobile: false },
];

for (const vp of VIEWPORTS) {
  test.describe(`Responsive layout audit [${vp.name}]`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`Route ${route} has no horizontal overflow and visible navigation`, async ({
        page,
      }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(450);

        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth,
        }));

        expect(
          metrics.scrollWidth,
          `Horizontal overflow detected on ${route} at ${vp.width}px (scrollWidth=${metrics.scrollWidth}, innerWidth=${metrics.innerWidth})`
        ).toBeLessThanOrEqual(metrics.innerWidth + 1);

        if (vp.isMobile) {
          const menuBtn = page.locator('button[aria-label="Toggle menu"]');
          await expect(menuBtn).toBeVisible();
          const box = await menuBtn.boundingBox();
          expect(box).not.toBeNull();
          if (box) {
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1);
          }
        }
      });
    }

    test(`Nosotros all 5 tabs render without text clipping or mascot overlap on ${vp.name}`, async ({
      page,
    }) => {
      await page.goto("/nosotros", { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);

      const tabNames = [
        "Quiénes somos",
        "Por qué Infocod",
        "Nuestra Misión",
        "Nuestra Visión",
        "Cultura",
      ];

      for (const tabName of tabNames) {
        const btn = page.getByRole("button", { name: tabName });
        await page.evaluate(() => window.scrollTo(0, 0));
        await btn.click();
        await page.waitForTimeout(750);

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }));

        expect(
          overflow.scrollWidth,
          `Overflow on /nosotros tab "${tabName}" at ${vp.width}px`
        ).toBeLessThanOrEqual(overflow.innerWidth + 1);

        // Verify heading is inside viewport horizontally
        const heading = page.locator("h2").first();
        if ((await heading.count()) > 0) {
          const hBox = await heading.boundingBox();
          if (hBox) {
            expect(
              hBox.x + hBox.width,
              `Heading clipped on tab "${tabName}" at ${vp.width}px`
            ).toBeLessThanOrEqual(vp.width + 2);
          }
        }

        // On mobile/tablet, verify the paragraph and the mascot image do not overlap vertically
        if (vp.isMobile && tabName !== "Por qué Infocod") {
          const para = page.locator("p").first();
          const mascotImg = page.locator(".activeContentWrapper img").first();
          if ((await para.count()) > 0 && (await mascotImg.count()) > 0) {
            const pBox = await para.boundingBox();
            const mBox = await mascotImg.boundingBox();
            if (pBox && mBox) {
              const verticalOverlap =
                Math.min(pBox.y + pBox.height, mBox.y + mBox.height) -
                Math.max(pBox.y, mBox.y);
              expect(
                verticalOverlap,
                `Mascot overlaps paragraph on tab "${tabName}" at ${vp.width}px`
              ).toBeLessThanOrEqual(4);
            }
          }
        }
      }
    });
  });
}
