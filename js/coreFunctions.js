/* #####################################################
   - checks if the browser supports local storage or not
   - if not - a warning is displayed
   - if so - it tries to load data from localStorage
 ##################################################### */
function checkLocalStorageSupport()
{
   console.log("Checking for LocalStorage support")

   if(typeof(Storage) !== "undefined") // LocalStorage is supported
   {
      // check for existing person
      loadCurrentPersonFromLocalStorage();
      $("div#warning").hide();
   }
   else // Sorry! No Web Storage support
   {
      alert("LocalStorage is not supported");
      $("div#warning").show();
   }
}



/* #####################################################
   - tries to load data from local storage
   - if possible - the person data is displayed
   - if no data exists -> the add new person dialog is displayed
 ##################################################### */
function loadCurrentPersonFromLocalStorage()
{
   var name = localStorage.getItem('name');
   var bday = localStorage.getItem('bday');

   if(bday == null) // no person defined so far
   {
      console.log("No person data found in LocalStorage");
      $("div#calculation").hide();
   }
   else // there is a person defined
   {
      console.log("Loading person data from LocalStorage");

      $("div#addNew").hide();

      // draw person details
      $("#curName").val(name);
      $("#curBday").val(bday);

      // now - as the person is loaded - calculate its age
      calculateCurrentAge();
   }
}


/* #####################################################
   - adds a new person to localstorage
 ##################################################### */
function addPerson()
{
   // get name
   var name = $("#name").val();

   // get birthday
   var bday = $("#bday").val();

   if((name != "") && (bday != ""))
   {
      // with support for only 1 person
      localStorage.setItem('name',name);
      localStorage.setItem('bday',bday);

      toggleAddNewDiv();                     // hide add dialog
      loadCurrentPersonFromLocalStorage();   // load data from local storage
      $("div#calculation").show();
   }
   else
   {
      if(name == "")
      {
         alert("Name ist leer");
      }

      if(bday == "")
      {
         alert("Geburtstag ist leer");
      }
   }
}



/* #####################################################
   - calculates the age of the current displayed person
 ##################################################### */
function calculateCurrentAge()
{
   console.log("Recalculating the current age");

   // get values from current person
   //
   // get via UI
   //var name = $("#curName").val();
   //var bday = $("#curBday").val();
   //
   // get form local Storage
   var name = localStorage.getItem('name');
   var bday = localStorage.getItem('bday');

   // Replace - with .
   bday = bday.replace(/-/g, '.');

   // Split Birthday-String & reconstruct it to avoid issues with client-side date format
   var bdayArray = bday.split(".");
   if(bdayArray[0].length == 2)
   {
      bday = bdayArray[0]+"."+bdayArray[1]+"."+bdayArray[2];
   }
   else
   {
      bday = bdayArray[2]+"."+bdayArray[1]+"."+bdayArray[0];
   }

   // calculate todays date
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!

   var yyyy = today.getFullYear();
   if(dd<10){
       dd='0'+dd
   }
   if(mm<10){
       mm='0'+mm
   }
   var today = dd+'.'+mm+'.'+yyyy;

   // calculate days
   var date1 = today.split('.');
   var date2 = bday.split('.');
   var start = new Date(date1[2], +date1[1]-1, date1[0]);
   var end = new Date(date2[2], +date2[1]-1, date2[0]);

   // Calculation of Age values (base = days)
   //
   var calcAgeInDays = (start.getTime() - end.getTime()) / (1000*60*60*24);      // Base-Value for further calculations
   var calcAgeInWeeks = (calcAgeInDays/7).toFixed(1);
   var calcAgeInMonth = (calcAgeInDays/30).toFixed(1);
   var calcAgeInYear = (calcAgeInDays/365).toFixed(1);


   // Adding human readable stuff
   calcAgeInDays = calcAgeInDays+" Tage";
   calcAgeInWeeks = calcAgeInWeeks+" Wochen";
   calcAgeInMonth = calcAgeInMonth+" Monate";
   calcAgeInYear = calcAgeInYear+" Jahre";

   // display calculated values
   //
   $("#curDate").val(today);

   $("#curAgeInDays").val(calcAgeInDays);
   //$("#curAgeInDays").append( " XX" );
   $("#curAgeInWeeks").val(calcAgeInWeeks);
   $("#curAgeInMonth").val(calcAgeInMonth);
   $("#curAgeInYear").val(calcAgeInYear);
}




/* #####################################################
   - deletes the stored person data from local Storage
 ##################################################### */
function removePersonFromLocalStorage()
{
   console.log("Deleting keys from LocalStorage");
   localStorage.removeItem('name');
   localStorage.removeItem('bday');

   resetUI();
}


/* #####################################################
   - resets the UI
 ##################################################### */
function resetUI()
{
   console.log("Resetting UI");

   // empty UI values
   $("#curName").val("");
   $("#curBday").val("");
   $("#curDate").val("");
   $("#curAge").val("");
   $("#curAgeInWeeks").val("");

   // show & hide divs
   $("div#addNew").show();
   $("div#calculation").hide();
   $("div#restrictions").hide();
}


/* #####################################################
   - Toggling Content-DIVs
 ##################################################### */
function toggleAddNewDiv()
{
   if ($('#addNew').css('display') == 'none')
   {
      $("div#addNew").show();
      // hide others
      $("div#calculation").hide();
      $("div#restrictions").hide();
   }
   else
   {
      $("div#addNew").hide();
   }
}




function toggleCalculationDiv()
{
   if ($('#calculation').css('display') == 'none')
   {
      $("div#calculation").show();
      // hide others
      $("div#addNew").hide();
      $("div#restrictions").hide();
   }
else
   {
      $("div#calculation").hide();
   }
}


function toggleRestrictionsDiv()
{
   if ($('#restrictions').css('display') == 'none')
   {
      $("div#restrictions").show();
      // hide others
      $("div#addNew").hide();
      $("div#calculation").hide();
   }
   else
   {
      $("div#restrictions").hide();
   }
}
