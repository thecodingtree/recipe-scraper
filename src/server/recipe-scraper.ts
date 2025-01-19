import * as cheerio from "cheerio";
import puppeteer, { type LaunchOptions } from "puppeteer";

export async function getRecipeHtmlFromUrl(url: string, plugin?: string) {
  const browser = await puppeteer.launch({
    timeout: 0,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  } as LaunchOptions);

  const defaultSelector = ".tasty-recipes, .wprm-recipe, .recipe-container";

  const page = await browser.newPage();

  await page.goto(url);

  // Wait for the content to load (adjust the selector as needed)
  await page.waitForSelector(plugin ?? defaultSelector);

  const html = await page.content();

  const dom = cheerio.load(html);

  const elem = dom(plugin ?? defaultSelector).first();

  return elem.html();
}
