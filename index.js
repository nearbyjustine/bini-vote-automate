const { Builder, By, until } = require("selenium-webdriver");

function randomSleep() {
  return Math.floor(Math.random() * 1000 + 2000);
}

async function voteBini(times) {
  let driver = await new Builder().forBrowser("chrome").build();
  driver.manage().window().maximize();

  try {
    await driver.get("https://nylonmanila.com/big-bold-brave-awards-2024-favorite-p-pop-group/");

    await driver.sleep(randomSleep());

    await driver.findElement(By.className("cky-btn-accept")).click();

    await driver.sleep(randomSleep());

    for (let i = 0; i < times; i++) {
      // scroll to element
      console.log("step 1");
      await driver.executeScript("window.scrollTo(0, 5100)");

      await driver.sleep(randomSleep());

      console.log("step 2");
      await driver.findElement(By.id("PDI_answer61480085")).click();

      await driver.sleep(randomSleep());

      console.log("step 3");
      await driver.findElement(By.id("pd-vote-button13777388")).click();

      await driver.sleep(randomSleep());

      console.log("step 3.1");
      const toSolve = await driver.findElement(By.xpath("//div[@id='captcha_13777388']/span/p")).getText();

      const cleanExpression = toSolve.replace("=", " ").trim();

      try {
        const result = eval(cleanExpression);
        console.log(`Result: ${result}`);
        console.log("step 4");
        await driver.findElement(By.id("answer_13777388")).sendKeys(result);

        await driver.sleep(randomSleep());

        console.log("step 5");
        await driver.findElement(By.id("pd-vote-button13777388")).click();

        await driver.sleep(randomSleep());

        // go back

        console.log("step 6");
        await driver.findElement(By.className("pds-return-poll")).click();
      } catch (error) {
        console.error("Invalid expression");
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
    voteBini(100);
  }
}

voteBini(100);
