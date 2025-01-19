import * as cheerio from "cheerio";
import puppeteer, { type LaunchOptions } from "puppeteer";

import chromium from "chrome-aws-lambda";

export async function getRecipeHtmlFromUrl(url: string, plugin?: string) {
  //let browser;
  // if (process.env.NODE_ENV === "production") {
  //   browser = await chromium.puppeteer.launch({
  //     args: chromium.args,
  //     defaultViewport: chromium.defaultViewport,
  //     executablePath: await chromium.executablePath,
  //     headless: chromium.headless,
  //   });
  // } else {
  //   browser = await puppeteer.launch({
  //     timeout: 0,
  //     headless: true,
  //     args: ["--no-sandbox", "--disable-gpu"],
  //   } as LaunchOptions);
  // }

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

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
