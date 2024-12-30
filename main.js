
console.log("Extension injected.")
Toggled = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
    // Function to check for the element
    async function checkForElement() {
        var headerMovedRight = document.querySelector('[class^="header_headerMovedToRight__3bGXu"]')
        var headerUser = document.querySelector('[class^="header_headerUser__8phtj"]')
        var element = document.querySelector('[class^="header_headerUserBalance__mNiaf"]')
        if(element)
        {
            element = element.childNodes[0].childNodes[0];
        }else {
            return 0
        }
        const element2 = document.querySelector('[class^="header_headerUserContent__bqfIe"]');
        if (headerUser) {
            if (element) {
                console.log("Element found:", element);

                const btn = document.createElement("button");
                btn.classList.add("button_button__dZRSb");
                btn.classList.add("button_tab__RC45L");
                btn.classList.add("CHANGESEED")
                btn.textContent = "Change Seed";
                headerUser.after(headerUser, btn)
                btn.onclick = function(){
                    const BFToken = localStorage.getItem("_DO_NOT_SHARE_BLOXGAME_TOKEN"); // Needed for sending req
                    var data = {
                        "clientSeed": crypto.randomUUID()
                    }
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://api.bloxgame.com/provably-fair/clientSeed", true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("x-client-version", "1.0.0");
                    xhr.setRequestHeader("x-auth-token", BFToken);

                    xhr.onreadystatechange = () => {
                        // Call a function when the state changes.
                        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                            alert("Success.")
                        }
                      };

                    xhr.send(JSON.stringify(data))
                }


                // Insert the new element to the left
                

                const USDAmount = document.createElement('span');
                USDAmount.id = "USD"
                USDAmount.innerText = "($0)"
                //USDAmount.classList.add("textthing")
                USDAmount.classList.add("text_text__fMaR4")
                USDAmount.classList.add("text_regular16__7x_ra")
                USDAmount.classList.add("USDAMOUNT")
                //USDAmount.classList.add("header_headerUserContentLabel__IBocA")

                element.after(USDAmount, element);
                //element.parentNode.insertBefore(ToggleSwitch, element);

                //



                // Disconnect observer to stop looking for the element
                observer.disconnect();

                while(true)
                {
                    try{
                    var USDAmnt = (parseFloat(element.textContent.replace(",",""))/1000)*2
                    USDAmount.innerText = "($"+String( (Math.round( USDAmnt*1000 )/1000) )+")"
                    }finally{
                        await sleep(100)
                    }
                    //await sleep(100)
                }
            }
        }
    }

    // Create an observer to watch for changes in the DOM
    const observer = new MutationObserver(checkForElement);
    observer.observe(document.body, {
        childList: true,
        subtree: true // Observe all descendants
    });

    // Initial check in case the element is already present
    await checkForElement();
});