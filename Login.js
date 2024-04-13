async function MyFunction()
{
    let TK= document.getElementById("EmailID").value;
    let MK= document.getElementById("PasswordID").value; 
    let OK =await PostItem(TK,MK);
    if(OK== "ok"){
        window.location.href="./Task.html";
    }
    else{
       document.getElementById("Wn").style.opacity = 1;
    }
}
async function PostItem(email,password) {
try {
    let response = await fetch("https://recruitment-api.pyt1.stg.jmr.pl/login", {
        method: "POST",
        body: JSON.stringify({
            login: email,
            password: password
    }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let result = await response.json();

    return result.status;
} catch (err) {
}
}