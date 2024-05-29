import playwright from "playwright";

module.exports.handler = async function (event, context) {
  let browser;
  try {
    browser = await playwright.chromium.launch();
    console.log("Opening new browser...");
    const page = await browser.newPage();

    const url = "https://www.mashable.com";

    await page.goto(url);
    console.log("Redirecting to page...");
    console.log("Evaluating page data...");

    const htmlContent = await page.content();

    return {
      statusCode: 200,
      body: htmlContent,
      headers: {
        "Content-Type": "text/html",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed.");
    }
  }
};
