// ================== ربط العناصر ==================
let title     = document.getElementById("title");
let price     = document.getElementById("price");
let taxes     = document.getElementById("taxes");
let ads       = document.getElementById("ads");
let discount  = document.getElementById("discount");
let total     = document.getElementById("total");
let count     = document.getElementById("count");
let category  = document.getElementById("category");
let submit    = document.getElementById("submit");
let search    = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

// ================== متغيرات التحكم ==================
let mood = "create";
let tmp;
let searchMode = "title";

// ================== دالة حساب الإجمالي ==================
function gettotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result ? result : "";
        total.style.background = result ? "#040" : "#a00";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00";
    }
}

// ================== تحميل البيانات من LocalStorage ==================
let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

// ================== إنشاء أو تعديل المنتج ==================
submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value || 1,
        category: category.value.toLowerCase(),
    };

    if (newpro.title !== "" && newpro.price !== "" && newpro.category !== "") {
        if (mood === "create") {
            let qty = newpro.count > 1 ? newpro.count : 1;
            for (let i = 0; i < qty; i++) {
                datapro.push({ ...newpro, count: 1 });
            }
        } else {
            datapro[tmp] = newpro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }

        clearData();
        localStorage.setItem("product", JSON.stringify(datapro));
        showdata();
    } else {
        alert("من فضلك أدخل البيانات الأساسية (العنوان، السعر، التصنيف).");
    }
};

// ================== مسح الخانات بعد الإدخال ==================
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.background = "#a00";
}

// ================== عرض البيانات ==================
function showdata() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i]) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
            `;
        }
    }

    document.getElementById("tbody").innerHTML = table;

    // زر حذف الكل
    let btnDelete = document.getElementById("deleteall");
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = "";
    }
}
showdata();

// ================== حذف عنصر واحد ==================
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(datapro));
    showdata();
}

// ================== حذف الكل ==================
function deleteAll() {
    if (confirm("هل أنت متأكد من حذف جميع المنتجات؟")) {
        datapro = [];
        localStorage.removeItem("product");
        showdata();
        clearData();
    }
}

// ================== تحديث بيانات ==================
function updateData(i) {
    title.value    = datapro[i].title;
    price.value    = datapro[i].price;
    taxes.value    = datapro[i].taxes;
    ads.value      = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ================== البحث ==================
function getSearchMood(id) {
    if (id === "searchTitle") {
        searchMode = "title";
    } else {
        searchMode = "category";
    }
    search.placeholder = "Search By " + searchMode;
    search.focus();
    search.value = "";
    showdata();
}

function searchdata(value) {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i] && datapro[i][searchMode].toLowerCase().includes(value.trim().toLowerCase())) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
            `;
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
