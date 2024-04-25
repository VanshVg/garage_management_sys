import puppeteer from "puppeteer";

export const generatePdf = async (fileContent, userId, appointmentId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(fileContent);
  let fileName = `${userId}_${appointmentId}_${Date.now()};`;
  await page.pdf({
    path: `./public/invoices/${fileName}.pdf`,
    format: "A4",
    printBackground: true,
  });
  console.log("Here");
  await browser.close();
  return fileName;
};
