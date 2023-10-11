var NameFirst='';
var NameLast='';
var NameMiddle='';





function askIdDetails(){
    var dropdown=document.getElementById('identityproof');
    var p=document.getElementById('passport');
    var a=document.getElementById('aadhar');
    var l=document.getElementById('drivinglicense');
    p.style.display='none';
    a.style.display='none';
    l.style.display='none';

    if(dropdown.value==='Passport'){
        p.style.display='block';
    }else if(dropdown.value==='aadhar'){
        a.style.display='block';
    }else if(dropdown.value==='drivinglicense'){
        l.style.display='block';
    }
    
}

//Function for validating Passport Number
//Total 8 characters, first (Capital Alphabet), second (1-9), Third (0-9),4,5,6,7 (0-9), last (1-9)
function isValidPassportNo() {
    var passportNumber=document.getElementById('input1').value;
    var passportErrorMessage=document.getElementById('passportErrorMessage');
    let regex = new RegExp(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/);


    if (regex.test(passportNumber) == true) {
        passportErrorMessage.style.display='none';
        
    }
    else {      
        passportErrorMessage.style.display='block';
    }
}

//should be 12 digit, does not start with (0 and 1). and have space after every 4 characters. 
//ONly numeric values are allowed

function isValidAadharNo() {
    var aadharNumber=document.getElementById('input2').value;
    var aadharErrorMessage=document.getElementById('aadharErrorMessage');
    let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
 

    if (regex.test(aadharNumber) == true) {
        aadharErrorMessage.style.display='none';
    }
    else {
        aadharErrorMessage.style.display='block';
    }
}


//first two characters should be uppercase alphabet (represent state), next two (digits, for RTO)
//next four characters should be digit(licnese issued in a year)
//next 7 chars, (0-9) any.



function isValidLicenseNo() {
    var licenseNumber=document.getElementById('input3').value;
    var licenseErrorMessage=document.getElementById('licenseErrorMessage');

    let regex = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);


    if (regex.test(licenseNumber) == true) {
        licenseErrorMessage.style.display='none';
    }
    else {
        licenseErrorMessage.style.display='block';
    }
}

function displayMaximumCharacterFirst(){
    var firstName=document.getElementById('firstname').value;
    

    var fnmsg=document.getElementById('fn');
   
    // document.write(firstName);
    // document.write(firstName.length);
    if(firstName.length===25){
        fnmsg.style.display='block';
    }else {
        fnmsg.style.display='none';
    }

}


function displayMaximumCharacterLast(){
    
    var lastName=document.getElementById('lastname').value;
    
    var lnmsg=document.getElementById('ln');
    
    // document.write(firstName);
    // document.write(firstName.length);
    if(lastName.length===25){
        lnmsg.style.display='block';
    }else{
        lnmsg.style.display='none';
    }

}


function displayMaximumCharacterMiddle(){
    
    var middleName=document.getElementById('middlename').value;
    var mnmsg=document.getElementById('mn');
    // document.write(firstName);
    // document.write(firstName.length);
    if(middleName.length===25){
        mnmsg.style.display='block';
    }else{
          mnmsg.style.display='none';
    }

}




document.getElementById('input1').addEventListener('input',isValidPassportNo);
document.getElementById('input2').addEventListener('input',isValidAadharNo);
document.getElementById('input3').addEventListener('input',isValidLicenseNo);


document.getElementById('firstname').addEventListener('input',displayMaximumCharacterFirst);
document.getElementById('lastname').addEventListener('input',displayMaximumCharacterLast);
document.getElementById('middlename').addEventListener('input',displayMaximumCharacterMiddle);

function addressPage(){
    window.location.href='address.html';
    fetchData();
}

function confirmationPage(){
    window.location.href='confirmation.html';
}



async function fetchLocationInfo(){
    const pincode=document.getElementById('pincode').value;



    if(pincode.length != 6){
        clearFields();
        return;
    }


    try{
        const response=await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data=await response.json();

        if(response.ok){
            const postOffice=data[0]?.PostOffice[0];
            if(postOffice){
                const city=postOffice.District;
                const state=postOffice.State;
                document.getElementById('city').value=city;
                document.getElementById('state').value=state;
            }
            
        }else{
           
            clearFields();
            alert('Invalid Pincode. Please enter  a valid 6 digit pincode');
        }
    }catch(error){
        console.error('Error Fetching Pincode Information: ', error);
        clearFields();
        alert('An Error occurred while fetching pincode information.')
    }

}

function clearFields(){
    document.getElementById('city').value='';
    document.getElementById('state').value='';
} 


//On third page, I need to display all the datas, and the ask user whether to cancel or not.
//






document.querySelector("form").addEventListener('submit',(event)=>{
    event.preventDefault();
    var flag=1;

    const dropdownValue=document.getElementById('identityproof').value;
    var err=document.getElementById('dropdownError');
    
  console.log(dropdownValue);
    if(dropdownValue==="Passport"){
        //verify passport
        var pp=document.getElementById('input1').value;
        if(pp.length !=8 ){
            document.getElementById('input1').innerText="Passport must be 8 characters long.";
            flag=0;
        }
        for(var i=0;i<pp.length;i++){
                if(i==0){
                    if(pp.charAt(i)<'A' || pp.charAt(i)>'Z'){
                        document.getElementById('input1').innerText="Passport Number must start with capital letter.";
                        flag=0;
                    }
                }else{
                    if(pp.charAt(i)<'0' || pp.charAt(i)>'9'){
                        document.getElementById('input1').innerText="After first digit other 7 digits should be capital.";
                        flag=0;
                    }
                }
        }     
        
    }else if(dropdownValue==="aadhar"){
        var aa=document.getElementById('input2').value;
        if(aa.length != 14){
            document.getElementById('input2').innerText="Aadhar Card must be 14 characters long including space.";
            flag=0;
        }
        if(aa.charAt(0)==='0' || aa.charAt(0)==='1'){
            flag=0;
        }
        if(aa.charAt(4) != ' ' || aa.charAt(9) != ' '){
            flag=0;
        }
        for(var j=0;j<aa.length;j++){
            if(j===4 || j===9){
                continue;
            }else{
                if(aa.charAt(j)<'0' || aa.charAt(j)>'9'){
                    flag=0;
                    document.getElementById('input2').innerText="Aadhar must be contains Numeric and Space value only.";
                }

            }
        }



    }else if(dropdownValue==="drivinglicense"){
        var dd=document.getElementById('input3').value;
        if(dd.length != 16){
            flag=0;
        }

        for(var k=0;k<dd.length;k++){
            if(k==0 || k==1){
                if(dd.charAt(k)<'A' || dd.charAt(k)>'Z'){
                    flag=0;
                    document.getElementById('input3').innerText="DL First two characters must be letter";
                }
            }else if(k==2){
                if(dd.charAt(k)!='-')
                flag=0;
            }
            else{
                if(dd.charAt(k)<'0' || dd.charAt(k)>'9')
                flag=0;
                document.getElementById('input3').innerText="Enter DL number correctly.";
            }
        }

        console.log("pass");
    }else{
        flag=0;
        err.style.display='block';
    } 

    if(flag===1){

        NameFirst=document.getElementById('firstname').value;
        NameLast=document.getElementById('lastname').value;
        NameMiddle=document.getElementById('middlename').value;


        window.location.href='pincode.html';
    }
    
    
})



function addressSubmit(){
    console.log("Hello world");
    //validate if pincode is correct or not
    var city=document.getElementById('city').value;
    console.log(city);
    if(city.length != 0){
        window.location.href='confirm.html';
    }else{
        var pincodeMsg=document.getElementById('pincodeErrorMessage');
        pincodeMsg.style.display='block';
    }

}

const button=document.getElementById('addressButton');
button.addEventListener('click',addressSubmit);







function loadData(){
   console.log("hello world");
    console.log(NameFirst);
    console.log(NameLast);
    console.log("world hello");
    


    
}

function cancelAction(){
    alert('User Cancelled Registration.');
    window.location.href='index.html';
}

function confirmAction(){
    alert('User Registration Successfull.');
    window.location.href='index.html';
}