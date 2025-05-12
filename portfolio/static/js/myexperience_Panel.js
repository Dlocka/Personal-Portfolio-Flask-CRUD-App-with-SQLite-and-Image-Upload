function SubmitForm_ProductChange(btn_submit,experience_id) {
    var form = btn_submit.closest('form');
    var formData = new FormData(form);
    formData.append('experience_id', experience_id); 
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ': ' + pair[1]);
    // }
    fetch('/experience_update', {
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
                    alert('update successfully')
                }
                else
                { GoToLog();}
        } else {
            console.log('product update failure');
            alert(data.error_message)
        }
    })
    .catch(error => {
        console.error("Error updating product:", error);
        // alert("An error occurred while updating the product.");
    });
}

function TakeDownProduct(btn_take_down,experience_id)
{
    console.log('take down id:'+experience_id);
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ': ' + pair[1]);
    // }
    fetch(`/experience_takedown.${experience_id}`, {
        method: 'POST',
       
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) 
        {
                if(data.login_status)
                {   console.log('experience takedown success');
                    //remove the product on webpage
                    var div_product_panel = btn_take_down.closest('.product_panel_onsale');
                    if (div_product_panel) {
                        div_product_panel.remove();  // This removes the div from the DOM
                    }
                    alert('take down successfully')   
                }
                else
                { GoToLog();}
        } else {
            console.log('experience takedown failure, connection failure');
            alert(data.error_message);
        }
    })
    .catch(error => {
        console.error("Error takedown product:", error);
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
    fetch('/experience_create', {
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
                console.log(product_container);
            
                let experience = JSON.parse(data.experience);
                subsequent_func(experience,product_container);
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



//product img window function
var modal_pic_product=document.getElementById('modal_pic_product');
var modalImg_product = document.getElementById('modalImg_pic_product');
var closeBtn_img_window = document.getElementById('closeBtn_modal_pic');
//the image on panel
var product_imgs=document.getElementsByClassName('product_img');

function imageWindowOpen(imgTag) {
    modal_pic_product.style.display = "block";  // open the window
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

///Add panel and copy value
function PanelValueCopy(CopyFrom, PasteTo) {
    
    var CopyInputs = CopyFrom.querySelectorAll('input');
    
    CopyInputs.forEach(input => {
     
        var CurClasses = input.className.split(' '); 
        var classSelector = CurClasses.map(cls => '.' + cls).join('');
        var PasteInput = PasteTo.querySelector(classSelector);
        

        if (PasteInput) {
            PasteInput.value = input.value;
        }
    });


    var Copytextareas = CopyFrom.querySelectorAll('textarea');
    
    Copytextareas.forEach(textarea => {

        var CurClasses = textarea.className.split(' ');

        var classSelector = CurClasses.map(cls => '.' + cls).join('');


        var Pastetextarea = PasteTo.querySelector(classSelector);
        

        if (Pastetextarea) {
            Pastetextarea.value = textarea.value;
        }
    });


    var Copyimgs = CopyFrom.querySelectorAll('img');
    
    Copyimgs.forEach(img => {
        var CurClasses = img.className.split(' ');

        var classSelector = CurClasses.map(cls => '.' + cls).join('');
        var Pasteimg = PasteTo.querySelector(classSelector);

        if (Pasteimg) {
            try {
                Pasteimg.src = img.src;
            } catch (error) {
                alert(error);
            }
        }
    });
}

function AppendNewGoodPanel(experience,e_append_into){
    const productDiv = document.createElement('div');
    productDiv.classList.add('product_panel_onsale');

    
    productDiv.innerHTML = `
                    
                    <form id="productForm_{{ experience.experience_id }}" class="productForm">
                        <div class="product_info_panel">
                            <div class="product_normal_info">
                                
                                <div class="product_panel_lab_input_pair">
                                    <label for="productName" class="product_panel_label">Job Title:</label>
                                    <input type="text" id="productName_{{experience_id}}" name="job_title" required class="product_panel_input experience_job_title_input" value="${experience.job_title}" placeholder="Enter skill">
                                </div>
                    
                                <div class="product_panel_lab_input_pair">
                                    <label for="productPrice" class="product_panel_label">Company:</label>
                                    <input type="text" id="productPrice_{{experience_id}}" name="company" required  class="product_panel_input experience_company_input" value="${experience.company}" placeholder="Enter company">
                                </div>
                    
                                <div class="product_panel_lab_input_pair">
                                    <label for="productStock" class="product_panel_label">Start date:</label>
                                    <input type="text" id="productStock_{{experience_id}}" name="start_date" required class="product_panel_input experience_start_date_input" value="${experience.start_date}" placeholder="Enter start date">
                                </div>

                                <div class="product_panel_lab_input_pair">
                                    <label for="end_date" class="product_panel_label">End date:</label>
                                    <input type="text" id="end_date_{{experience_id}}" name="start_date" required class="product_panel_input experience_end_date_input" value="${experience.end_date}" placeholder="Enter start date">
                                </div>
                                
                               
                            </div>
                    
                            <div class="product_panel_lab_input_pair_des">
                                <label for="productDescription" class="product_panel_label product_panel_label_des">Duty:</label>
                                <textarea id="productDescription" name="duty" required class="product_panel_input product_panel_input_des" placeholder="Enter duty">${experience.duty}</textarea>
                            </div>
                        </div>
                            <div class="product_panel_btn_area">
                            <button type="button" class="btn_submit" onclick="SubmitForm_ProductChange(this, ${experience.experience_id})">Submit Changes</button>
                            <button type="button" class="btn_discard" onclick="DiscardChanges(this)">Discard Changes</button>
                            <button type="button" class="btn_take-down" onclick="TakeDownProduct(this,${experience.experience_id})">Take Down Experience</button>
                            </div>
                    </form>
    `;
    
    
    //add the div of new product into target tag
    e_append_into.insertBefore(productDiv, e_append_into.firstChild); 
    Panel_CreatePro=document.getElementById('product_create_panel');
    PanelValueCopy(Panel_CreatePro,productDiv)

    // if category select exsits, to add options into it
    var CategorySelect=document.getElementsByClassName('productCategory_Select');
    if(CategorySelect.length>0){AddCategoryOption_selectTag(CategorySelect);}


}



