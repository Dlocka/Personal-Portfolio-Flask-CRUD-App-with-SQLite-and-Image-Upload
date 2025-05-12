function SubmitForm_ProductChange(btn_submit,product_id) {
    var form = btn_submit.closest('form');
    var formData = new FormData(form);
    formData.append('product_id', product_id); 
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ': ' + pair[1]);
    // }
    fetch('/product_update', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) 
            {
                if(data.login_status)
                {console.log('product update success');
                    ChangeDefaultValue_Form(form);
                    alert('update success');
                }
                else
                { GoToLog();}
        } else {
            console.log('product update failure');
        }
    })
    .catch(error => {
        console.error("Error updating product:", error);
        // alert("An error occurred while updating the product.");
    });
}

function TakeDownProduct(btn_take_down,product_id)
{
    console.log('take down id:'+product_id);
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ': ' + pair[1]);
    // }
    fetch(`/product_takedown.${product_id}`, {
        method: 'POST',
       
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) 
        {
                if(data.login_status)
                {   console.log('product takedown success');
                    //remove the product on webpage
                    var div_product_panel = btn_take_down.closest('.product_panel_onsale');
                    if (div_product_panel) {
                        div_product_panel.remove();  // This removes the div from the DOM
                        alert('take down successfully')
                    }
                    alert('')   
                }
                else
                { GoToLog();}
        } else {
            console.log('product takedown failure, connection failure');
            alert('take down failed:'+data.error_message)
        }
    })
    .catch(error => {
        console.error("Error takedown product:", error);
        alert(error);
        // alert("An error occurred while updating the product.");
    });
}

function ChangeDefaultValue_Form(formElement)
{
    var inputs = formElement.getElementsByTagName('input');
    Array.from(inputs).forEach(input => {
        input.defaultValue = input.value;  // Set defaultValue to the current value
    });
}

function RecoverToDefault(inputs){
    Array.from(inputs).forEach(input => {
        input.value = input.defaultValue;  // Set defaultValue to the current value
    });
}
function DiscardChanges(btn_discard)
{
    var form = btn_discard.closest('form');
    var inputs = form.getElementsByTagName('input');
    form.reset();
    // Array.from(inputs).forEach(input => {
    //     input.value = input.defaultValue;  // Set defaultValue to the current value
    // });
}

//product_category

// Use the Product_Category_Cache to replace category_id with category_name when rendering products
function renderProducts(products) {
    products.forEach(product => {
        let categoryName = Product_Category_Cache[product.category_id] || 'Unknown Category';
        // Render product with category_name
        console.log(product.name, categoryName);
    });
}


function createProduct(btn_create,subsequent_func)
{
    var form = btn_create.closest('form');
    var formData = new FormData(form);
    fetch('/product_create', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(data => {
        if(data.success)
            {
                if(data.login_status)
                {
                console.log('product create success');
                currentPanel=form.parentNode;
                product_container=document.getElementById('sale_area');
            
                let product = JSON.parse(data.product);
                subsequent_func(product,product_container);
                alert('create successfully');
                }
                else
                {
                    GoToLog();
                }
            }
        else{alert(data.error_message)}
    })
}

function previewImage(input,event) {
    var file = event.target.files[0];  

    if (file) {
        var reader = new FileReader();  

        reader.onload = function(e) {
            var imageUrl = e.target.result;
            product_panel_onsale=input.closest('.product_panel_onsale');
            imageTag=product_panel_onsale.querySelector('.product_img');
            imageTag.src = imageUrl;
        };

        // 读取文件为 Data URL
        reader.readAsDataURL(file);
    }
}



//product img window function
var modal_pic_product=document.getElementById('modal_pic_product');
var modalImg_product = document.getElementById('modalImg_pic_product');
var closeBtn_img_window = document.getElementById('closeBtn_modal_pic');
//the image on panel
var product_imgs=document.getElementsByClassName('product_img');

function imageWindowOpen(imgTag) {
    modal_pic_product.style.display = "block";  // open window
    modalImg_product.src = imgTag.src;  
}


for (var i = 0; i < product_imgs.length; i++) {
    product_imgs[i].onclick = function(){
        imageWindowOpen(this);
    };
}

closeBtn_img_window.onclick = function() {
    modal_pic_product.style.display = "none";
}



product_img.onclick = function(){imageWindowOpen()};
///Add panel 


function AppendNewGoodPanel(product,e_append_into){
    const productDiv = document.createElement('div');
    productDiv.classList.add('product_panel_onsale');

    
    productDiv.innerHTML = `
                    <div class="product_pic_container">
                   
                        <img src="/static/img/${product.image_url}" alt="Product Image" class="product_img">
                   
                    </div>
                    <form id="productForm_product_new" class="productForm">
                        <div class="product_info_panel">
                            <div class="product_normal_info">

                                <div class="product_panel_lab_input_pair">
                                <label for="productName_product_new" class="product_panel_label">Skill:</label>
                                <input type="text" id="productName_product_new" name="name" value="${product.name}" required class="product_panel_input">
                                </div>
                                
                                <div class="product_panel_lab_input_pair">
                                <label for="productPrice_product_new" class="product_panel_label">Times Used:</label>
                                <input type="number" id="productPrice_product_new" name="price" value="${product.price}" required min="0" step="1" class="product_panel_input">
                                </div>
                                
                                <div class="product_panel_lab_input_pair">
                                <label for="productStock_product_new" class="product_panel_label">Hours Used:</label>
                                <input type="number" id="productStock_product_new" name="stock_quantity" value="${product.stock_quantity}" required min="0" step="1" class="product_panel_input">
                                </div>
        
                                <div class="product_panel_lab_input_pair">
                                <label for="productCategory_product_new" class="product_panel_label_category">Language:</label>
                                <select id="productCategory_product_new" name="category_id" class="productCategory_Select" value="${product.category_id}"required></select>
                                </div>

                                <div class="product_panel_lab_input_pair">
                                    <label for="productImage_product_new" class="product_panel_label">Code Image:</label>
                                    <input type="file" id="productImage_product_new" name="image" accept="image/*" class="product_panel_input" onchange="previewImage(this,event)">
                                </div>
                            </div>
                            <div class="product_panel_lab_input_pair_des">
                                <label for="productDescription_product_new" class="product_panel_label product_panel_label_des">Description:</label>
                                <textarea type="text" id="productDescription_product_new" name="description" value="${product.description}" required class="product_panel_input product_panel_input_des"></textarea>
                            </div>
                        </div>
                            <div class="product_panel_btn_area">
                            <button type="button" class="btn_submit" onclick="SubmitForm_ProductChange(this,${product.product_id})">Submit Changes</button>
                            <button type="button" class="btn_discard" onclick="DiscardChanges(this)">Discard Changes</button>
                            <button type="button" class="btn_take-down" onclick="TakeDownProduct(this,${product.product_id})">Take Down Skill</button>
                            </div>
                    </form>
    `;
 
    
    //add the div of new product into target tag
    e_append_into.insertBefore(productDiv, e_append_into.firstChild); 
    var productForm = document.querySelector('#productForm_product_new');

var productName_ = productForm.querySelector('#productName_product_new');

var productPrice_ = productForm.querySelector('#productPrice_product_new');

var productStock_ = productForm.querySelector('#productStock_product_new');

var productCategory_ = productForm.querySelector('#productCategory_product_new');

var productImage_ = productForm.querySelector('#productImage_product_new');

var productDescription_ = productForm.querySelector('#productDescription_product_new');

productName_.value = product.name; // Fill 'Skill' (name) input
productPrice_.value = product.price; // Fill 'Times Used' (price) input
productStock_.value = product.stock_quantity; // Fill 'Hours Used' (stock_quantity) input


AddCategoryOption_selectTag(productCategory_);

productCategory_.value=product.category_id;
console.log(product.description);
productDescription_.value = product.description; // Fill 'Description' textarea
try{
productImage_.src="{{url_for('static',filename='img/product.image_url')}}"
}
catch(err){
    window.alert(err);
}

}
