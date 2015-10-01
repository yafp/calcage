/* #####################################################
   - checks if the browser supports local storage or not
   - if not - a warning is displayed
   - if so - it tries to load data from localStorage
 ##################################################### */
function checkLocalStorageSupport()
{
   if(typeof(Storage) !== "undefined") // LocalStorage is supported
   {
      // check for existing person
      loadCurrentPersonFromLocalStorage();
      $("div#warning").hide();
   }
   else // Sorry! No Web Storage support
   {
      alert("Local Storage is not supported");
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
      //console.log("There is no person defined so far");
      $("div#calculation").hide();
   }
   else // there is a person defined
   {
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

   // with support for only 1 person
   localStorage.setItem('name',name);
   localStorage.setItem('bday',bday);

   toggleAddNewDiv();                     // hide add dialog
   loadCurrentPersonFromLocalStorage();   // load data from local storage
   $("div#calculation").show();
}



/* #####################################################
   - calculates the age of the current displayed person
 ##################################################### */
function calculateCurrentAge()
{
   console.log("Recalculating the current age");

   // get values from current person
   //
   var name = $("#curName").val();
   //var bday = $("#curBday").val();
   var bday = localStorage.getItem('bday');


   //alert(bday);

   // sofern wieso auch immer Trennstriche enthalten sind - diese durch Punkte ersetzen
   bday = bday.replace(/-/g, '.');

   // Datumsstring aufsplitten an den Punkten
   var bdayArray = bday.split(".");

   if(bdayArray[0].length == 2)
   {
      bday = bdayArray[0]+"."+bdayArray[1]+"."+bdayArray[2];
   }
   else
   {
      bday = bdayArray[2]+"."+bdayArray[1]+"."+bdayArray[0];
   }

   birthday = bday;
   //console.log(birthday);
   //alert(birthday);


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
      //console.log(today);

   //alert(today);


   // calculate days
   var date1 = today.split('.');
   var date2 = birthday.split('.');
   var start = new Date(date1[2], +date1[1]-1, date1[0]);
   var end = new Date(date2[2], +date2[1]-1, date2[0]);

   //alert((start.getTime() - end.getTime()) / (1000*60*60*24));
   var calculatedAge = (start.getTime() - end.getTime()) / (1000*60*60*24);


   // calculating weeks
   var calcAgeInWeeks = (calculatedAge/7).toFixed(1);
   //console.log(calcAgeInWeeks)


   // calculate month
   var calcAgeInMonth = (calculatedAge/30).toFixed(1);
   //console.log(calcAgeInMonth);

   // calculate month
   var calcAgeInYear = (calculatedAge/365).toFixed(1);
   //console.log(calcAgeInYear);

   // display calculated values
   $("#curDate").val(today);
   $("#curAge").val(calculatedAge);
   $("#curAgeInWeeks").val(calcAgeInWeeks);
   $("#curAgeInMonth").val(calcAgeInMonth);
   $("#curAgeInYear").val(calcAgeInYear);
}




/* #####################################################
   - deletes the stored person data from local Storage
 ##################################################### */
function removePersonFromLocalStorage()
{
   console.log("Deleting our person");

   localStorage.removeItem('name');
   localStorage.removeItem('bday');

   resetUI();

   $("div#addNew").show();
   $("div#calculation").hide();
}


/* #####################################################
   - resets the UI
 ##################################################### */
function resetUI()
{
   $("#curName").val("");
   $("#curBday").val("");
   $("#curDate").val("");
   $("#curAge").val("");
   $("#curAgeInWeeks").val("");
}



function toggleAddNewDiv()
{
   if ($('#addNew').css('display') == 'none')
   {
      $("div#addNew").show();
      $("div#calculation").hide();
   }
else
   {
      $("div#addNew").hide();
   }
}




function toggleAboutDiv()
{
   if ($('#about').css('display') == 'none')
   {
      $("div#about").show();
   }
else
   {
      $("div#about").hide();
   }
}


function toggleRestrictionsDiv()
{
   if ($('#restrictions').css('display') == 'none')
   {
    $("div#restrictions").show();
   }
   else
   {
      $("div#restrictions").hide();
   }
}
