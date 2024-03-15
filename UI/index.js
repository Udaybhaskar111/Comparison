function dBDataPassing(object) {
  fetch("http://localhost:8082/createConnection", {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
let additionalinfo = ["0", "1"];
function OnSubmit(e) {
  e.preventDefault();
  additionalinfo = [];
  const DBName = document.getElementById("DBName").value;
  const userName = document.getElementById("userName").value;
  const DBType = document.getElementById("DBType").value;
  const password = document.getElementById("password").value;
  const TabelName = document.getElementById("TabelName").value;
  additionalinfo.push(TabelName);
  additionalinfo.push(DBName);
  if (
    DBName === "" ||
    userName === "" ||
    DBType === "" ||
    password === "" ||
    TabelName === ""
  ) {
    alert("please select all the feilds");
  } else {
    let data = {
      DBname: DBName,
      user_id: userName,
      passwd: password,
      DBtype: DBType,
      TabelName: TabelName,
    };
    dBDataPassing(data);
    // document.getElementById("form").reset();
  }
}

const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:8082/file", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
};

const onFileUpload = (e) => {
  e.preventDefault();
  const input = document.getElementById("fileInput");
  if (!input.files[0]) {
    alert("enter the file");
  } else {
    let filename = input.files[0].name;
    let infoid = document.getElementById("info");
    infoid.innerText = "";
    infoid.innerText = `Comparing the ${additionalinfo[0]} database of ${additionalinfo[1]} table with ${filename}`;
    upload(input.files[0]);
  }
};

lostdata.innerHTML = "";
result.innerHTML = "";
let colnamesforFile=[];
const onInitialComparision = () => {
  let messenger = document.getElementById("message");
  fetch("http://localhost:8082/initialcompare")
    .then((response) => response.json())
    .then((json) => {
      if (json.message == true) {
        messenger.innerHTML = "";
        document.getElementById("order").style.display = "flex";
        colnamesforFile=json.header;
      } else {
        messenger.innerHTML = "";
        messenger.innerText = json.message;
      }
    });
};

let userinput = [];
const onChangeOrder = () => {
  let listitems = document.createElement("ul");
  let userinffordb = document.createElement("h3");
  userinffordb.innerText = "Database columns order";
  let userinfforfile = document.createElement("h3");
  userinfforfile.innerText = "File column order";
  let listitems2 = document.createElement("ul");
  let showitems = document.querySelector("#show");
  let lenOfData = 0;
  fetch("http://localhost:8082/info")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      for (let i = 0; i < json.database.length; i++) {
        colnamesforFile.push(json.file[i])
        let item1 = document.createElement("li");
        let item2 = document.createElement("li");
        item1.append(json.file[i]);
        item2.append(json.database[i]);
        listitems.append(item1);
        listitems2.append(item2);
      }
      lenOfData=json.file.length;
       showitems.append(userinffordb)
       showitems.append(listitems);
       showitems.append(userinfforfile)
       showitems.append(listitems2);
       userinput=[]
       let inpfromuser=document.querySelector('#inputfromuser');
       let mapmsg=document.getElementById('map');
       for(let i=0;i<lenOfData;i++){
        let inputfields=document.createElement('li');
         let sp=document.createElement('span');
         let inp=document.createElement('input');
         inp.placeholder="Enter the column you want to map"
         sp.innerText=i+" column";
         inp.setAttribute('type', 'number');
         inp.addEventListener('input', (event) => {
          userinput[i] = event.target.value; 
          console.log(userinput)
          });
          mapmsg.style.display='block';
         inputfields.append(sp);
         inputfields.append("  ➡️  ");
         inputfields.append(inp);
         inpfromuser.append(inputfields);
       }
    }
    )
}
 function onComparision() {
  fetch("http://localhost:8082/compare",{
    method: "POST",
    body: JSON.stringify(userinput),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let result = document.querySelector("#result");
      let lostdata = document.querySelector("#lostdata");
      let messageElement = document.querySelector("#message");
      messageElement.innerText = "";
      lostdata.innerHTML = "";
      result.innerHTML = "";
      const Db = json.Filedata;
      const File = json.LostData;
      const message = json.message;
      if (message) {
        let outputElement = document.querySelector(".output");
        outputElement.style.display = "none";
        let messageElement = document.getElementById("message");
        messageElement.innerText = message;
      } else {
        let outputElement = document.querySelector(".output");
        outputElement.style.display = "flex";
        let tab1 = document.createElement("table");
        let tab2 = document.createElement("table");
        let tr1=document.createElement("tr");
        tr1.classList.add('firstrow');
        let tr2=document.createElement('tr');
        tr2.classList.add('firstrow');
        for(let i of colnamesforFile)
        {
          let td1=document.createElement('td');
          let td2=document.createElement('td');
          td1.append(i);
          td2.append(i);
          tr1.append(td1);
          tr2.append(td2);
        }
        tab1.append(tr1);
        tab2.append(tr2);
        for (let i in Db) {
          let list = document.createElement("tr");
          let obsjs = Object.values(Db[i]);
          for (let j of obsjs) {
            let li = document.createElement("td");
            li.append(j);
            list.append(li);
          }
          tab1.append(list);
          result.appendChild(tab1);
        }

        for (let i in File) {
          let list = document.createElement("tr");
          let dest = Object.values(File[i].data);
          for (let j of dest) {
            let li = document.createElement("td");
            li.append(j);
            list.append(li);
          }
          let missid = document.createElement("td");
          missid.append(File[i].index)
          list.append(missid);
          tab2.append(list);
          lostdata.appendChild(tab2);
        }
        let btn = document.createElement("button");
        btn.innerText = "Export";
        lostdata.appendChild(btn);
        btn.addEventListener("click", async () => {
          console.log("button clicked");
          try {
            const resp = await fetch("http://localhost:8082/getfile");
            const blob = await resp.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.csv";
            a.click();
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Error downloading file:", error);
          }
        });
      }
    });
}

const fileNameUpdate = document.getElementById("fileInput");
const contentPara = document.createElement("p");
const fileContainer = document.getElementById("fileformcontainer");
fileContainer.appendChild(contentPara);

fileNameUpdate.addEventListener("change", () => {
  const input = fileNameUpdate;
  const fileName = input.files[0].name;
  contentPara.textContent = "Selected File : " + fileName;
});

