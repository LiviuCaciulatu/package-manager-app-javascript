const express = require("express");
const fs = require("fs");
const dataRoute = "./pkgs.json";
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 9002;

app.get("/", (req, res) => {
  res.redirect(301, '/edit/package');
});

app.get(["/edit/package","/edit/package/:id"], (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use('/public', express.static(`${__dirname}/../frontend/public`));

fs.readFile("pkgs.json", 'utf8', (err, data)=>{
  if(err){
    console.error(err)
    return
  }
  const pkgs = JSON.parse(data)

  app.get("/api/package", (req, res)=>{
    res.send(JSON.stringify(pkgs.packages))
  })

  app.get("/api/package/:id", (req, res)=>{
    const id = req.params.id;
    const package = pkgs.packages.find((pkg)=>pkg.id==id);
    if (package){
      res.send(JSON.stringify(package))
    } else {
      res.status(404).send("Package not found")
    }
  })

  app.post("/api/package", (req, res)=>{
    const newId = pkgs.packages.reduce((maxId, pkg)=> Math.max(maxId, pkg.id), 0) + 1;
    const newPkg = {
      id: newId,
      name: req.body.name,
      version: req.body.version,
      description: req.body.description,
      author: req.body.author,
      license: req.body.license
    }
    pkgs.packages.push(newPkg);
    res.send(pkgs.packages)
  })

  app.post("/pachageSchema", (req, res)=>{
    const packageSchema = req.body.package;
    console.log("Received package:", packageSchema)
    res.status(200).json({message:"Package schema received"})
  })

  app.put("/api/package/:id", (req,res)=>{

    const id = parseInt(req.params.id);
    const pkgIndex = pkgs.packages.findIndex(pkg=>pkg.id===id);
    const pkg = pkgs.packages[pkgIndex];
    const currentDate = new Date().toISOString().split("T")[0]

    pkg.name = req.body.name;
    pkg.version = req.body.version;
    pkg.description = req.body.description;
    pkg.author = req.body.author;
    pkg.license = req.body.license;
    const latestVersion = pkg.releases[pkg.releases.length-1].version;
    const [major, minor, patch] = latestVersion.split(".").map(num=>parseInt(num));
    const newVersion = currentDate === pkg.releases[pkg.releases.length-1].date ? latestVersion:`${major}.${minor}.${patch+1}`;

    const newRelease = { date: currentDate, version: newVersion };
    pkg.releases.push(newRelease);

    fs.writeFileSync(filePath, JSON.stringify(pkgs));

    res.send("DONE")

  })

  app.get("/data",(req,res)=>{
      const data = fs.readFileSync("pkgs.json");

      res.send(data)
  })
  
  app.delete("/api/package/:id", (req,res)=>{
    const id = req.params.id;
    const pkgIndex = pkgs.packages.findIndex(pkg=>pkg.id==parseInt(id));
    if (pkgIndex!==-1){
      pkgs.packages.splice(pkgIndex, 1);
      fs.writeFile("pkgs.json", JSON.stringify(pkgs), (err)=>{
        if (err){
          console.error(err);
          res.send(500).send("Error deleting package");
        } else {
          res.send("DONE");
        }
      })
    } else {
      res.status(404).send("Package not found")
    }
  })
})

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));