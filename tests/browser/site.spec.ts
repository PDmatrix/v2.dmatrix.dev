import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of [
  "/",
  "/about/",
  "/posts/advent-of-code-year-2015-day-20/",
  "/search/",
]) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    if (path === "/search/") {
      await expect(page.locator(".pagefind-ui__search-input")).toBeVisible();
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const darkResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(darkResults.violations).toEqual([]);
  });
}

test("brand accents stay blue in light mode and accessible purple in dark mode", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const postLink = page.locator("#recent-posts a").first();
  await expect(postLink).toHaveCSS("color", "rgb(0, 108, 172)");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(postLink).toHaveCSS("color", "rgb(239, 67, 215)");
  const border = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--border")
      .trim()
  );
  expect(border).toBe("#642451");
});

test("RSS stays separated from the title at narrow and wide widths", async ({
  page,
}) => {
  for (const width of [320, 390, 640, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const heading = await page.locator("#hero h1").boundingBox();
    const link = page.locator('#hero a[href$="rss.xml"]');
    const target = await link.boundingBox();
    const icon = await link.locator("svg").boundingBox();
    expect(heading).not.toBeNull();
    expect(target).not.toBeNull();
    expect(icon).not.toBeNull();
    if (!heading || !target || !icon) throw new Error("Missing hero elements");
    expect(target.width).toBeGreaterThanOrEqual(44);
    expect(target.height).toBeGreaterThanOrEqual(44);
    const sameRow =
      icon.y < heading.y + heading.height && icon.y + icon.height > heading.y;
    const gap = sameRow
      ? icon.x - (heading.x + heading.width)
      : icon.y - (heading.y + heading.height);
    expect(gap, `RSS gap at ${width}px`).toBeGreaterThanOrEqual(12);
    expect(gap, `RSS gap at ${width}px`).toBeLessThanOrEqual(18);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true);
    expect(await link.getAttribute("href")).toBe("/rss.xml");
    const response = await page.request.get("/rss.xml");
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("<rss");
  }
});

test("home, post navigation, theme persistence and responsive layout", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Dmitrii Sebakov's Blog"
  );
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  if (await page.locator("#menu-btn").isVisible()) {
    await page.locator("#menu-btn").click();
  }
  await page.locator("#theme-btn").click();
  const changedTheme = initialTheme === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    changedTheme
  );
  await page
    .locator('main a[href="/posts/advent-of-code-year-2015-day-20/"]')
    .first()
    .click();
  await expect(page.locator("#article")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    changedTheme
  );
  await expect(page.locator(".copy-code").first()).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    changedTheme
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("full-text search, query URLs, clearing and repeated navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/search/?q=lepton");
  await expect(page.locator(".pagefind-ui__result-link").first()).toContainText(
    "My favorite note-taking app"
  );
  await page.getByRole("button", { name: /clear/i }).click();
  await expect(page).not.toHaveURL(/\?q=/);
  await page.locator(".pagefind-ui__search-input").fill("advent");
  await expect(page.locator(".pagefind-ui__result").first()).toBeVisible();
  await page.locator(".pagefind-ui__result-link").first().click();
  await expect(page.locator("#article")).toBeVisible();
  if (await page.locator("#menu-btn").isVisible()) {
    await page.locator("#menu-btn").click();
  }
  await page.locator('header a[href="/search/"]').click();
  await expect(page.locator(".pagefind-ui__search-input")).toHaveCount(1);
  await page.locator(".pagefind-ui__search-input").fill("lepton");
  await expect(page.locator(".pagefind-ui__result-link").first()).toContainText(
    "My favorite note-taking app"
  );
  expect(errors).toEqual([]);
});

test("image lightbox is keyboard accessible", async ({ page }) => {
  await page.goto("/posts/my-favorite-note-taking-app-for-programmers/");
  const image = page.locator("#article img").first();
  await expect(image).toHaveAttribute("role", "button");
  await image.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(image).toBeFocused();
});

test("legacy pagination redirects and 404 page", async ({ page }) => {
  await page.goto("/posts/1/");
  await expect(page).toHaveURL(/\/posts\/$/);
  await page.goto("/tags/aoc/1/");
  await expect(page).toHaveURL(/\/tags\/aoc\/$/);
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("404", { exact: true })).toBeVisible();
});
