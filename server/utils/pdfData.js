const currentDate = new Date();
const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

                                                                                                                                                                                                                                                                                                                        //Import the library into your project

 export const dataPdf = {
    apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
    mode: "development", // Production or development, defaults to production   
    images: {
        // The logo on top of your invoice
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
        background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
    },
    // Your own data
    sender: {
        company: "E-care",
        address: "YMC Kozhikode ",
        zip: "1234 AB",
        city: "Kozhikode",
        country: "kerala"
        // custom1: "custom value 1",
        // custom2: "custom value 2",
        // custom3: "custom value 3"
    },
    // Your recipient
    client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry"
       
    },
    information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: formattedDate,
        // Invoice due date
        dueDate: "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: [
        {
            quantity: 1,
            description: "Application Approved",
            taxRate: 0,
            price: 20000
        },
       
       
    ],
    // The message you would like to display on the bottom of your invoice
    bottomNotice: "Kindly pay your invoice within 3  days.",
    // Settings to customize your invoice
    settings: {
        currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // marginTop: 25, // Defaults to '25'
        // marginRight: 25, // Defaults to '25'
        // marginLeft: 25, // Defaults to '25'
        // marginBottom: 25, // Defaults to '25'
        // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // height: "1000px", // allowed units: mm, cm, in, px
        // width: "500px", // allowed units: mm, cm, in, px
        // orientation: "landscape" // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
        // invoice: "FACTUUR",  // Default to 'INVOICE'
        // number: "Nummer", // Defaults to 'Number'
        // date: "Datum", // Default to 'Date'
        // dueDate: "Verloopdatum", // Defaults to 'Due Date'
        // subtotal: "Subtotaal", // Defaults to 'Subtotal'
        // products: "Producten", // Defaults to 'Products'
        // quantity: "Aantal", // Default to 'Quantity'
        // price: "Prijs", // Defaults to 'Price'
        // productTotal: "Totaal", // Defaults to 'Total'
        // total: "Totaal", // Defaults to 'Total'
        taxNotation: "" // Defaults to 'vat'
    },

    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    // "customize": {
    //      "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    // }
};
