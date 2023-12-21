const fs = require('fs');
const GetData = require('./FrondEnd/main.js')

const scraperTitle = (browser, url) => new Promise(async(resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('Dang mo trinh duyet');
        await page.goto(url)
        console.log('Dang truy cap den URL: ', url);
        await page.waitForSelector('._openNumber')
        let previewData = {
            title: '0000',
            number: 0
        }

        let data = {
            title: '0',
            number: 0
        }

        let numberIsCorrect

        setInterval(async () => {
            const dataNumber = await page.$$eval('._openNumber', elements => {
                dataNumber = elements.map(els => {
                    return {
                        title: els.querySelector('h2').innerText,
                        number: els.querySelector('.number').innerText
                    }
                })
        
                return dataNumber
            })

            data.title = dataNumber[0].title.slice(3, 15)
            data.number = dataNumber[0].number.replaceAll('\n', '').slice(3, 5)

            
            if (previewData.title != data.title){
                console.log(data);
                const dataFile = fs.readFileSync('data.json');
                // Parse the JSON data into a JavaScript object
                let jsonData
                if (dataFile){
                    jsonData = JSON.parse(dataFile)
                }
                // Modify the JavaScript object by adding new data
                jsonData.data.push({
                    title: data.title,
                    number: data.number
                });


                // Convert the JavaScript object back into a JSON string
                const jsonString = JSON.stringify(jsonData);

                fs.writeFileSync('data.json', jsonString, 'utf-8', (err) => {
                if (err) throw err;
                });

                numberIsCorrect = GetData()
                console.log('number is correct: ', numberIsCorrect);
            }

            previewData.title = data.title
            previewData.number = data.number

        }, 20000)
        
        // await page.close()

        resolve()
    } catch (error) {
        console.log('error: ', error);
        reject()
    }
})

module.exports = {scraperTitle}