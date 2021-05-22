// 初始化資料
const productTitle = document.querySelector("#productTitle");
const productOriginPrice = document.querySelector("#productOriginPrice");
const productPrice = document.querySelector("#productPrice");
const productEnabled = document.querySelector("#productEnabled");
const addBtn = document.querySelector("#addBtn");
const addForm = document.querySelector("#addForm");
const productList = document.querySelector(".js-productList");
const productCount = document.querySelector("#productCount");
const cleanAllBtn = document.querySelector("#cleanAllBtn");
const inputs = document.querySelectorAll("input[name]");
let data = [];

// 渲染表格
function render() {
  var str = "";
  data.forEach((item) => {
    str += getList(item);
  });
  productList.innerHTML = str;
  productCount.textContent = data.length;
}

// 組清單
function getList(item) {
  return `<tr>
    <td>${item.title}</td>
    <td>${item.originPrice}</td>
    <td>${item.price}</td>
    <td><div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" data-id="${
      item.id
    }" data-method="changeStatus" ${item.enabled ? "checked" : ""}>
    <label class="form-check-label" for="flexSwitchCheckDefault">${item.enabled ? "啟用" : "停用"}</label>
    </div></td>
    <td><button type="button" class="btn btn-danger" data-id="${
      item.id
    }" data-method="deleteProduct">刪除</button></td>
  </tr>`;
}

// 送出表單
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  obj = {
    title: productTitle.value,
    originPrice: productOriginPrice.value,
    price: productPrice.value,
    enabled: productEnabled.checked,
    id: Date.now()
  };
  if (!checkFormData(obj)) {
    alert("請輸入正確資訊");
    return;
  }
  data.push(obj);
  addForm.reset();
  render();
});

productList.addEventListener("click", (e) => {
  e.preventDefault();
  // 整個 table 裡的東西，如果抓到是點刪除 button 就取 data-id 進行動作
  const method = e.target.dataset.method;
  let id = e.target.dataset.id;
  if (method == "deleteProduct") {
    data = deleteProduct(id);
  }
  if (method == "changeStatus") {
    data = changeStatus(id);
  }
  render();
});

// 刪除單一產品
function deleteProduct(id) {
  return data.filter((item) => item.id != id);
}

// 刪除所有產品
cleanAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // length 清才能釋放記憶體
  data.length = 0;
  render();
});

// 改變啟用狀態
function changeStatus(id) {
  return data.map((item) => {
    if (item.id == id) {
      item.enabled = !item.enabled;
    }
    return item;
  });
}

// 驗證輸入值
const constraints = {
  產品標題: {
    presence: {
      message: "必填欄位"
    }
  },
  原價: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0, // 只能大於等於零
      message: "必須整數大於0"
    }
  },
  售價: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0, // 只能大於等於零
      message: "必須整數大於0"
    }
  }
};

// 驗證輸入值是否正確
inputs.forEach((item) => {
  item.addEventListener("change", (e) => {
    item.nextElementSibling.textContent = "";
    let errors = validate(addForm, constraints) || "";
    if (errors) {
      Object.keys(errors).forEach((key) => {
        document.querySelector(`[data-message="${key}"]`).textContent =
          errors[key];
      });
    }
  });
});

// 判斷有沒填寫
function checkFormData(obj) {
  let values = Object.values(obj);
  for (i = 0; i < values.length; i++) {
    // 判斷盡量用 ===
    if (
      values[i] === "" ||
      values[0].trim() === "" ||
      !isPositiveInt(values[1]) ||
      !isPositiveInt(values[2])
    )
      return false;
  }
  return true;
}

// 判斷大於0整數
function isPositiveInt(num) {
  return /^[1-9]*[1-9][0-9]*$/.test(num);
}

render();
