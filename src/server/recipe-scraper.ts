import * as cheerio from "cheerio";
import puppeteer, { type LaunchOptions } from "puppeteer";

export async function getRecipeHtmlFromUrl(url: string, plugin?: string) {
  const browser = await puppeteer.launch({
    timeout: 0,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  } as LaunchOptions);

  const defaultSelector =
    "div[classs^=tasty-recipes], div[class^=wprm], div[class^=recipe-container]";

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: ["domcontentloaded"] });

  const pageRawHtml = await page.content();

  const dom = cheerio.load(pageRawHtml);

  const recipeContainer = dom(plugin ?? defaultSelector).first();

  const recipeHtml = recipeContainer.html();

  return recipeHtml;
}
