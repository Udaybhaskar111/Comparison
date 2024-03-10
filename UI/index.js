function dBDataPassing(object) {
  fetch("http://172.22.30.145:8081/createConnection", {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function OnSubmit(e) {
  e.preventDefault();
  const DBName = document.getElementById("DBName").value;
  const userName = document.getElementById("userName").value;
  const DBType = document.getElementById("DBType").value;
  const password = document.getElementById("password").value;
  const TabelName = document.getElementById("TabelName").value;
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

  fetch("http://172.22.30.145:8081/file", {
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
  upload(input.files[0]);
};
function onComparision() {
  fetch("http://172.22.30.145:8081/compare")
    .then((response) => response.json())
    .then((json) => {
      const result = document.getElementById("result");
      let list = document.createElement("ul");
      const Db = json.Db;
      const File = json.File;
      for (let i in Db) {
        console.log(Object.keys(Db[i]));
        console.log(Object.values(Db[i]));
      }
      result.appendChild(list);
    }
    )
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
