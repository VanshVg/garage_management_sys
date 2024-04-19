import puppeteer from 'puppeteer';

export const generatePdf = async (fileContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(fileContent);
  await page.pdf({
    path: `./public/invoices/abc.pdf`,
    format: "A4",
    printBackground: true,
  })
  await browser.close();
  return true;
}
