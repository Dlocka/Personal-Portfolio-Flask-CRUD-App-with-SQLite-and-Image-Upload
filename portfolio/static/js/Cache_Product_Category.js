
// load prodcut category data
function fetch_Product_Categories() {
    console.log('set category cache')
    if (window.Product_Category_Cache && Object.keys(window.Product_Category_Cache).length > 0) {
        // if cache exist, not neccessary to request cache
        console.log("Categories fetched from cache:", window.Product_Category_Cache);
       
    }
    else
    {
        fetch('/get_product_categories')
        .then(response => response.json())
        .then(data => {
            // Save data of categories as general variable
            window.Product_Category_Cache = data;
            console.log("Categories cached globally:", window.Product_Category_Cache);
            populateCategoryDropdown();
            
            //input field about category to show the really value based on key
            CategoryFields=document.getElementsByClassName("productCategory_field");
            Categoryfield_Id_ToName(CategoryFields);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
    }
}

//to set options of dropdown of category
function populateCategoryDropdown() {
    const categorySelects = document.getElementsByClassName('productCategory_Select');
    console.log(categorySelects.length);
    categorySelects.innerHTML = '';  // Clear any existing options
    Array.from(categorySelects).forEach(element => 
        {

        for (const categoryId in window.Product_Category_Cache) 
        {
            var categoryName = window.Product_Category_Cache[categoryId]; 
           
            var option = document.createElement('option');
            option.value = categoryId;  
            option.textContent = categoryName;  
            //set selected option
            var SelectedcategoryId = element.getAttribute('data-category-id');
            element.appendChild(option);
            if(SelectedcategoryId==option.value)
            {
                option.selected =true;
            }
            else{option.selected=false;}
        }

        }
    )
    // Loop through the cache and create option elements
    
}

function AddCategoryOption_selectTag(selectTag)
{
for (const categoryId in window.Product_Category_Cache) 
    {
            var categoryName = window.Product_Category_Cache[categoryId]; 
            var option = document.createElement('option');
            option.value = categoryId;  
            option.textContent = categoryName;  
        
            selectTag.appendChild(option);
    }
}

function Categoryfield_Id_ToName(Elements){

    for (let i = 0; i < Elements.length; i++) {
        let categoryId = Elements[i].value;
        let categoryName = window.Product_Category_Cache[categoryId] || "Unknown Category";

        Elements[i].value = categoryName;
    }

}
// when rendering page, fetchCategories to store
window.addEventListener('load', function() {
    console.log('Window loaded, cache script should run now.');
    fetch_Product_Categories();
});