const response = require('./index')
//  The functions to generate the examples and sample fetch pages.
//  As this page balloons with the addition of more APIs we are 
//  attempting to tackle the problem in a few ways.  Long term
// though we are exploring the potential of setting up the functions on 
// our own API.  

// In general I think we also generally like the idea of attempting to implement 
// cross-origin resource sharing and sending a script as a variable that a 
// script engine can evaluate and then return the evaluated function.

function NasaFetch(){
    return`
    //Example Fetch
        const [data, setData] = useState({});
        useEffect(() => {
        (async () => {
            const res = await fetch(
            \`https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/photos?sol=34&page=2&api_key=\${secrets.apiKey}\`
            );
            const data = await res.json();
            setData(data);
        })()
        }, []);
    `
}

function NasaExample(response){
    return (
        `import React  from "react";
        
        const manifestJson =
            {
                "sol": 1,
                "earth_date": "2021-02-19",
                "total_photos": 201,
                "cameras": [
                "EDL_DDCAM",
                "EDL_PUCAM2",
                "EDL_RDCAM",
                "EDL_RUCAM",
                "FRONT_HAZCAM_LEFT_A",
                "FRONT_HAZCAM_RIGHT_A",
                "MCZ_LEFT",
                "MCZ_RIGHT",
                "NAVCAM_LEFT",
                "NAVCAM_RIGHT",
                "REAR_HAZCAM_LEFT",
                "REAR_HAZCAM_RIGHT",
                "SKYCAM"
                ]
                }
        export default function Examples() {
        
            return (
                <>
                <div className='topSection'>
                    <div  className='titleImage'>
                        <img src='https://api-go.app/img/nasa.jpg'></img>
                    </div>
                    <div className='apiGoLogoDiv'> 
                        <img src='https://api-go.app/img/api-go.png'></img>
                    </div>
                </div>
                <br />
                <h2>Your API-KEY is: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}</h2>
                <h2>If you dont' have one yet, get your <a target='_blank' href='https://api.nasa.gov/'>NASA-API key</a></h2>
                <h1>Nasa's Mars Rover Api</h1>
                <div className='exampleIntro'>
                    <p>Each rover has its own set of photos stored in the database, which can be queried separately. There are several possible queries that can be made against the API. Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. If instead you prefer to search by the Earth date on which a photo was taken, you can do that too.
                    Along with querying by date, results can also be filtered by the camera with which it was taken and responses will be limited to 25 photos per call. Queries that should return more than 25 photos will be split onto several pages, which can be accessed by adding a 'page' param to the query.</p>
                </div>
                <br />
                <h1>Mission Manifest</h1>
                <div className='missionManifestDiv'>
                    <h4>A mission manifest is available for each Rover at the /manifests/ROVER-NAME </h4>
                    <p>
                    This manifest will list details of the Rover's mission to help you narrow down photo queries to the API.
                    <br />
                    The information in the manifest includes:
                    </p>
                        <div className='nasaLists'>
                            <ul>
                                <li>name</li>
                                <li>landing_date</li>
                                <li>launch_date</li>
                                <li>status</li>
                                <li>max_sol</li>
                                <li>max_date</li>
                                <li>total_photos</li>
                                </ul>
                        </div>
                    It also includes a list of objects under the photos key which are grouped by sol, and each of which contains:
                    <div className='nasaLists'>
                        <ul>
                        <li>sol</li>
                        <li>total_photos</li>
                        <li>cameras</li>
                        </ul>
                    </div>
                    Here's and example manifest endpoint that looks at what Perseverance has done so far 
                    <br />
                    <br />
                    <i><h4>https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance?&api_key=DEMO-KEY</h4></i>
                    <br />
                    <br />
                    It will return entries from every single day the rover has been active.  An example day entry 
                    
        
                    <pre className='showJson'>
                    {JSON.stringify(manifestJson, null, 2)}
                    </pre>
                </div>
                <br />
                <br />
                <br />
                <h1>Photo Attributes</h1>
                <div className ='PhotoAttributesDiv'>
                    <p className='nasaParagraphDiv'>
                        Each rover has its own set of photos stored in the database, which can be queried separately. There are several possible queries that can be made against the API. Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. If instead you prefer to search by the Earth date on which a photo was taken, you can do that too.
                    </p>
                    <p className='nasaParagraphDiv'>
                        Along with querying by date, results can also be filtered by the camera with which it was taken. Each camera has a unique function and perspective, and they are named as follows:
                    </p>
                </div>
                <br />
                <br />
                <br />
                <h1>Perseverance rover cameras:</h1>
                <div className='rover-info'>
                    <div className='rover-cameras'>
                        <img className='roverPic' src='https://api-go.app/img/perseverance-cameras.jpg'></img>
                    </div>
                    <div className='camera-table'>
                        <table className='cameraTable'>
                            <tr className='tableTitles'>
        
                            <td><b>Abbreviation</b> </td> <td><b>Camera</b></td></tr>
                            <tr><td>EDL_RUCAM	 </td> <td> Rover Up-Look Camera</td></tr>
                            <tr><td>EDL_RDCAM	</td> <td> Rover Down-Look Camera</td></tr>
                            <tr><td>EDL_DDCAM	</td> <td> Descent Stage Down-Look Camera</td></tr>
                            <tr><td>EDL_PUCAM1	</td> <td> Parachute Up-Look Camera A</td></tr>
                            <tr><td>EDL_PUCAM2</td> <td> 	Parachute Up-Look Camera B</td></tr>
                            <tr><td>NAVCAM_LEFT</td> <td> 	Navigation Camera - Left</td></tr>
                            <tr><td>NAVCAM_RIGHT	</td> <td> Navigation Camera - Right</td></tr>
                            <tr><td>MCZ_RIGHT</td> <td> 	Mast Camera Zoom - Right</td></tr>
                            <tr><td>MCZ_LEFT </td> <td> 	Mast Camera Zoom - Left</td></tr>
                            <tr><td>FRONT_HAZCAM_LEFT_A	</td> <td> Front Hazard Avoidance Camera - Left</td></tr>
                            <tr><td>FRONT_HAZCAM_RIGHT_A	</td> <td> Front Hazard Avoidance Camera - Right</td></tr>
                            <tr><td>REAR_HAZCAM_LEFT</td> <td> 	Rear Hazard Avoidance Camera - Left</td></tr>
                            <tr><td>REAR_HAZCAM_RIGHT	</td> <td> Rear Hazard Avoidance Camera - Right</td></tr>
                            <tr><td>SKYCAM </td> <td> 	MEDA Skycam</td></tr>
                            <tr><td>SHERLOC_WATSON </td> <td> 	SHERLOC WATSON Camera</td></tr>
                        </table>
                    </div>
                </div>
                <br />
        
                <h1> Curiosity, Opportunity, and Spirit cameras:</h1>
                <table className='cameraTable'>
                    <tr className='tableTitles'><td><b>Abbreviation</b></td><td>	<b>Camera</b></td><td>	<b>Curiosity</b></td>	<td><b>Opportunity</b></td>	<td><b>Spirit</b></td></tr>
                    <tr><td>FHAZ</td><td>Front Hazard Avoidance Camera</td>	<td>✔</td><td>✔</td><td>✔</td></tr>
                    <tr><td>RHAZ</td>		<td>	Rear Hazard Avoidance Camera</td><td>✔</td><td>✔</td><td>✔</td></tr>
                    <tr><td>MAST</td>			<td>Mast Camera</td>	<td>✔</td><td></td><td></td></tr>
                    <tr><td>CHEMCAM</td>		<td>	Chemistry and Camera Complex</td><td>✔</td><td></td><td>	</td></tr>
                    <tr><td>MAHLI</td>		<td>Mars Hand Lens Imager</td>		<td>✔	</td><td> </td><td>	</td></tr>
                    <tr><td>MARDI</td>		<td>	Mars Descent Imager</td>	<td>✔</td><td>	</td><td>	</td></tr>
                    <tr><td>NAVCAM</td>			<td>Navigation Camera</td><td>✔	</td><td>✔</td><td>	✔</td></tr>
                    <tr><td>PANCAM</td>		<td>Panoramic Camera</td>	<td>✔</td><td>✔</td><td></td></tr>
                    <tr><td>MINITES</td>			<td>Miniature Thermal Emission Spectrometer (Mini-TES)</td><td>✔</td><td>✔</td><td></td></tr>
                </table>
                <br />
                <br />
                <br />
                <h1>Querying the API</h1>
                <div className='queryExamplesDiv'>
                    <h3>The API can be queried in the following format:</h3>
                    <h2>Queries by Martian sol:</h2>
        
                    <p>Queries by sol can range from 0, which is the date of landing, up to the current maximum in the database. The current max sol for each rover can be found at that rover's endpoint.
                    </p>
        
                    <i><h4>https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=DEMO_KEY&sol=1</h4></i>
                    <br />
                    <br />
                    <hr className='exampleHr' />
                    <h2>Querying by Earth date:</h2>
        
                    <p>Dates should be formatted as 'yyyy-mm-dd'. The earliest date available is the date of landing for each rover.</p>
        
                                <i><h4>https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=DEMO_KEY&earth_date=2021-3-28</h4></i>
                    <br />
                    <br />
                    <hr className='exampleHr' />
                    <h2>Filtering Queries by Camera:</h2>
                    <p>The camera parameter is not case sensitive, but must be one of the camera abbreviations listed in the table above for the respective rover.</p>
                    
                    <i><h4>https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=DEMO_KEY&sol=22&camera=MCZ_RIGHT</h4></i>
                    <br />
                    
                    <i><h4>https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?api_key=DEMO_KEY&earth_date=2021-3-05&camera=MCZ_RIGHT</h4></i>
                    <br />
                    <br />
                    <hr className='exampleHr' />
                    <h2>Query For Latest Photos</h2>
                    <p> you just want to receive photo data for the most recent Sol for which photos exist for a particular rover, you can visit the /latest_photos endpoint.</p>
        
                    <i><h4>https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=DEMO_KEY</h4></i>
                    <br />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                </>
            );
        }`
    )
}

function EdamamExample(response){
    return(
        `
        import React, { useState, useEffect } from "react";



const exampleEmdamam ={
    "q": "chicken",
    "from": 0,
    "to": 3,
    "more": true,
    "count": 7000,
    "hits": [
    {
    "recipe": {
    "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_3da1169eb633a5e4607890ebf7dee89f",
    "label": "Grilled Butterflied Chicken Recipe",
    "image": "https://www.edamam.com/web-img/7a2/7a2f41a7891e8a8f8a087a96930c6463.jpg",
    "source": "Serious Eats",
    "url": "http://www.seriouseats.com/recipes/2012/08/grilled-butterflied-chicken-recipe.html",
    "shareAs": "http://www.edamam.com/recipe/grilled-butterflied-chicken-recipe-3da1169eb633a5e4607890ebf7dee89f/chicken/alcohol-free/591-722-cal",
    "yield": 4,
    "dietLabels": [
    "Low-Carb"
    ],
    "healthLabels": [
    "Sugar-Conscious",
    "Keto-Friendly",
    "Paleo",
    "Dairy-Free",
    "Gluten-Free",
    "Wheat-Free",
    "Egg-Free",
    "Peanut-Free",
    "Tree-Nut-Free",
    "Soy-Free",
    "Fish-Free",
    "Shellfish-Free",
    "Pork-Free",
    "Red-Meat-Free",
    "Celery-Free",
    "Mustard-Free",
    "Sesame-Free",
    "Lupine-Free",
    "Mollusk-Free",
    "Alcohol-Free",
    "No oil added",
    "FODMAP-Free",
    "Kosher",
    "Immuno-Supportive"
    ],
    "cautions": [],
    "ingredientLines": [
    "1 whole chicken, 3 1/2 to 4 pounds",
    "Kosher salt and freshly ground black pepper"
    ],
    "ingredients": [
    {
    "text": "1 whole chicken, 3 1/2 to 4 pounds",
    "weight": 1700.9713875,
    "foodCategory": "Poultry",
    "foodId": "food_bmyxrshbfao9s1amjrvhoauob6mo",
    "image": "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg"
    },
    {
    "text": "Kosher salt and freshly ground black pepper",
    "weight": 10.205828325,
    "foodCategory": "Condiments and sauces",
    "foodId": "food_a1vgrj1bs8rd1majvmd9ubz8ttkg",
    "image": "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg"
    },
    {
    "text": "Kosher salt and freshly ground black pepper",
    "weight": 5.1029141625,
    "foodCategory": "Condiments and sauces",
    "foodId": "food_b6ywzluaaxv02wad7s1r9ag4py89",
    "image": "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg"
    }
    ],
    "calories": 2499.628483072875,
    "totalWeight": 1714.2190942311247,
    "totalTime": 60,
    "cuisineType": [
    "mediterranean"
    ],
    "mealType": [
    "lunch/dinner"
    ],
    "dishType": [
    "main course"
    ],
    "totalNutrients": {
    "ENERC_KCAL": {
    "label": "Energy",
    "quantity": 2499.628483072875,
    "unit": "kcal"
    },
    "FAT": {
    "label": "Fat",
    "quantity": 174.35943285279748,
    "unit": "g"
    },
    "FASAT": {
    "label": "Saturated",
    "quantity": 49.92310198999199,
    "unit": "g"
    },
    "FATRN": {
    "label": "Trans",
    "quantity": 1.121960727195,
    "unit": "g"
    },
    "FAMS": {
    "label": "Monounsaturated",
    "quantity": 72.21332845006087,
    "unit": "g"
    },
    "FAPU": {
    "label": "Polyunsaturated",
    "quantity": 37.41106263839175,
    "unit": "g"
    },
    "CHOCDF": {
    "label": "Carbs",
    "quantity": 3.2633136069187505,
    "unit": "g"
    },
    "FIBTG": {
    "label": "Fiber",
    "quantity": 1.2910372831125,
    "unit": "g"
    },
    "SUGAR": {
    "label": "Sugars",
    "quantity": 0.03265865064,
    "unit": "g"
    },
    "PROCNT": {
    "label": "Protein",
    "quantity": 215.66905387248374,
    "unit": "g"
    },
    "CHOLE": {
    "label": "Cholesterol",
    "quantity": 867.495407625,
    "unit": "mg"
    },
    "NA": {
    "label": "Sodium",
    "quantity": 3967.4416670301102,
    "unit": "mg"
    },
    "CA": {
    "label": "Calcium",
    "quantity": 151.79331974134493,
    "unit": "mg"
    },
    "MG": {
    "label": "Magnesium",
    "quantity": 240.13953984356124,
    "unit": "mg"
    },
    "K": {
    "label": "Potassium",
    "quantity": 2254.557739840115,
    "unit": "mg"
    },
    "FE": {
    "label": "Iron",
    "quantity": 10.932315672155212,
    "unit": "mg"
    },
    "ZN": {
    "label": "Zinc",
    "quantity": 15.221122590952376,
    "unit": "mg"
    },
    "P": {
    "label": "Phosphorus",
    "quantity": 1708.35360332175,
    "unit": "mg"
    },
    "VITA_RAE": {
    "label": "Vitamin A",
    "quantity": 475.60860965887497,
    "unit": "µg"
    },
    "VITC": {
    "label": "Vitamin C",
    "quantity": 18.506568696,
    "unit": "mg"
    },
    "THIA": {
    "label": "Thiamin (B1)",
    "quantity": 0.6995074733954999,
    "unit": "mg"
    },
    "RIBF": {
    "label": "Riboflavin (B2)",
    "quantity": 1.3971778976925,
    "unit": "mg"
    },
    "NIA": {
    "label": "Niacin (B3)",
    "quantity": 78.72280987231237,
    "unit": "mg"
    },
    "VITB6A": {
    "label": "Vitamin B6",
    "quantity": 4.063161382462875,
    "unit": "mg"
    },
    "FOLDFE": {
    "label": "Folate equivalent (total)",
    "quantity": 70.267128017625,
    "unit": "µg"
    },
    "FOLFD": {
    "label": "Folate (food)",
    "quantity": 70.267128017625,
    "unit": "µg"
    },
    "FOLAC": {
    "label": "Folic acid",
    "quantity": 0,
    "unit": "µg"
    },
    "VITB12": {
    "label": "Vitamin B12",
    "quantity": 3.58564768485,
    "unit": "µg"
    },
    "VITD": {
    "label": "Vitamin D",
    "quantity": 2.313321087,
    "unit": "µg"
    },
    "TOCPHA": {
    "label": "Vitamin E",
    "quantity": 3.52305193779,
    "unit": "mg"
    },
    "VITK1": {
    "label": "Vitamin K",
    "quantity": 25.703378636512497,
    "unit": "µg"
    },
    "WATER": {
    "label": "Water",
    "quantity": 763.9324053454346,
    "unit": "g"
    }
    },
    "totalDaily": {
    "ENERC_KCAL": {
    "label": "Energy",
    "quantity": 124.98142415364374,
    "unit": "%"
    },
    "FAT": {
    "label": "Fat",
    "quantity": 268.2452813119961,
    "unit": "%"
    },
    "FASAT": {
    "label": "Saturated",
    "quantity": 249.61550994995997,
    "unit": "%"
    },
    "CHOCDF": {
    "label": "Carbs",
    "quantity": 1.08777120230625,
    "unit": "%"
    },
    "FIBTG": {
    "label": "Fiber",
    "quantity": 5.164149132450001,
    "unit": "%"
    },
    "PROCNT": {
    "label": "Protein",
    "quantity": 431.3381077449675,
    "unit": "%"
    },
    "CHOLE": {
    "label": "Cholesterol",
    "quantity": 289.165135875,
    "unit": "%"
    },
    "NA": {
    "label": "Sodium",
    "quantity": 165.31006945958794,
    "unit": "%"
    },
    "CA": {
    "label": "Calcium",
    "quantity": 15.179331974134493,
    "unit": "%"
    },
    "MG": {
    "label": "Magnesium",
    "quantity": 57.17608091513363,
    "unit": "%"
    },
    "K": {
    "label": "Potassium",
    "quantity": 47.96931361361948,
    "unit": "%"
    },
    "FE": {
    "label": "Iron",
    "quantity": 60.73508706752895,
    "unit": "%"
    },
    "ZN": {
    "label": "Zinc",
    "quantity": 138.3738417359307,
    "unit": "%"
    },
    "P": {
    "label": "Phosphorus",
    "quantity": 244.05051476024997,
    "unit": "%"
    },
    "VITA_RAE": {
    "label": "Vitamin A",
    "quantity": 52.845401073208336,
    "unit": "%"
    },
    "VITC": {
    "label": "Vitamin C",
    "quantity": 20.562854106666666,
    "unit": "%"
    },
    "THIA": {
    "label": "Thiamin (B1)",
    "quantity": 58.292289449624995,
    "unit": "%"
    },
    "RIBF": {
    "label": "Riboflavin (B2)",
    "quantity": 107.47522289942307,
    "unit": "%"
    },
    "NIA": {
    "label": "Niacin (B3)",
    "quantity": 492.0175617019523,
    "unit": "%"
    },
    "VITB6A": {
    "label": "Vitamin B6",
    "quantity": 312.5508755740673,
    "unit": "%"
    },
    "FOLDFE": {
    "label": "Folate equivalent (total)",
    "quantity": 17.56678200440625,
    "unit": "%"
    },
    "VITB12": {
    "label": "Vitamin B12",
    "quantity": 149.40198686875001,
    "unit": "%"
    },
    "VITD": {
    "label": "Vitamin D",
    "quantity": 15.422140579999999,
    "unit": "%"
    },
    "TOCPHA": {
    "label": "Vitamin E",
    "quantity": 23.487012918599998,
    "unit": "%"
    },
    "VITK1": {
    "label": "Vitamin K",
    "quantity": 21.41948219709375,
    "unit": "%"
    }
    },
    "digest": [
    {
    "label": "Fat",
    "tag": "FAT",
    "schemaOrgTag": "fatContent",
    "total": 174.35943285279748,
    "hasRDI": true,
    "daily": 268.2452813119961,
    "unit": "g",
    "sub": [
    {
    "label": "Saturated",
    "tag": "FASAT",
    "schemaOrgTag": "saturatedFatContent",
    "total": 49.92310198999199,
    "hasRDI": true,
    "daily": 249.61550994995997,
    "unit": "g"
    },
    {
    "label": "Trans",
    "tag": "FATRN",
    "schemaOrgTag": "transFatContent",
    "total": 1.121960727195,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    },
    {
    "label": "Monounsaturated",
    "tag": "FAMS",
    "schemaOrgTag": null,
    "total": 72.21332845006087,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    },
    {
    "label": "Polyunsaturated",
    "tag": "FAPU",
    "schemaOrgTag": null,
    "total": 37.41106263839175,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    }
    ]
    },
    {
    "label": "Carbs",
    "tag": "CHOCDF",
    "schemaOrgTag": "carbohydrateContent",
    "total": 3.2633136069187505,
    "hasRDI": true,
    "daily": 1.08777120230625,
    "unit": "g",
    "sub": [
    {
    "label": "Carbs (net)",
    "tag": "CHOCDF.net",
    "schemaOrgTag": null,
    "total": 1.9722763238062504,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    },
    {
    "label": "Fiber",
    "tag": "FIBTG",
    "schemaOrgTag": "fiberContent",
    "total": 1.2910372831125,
    "hasRDI": true,
    "daily": 5.164149132450001,
    "unit": "g"
    },
    {
    "label": "Sugars",
    "tag": "SUGAR",
    "schemaOrgTag": "sugarContent",
    "total": 0.03265865064,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    },
    {
    "label": "Sugars, added",
    "tag": "SUGAR.added",
    "schemaOrgTag": null,
    "total": 0,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    }
    ]
    },
    {
    "label": "Protein",
    "tag": "PROCNT",
    "schemaOrgTag": "proteinContent",
    "total": 215.66905387248374,
    "hasRDI": true,
    "daily": 431.3381077449675,
    "unit": "g"
    },
    {
    "label": "Cholesterol",
    "tag": "CHOLE",
    "schemaOrgTag": "cholesterolContent",
    "total": 867.495407625,
    "hasRDI": true,
    "daily": 289.165135875,
    "unit": "mg"
    },
    {
    "label": "Sodium",
    "tag": "NA",
    "schemaOrgTag": "sodiumContent",
    "total": 3967.4416670301102,
    "hasRDI": true,
    "daily": 165.31006945958794,
    "unit": "mg"
    },
    {
    "label": "Calcium",
    "tag": "CA",
    "schemaOrgTag": null,
    "total": 151.79331974134493,
    "hasRDI": true,
    "daily": 15.179331974134493,
    "unit": "mg"
    },
    {
    "label": "Magnesium",
    "tag": "MG",
    "schemaOrgTag": null,
    "total": 240.13953984356124,
    "hasRDI": true,
    "daily": 57.17608091513363,
    "unit": "mg"
    },
    {
    "label": "Potassium",
    "tag": "K",
    "schemaOrgTag": null,
    "total": 2254.557739840115,
    "hasRDI": true,
    "daily": 47.96931361361948,
    "unit": "mg"
    },
    {
    "label": "Iron",
    "tag": "FE",
    "schemaOrgTag": null,
    "total": 10.932315672155212,
    "hasRDI": true,
    "daily": 60.73508706752895,
    "unit": "mg"
    },
    {
    "label": "Zinc",
    "tag": "ZN",
    "schemaOrgTag": null,
    "total": 15.221122590952376,
    "hasRDI": true,
    "daily": 138.3738417359307,
    "unit": "mg"
    },
    {
    "label": "Phosphorus",
    "tag": "P",
    "schemaOrgTag": null,
    "total": 1708.35360332175,
    "hasRDI": true,
    "daily": 244.05051476024997,
    "unit": "mg"
    },
    {
    "label": "Vitamin A",
    "tag": "VITA_RAE",
    "schemaOrgTag": null,
    "total": 475.60860965887497,
    "hasRDI": true,
    "daily": 52.845401073208336,
    "unit": "µg"
    },
    {
    "label": "Vitamin C",
    "tag": "VITC",
    "schemaOrgTag": null,
    "total": 18.506568696,
    "hasRDI": true,
    "daily": 20.562854106666666,
    "unit": "mg"
    },
    {
    "label": "Thiamin (B1)",
    "tag": "THIA",
    "schemaOrgTag": null,
    "total": 0.6995074733954999,
    "hasRDI": true,
    "daily": 58.292289449624995,
    "unit": "mg"
    },
    {
    "label": "Riboflavin (B2)",
    "tag": "RIBF",
    "schemaOrgTag": null,
    "total": 1.3971778976925,
    "hasRDI": true,
    "daily": 107.47522289942307,
    "unit": "mg"
    },
    {
    "label": "Niacin (B3)",
    "tag": "NIA",
    "schemaOrgTag": null,
    "total": 78.72280987231237,
    "hasRDI": true,
    "daily": 492.0175617019523,
    "unit": "mg"
    },
    {
    "label": "Vitamin B6",
    "tag": "VITB6A",
    "schemaOrgTag": null,
    "total": 4.063161382462875,
    "hasRDI": true,
    "daily": 312.5508755740673,
    "unit": "mg"
    },
    {
    "label": "Folate equivalent (total)",
    "tag": "FOLDFE",
    "schemaOrgTag": null,
    "total": 70.267128017625,
    "hasRDI": true,
    "daily": 17.56678200440625,
    "unit": "µg"
    },
    {
    "label": "Folate (food)",
    "tag": "FOLFD",
    "schemaOrgTag": null,
    "total": 70.267128017625,
    "hasRDI": false,
    "daily": 0,
    "unit": "µg"
    },
    {
    "label": "Folic acid",
    "tag": "FOLAC",
    "schemaOrgTag": null,
    "total": 0,
    "hasRDI": false,
    "daily": 0,
    "unit": "µg"
    },
    {
    "label": "Vitamin B12",
    "tag": "VITB12",
    "schemaOrgTag": null,
    "total": 3.58564768485,
    "hasRDI": true,
    "daily": 149.40198686875001,
    "unit": "µg"
    },
    {
    "label": "Vitamin D",
    "tag": "VITD",
    "schemaOrgTag": null,
    "total": 2.313321087,
    "hasRDI": true,
    "daily": 15.422140579999999,
    "unit": "µg"
    },
    {
    "label": "Vitamin E",
    "tag": "TOCPHA",
    "schemaOrgTag": null,
    "total": 3.52305193779,
    "hasRDI": true,
    "daily": 23.487012918599998,
    "unit": "mg"
    },
    {
    "label": "Vitamin K",
    "tag": "VITK1",
    "schemaOrgTag": null,
    "total": 25.703378636512497,
    "hasRDI": true,
    "daily": 21.41948219709375,
    "unit": "µg"
    },
    {
    "label": "Sugar alcohols",
    "tag": "Sugar.alcohol",
    "schemaOrgTag": null,
    "total": 0,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    },
    {
    "label": "Water",
    "tag": "WATER",
    "schemaOrgTag": null,
    "total": 763.9324053454346,
    "hasRDI": false,
    "daily": 0,
    "unit": "g"
    }
    ]
    }
}]}
export default function Examples() {

    return (
    <>
        <div className='topSection'>
            <div  className='titleImage'>
                <img src='https://api-go.app/img/edamam.jpg'></img>
            </div>
            <div className='apiGoLogoDiv'>  
                <img src='https://api-go.app/img/api-go.png'></img>
            </div>
        </div>
            <br />
            <h2>Your API-KEY is: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}</h2>
            <br />
            <h2>Your API-ID is: ${response.appId ? response.appId : 'APP-ID was not provided'}</h2>
        <h2> If you don't have it yet, get your Free <a target='_blank' href='https://developer.edamam.com/'>Edamam API</a> key</h2>
        <br />
        <h1>Edamam API</h1> 
        <p>Home to APIs based on Nutrition Analysis, Recipe Searching, Meal recommendation and more!</p>
        <h4>--Be aware you need to signup separately to use each of their APIs, as they all provide different Ap Id's to use with with each Free account.--
        </h4>
        <br />
        <div className='exampleContainerDiv'>
            <h2>Recipe Search</h2>
            <p><b>Base Path:</b> https://api.edamam.com/search
            <br />
            For recipes in <i>Spanish</i> you need to access the Beta for it at <b>Path</b>: https://test-es.edamam.com/search
            </p>
                <div className='exampleTopDiv'>
                    <h2>Query Parameters:</h2>
                    <h4>* It IS required to have either the <i>q</i> or <i>r</i> parameter in all searches</h4>
                    <hr className='exampleHr' />
                    <br />
                    <table className='exampleTable1'>
                    <tr> 
                        <td>
                        <b>PARAMETERS</b>
                        </td>
                        <td>
                        <b>REQUIRED</b>
                        </td>
                        <td>
                        <b>TYPE</b>
                        </td>
                        <td>
                        <b>DESCRIPTION</b>
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>q</b>
                        </td>
                        <td>
                        <b>✔️&nbsp;*</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Query text. For example q=chicken.
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>r</b>
                        </td>
                        <td>
                        <b>✔️&nbsp;*</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Returns information about a specific recipe based on its ID
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>app_id</b>
                        </td>
                        <td>
                        <b>✔️</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Your ID specific to the application
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>app_key</b>
                        </td>
                        <td>
                        <b>✔️</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Your application key
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>from</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>integer</b>
                        </td>
                        <td>
                        First result index (default 0). Example: from=20. The maximum value of the “from” parameter is limitted by the number of results a plan is entitled to.
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>to</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>integer</b>
                        </td>
                        <td>
                        Last result index (exclusive, default from + 10). Example: to=30
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>ingr</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>integer</b>
                        </td>
                        <td>
                        Maximum number of ingredients. Example: ingr=5
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>diet</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>enum</b>
                        </td>
                        <td>
                        Diet label: one of “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>health</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>enum</b>
                        </td>
                        <td>
                        Health label: One of the Health api parameters listed in Diet and Health Labels table at the end of this documentation. Multiple labels cab be submitted simultaneously this way “health=peanut-free&health=tree-nut-free”
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>cuisineType</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>enum</b>
                        </td>
                        <td>
                        The type of cuisine of the recipe. You can simultaneously use several cuisines this way “cuisineType=chinese&cuisineType=indian”
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>mealType</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>enum</b>
                        </td>
                        <td>
                        The type of meal a recipe belongs to – lunch, dinner, breakfast, snack
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>dishType</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>enum</b>
                        </td>
                        <td>
                        The dish type a recipe belongs to – soup, salad, sandwich etc. You can simultaneously use several dish types this way “dishType=soup&dishType=dessert”
                        </td>
                        </tr>
                    <tr> 
                        <td>
                        <b>calories</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>range</b>
                        </td>
                        <td>
                        The format is calories=RANGE where RANGE is replaced by the value in kcal. RANGE is in one of MIN+, MIN-MAX or MAX, where MIN and MAX are non-negative integer numbers. The + symbol needs to be properly encoded. Examples: “calories=100-300” will return all recipes with which have between 100 and 300 kcal per serving.
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>time</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>range</b>
                        </td>
                        <td>
                        Time range for the total cooking and prep time for a recipe . The format is time=RANGE where RANGE is replaced by the value in minutes. RANGE is in one of MIN+, MIN-MAX or MAX, where MIN and MAX are non-negative integer numbers. The + symbol needs to be properly encoded. Examples: “time=1%2B” will return all recipes with available total time greater then 1 minute
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>excluded</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Excluding recipes with certain ingredients. The format is excluded=FOOD where FOOD is replaced by the name of the specific food you don’t want to be present in the recipe results. More than one food can be excluded at the same time. Example: excluded=vinegar&excluded=pretzel will exclude any recipes which contain vinegar or pretzels in their ingredient list
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>callback</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        Callback parameter for JSONP. This will “envelop” the result in a JavaScript function call to the specified callback. Optional
                        </td>
                    </tr>
                    <tr> 
                        <td>
                        <b>imageSize</b>
                        </td>
                        <td>
                        <b>❌</b>
                        </td>
                        <td>
                        <b>string</b>
                        </td>
                        <td>
                        This parameter narrows down the search of the recipes based on whether the image size defined is available for the recipe. The possible values are THUMBNAIL, SMALL, REGULAR, and LARGE. See Image Sizes below for dimension specifics and how to get the different sizes with the image URL. Having “imageSize=THUMBNAIL” will return recipes that have an image with THUMBNAIL dimensions available.
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <br />
            <br />

            <div className='exampleTopDiv'>
                <h2>Search by nutrient range</h2>
                <hr className='exampleHr' />
                <br />
                <p>
                You can specify nutrient ranges by adding parameters in the following form:
                <br />
                nutrients[NTR]=RANGE where
                <br />
                <br />
                NTR is one of: CA, CHOCDF, CHOLE, FAMS, FAPU, FASAT, FAT, FATRN, FE, FIBTG, FOLDFE, K, MG, NA, NIA, P, PROCNT, RIBF, <br />SUGAR, THIA, TOCPHA, VITA_RAE, VITB12, VITB6A, VITC, VITD, VITK1 or ZN;
                <br />
                <br />
                and
                <br />
                <br />
                RANGE is in one of MIN+, MIN-MAX or MAX, where MIN and MAX are non-negative integer numbers.
                <br />
                <br />
                For example:
                <br />
                nutrients[CA]=50+ means minimum 50 mg calcium, where ‘50+’ has to be properly encoded as ‘50%2B’<br />
                nutrients[FAT]=30 means maximum 30 g fat and<br />
                nutrients[FE]=5-10 means iron between 5 mg and 10 mg inclusive<br />
                note: always encode the URL i.e. nutrients[FE] is nutrients%5BFE%5D<br />
                <br />
                You can combine more than one nutrient ranges in a search requests
                </p>
                <hr className='exampleHr' />
                <br />
                <table className='exampleTable1'>
                <tr> 
                    <td>
                    <b>NTR Code</b>
                    </td>
                    <td>
                    <b>Name</b>
                    </td>
                    <td>
                    <b>Unit</b>
                    </td>
                    <td>
                    <b>NTR Code</b>
                    </td>
                    <td>
                    <b>Name</b>
                    </td>
                    <td>
                    <b>Unit</b>
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>CA</b>
                    </td>
                    <td>
                    Calcium
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>ENERC_KCAL</b>
                    </td>
                    <td>
                    Energy
                    </td>
                    <td>
                    kcal
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>CHOCDF</b>
                    </td>
                    <td>
                    Carbs
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>NIA</b>
                    </td>
                    <td>
                    Niacin (B3)
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>CHOLE</b>
                    </td>
                    <td>
                    Cholesterol
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>P</b>
                    </td>
                    <td>
                    Phosphorus
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FAMS</b>
                    </td>
                    <td>
                    Monounsaturated
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>PROCNT</b>
                    </td>
                    <td>
                    Protein
                    </td>
                    <td>
                    g
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FAPU</b>
                    </td>
                    <td>
                    Polyunsaturated
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>RIBF</b>
                    </td>
                    <td>
                    Riboflavin (B2)
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FASAT</b>
                    </td>
                    <td>
                    Saturated
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>SUGAR</b>
                    </td>
                    <td>
                    Sugars
                    </td>
                    <td>
                    g
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FAT</b>
                    </td>
                    <td>
                    Fat
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>THIA</b>
                    </td>
                    <td>
                    Thiamin (B1)
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FATRN</b>
                    </td>
                    <td>
                    Trans
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>TOCPHA</b>
                    </td>
                    <td>
                    Vitamin E
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FE</b>
                    </td>
                    <td>
                    Iron
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>VITA_RAE</b>
                    </td>
                    <td>
                    Vitamin A
                    </td>
                    <td>
                    æg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FIBTG</b>
                    </td>
                    <td>
                    Fiber
                    </td>
                    <td>
                    g
                    </td>
                    <td>
                    <b>VITB12</b>
                    </td>
                    <td>
                    Vitamin B12
                    </td>
                    <td>
                    æg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>FOLDFE</b>
                    </td>
                    <td>
                    Folate (Equivalent)
                    </td>
                    <td>
                    æg
                    </td>
                    <td>
                    <b>VITB6A</b>
                    </td>
                    <td>
                    Vitamin B6
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>K</b>
                    </td>
                    <td>
                    Potassium
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>VITC</b>
                    </td>
                    <td>
                    Vitamin C
                    </td>
                    <td>
                    mg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>MG</b>
                    </td>
                    <td>
                    Magnesium
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>VITD</b>
                    </td>
                    <td>
                    Vitamin D
                    </td>
                    <td>
                    æg
                    </td>
                </tr>
                <tr> 
                    <td>
                    <b>NA</b>
                    </td>
                    <td>
                    Sodium
                    </td>
                    <td>
                    mg
                    </td>
                    <td>
                    <b>VITK1</b>
                    </td>
                    <td>
                    Vitamin K
                    </td>
                    <td>
                    æg
                    </td>
                </tr>
                </table>
            </div>
            <br />
            <br/>
            <br />
            <h2>Querying the API:</h2>
            <div className='exampleTopDiv'>
            <h2>Example:</h2>
            <hr className='exampleHr' />
            <br />
            <h4><i>https://api.edamam.com/search?q=chicken&app_id=APP-ID&app_key=APP-KEY&from=0&to=3&calories=591-722&health=alcohol-free/</i></h4>
            <p>This request performs a <i><b>keyword</b></i> search for <i><b>chicken</b></i>, it returns <i><b>0 to 3</b></i> results that range from  <i><b>591 - 792 calories</b></i> and they are <i><b>alcohol-free</b></i>.  Example object of 1 recipe returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(exampleEmdamam, null, 2)}
            </pre>
        </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        </>
        )
        }
        `
    )
}

function EdamamFetch() {
    return(
        `
        //Base Fetch Code
        const [data, setData] = useState([])

        useEffect(() => {
        (async () => {
            try{
                const res = await fetch(\`https://api.edamam.com/search?q=chicken&app_id=\${secrets.appId}&app_key=\${secrets.apiKey}&from=0&to=12&calories=591-722\`);
                const data = await res.json()
                await setData(data.hits)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
        `
    )
}

function EdamamCode() {
    return(
        `
        <br />
        <br />
        <h1>Example Display Data:</h1>
        <div className='exampleFetchContainerDiv'>
                    { 
                        data.map((recipe) => {
                            return (
                                <>
                                    <div className='exampleFetchDiv'>
                                    <h3>{recipe.recipe.label}</h3>
                                    <a href={recipe.recipe.url} target='_blank'>
                                    <img class='newsImgs' src={recipe.recipe.image}/></a>
                                    </div>
                                </>
                            )
                        }) 
                    }
        </div>
        `
    )
}

function MovieExample(response){
    return(
        `
    import React, { useState, useEffect } from "react";
    import NavBar from "./NavBar";

    const idOrTitle = {
    "Title": "Superman",
    "Year": "1978",
    "Rated": "PG",
    "Released": "15 Dec 1978",
    "Runtime": "143 min",
    "Genre": "Action, Adventure, Drama, Sci-Fi",
    "Director": "Richard Donner",
    "Writer": "Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Mario Puzo (story), Mario Puzo (screenplay), David Newman (screenplay), Leslie Newman (screenplay), Robert Benton (screenplay)",
    "Actors": "Marlon Brando, Gene Hackman, Christopher Reeve, Ned Beatty",
    "Plot": "An alien orphan is sent from his dying planet to Earth, where he grows up to become his adoptive home\'s first and greatest superhero.",
    "Language": "English",
    "Country": "USA, UK, Canada, Switzerland, France",
    "Awards": "Nominated for 3 Oscars. Another 16 wins & 20 nominations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    "Ratings": [
    {
    "Source": "Internet Movie Database",
    "Value": "7.3/10"
    },
    {
    "Source": "Rotten Tomatoes",
    "Value": "94%"
    },
    {
    "Source": "Metacritic",
    "Value": "80/100"
    }
    ],
    "Metascore": "80",
    "imdbRating": "7.3",
    "imdbVotes": "160,136",
    "imdbID": "tt0078346",
    "Type": "movie",
    "DVD": "15 Aug 2008",
    "BoxOffice": "$134,451,603",
    "Production": "Dovemead Films",
    "Website": "N/A",
    "Response": "True"
    }
    const idOrTitle2 = {
        "Title": "Seinfeld",
        "Year": "1989–1998",
        "Rated": "TV-PG",
        "Released": "05 Jul 1989",
        "Runtime": "22 min",
        "Genre": "Comedy",
        "Director": "N/A",
        "Writer": "Larry David, Jerry Seinfeld",
        "Actors": "Jerry Seinfeld, Jason Alexander, Michael Richards, Julia Louis-Dreyfus",
        "Plot": "Jerry Seinfeld stars in this television comedy series as himself, a comedian. The premise of this sitcom is Jerry and his friends going through everyday life, discussing various quirky situations that we can all relate to (especially if we live in New York). The eccentric personalities of the offbeat characters who make up Jerry's social circle contribute to the fun.",
        "Language": "English",
        "Country": "USA",
        "Awards": "Won 3 Golden Globes. Another 71 wins & 185 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        "Ratings": [
        {
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
        },
        {
        "Source": "Rotten Tomatoes",
        "Value": "78%"
        }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.8",
        "imdbVotes": "257,792",
        "imdbID": "tt0098904",
        "Type": "series",
        "totalSeasons": "9",
        "Response": "True"
        }
    const idOrTitle3 = {
        "Title": "Godfather",
        "Year": "1991",
        "Rated": "Not Rated",
        "Released": "15 Nov 1991",
        "Runtime": "150 min",
        "Genre": "Comedy, Drama, Romance",
        "Director": "Lal, Siddique",
        "Writer": "Lal (screenplay,  story & dialogue), Siddique",
        "Actors": "N.N. Pillai, Mukesh, Kanaka, Philomina",
        "Plot": "Two rival clans under Anjooran and Achamma have a history of mutual hatred. Anjooran, convinced that women are the root of all evil, ensures that all his sons stay bachelors. The youngest son, Ramabhadran falls in love with Malu, from Achamma\'s family. A complicated tug-of-war ensues.",
        "Language": "Malayalam",
        "Country": "India",
        "Awards": "2 wins.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg",
        "Ratings": [
        {
        "Source": "Internet Movie Database",
        "Value": "8.6/10"
        }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.6",
        "imdbVotes": "3,022",
        "imdbID": "tt0353496",
        "Type": "movie",
        "DVD": "N/A",
        "BoxOffice": "N/A",
        "Production": "N/A",
        "Website": "N/A",
        "Response": "True"
        }
        const searchTitle ={
            "Search": [
            {
            "Title": "Batman v Superman: Dawn of Justice",
            "Year": "2016",
            "imdbID": "tt2975590",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            },
            {
            "Title": "Superman Returns",
            "Year": "2006",
            "imdbID": "tt0348150",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            },
            {
            "Title": "Superman",
            "Year": "1978",
            "imdbID": "tt0078346",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            },
            {
            "Title": "Superman II",
            "Year": "1980",
            "imdbID": "tt0081573",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BODk2NjgzNTEtYzZhZC00ZTBkLTllMGQtMmMxMzU1NDRkM2RlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            },
            {
            "Title": "Superman III",
            "Year": "1983",
            "imdbID": "tt0086393",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
            },
            {
            "Title": "Superman IV: The Quest for Peace",
            "Year": "1987",
            "imdbID": "tt0094074",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMmIwZWY1YTYtNDlhOS00NDRmLWI4MzItNjk2NDc1N2NhYzNlXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg"
            },
            {
            "Title": "Superman/Batman: Apocalypse",
            "Year": "2010",
            "imdbID": "tt1673430",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
            {
            "Title": "Superman/Batman: Public Enemies",
            "Year": "2009",
            "imdbID": "tt1398941",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDc5NTFiMzgtZWJiOS00N2M1LWJmOGYtZmNjMzFhMzcxZjRiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
            {
            "Title": "Superman: Doomsday",
            "Year": "2007",
            "imdbID": "tt0934706",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjU4MzIyZWUtNWQ4Yy00YTU4LTk5NjUtNDBiNDkxZTVlZDgwXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
            },
            {
            "Title": "Superman II: The Richard Donner Cut",
            "Year": "1980",
            "imdbID": "tt0839995",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDhiNzNhNmMtMjhiZS00Mjc4LWE5ZmEtZjg5YTY2M2FkZmNiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            }
            ],
            "totalResults": "225",
            "Response": "True"
            }
export default function Examples() {

      return (
      <>
            <div className='topSection'>
                <div  className='titleImage'>
                  <img src='https://api-go.app/img/movie.jpg'></img>
                </div>
                <div className='apiGoLogoDiv'> 
                <img src='https://api-go.app/img/api-go.png'></img>
                </div>
            </div>
              <br />
        
        <h2> If you dont't have it yet get your Free <a target='_blank' href='http://www.omdbapi.com/apikey.aspx'>OMDB API</a> key</h2>
        <h1>OMDB API</h1> 
     
<p>OMDB API allows you to search through over 75,000 news sources and blogs dating back the last 3 years.<br />
  They have 2 main endpoints to query(<i><b>everything</b></i> and <i>top-headlines</i>) with many parameters for each<br />
  <br />
  
  </p>
  <h4>***********************  Dont forget to remove key below! **********************</h4>
  <h3>My key for testing: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'} </h3>
  <br />
  <br />

<div className='exampleContainerDiv'>
    <h1>*** By ID or Title ***</h1>
    <div className='exampleTopDiv'>
        <h2>Query Parameters:</h2>
        <hr className='exampleHr' />
        <br />
        <h4>*Please note while both "i" and "t" are optional at least one argument is required.
        <br />Also, take note that query searches using i or t will return just 1 title.  Use s to return multiple titles
        </h4>
            <table className='exampleTable1'>
            <tr> 
                <td>
                <b>PARAMETERS</b>
                </td>
                <td>
                <b>REQUIRED</b>
                </td>
                <td>
                <b>VALID OPTIONS</b>
                </td>
                <td>
                <b>DEFAULT VALUE</b>
                </td>
                <td>
                <b>DESCRIPTION</b>
                </td>
            </tr>
            <tr> 
                <td>
                <b>i</b>
                </td>
                <td>
                *Optional
                </td>
                <td>
                <b></b>
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                A valid IMDb ID (e.g. tt1285016)
                </td>
            </tr>
            <tr> 
                <td>
                <b>t</b>
                </td>
                <td>
                *Optional
                </td>
                <td>
                
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Movie title to search for
                </td>
            </tr>
            <tr> 
                <td>
                <b>type</b>
                </td>
                <td>
                no
                </td>
                <td>
                movie, series, episode
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Type of result to return
                </td>
            </tr>
            <tr> 
                <td>
                <b>y</b>
                </td>
                <td>
                no
                </td>
                <td>
                
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Year of release
                </td>
            </tr>
            <tr> 
                <td>
                <b>plot</b>
                </td>
                <td>
                no
                </td>
                <td>
                short, full
                </td>
                <td>
                short
                </td>
                <td>
                Return short or full plot
                </td>
            </tr>
            <tr> 
                <td>
                <b>r</b>
                </td>
                <td>
                no
                </td>
                <td>
                json, xml
                </td>
                <td>
                json
                </td>
                <td>
                The data type to return
                </td>
            </tr>
            <tr> 
                <td>
                <b>callback</b>
                </td>
                <td>
                no
                </td>
                <td>
                <b></b>
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                JSONP callback name
                </td>
            </tr>
            <tr> 
                <td>
                <b>v</b>
                </td>
                <td>
                no
                </td>
                <td>
                
                </td>
                <td>
                1
                </td>
                <td>
                API version (reserved for future use)
                </td>
            </tr>
        </table>
        <br />
        <br />
        <h2>Query Examples using i or t:</h2>
        <hr className='exampleHr' />
        <h4><i>http://www.omdbapi.com/?apikey=API-KEY&t=seinfeld&type=series&plot=full</i></h4>
        <p>Search will return the main title for <i><b>Seinfeld</b></i> with the <i><b>type</b></i> of <i><b>series</b></i> and the <i><b>plot</b> </i>is <i><b>full</b> </i>. The query will return an object that looks like this:</p>
        <pre className='showJson'>
        {JSON.stringify(idOrTitle2, null, 2)}
        </pre>
        <br />
        <br />

        <hr className='exampleHr' />
        <h4><i>http://www.omdbapi.com/?apikey=API-KEY&i=tt0353496&plot=full</i></h4>
        <p>Searches all the movie database for the <i>IMDB ID</i> of  <i>tt0353496</i> and a <i>plot</i> of <i>full</i> and it will return an object that looks like this:</p>
        <pre className='showJson'>
        {JSON.stringify(idOrTitle3, null, 2)}
        </pre>
        <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <h1>*** By Search ***</h1>
        <div className='exampleTopDiv'>
            <h2>Query Parameters:</h2>
            <h4><br />Please note query searches using s will return multiple titles, while using i or t will return just 1 title.</h4>
            <hr className='exampleHr' />
            <br />
            <table className='exampleTable1'>
            <tr> 
                <td>
                <b>PARAMETERS</b>
                </td>
                <td>
                <b>REQUIRED</b>
                </td>
                <td>
                <b>VALID OPTIONS</b>
                </td>
                <td>
                <b>DEFAULT VALUE</b>
                </td>
                <td>
                <b>DESCRIPTION</b>
                </td>
            </tr>
            <tr> 
                <td>
                <b>s</b>
                </td>
                <td>
                yes
                </td>
                <td>
                
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Movie title to search for
                </td>
            </tr>
            <tr> 
                <td>
                <b>type</b>
                </td>
                <td>
                no
                </td>
                <td>
                movie, series, episode
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Type of result to return
                </td>
            </tr>
            <tr> 
                <td>
                <b>y</b>
                </td>
                <td>
                no
                </td>
                <td>
                
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                Year of release
                </td>
            </tr>
            <tr> 
                <td>
                <b>r</b>
                </td>
                <td>
                no
                </td>
                <td>
                json, xml
                </td>
                <td>
                json
                </td>
                <td>
                The data type to return.
                </td>
            </tr>
            <tr> 
                <td>
                <b>page</b>
                </td>
                <td>
                no
                </td>
                <td>
                1 - 100
                </td>
                <td>
                1
                </td>
                <td>
                Page number to return
                </td>
            </tr>
            <tr> 
                <td>
                <b>callback</b>
                </td>
                <td>
                no
                </td>
                <td>
                
                </td>
                <td>
                {'<empty>'}
                </td>
                <td>
                JSONP callback name
                </td>
            </tr>
            <tr> 
                <td>
                <b>v</b>
                </td>
                <td>
                no
                </td>
                <td>
                
                </td>
                <td>
                1
                </td>
                <td>
                API version (reserved for future use).
                </td>
            </tr>
            </table>
        <br />
        <br />
        <br />
        <h2>Query Examples using s:</h2>
        <hr className='exampleHr' />
        <h4><i>http://www.omdbapi.com/?apikey=fe27de2&s=superman&type=movie</i></h4>
        <p>Searches the movie database for the <i><b>title</b></i> of  <i><b>superman</b></i> and a <i><b>plot</b></i> of <i><b>full</b></i> <br />It will return an object that has an array of 10 objects in and it, and it will look like this:</p>
        <pre className='showJson'>
        {JSON.stringify(searchTitle, null, 2)}
        </pre>
        <br />
        </div>
    </div>
    <br />
    <br />
    <br />
    <br />
        </>
    )}
    `)}

function MovieFetch(){
    return(
        `
        const [data, setData] = useState([])
        useEffect(() => {
            (async () => {
                try{
                    const res = await fetch(\`http://www.omdbapi.com/?apikey=\${secrets.apiKey}&s=superman&type=movie\`);
                    const data = await res.json()
                    await setData(data.Search)
                } catch (err) {
                    console.error(err)
                }
            })()
        }, [])
        if (!data) return <div />;
        `
    )
}

function MovieCode(){
    return(
        `
        <div className='exampleFetchContainerDiv'>
                    { 
                        data.map((movie) => {
                            return (
                                <><div className='exampleFetchDiv'>
                                    <h2> Movie Title: {movie.Title}</h2>
                                    <h3>Year Made: {movie.Year}</h3>
                                    <img src={movie.Poster}/>
                                    </div>
                                </>
                            )
                        }) 
                    }
            </div>
        `
    )
}

function NewsExample(response){
    return(
        `
        
import React, { useState, useEffect } from "react";

const everythingJson =
{
    "source": {
    "id": "mashable",
    "name": "Mashable"
    },
    "author": "Proma Khosla",
    "title": "'WandaVision\' wraps up with a straightforward finale — and classic MCU tease",
    "description": "WandaVision\'s ninth and final episode dropped on Friday, a surprisingly straightforward 49 minutes after one of the most sprawling and ambitious experiments in television history. That\'s refreshing compared to the increasingly bloated run times of superhero …",
    "url": "https://mashable.com/article/wandavision-finale/",
    "urlToImage": "https://mondrian.mashable.com/2021%252F03%252F05%252F97%252F0c7cfdfb9f424b848077da3ef4f18557.be7f7.jpg%252F1200x630.jpg?signature=3E6G9wiOXor7slwRSaIuo_-9aZ4=",
    "publishedAt": "2021-03-05T19:19:37Z",
    "content": "WandaVision\'s ninth and final episode dropped on Friday, a surprisingly straightforward 49 minutes after one of the most sprawling and ambitious experiments in television history. That\'s refreshing… [+6242 chars]"
    }
const everythingJson2 = 
{
    
    "source": {
    "id": "reuters",
    "name": "Reuters"
    },
    "author": "Noor Zainab Hussain, Carolyn Cohn",
    "title": "As Tesla takes the plunge, wary insurers watch crypto craze from the sidelines - Reuters UK",
    "description": "If Elon Musk\'s Tesla wanted to insure all of its recent $1.5 billion bitcoin investment against the myriad of pitfalls it could encounter, like hacks, theft and fraud, it would be out of luck.",
    "url": "https://www.reuters.com/article/us-crypto-currency-insurance-focus-idUSKBN2BO5IX",
    "urlToImage": "https://static.reuters.com/resources/r/?m=02&d=20210401&t=2&i=1557030921&r=LYNXMPEH302WP&w=800",
    "publishedAt": "2021-04-01T13:12:00Z",
    "content": "(Reuters) - If Elon Musks Tesla wanted to insure all of its recent $1.5 billion bitcoin investment against the myriad of pitfalls it could encounter, like hacks, theft and fraud, it would be out of l… [+5114 chars]"

}
const everythingJson3  =
{
    "source": {
    "id": "mashable",
    "name": "Mashable"
    },
    "author": "Mark Kaufman",
    "title": "See where NASA just zapped this odd Martian rock with a laser",
    "description": "On day 37 of its Martian mission (known as \\"sol 37\\"), the Perseverance rover zapped a curious, holey rock with a laser 10 times. It wasn\'t for sport. The laser is part of the rover\'s SuperCam, which looms atop the car-sized robot like a crow\'s nest on a ship…",
    "url": "https://mashable.com/article/mars-perseverance-rover-zapped-rock-laser/",
    "urlToImage": "https://mondrian.mashable.com/2021%252F04%252F03%252F4d%252F74b261f103fb446296caeecce8d727e3.b28e9.png%252F1200x630.png?signature=ui7NYiefofM6K-n0F4jtLi33Q5g=",
    "publishedAt": "2021-04-03T17:17:31Z",
    "content": "On day 37 of its Martian mission (known as \\"sol 37\\"), the Perseverance rover zapped a curious, holey rock with a laser 10 times. It wasn\'t for sport. The laser is part of the rover\'s SuperCam, whic… [+2556 chars]"
}
const topHeadlinesJson = {
    "source": {
    "id": "independent",
    "name": "Independent"
    },
    "author": "Jacob Stolworthy",
    "title": "DMX: Rapper in ‘grave condition’ after drug overdose triggers heart attack, report says - The Independent",
    "description": "Rapper is said to be in a ‘vegetative state’",
    "url": "https://www.independent.co.uk/arts-entertainment/music/news/dmx-overdose-hospital-drug-heart-attack-b1826418.html",
    "urlToImage": "https://static.independent.co.uk/2021/04/03/16/newFile.jpg?width=1200&auto=webp&quality=75",
    "publishedAt": "2021-04-03T16:14:18Z",
    "content": "DMX is in critical condition after taking a drug overdose, it has been reported.The rapper, 50, is believed to have been rushed to a New York hospital on Friday (2 April), with sources claiming the… [+2103 chars]"
}
const topHeadlinesJson2 =
{
    "source": {
    "id": "abc-news",
    "name": "ABC News"
    },
    "author": "The Associated Press",
    "title": "Leak at wastewater pond prompts evacuations in Florida",
    "description": "",
    "url": "https://abcnews.go.com/US/wireStory/leak-wastewater-pond-prompts-evacuations-florida-76854872",
    "urlToImage": "null",
    "publishedAt": "2021-04-03T17:14:00Z",
    "content": "BRADENTON, Fla. -- Officials in Florida were evacuating homes and a highway Saturday near a large reservoir of wastewater because of a significant leak that authorities fear could lead to floods and … [+978 chars]"
}
const topHeadlinesJson3 =
{
    "source": {
    "id": "nbc-news",
    "name": "NBC News"
    },
    "author": "Reuters",
    "title": "Amazon acknowledges issue of drivers urinating in bottles in apology to congressman - NBC News",
    "description": "Amazon.com Inc has apologized to U.S. Representative Mark Pocan, admitting to scoring an “own goal” in its initial denial of his suggestion that its drivers were sometimes forced to urinate in bottles during their delivery rounds.",
    "url": "https://www.nbcnews.com/news/us-news/amazon-acknowledges-issue-drivers-urinating-bottles-apology-congressman-n1262965",
    "urlToImage": "https://media1.s-nbcnews.com/j/newscms/2021_13/3461921/210403-amazon-driver-mb-1446_d29b15f392d6f46d9d79a10c84677f1d.nbcnews-fp-1200-630.jpg",
    "publishedAt": "2021-04-03T14:33:00Z",
    "content": "Amazon.com Inc has apologized to U.S. Rep. Mark Pocan, D-Wis., admitting to scoring an own goal in its initial denial of his suggestion that its drivers were sometimes forced to urinate in bottles du… [+1834 chars]"
}
export default function Examples() {

    return (
    <>
        <div className='topSection'>
            <div  className='titleImage'>
                <img src='https://api-go.app/img/news.jpg'></img>
            </div>
            <div className='apiGoLogoDiv'> 
            <img src='https://api-go.app/img/api-go.png'></img>
            </div>
        </div>
        <br />
        <h1>News API</h1> 
        <p>News API allows you to search through over 75,000 news sources and blogs dating back the last 3 years.<br />
        They have 2 main endpoints to query(<i><b>everything</b></i> and <i>top-headlines</i>) with many parameters for each<br />
        <br />
        
        </p>
        <h4>***********************  Dont forget to remove key below! **********************</h4>
        <h2>Your API-KEY is: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}</h2>
        <br />
        <br />
        <div className='exampleContainerDiv'>
        <h2>Everything Endpoint</h2>
        <h4>Everything searches are ideal for news analysis and article discovery</h4>
        <div className='exampleTopDiv'>
            <h2>Query Parameters:</h2>
            <hr className='exampleHr' />
            <br />
            <table className='exampleTable1'>
            <tr className='exampleTdDescriptions'> 
                <td className='exampleTdDescriptions'>
                <b>PARAMETERS</b>
                </td>
                <td className='exampleTdDescriptions'>
                <b>DESCRIPTION</b>
                </td>
            </tr>
            <tr> 
                <td>
                <b>apiKey</b>
                </td>
                <td>
                Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.
                </td>
            </tr>
            <tr> 
                <td>
                <b>q</b>
                </td>
                <td>
                Keywords or phrases to search for in the article title and body.
                </td>
            </tr>
            <tr> 
                <td>
                <b>sources</b>
                </td>
                <td>
                A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from.
                </td>
            </tr>
            <tr> 
                <td>
                <b>domains</b>

                </td>
                <td>
                A comma-seperated string of domains (mashable.com, techcrunch.com, engadget.com) to restrict the search to.
                </td>
            </tr>
            <tr> 
                <td>
                <b>from</b>

                </td>
                <td>
                A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2021-04-03 or 2021-04-03T15:46:09)
                </td>
            </tr>
            <tr> 
                <td>
                <b>to</b>
                </td>
                <td>
                A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2021-04-03 or 2021-04-03T15:46:09)
                </td>
            </tr>
            <tr> 
                <td>
                <b>language</b>


                </td>
                <td>
                The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: <b>ar&nbsp;de&nbsp;en&nbsp;es&nbsp;fr&nbsp;he&nbsp;it&nbsp;nl&nbsp;no&nbsp;pt&nbsp;ru&nbsp;se&nbsp;ud&nbsp;zh</b>
                </td>
            </tr>

            </table>
            <br />
            <br />
            <h2>Everything Endpoint Examples:</h2>
            <hr className='exampleHr' />
            <h4><i>https://newsapi.org/v2/everything?q=wandavision&apiKey=NEWS-API-KEY</i></h4>
            <p>Searches all sources for articles on <i>Wandavision</i> and will return an object that looks like this:</p>
            <pre className='showJson'>
            {JSON.stringify(everythingJson, null, 2)}
            </pre>
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://newsapi.org/v2/everything?q=tesla&from=2021-04-01&to=2021-04-01&sortBy=popularity&apiKey=NEWS-API-KEY</i></h4>
            <p>Searches all sources for articles on <i>Tesla</i> from <i>2021-04-01</i> and sorted by <i>populatity</i>and returns 571 sources.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(everythingJson2, null, 2)}
            </pre>
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://newsapi.org/v2/everything?domains=engadget.com,mashable.com&apiKey=NEWS-API-KEY</i></h4>
            <p>Searches all sources for articles by <i>Engadget</i> and <i>Mashable</i>.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(everythingJson3, null, 2)}
            </pre>
            <br />
            <hr className='exampleHr' />
            <br />
            <br />
            <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <h2>Top-Headlines Endpoint</h2>  
        <h4>Top-Headline searches return breaking news headlines for countries, categories, and singular publishers. 
        <br />This is perfect for use with news tickers or anywhere you want to display live up-to-date news headlines.</h4>
        <div className='exampleTopDiv'>
            <h2>Query Parameters:</h2>
            <hr className='exampleHr' />
            <br />
            <table className='exampleTable1'>
            <tr className='exampleTdDescriptions'> 
                <td className='exampleTdDescriptions'>
                <b>PARAMETERS</b>
                </td>
                <td className='exampleTdDescriptions'>
                <b>DESCRIPTION</b>
                </td>
            </tr>
            <tr> 
                <td>
                <b>apiKey</b>
                </td>
                <td>
                Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.
                </td>
            </tr>
            <tr> 
                <td>
                <b>country</b>
                </td>
                <td>
                The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: <b>ae&nbsp;ar&nbsp;at&nbsp;au&nbsp;be&nbsp;bg&nbsp;br&nbsp;ca&nbsp;ch&nbsp;cn&nbsp;co&nbsp;cu&nbsp;cz&nbsp;de&nbsp;eg&nbsp;fr&nbsp;gb&nbsp;gr&nbsp;
                hk&nbsp;hu&nbsp;id&nbsp;ie&nbsp;il&nbsp;in&nbsp;
                <br />
                it&nbsp;jp&nbsp;kr&nbsp;lt&nbsp;lv&nbsp;ma&nbsp;mx&nbsp;my&nbsp;ng&nbsp;nl&nbsp;no&nbsp;nz&nbsp;ph&nbsp;pl&nbsp;pt&nbsp;ro&nbsp;rs&nbsp;ru&nbsp;sa&nbsp;se&nbsp;sg&nbsp;si&nbsp;sk&nbsp;th&nbsp;tr&nbsp;tw&nbsp;ua&nbsp;us&nbsp;ve&nbsp;
                za</b>. 
                <br />
                Note: you can't mix this param with the sources param.
                </td>
            </tr>
            <tr> 
                <td>
                <b>category
                </b>
                </td>
                <td>
                The category you want to get headlines for. Possible options: <br />
                <b>business&nbsp;entertainment&nbsp;general&nbsp;health&nbsp;science&nbsp;sports&nbsp;technology</b>.<br /> Note: you can't mix this param with the <b>sources</b> param
                </td>
            </tr>
            <tr> 
                <td>
                <b>sources
                </b>
                </td>
                <td>
                A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from.
                </td>
            </tr>
            <tr> 
                <td>
                <b>q</b>
                </td>
                <td>
                Keywords or phrases to search for in the article title and body.
                </td>
            </tr>
            <tr> 
                <td>
                <b>pageSize</b>
                </td>
                <td>
                The number of results to return per page (request). 20 is the default, 100 is the maximum.
                </td>
            </tr>
            <tr> 
                <td>
                <b>page</b>
                </td>
                <td>
                Use this to page through the results if the total results found is greater than the page size.
                </td>
            </tr>
            </table>
            <br />
            <h2>Top-Headlines Endpoint Examples:</h2>
            <hr className='exampleHr' />
            <br />
            <h4><i>https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY</i></h4>
            <p>Searches through all <i>us</i> sources to display the top-headlines.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(topHeadlinesJson, null, 2)}
            </pre>
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=API_KEY</i></h4>
            <p>Searches through all of <i>abc-news</i> to display their top-headlines.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(topHeadlinesJson2, null, 2)}
            </pre>
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY</i></h4>
            <p>Searches through all of the <i>us</i> and <i>business</i> sources to display their top-headlines.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(topHeadlinesJson3, null, 2)}
            </pre>
        </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>
    );
    }
`)}

function NewsFetch(){
    return(
        `
        
        //Example Fetch
        const [data, setData] = useState([])

        useEffect(() => {
        (async () => {
            try{
                const res = await fetch(\`https://newsapi.org/v2/everything?q=wandavision&apiKey=\${secrets.apiKey}\`);
                const data = await res.json()
                await setData(data.articles)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
        `
    )
}

function NewsCode() {
    return(
        `
        <br />
        <br />
            <h1>Example Display Data:</h1>
        <div className='exampleFetchContainerDiv'>
                    { 
                        data.map((article) => {
                            return (
                                <><div className='exampleFetchDiv'>
                                    <h3>{article.title}</h3>
                                    <h4>{article.source.name}</h4>
                                    <a href={article.url} target='_blank'>
                                    <img class='newsImgs' src={article.urlToImage}/></a>
                                    </div>
                                </>
                            )
                        }) 
                    }
            </div>
        `
    )
}

function YoutubeExample(response){
    return(
        `
        import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const exampleYouTube = {
    "kind": "youtube#searchListResponse",
    "etag": "8KND9hH4lSbXhG6A_b5HyaNif48",
    "nextPageToken": "CAUQAA",
    "regionCode": "US",
    "pageInfo": {
    "totalResults": 37925,
    "resultsPerPage": 5
    },
    "items": [
    {
    "kind": "youtube#searchResult",
    "etag": "2152aIeXS2lB7LXXUTPKoAu_-cM",
    "id": {
    "kind": "youtube#video",
    "videoId": "W6NZfCO5SIk"
    },
    "snippet": {
    "publishedAt": "2018-04-24T02:37:33Z",
    "channelId": "UCWv7vMbMWH4-V0ZXdmDpPBA",
    "title": "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
    "description": "⭐️ Want to learn more from me? Check out these links: Courses: https://codewithmosh.com Twitter: https://twitter.com/moshhamedani Facebook: ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/W6NZfCO5SIk/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/W6NZfCO5SIk/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "Programming with Mosh",
    "liveBroadcastContent": "none",
    "publishTime": "2018-04-24T02:37:33Z"
}}]} 

const exampleYouTube2 = {
    "kind": "youtube#searchListResponse",
    "etag": "cOZsTdaUoqu5W7NrrJGPYQAHxhs",
    "nextPageToken": "CAUQAA",
    "regionCode": "US",
    "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 5
    },
    "items": [
    {
    "kind": "youtube#searchResult",
    "etag": "9hjRxH8paZFuoYLlDs5lJsCdWQs",
    "id": {
    "kind": "youtube#playlist",
    "playlistId": "PLzJa2ObuV8P1GStvXplAJauTnGsesvQ3F"
    },
    "snippet": {
    "publishedAt": "2020-03-23T16:26:43Z",
    "channelId": "UClD4ebAIStmn3aAezlN7Dsg",
    "title": "Head Basketball - Campaign",
    "description": "",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/HISF732ma5Q/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/HISF732ma5Q/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/HISF732ma5Q/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "Of Gaming and Men",
    "liveBroadcastContent": "none",
    "publishTime": "2020-03-23T16:26:43Z"
    }}]} 

const exampleYouTube3 = {
    "kind": "youtube#searchListResponse",
    "etag": "hLEFRMByFUtW2T6Ieuc_8YRhuvc",
    "nextPageToken": "CAUQAA",
    "regionCode": "US",
    "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 5
    },
    "items": [
    {
    "kind": "youtube#searchResult",
    "etag": "ynNIVnoXAcUEHeR57BTNePMW0Do",
    "id": {
    "kind": "youtube#video",
    "videoId": "mYfoh0xLKeQ"
    },
    "snippet": {
    "publishedAt": "2018-01-07T12:15:18Z",
    "channelId": "UCR-foyF-C6VuAlwy3KZMkgA",
    "title": "BITCOIN में INVESTMENT करें या नहीं I Complete Analysis I Dr Vivek Bindra",
    "description": "In this Video Dr. Vivek Bindra discusses about Bitcoin. Dr Vivek Bindra shares in detail whether you should invest in Bitcoin or not. Dr Vivek Bindra shares his ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/mYfoh0xLKeQ/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/mYfoh0xLKeQ/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/mYfoh0xLKeQ/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "Dr. Vivek Bindra: Motivational Speaker",
    "liveBroadcastContent": "none",
    "publishTime": "2018-01-07T12:15:18Z"
}}]}

export default function Examples() {

    return (
    <>
    <div className='topSection'>
        <div  className='titleImage'>
            <img src='https://api-go.app/img/youtube.jpg'></img>
        </div>
        <div className='apiGoLogoDiv'> 
            <img src='https://api-go.app/img/api-go.png'></img>
        </div>
    </div>
    <br />
    <h2> If you dont't have it yet get your Free <a target='_blank' href='https://developers.google.com/youtube/registering_an_application'>YouTube API</a> key
    </h2>
    <br />
    <h1>YouTube API</h1> 
    <p>Add YouTube features to your application, including the ability to upload videos, create and manage playlists, and more.</p>
    <br />
    <br />
    <h4>***********************  Dont forget to remove key below! **********************</h4>
    <h3>My key for testing: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}  </h3>
    <br />
    <br />
    <div className='exampleContainerDiv'>
        <h2>Search: list</h2>
        <p>Returns a collection of search results that match the query parameters specified in the API request. 
        <br />By default, a search result set identifies matching video, channel, and playlist resources,
        <br /> but you can also configure queries to only retrieve a specific type of resource.</p>
        <div className='exampleTopDiv'>
            <h2>Query Parameters:</h2>
    
            <hr className='exampleHr' />
            <br />
            <table className='exampleTable1'>
            <tr> 
                <td>
                <b>PARAMETERS</b>
                </td>
                <td>
                <b>DESCRIPTION</b>
                </td>
            </tr>
            <tr width='100%'>
            <td colspan='2'>
            <b>required parameters</b>
            </td>
            </tr>
            <tr>
                <td >
                <b>
                part
                </b>
                </td>
                <td>
                <b>string</b><br />
        The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet.
                </td>
            </tr>
            <tr width='100%'>
            <td colspan='2'>
            <b>Filters (specify 0 or 1 of the following parameters)</b>
            </td>
            </tr>
            <tr>
                <td >
                <b>
                forContentOwner
                </b>
                </td>
                <td>
                <b>boolean</b><br />
                This parameter can only be used in a properly authorized request, and it is intended exclusively for YouTube content partners.<br />
                <br />

                The forContentOwner parameter restricts the search to only retrieve videos owned by the content owner identified by the onBehalfOfContentOwner parameter. If forContentOwner is set to true, the request must also meet these requirements:
                <br /><br />
                <ul>
                <li>The onBehalfOfContentOwner parameter is required.</li>
                <li>The user authorizing the request must be using an account linked to the specified content owner.</li>
                <li>The type parameter value must be set to video.</li>
                <li>None of the following other parameters can be set: videoDefinition, videoDimension, videoDuration, videoLicense, videoEmbeddable, videoSyndicated, videoType.</li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                forDeveloper
                </b>
                </td>
                <td>
                <b>boolean</b><br />
                This parameter can only be used in a properly authorized request. The forDeveloper parameter restricts the search to only retrieve videos uploaded via the developer's application or website. The API server uses the request's authorization credentials to identify the developer. The forDeveloper parameter can be used in conjunction with optional search parameters like the q parameter.
                <br />
                <br />
        For this feature, each uploaded video is automatically tagged with the project number that is associated with the developer's application in the Google Developers Console.
        <br />
        <br />
        When a search request subsequently sets the forDeveloper parameter to true, the API server uses the request's authorization credentials to identify the developer. Therefore, a developer can restrict results to videos uploaded through the developer's own app or website but not to videos uploaded through other apps or sites.
                </td>
            </tr>
            <tr>
                <td >
                <b>
                forMine
                </b>
                </td>
                <td>
                <b>boolean</b><br />
                This parameter can only be used in a properly authorized request. The forMine parameter restricts the search to only retrieve videos owned by the authenticated user. If you set this parameter to true, then the type parameter's value must also be set to video. In addition, none of the following other parameters can be set in the same request: videoDefinition, videoDimension, videoDuration, videoLicense, videoEmbeddable, videoSyndicated, videoType.
                </td>
            </tr>
            <tr>
                <td >
                <b>
                relatedToVideoId
                </b>
                </td>
                <td>
                <b>string</b><br />
                The relatedToVideoId parameter retrieves a list of videos that are related to the video that the parameter value identifies. The parameter value must be set to a YouTube video ID and, if you are using this parameter, the type parameter must be set to video.
                <br />
                <br />
                Note that if the relatedToVideoId parameter is set, the only other supported parameters are part, maxResults, pageToken, regionCode, relevanceLanguage, safeSearch, type (which must be set to video), and fields.
                </td>
            </tr>
            <tr width='100%'>
            <td colspan='2'>
            <b>Optional parameters</b>
            </td>
            </tr>
            <tr>
                <td >
                <b>
                channelId
                </b>
                </td>
                <td>
                <b>string</b><br />
                The channelId parameter indicates that the API response should only contain resources created by the channel.
                <br />
                <br />
                Note: Search results are constrained to a maximum of 500 videos if your request specifies a value for the channelId parameter and sets the type parameter value to video, but it does not also set one of the forContentOwner, forDeveloper, or forMine filters.
                </td>
            </tr>
            <tr>
                <td >
                <b>
                channelType
                </b>
                </td>
                <td>
                <b>string</b><br />
                The channelType parameter lets you restrict a search to a particular type of channel.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all channels.</li>
                <li>show – Only retrieve shows.</li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                eventType
                </b>
                </td>
                <td>
                <b>string</b><br />
                The eventType parameter restricts a search to broadcast events. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>completed – Only include completed broadcasts.</li>
                <li>live – Only include active broadcasts.</li>
                <li>upcoming – Only include upcoming broadcasts.</li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                location
                </b>
                </td>
                <td>
                <b>string</b><br />
                The location parameter, in conjunction with the locationRadius parameter, defines a circular geographic area and also restricts a search to videos that specify, in their metadata, a geographic location that falls within that area. The parameter value is a string that specifies latitude/longitude coordinates e.g. (37.42307,-122.08427).
                <br />
                <br />
                
                <ul>
                <li>The location parameter value identifies the point at the center of the area.</li>
                <li>The locationRadius parameter specifies the maximum distance that the location associated with a video can be from that point for the video to still be included in the search results.</li>
                
                </ul>
                <br />
                The API returns an error if your request specifies a value for the location parameter but does not also specify a value for the locationRadius parameter.
                </td>
            </tr>
            <tr>
                <td >
                <b>
                locationRadius
                </b>
                </td>
                <td>
                <b>string</b><br />
                The locationRadius parameter, in conjunction with the location parameter, defines a circular geographic area.
                <br />
                <br />
                The parameter value must be a floating point number followed by a measurement unit. Valid measurement units are m, km, ft, and mi. For example, valid parameter values include 1500m, 5km, 10000ft, and 0.75mi. The API does not support locationRadius parameter values larger than 1000 kilometers.
            </td>
            </tr>
            <tr>
                <td >
                <b>
                maxResults
                </b>
                </td>
                <td>
                <b>unsigned integer</b><br />
                The maxResults parameter specifies the maximum number of items that should be returned in the result set. Acceptable values are 0 to 50, inclusive. The default value is 5.

            </td>
            </tr>
            <tr>
                <td >
                <b>
                onBehalfOfContentOwner
                </b>
                </td>
                <td>
                <b>string</b><br />
                This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners.
                <br />
                <br />
                The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.

            </td>
            </tr>
            <tr>
                <td >
                <b>
                order
                </b>
                </td>
                <td>
                <b>string</b><br />
                The order parameter specifies the method that will be used to order resources in the API response. The default value is relevance.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>date – Resources are sorted in reverse chronological order based on the date they were created.</li>
                <li>rating – Resources are sorted from highest to lowest rating.</li>        
                <li>relevance – Resources are sorted based on their relevance to the search query. This is the default value for this parameter.</li>
                <li>title – Resources are sorted alphabetically by title.</li>
                <li>videoCount – Channels are sorted in descending order of their number of uploaded videos.</li>
                <li>viewCount – Resources are sorted from highest to lowest number of views. For live broadcasts, videos are sorted by number of concurrent viewers while the broadcasts are ongoing.</li>
                </ul>
            </td>
            </tr>
            <tr>
                <td >
                <b>
                pageToken
                </b>
                </td>
                <td>
                <b>string</b><br />
                The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
            </td>
            </tr>
            <tr>
                <td >
                <b>
                publishedAfter
                </b>
                </td>
                <td>
                <b>datetime</b><br />
                The publishedAfter parameter indicates that the API response should only contain resources created at or after the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
            </td>
            </tr>
            <tr>
                <td >
                <b>
                publishedBefore
                </b>
                </td>
                <td>
                <b>datetime</b><br />
                The publishedBefore parameter indicates that the API response should only contain resources created before or at the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
            </td>
            </tr>
            <tr>
                <td >
                <b>
                q
                </b>
                </td>
                <td>
                <b>string</b><br />
                The q parameter specifies the query term to search for.
                <br/>
                <br />
                Your request can also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos that are associated with one of several search terms. For example, to search for videos matching either "boating" or "sailing", set the q parameter value to boating|sailing. Similarly, to search for videos matching either "boating" or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing. Note that the pipe character must be URL-escaped when it is sent in your API request. The URL-escaped value for the pipe character is %7C.
            </td>
            </tr>
            <tr>
                <td >
                <b>
                regionCode
                </b>
                </td>
                <td>
                <b>string</b><br />
                The regionCode parameter instructs the API to return search results for videos that can be viewed in the specified country. The parameter value is an ISO 3166-1 alpha-2 country code.

            </td>
            </tr>
            <tr>
                <td >
                <b>
                relevanceLanguage
                </b>
                </td>
                <td>
                <b>string</b><br />
                The relevanceLanguage parameter instructs the API to return search results that are most relevant to the specified language. The parameter value is typically an ISO 639-1 two-letter language code. However, you should use the values zh-Hans for simplified Chinese and zh-Hant for traditional Chinese. Please note that results in other languages will still be returned if they are highly relevant to the search query term.

            </td>
            </tr>
            <tr>
                <td >
                <b>
                safeSearch
                </b>
                </td>
                <td>
                <b>string</b><br />
                The safeSearch parameter indicates whether the search results should include restricted content as well as standard content.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>moderate – YouTube will filter some content from search results and, at the least, will filter content that is restricted in your locale. Based on their content, search results could be removed from search results or demoted in search results. This is the default parameter value.</li>
                <li>
                none – YouTube will not filter the search result set.
                </li>
                <li>
                strict – YouTube will try to exclude all restricted content from the search result set. Based on their content, search results could be removed from search results or demoted in search results.
                </li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                type
                </b>
                </td>
                <td>
                <b>string</b><br />
                The type parameter restricts a search query to only retrieve a particular type of resource. The value is a comma-separated list of resource types. The default value is video,channel,playlist.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>channel</li>
                <li>
                playlist
                </li>
                <li>
                video
                </li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoCaption
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoCaption parameter indicates whether the API should filter video search results based on whether they have captions. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Do not filter results based on caption availability.</li>
                <li>
                closedCaption – Only include videos that have captions.
                </li>
                <li>
                none – Only include videos that do not have captions.
                </li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoCategoryId
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoCategoryId parameter filters video search results based on their category. If you specify a value for this parameter, you must also set the type parameter's value to video.
                
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoDefinition
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoDefinition parameter lets you restrict a search to only include either high definition (HD) or standard definition (SD) videos. HD videos are available for playback in at least 720p, though higher resolutions, like 1080p, might also be available. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all videos, regardless of their resolution.</li>
                <li>
                high – Only retrieve HD videos.
                </li>
                <li>
                standard – Only retrieve videos in standard definition.
                </li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoEmbeddable
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoEmbeddable parameter lets you to restrict a search to only videos that can be embedded into a webpage. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all videos, embeddable or not.</li>
                <li>
                true – Only retrieve embeddable videos.
                </li>
                
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoLicense
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoLicense parameter filters search results to only include videos with a particular license. YouTube lets video uploaders choose to attach either the Creative Commons license or the standard YouTube license to each of their videos. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all videos, regardless of which license they have, that match the query parameters.</li>
                <li>
                creativeCommon – Only return videos that have a Creative Commons license. Users can reuse videos with this license in other videos that they create
                </li>
                <li>
                youtube – Only return videos that have the standard YouTube license.
                </li>
                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoLicense
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoSyndicated parameter lets you to restrict a search to only videos that can be played outside youtube.com. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all videos, syndicated or not.</li>
                <li>
                true – Only retrieve syndicated videos.
                </li>

                </ul>
                </td>
            </tr>
            <tr>
                <td >
                <b>
                videoType
                </b>
                </td>
                <td>
                <b>string</b><br />
                The videoType parameter lets you restrict a search to a particular type of videos. If you specify a value for this parameter, you must also set the type parameter's value to video.
                <br />
                <br />
                Acceptable values are:
                <ul>
                <li>any – Return all videos.</li>
                <li>
                episode – Only retrieve episodes of shows.
                </li>
                <li>
                movie – Only retrieve movies.
                </li>
                </ul>
                </td>
            </tr>
            </table>
        </div>
        <br />
        <br/>
        <br />
        <h2>Querying the API:</h2>
        <div className='exampleTopDiv'>
            <h2>Examples:</h2>
            <hr className='exampleHr' />
            <br />
            <h4><i>https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=javascriptI&type=video&videoCaption=closedCaption&key=API-KEY</i></h4>
            <p>This request performs a <i><b>keyword</b></i> search for <i><b>videos</b></i> about <i><b>javascript</b></i> that include <i><b>captions</b></i>.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(exampleYouTube, null, 2)}
            </pre>
            <br />
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=basketball&type=playlist&key=API-KEY</i></h4>
            <p>This request does a <i><b>playlist</b></i> search for <i><b>basketball</b></i> videos.  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(exampleYouTube2, null, 2)}
            </pre>
            <br />
            <br />
            <hr className='exampleHr' />
            <br />
            <h4><i>https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=bitcoin&type=video&order=viewCount&key=API-KEY</i></h4>
            <p>This request does a <i><b>video</b></i> search for <i><b>bitcoin</b></i> and returns them in order of <i><b>viewCount</b></i>  Example object returned below:</p>
            <pre className='showJson'>
            {JSON.stringify(exampleYouTube3, null, 2)}
            </pre>
            <br />
            <br />
        </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>
    )}
`)}

function YoutubeFetch() {
    return(
        `
        //Example Fetch
        const [data, setData] = useState({})

        useEffect(() => {
        (async () => {
            try{
                const res = await fetch(\`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=javascriptI&type=video&videoCaption=closedCaption&key=\${secrets.apiKey}\`);
                const data = await res.json()
                await setData(data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
        `
    )
}

function RawgExample(response) {
    return(
        `
        import React from 'react';

export default function Info() {
    
    const exampleData = {
        "slug": "prey",
        "name": "Prey (2017)",
        "playtime": 10,
        "platforms": [],
        "stores": [],
        "released": "2017-05-05",
        "tba": false,
        "background_image": "https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f2.jpg",
        "rating": 4.28,
        "rating_top": 5,
        "ratings": [],
        "ratings_count": 1485,
        "reviews_text_count": 13,
        "added": 6120,
        "added_by_status": {},
        "metacritic": 80,
        "suggestions_count": 633,
        "updated": "2021-02-16T09:48:36",
        "id": 39,
        "score": "65.94736",
        "clip": null,
        "tags": [],
        "esrb_rating": {},
        "user_game": null,
        "reviews_count": 1508,
        "saturated_color": "0f0f0f",
        "dominant_color": "0f0f0f",
        "short_screenshots": [],
        "parent_platforms": [],
        "genres": []
        }

    return (
        <>            
            <div className='topSection'>
                <div  className='titleImage'>
            <img src='https://api-go.app/img/rawg.jpg'></img>
                </div>
                <div className='apiGoLogoDiv'> 
                    <img src='https://api-go.app/img/api-go.png'></img>
                </div>
            </div>
        <br />
        <h2>Your API-KEY is: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}</h2>
        <h2>If you dont' have one yet, get your <a target='_blank' href='https://rawg.io/apidocs'>RAWG Api Key</a></h2>
        <h1>RAWG Video Games Api</h1>
        <div className='exampleIntro'>
            <p>
                RAWG Videos Games Api is a open source database that has over 500,000 games for 50 platforms. As said above, all you need is an api key to access the database and the freedom is yours to do what you want with the information given. The database gives the user everything you need to know about any video and is very powerful.
            </p>
        </div>
        <br />
        
        <div className='endpointsDiv'>
            <div className='exampleContainerDiv'>
                <div className='exampleTopDiv'>
                <h1>Api Endpoints</h1>
                <hr className='exampleHr' />
                <h4>These are the endpoints that would be added to the base URL depending on what the desired search for information is needed</h4>
                <div className='exampleLists'>
                    <ul>
                        <li>/games</li>
                        <li>/genres</li>
                        <li>/platforms</li>
                        <li>/publishers</li>
                        <li>/stores</li>
                        <li>/tags</li>
                    </ul>
                </div>
            
            Here's an example of the games endpoint that gathers information based upon the query parameters 
            <br />
            <br />
            <i><h4>https://api.rawg.io/api/games?key=${response.apiKey ? response.apiKey : 'API_KEY_GOES_HERE'}&search=prey</h4></i>
            <br />
            <br />
            Heres an example of the response that you will get back: 
            <pre className='showJson'>
                This is just one of the results from the results key inside the response object:
                {JSON.stringify(exampleData, null, 2)}
            </pre>
        </div>
        <br />
        <br />
        <br />
        <h2>Game Query Parameters</h2>
        <hr className='exampleHr2' />
        <h4> There are different query parameters for each endpoints to help narrow down the search:</h4>
        
        <div className='exampleTable2'>
            <table>
                <thead>
                <tr>
                    <th colspan="2"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><b>Parameter</b></td>
                    <td>Data Type</td>
                    <td><b>Parameter</b></td>
                    <td>Data Type</td>
                </tr>
                <tr>
                    <td><b>page</b></td>
                    <td>integer</td>
                    <td><b>creators</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>page_size</b></td>
                    <td>integer</td>
                    <td><b>dates</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>search</b></td>
                    <td>string</td>
                    <td><b>updated</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>search_precise</b></td>
                    <td>boolean</td>
                    <td><b>platforms_count</b></td>
                    <td>integer</td>
                </tr>
                <tr>
                    <td><b>search_exact</b></td>
                    <td>boolean</td>
                    <td><b>metacritic</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>parent_platforms</b></td>
                    <td>string</td>
                    <td><b>exclude_collection</b></td>
                    <td>integer</td>
                </tr>
                <tr>
                    <td><b>platforms</b></td>
                    <td>string</td>
                    <td><b>exclude_additions</b></td>
                    <td>boolean</td>
                </tr>
                <tr>
                    <td><b>stores</b></td>
                    <td>string</td>
                    <td><b>exclude_parents</b></td>
                    <td>boolean</td>
                </tr>
                <tr>
                    <td><b>developers</b></td>
                    <td>string</td>

                    <td><b>exclude_game_series</b></td>
                    <td>boolean</td>
                </tr>
                <tr>
                    <td><b>publishers</b></td>
                    <td>string</td>

                    <td><b>ordering</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>genres</b></td>
                    <td>string</td>
                    <td><b>tags</b></td>
                    <td>string</td>
                </tr>
                <tr>

                </tr>
            </tbody>
            </table>
            </div>
            <br />
            <br />
            <br />
            <br />
            <h2>Genres, Platforms, and Stores Query Parameters</h2>
            <hr className='exampleHr2' />
            <div className='exampleTable3'>
            <table>
                <thead>
                <tr>
                    <th colspan="2"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><b>Parameter</b></td>
                    <td><b>Data Type</b></td>
                </tr>
                <tr>
                    <td><b>Ordering</b></td>
                    <td>string</td>
                </tr>
                <tr>
                    <td><b>page</b></td>
                    <td>integer</td>
                </tr>
                <tr>
                    <td><b>page_size</b></td>
                    <td>integer</td>
                </tr>
                </tbody>
                </table>
            </div>
            <br />
            <br />
            <br />
            <br />
            <h2>Creator-Roles, Creators, Developers, Tags, and Publishers Query Parameters</h2>
                <hr className='exampleHr2' />
            <div className='exampleTable3'>

            <table>
                <thead>
                <tr>
                    <th colspan="2"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><b>Parameter</b></td>
                    <td><b>Data Type</b></td>
                </tr>
                <tr>
                    <td><b>page</b></td>
                    <td>integer</td>
                </tr>
                <tr>
                    <td><b>page_size</b></td>
                    <td>integer</td>
                </tr>
                </tbody>
            </table>
        </div>
<br />
<br />
<br />
<br />
        <div>
            <h2>Writing out the fetch link</h2>
            <hr className='exampleHr2' />
            <div className='exampleTopDiv'>
            <h4>While creating the fetch link the correct way to write it will be to put the base URL (https://api.rawg.io/api/) 
                <br/><br/>
                followed by the desired enpoint. The selected NEEDS to be followed by a question mark. After the endpoint follows
                <br /><br />
                the desired query parameters, between every parameter there needs to be an ampersand (&). Take the search example 
                <br /><br />above for some reference, you can put as many query parameters as desired as long as they are all separated by ambersands (&).</h4>
            
            <p><i>For moore information please visit the <a href='https://api.rawg.io/docs/'>RAWG Api Docs</a></i></p>
        </div></div></div></div>
<br />
<br />
<br />
<br />
</>
    )
}
        `
    )
}

function RawgFetch(){
    return(
        `
        //Example Fetch
        const [data, setData] = useState({})

        useEffect(() => {
        (async () => {
            try{
                const res = await fetch(\`https://api.rawg.io/api/games?key=\${secrets.apiKey}&search=mario\`);
                const data = await res.json()
                await setData(data.results[0])
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
        `
    )
}

function LastFmExample(response) {
    return(
        `
        import React from 'react';
// import LastFmHome from './LastFmHome';

export default function Examples (props) {

    const exampleData = {
        "name": "Believe",
        "artist": "Disturbed",
        "url": "https://www.last.fm/music/Disturbed/Believe",
        "image": [
        {
        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/dcf5cf4b9da64e979719a102acd222cc.png",
        "size": "small"
        },
        {
        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/dcf5cf4b9da64e979719a102acd222cc.png",
        "size": "medium"
        },
        {
        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/dcf5cf4b9da64e979719a102acd222cc.png",
        "size": "large"
        },
        {
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/dcf5cf4b9da64e979719a102acd222cc.png",
        "size": "extralarge"
        }
        ],
        "streamable": "0",
        "mbid": "c559efc2-f734-41ae-93bd-2d78414e0356"
        }

    return (
        <>
            <div className='topSection'>
                <div  className='titleImage'>
            <img src='https://api-go.app/img/lastfm.jpg'></img>
                </div>
                <div className='apiGoLogoDiv'> 
                    <img src='https://api-go.app/img/api-go.png'></img>
                </div>
            </div>
        <br />
        <h2>Your API-KEY is: ${response.apiKey ? response.apiKey : 'API-KEY was not provided'}</h2>
        <h2>If you dont' have one yet, get your <a target='_blank' href='https://www.last.fm/api#getting-started'>Last FM Api Key</a></h2>
        <h1>Last FM Music Api</h1>
        <div className='exampleIntro'>
            <p>
                The Last FM Music Api is a free api that lets you build your site desired site with Last FM's massive music library data collection. You can get pretty much any information about basically any song, album, and artist. There is also authentication and user features but that will not be covered here. This is information to get your basic GET requests to the api.
            </p>
        </div>
        <br />
        <h1>Api Methods</h1>
        <div className='endpointsDiv'>
            <h4>
                These are the methods that would be added to the base URL depending on what the desired search for information is needed. <br/>
                NOTE: These methods are only the methods that do NOT authentication,
                <br />
                for more information about request methods that required authentication please visit the <a href='https://www.last.fm/api#getting-started'>Last FM Api Docs</a>
            </h4>
            <div className='exampleTables1'>
            
            <table className='exampleTable1'>
                <thead>
                <tr>
                    <th colspan="2"><b>method=album</b></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>insert after album</td>
                        <td>params</td>
                    </tr>
                    <tr>
                        <td>.getInfo</td>
                        <td>- artist (required)<br/>- album (required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- username (optional)<br/>- lang(optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTags</td>
                        <td>- artist (required)<br/>- album <br/>(required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- user <br/>(optional)<br/>- api_key <br/>(required)</td>
                    </tr>
                    <tr>
                        <td>.getTopTags</td>
                        <td>- artist (required)<br/>- album <br/>(required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- api_key <br/>(required)</td>
                    </tr>
                    <tr>
                        <td>.search</td>
                        <td>- limit (optional)<br/>-page (optional)<br/>-album (required)<br/>-api_key (required)</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <br />
            <br />

            <table className='exampleTable1'>
                <thead>
                <tr>
                    <th colspan="2">method=artist</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>insert after album</td>
                        <td>params</td>
                    </tr>
                    <tr>
                        <td>.getCorrection</td>
                        <td>- artist (required)<br/>-api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getInfo</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- lang (optional)<br/>- autocorrect (optional)<br/>- username (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getSimilar</td>
                        <td>- limit (optional)<br/>- artist (required)<br/>- autocorrect (optional)<br/>- mbid (optional) <br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTags</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- user (optional)<br/>- autocorrect (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTopAlbums</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- page (optional)<br/>- limit (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTopTags</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTopTracks</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- page (optional)<br/>- limit (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.search</td>
                        <td>- limit (optional)<br/>- page (optional)<br/>- artist (required)<br/>- api_key (required)</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <br />
            <br />
            <table className='exampleTable1'>
                <thead>
                <tr>
                    <th colspan="2">method=track</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>insert after album</td>
                        <td>params</td>
                    </tr>
                    <tr>
                        <td>.getCorrection</td>
                        <td>- artist (required)<br/>- track (required)<br/>-api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getInfo</td>
                        <td>- artist (required)<br/>- mbid (optional)<br/>- track (required)<br/>- autocorrect (optional)<br/>- username (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getSimilar</td>
                        <td>- limit (optional)<br/>- track (required)<br/>- artist (required)<br/>- autocorrect (optional)<br/>- mbid (optional) <br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTags</td>
                        <td>- artist (required)<br/>- track (required)<br/>- mbid (optional)<br/>- user (optional)<br/>- autocorrect (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.getTopTags</td>
                        <td>- artist (required)<br/>- track (required)<br/>- mbid (optional)<br/>- autocorrect (optional)<br/>- api_key (required)</td>
                    </tr>
                    <tr>
                        <td>.search</td>
                        <td>- limit (optional)<br/>- page (optional)<br/>- artist (required)<br/>- track (required)<br/>- api_key (required)</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <br />
        <br />
        <br />
        <h1>Querying the API</h1>
        <div className='queryExamplesDiv'>
            Here's an example of the album method that gathers information based upon the query parameters 
            <br />
            <br />
            <i><h4>http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=${response.apiKey ? response.apiKey : 'API_KEY_GOES_HERE'}&format=json</h4></i>
            <br />
            <br />
            Heres an example of the response that you will get back: <br/>
            NOTE: This is just one of the results from the results-albummatches-album arrays within the response object:

            <pre className='showJson'>
                
                {JSON.stringify(exampleData, null, 2)}
            </pre>
        </div>
    </div>
    <br />
    <br />
    <br />
    <h4> Within different endpoints there are required query parameters and some being for user and authentication features. 
        <br />
        To learn what parameters are required for the endpoints please go here: <a href='https://www.last.fm/api#getting-started'>Last FM Api Docs</a></h4>
    <br />
    <br />
    <br />
    </> 
    )}
`)}

function LastFmFetch() {
    return(
        `
        //Example Fetch
        const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try{
                const res = await fetch(\`http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=\${secrets.apiKey}&format=json\`);
                const data = await res.json()
                await setData(data.results.albummatches.album)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])
        `
    )
}

function LastFmCode(){
    return(
        `
        <br />
        <br />
            <h1>Example Display Data:</h1>
        <div className='exampleFetchContainerDiv'>
                    { 
                        data.map((data) => {
                            return (
                                <><div className='exampleFetchDiv'>
                                    <h2> Album Title: {data.name}</h2>
                                    <h3>Album Artist: {data.artist}</h3>
                                    <img src={data.image[3]['#text']}/>
                                    </div>
                                </>
                            )
                        }) 
                    }
            </div>
        `
    )
}

function decideFetch (projectChoice){
    switch (projectChoice) {
        case 'Nasa':
            return NasaFetch()
        case 'Movie':
            return MovieFetch()
        case 'Youtube':
            return YoutubeFetch()
        case 'News':
            return NewsFetch()
        case 'Edamam':
            return EdamamFetch()
        case 'RAWG Video Games':
            return RawgFetch()
        case 'LastFm Music':
            return LastFmFetch()
    }
}

function decideCode(projectChoice){
    switch (projectChoice) {
        case 'LastFm Music':
            return LastFmCode();
        case 'Movie':
            return MovieCode();
        case 'News':
            return NewsCode();
        case 'Edamam':
            return EdamamCode();
    }
}



function ApiGoPage(response) {
    return(
        `
        import React from "react";
        import { useState, useEffect } from "react";
        import { Link } from "react-router-dom";
        import "../App.css";
        import secrets from '../config.js';
    export default function APIGo() {
        ${
            decideFetch(response.apiProjectChoice)
        }
        return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='welcomeContainerDiv'>
                <div className='apiGoLogoDivMain'> 
                    <img src='https://api-go.app/img/api-go.gif'></img>
                </div>
            </div>
            <br />
            <div className='welcomeDiv'>
                <h1>Welcome to API-Go</h1>
            </div>
            ${
                decideCode(response.apiProjectChoice)
            }
        </>
    );
}`)}

//  We hide their API key 

function ConfigJS(response){
return`
const secrets = {
    apiKey: '${response.apiKey}',
    appId: '${response.appId}'
}

export default secrets;
`}

//  Functions for writing each example page.
const functions = {
    NasaExample,
    EdamamExample,
    MovieExample,
    NewsExample,
    YoutubeExample,
    LastFmExample,
    RawgExample,
    ApiGoPage,
    ConfigJS

}

module.exports = functions;