const loadEvent = _ => {
    const root = document.getElementById("root");
    root.action = "/edit/package";
    root.method = "POST";
    root.style.display = "flex";
    root.style.justifyContent = "center";
    root.style.alignItems = "center";
    root.style.flexDirection = "column";
    root.style.fontFamily = "Monospace";

    const form = document.createElement("form");
    form.id = "form";
    form.style.display = "flex";
    form.style.justifyContent = "center";
    form.style.flexDirection = "column";
    form.style.alignItems = "center";
    form.style.backgroundColor = "white";
    form.style.borderTop = "50px";
    form.style.width = "400px";
    form.style.height = "600px"

    // DETAILS AREA
    const detailsArea = document.createElement("div");
    detailsArea.id = "detailsArea";
    detailsArea.style.display = "flex";
    detailsArea.style.justifyContent = "center";
    detailsArea.style.alignItems = "center";
    detailsArea.style.flexDirection = "column";

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "PACKAGE DETAILS";
    nameLabel.style.fontFamily = "Monospace";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.Id = "name";
    nameInput.name = "name";
    nameInput.style.width = "200px";
    nameInput.placeholder = "name";
    nameInput.style.display="flex";
    nameInput.style.justifyContent = "center";
    nameInput.style.alignItems = "center";
    nameInput.style.textAlign = "center";
    nameInput.required = true;

    const detailsTextarea = document.createElement("textarea");
    detailsTextarea.id = "details";
    detailsTextarea.name = "details";
    detailsTextarea.placeholder = "details";
    detailsTextarea.style.textAlign = "center";
    detailsTextarea.rows = 5;
    detailsTextarea.cols = 50;
    detailsTextarea.padding = "20px";
    detailsTextarea.style.width = "200px";
    detailsTextarea.required = true;

    // DEPENCENDIES AREA
    const dependArea = document.createElement("div");
    dependArea.id = "dependArea"
    dependArea.style.display = "flex";
    dependArea.style.justifyContent = "center";
    dependArea.style.flexDirection = "column";
    dependArea.style.alignItems = "center";
    const dependLabel = document.createElement("label");
    dependLabel.textContent = "PACKAGE DEPENDENCIES";

    const dependElement = document.createElement("div");

    const dependSearch = document.createElement("input");
    dependSearch.id = "search";
    dependSearch.name = "search";
    dependSearch.placeholder = "dependency search";
    dependSearch.style.width = "200px";
    dependSearch.style.textAlign = "center";

    // DEPENDENCY VERSION AREA
    const dependVersion = document.createElement("div");
    dependVersion.id = "dependVersion";
    dependVersion.style.display = "flex";
    dependVersion.style.justifyContent = "center";
    dependVersion.style.flexDirection = "column";
    dependVersion.style.alignItems = "center";

    const versionLabel = document.createElement("label");
    versionLabel.textContent = "PACKAGE VERSIONS";

    const versionElement = document.createElement("div");

    // SAVE BUTTON
    const saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.style.padding = "15px";
    saveBtn.textContent = "SAVE PACKAGE";
    saveBtn.style.backgroundColor = "black";
    saveBtn.style.color = "white";
    saveBtn.style.width = "200px"
    saveBtn.style.display = "flex";
    saveBtn.style.justifyContent = "center";
    saveBtn.style.flexDirection = "column";
    saveBtn.style.alignItems = "center";

    //DELETE BUTTOn
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.textContent = "DELETE PACKAGE";
    deleteBtn.style.backgroundColor = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "grey";

    root.appendChild(form);
    form.appendChild(detailsArea);
    detailsArea.appendChild(nameLabel);
    detailsArea.appendChild(document.createElement("br"));
    detailsArea.appendChild(nameInput);
    detailsArea.appendChild(document.createElement("br"));
    detailsArea.appendChild(detailsTextarea);
    form.appendChild(document.createElement("br"));
    form.appendChild(dependArea);
    dependArea.appendChild(dependLabel);
    dependArea.appendChild(document.createElement("br"));
    dependArea.appendChild(dependElement);
    dependArea.appendChild(dependSearch);
    form.appendChild(document.createElement("br"));
    form.appendChild(dependVersion);
    dependVersion.appendChild(versionLabel);
    dependVersion.appendChild(versionElement);
    form.appendChild(document.createElement("br"));
    form.appendChild(saveBtn);
    form.appendChild(document.createElement("br"));
    form.appendChild(deleteBtn);

    let packageSchema = {
        packages: []
    };

   

    form.addEventListener("change", e=>{
        const input = e.target;
        packageSchema[input.name] = input.value;
        console.log(packageSchema);
    })

    nameInput.addEventListener("change", ()=>{
        const name = nameInput.value;
        packageSchema.name = name;
    })

    detailsTextarea.addEventListener("change", ()=>{
        const details = detailsTextarea.value;
        packageSchema.details = details;
    })

    fetch("/data")
        .then((response)=>response.json())
        .then ((data)=>{
            const packageNames = data.packages.map(pkg=> pkg.name);
            dependSearch.addEventListener("input",()=>{
                
            })
            packageSchema = {dependencies: []};
            
        })
        .catch((error) => console.error(error));
};

window.addEventListener("load", loadEvent);
