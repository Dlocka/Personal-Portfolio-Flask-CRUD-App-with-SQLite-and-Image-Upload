
    //Judge whether logged, to set the user panel in head
    //usertype:guest or  
    function Unlogged_To_Loged(username,user_type){
        if(username!=='')
        {
            if(user_type=='owner')          
            {
                let hidden_array=[]
                guest_ui=document.getElementById('user_link_btn_container_guest')
                user_link.innerHTML='['+username+']'
                owner_ui=document.getElementById('user_link_btn_container');
                hidden_array.push(guest_ui)
                hidden_array.push(btn_Login_Retister)
                exhibit_change(owner_ui, hidden_array,'flex'); 
            }
            else
            {
                user_link_guest.innerHTML='['+username+']';
                let hidden_array=[]
                guest_ui=document.getElementById('user_link_btn_container_guest')
                owner_ui=document.getElementById('user_link_btn_container');
                hidden_array.push(owner_ui)
                hidden_array.push(btn_Login_Retister)
                element_afterlog=document.getElementById('user_link_btn_container_guest');
                exhibit_change(guest_ui, hidden_array,'flex'); 
            }
        // console.log('user having logged, change head')
        // // if user type,guest or owner to exhibit different UI on head
        // btn_login=document.getElementById('btn_Login_Retister');
        
        // element_afterlog=document.getElementById('user_link_btn_container');
        // console.log('username:'+username);
        // user_link.innerHTML='['+username+']';

        // exhibit_change(element_afterlog, btn_login,'flex'); 
        }
    }
    
    // Get the modal
    var modal = document.getElementById("loginModal");
    // Get the button that opens the modal
    var btn = document.getElementById("loginBtn");
    var btn_Login_Retister=document.getElementById("btn_Login_Retister");
    var btn_log_out=document.getElementById('btn_log_out');
    // Get the <span> element that closes the modal
    var LoginClose_btn = document.getElementsByClassName("close")[0];
    
    var btn_ToRegister=document.getElementById('btn_ToRegister');
    var btn_ToLogin=document.getElementById('btn_ToLogin');
    var LoginForm=document.getElementById('LoginForm');
    var RegisterForm=document.getElementById('RegisterForm');
    var btn_Login=document.getElementById('btn_log_sub');

    btn_ToRegister.addEventListener('click',function()
    {exhibit_change(RegisterForm,LoginForm,'block');   
    });
    btn_ToLogin.addEventListener('click',function()
    {exhibit_change(LoginForm,RegisterForm,'flex');
    });

    function LogOut(IsToHomePage)
    {
        console.log(IsToHomePage);
        console.log('is to homepage:'+IsToHomePage);
        
        CurrentPath=window.location.pathname;
        currentHtmlName=CurrentPath.split('/').pop();
        url= `/logout?IsToHomePage=${IsToHomePage}&CurrentHtml=${currentHtmlName}`;

        console.log('logout url:'+url);
        
        fetch(url, { method: 'GET' }).
        then(response=>response.json()).then(data=>
        {
            if(data.success)
            {
                if (IsToHomePage) 
                {
                    // Redirect to the homepage, if there is a redirect from backend, this sentence will not work
                    window.location.href = data.redirect_to;
                } else 
                {console.log('Logged out, staying on this page.');
                    Logged_To_Unlogged()
                }
            }
            else
            {
                console.error('Logout failed');   
            }
        })
    }
    
   
    // When the user clicks the button, open the modal
    btn_Login_Retister.onclick = function () {
        console.log('modal show');
        modal.style.display = "flex";
    }
    function GoToLog(){
        btn_Login_Retister.click();    
    }
    
    LoginClose_btn.onclick = function () {
        modal.style.display = "none";
    }
 
    document.querySelectorAll('.dropdown-toggle').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            this.nextElementSibling.style.display = 'block';
        });
        link.addEventListener('mouseleave', function () {
            const dropdown = this.nextElementSibling;
            setTimeout(function () {
                if (!dropdown.matches(':hover')) {
                    dropdown.style.display = 'none';
                }
            }, 100);
        });
    });

    document.querySelectorAll('.dropdown-content').forEach(function (dropdown) {
        dropdown.addEventListener('mouseleave', function () {
            this.style.display = 'none';
        });
    });
    
    var user_link=document.getElementById('user_link');
    var user_link_guest=document.getElementById('user_link_guest');

    owner_ui=document.getElementById('user_link_btn_container');
    guest_ui=document.getElementById('user_link_btn_container_guest');
    // regex expression for validation
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const regexUsername = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric username with 3-20 characters
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, one letter, one number
    const regexWhatsapp = /^\+?\d{10,15}$/; // Whatsapp number (with optional '+' and 10 to 15 digits)

    var invalid_Username_ms='Username must be alphanumeric and between 3-20 characters';
    var invalid_Email_ms='Please enter a valid email';
    var invalid_Password_ms='Password must be at least 8 characters long and contain at least one letter and one number';
    var invalid_Whatsapp_ms='Please enter a valid Whatsapp number (10-15 digits, optional "+" at the start)';

    var login_failure_string='Account not exist or wrong password';
    
    var usernameInput = document.getElementById('username_res');
    var emailInput = document.getElementById('email_res');
    var passwordInput = document.getElementById('password_res');
    var whatsappInput = document.getElementById('whatsapp');

    var login_failure_Errorfield=document.getElementById('login_failure_ms')

    var Myfavourite_link=document.getElementById('Myfavourite');
    var btn_mysale=document.getElementById('MySale');

    var btn_mysale_guest=document.getElementById('MySale_1');
    var btn_myfavourite_guest=document.getElementById('Myfavourite_1');

    var username_Errorfield=usernameInput.parentNode.nextElementSibling;
    var emailInput_Errorfield=emailInput.parentNode.nextElementSibling;
    var passwordInput_Errorfield=passwordInput.parentNode.nextElementSibling;
    var whatsappInput_Errorfield=whatsappInput.parentNode.nextElementSibling;

    var invalid_Username;
    var invalid_Email;
    var invalid_Password;
    var invalid_Whatsapp;

    AddValidate_Blur(usernameInput,username_Errorfield,regexUsername, invalid_Username_ms);
    AddValidate_Blur(emailInput, emailInput_Errorfield,regexEmail, invalid_Email_ms);
    AddValidate_Blur(passwordInput, passwordInput_Errorfield,regexPassword, invalid_Password_ms);
    AddValidate_Blur(whatsappInput, whatsappInput_Errorfield,regexWhatsapp, invalid_Whatsapp_ms);

    btn_mysale.addEventListener('click',function(event){
        const mySaleUrl = btn_mysale.getAttribute('href');
        event.preventDefault();
        fetch('/check-login')
            .then(response => response.json())
            .then(data => {
                
                console.log(data.islogged_in);
                if (!data.islogged_in) {
                    // if not logged, to open login madal
                    btn_Login.click();
                } else {
                    // If logged, redirect to original page
                    window.location.href = mySaleUrl;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    //guests skill exhibit, no log, continue open the page to scan
    btn_mysale_guest.addEventListener('click',function(event){
        const mySaleUrl = btn_mysale_guest.getAttribute('href');
        event.preventDefault();
        fetch('/check-login')
            .then(response => response.json())
            .then(data => {                
                console.log(data.islogged_in);
                // If logged, redirect to original page
                window.location.href = mySaleUrl;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function mysale_guest_click(){
        const mySaleUrl = btn_mysale.getAttribute('href');
        event.preventDefault();
        fetch('/check-login')
            .then(response => response.json())
            .then(data => {
                
                console.log(data.islogged_in);
                if (!data.islogged_in) {
                    // if not logged, to open login madal
                    btn_Login.click();
                } else {
                    // If logged, redirect to original page
                    window.location.href = mySaleUrl;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function Todirect_AfterLogCheck_LogRequire(event,funt_run)
    {
        event.preventDefault();
        fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            
            console.log(data.islogged_in);
            if (!data.islogged_in) {
                // if not logged, to open login madal
                btn_Login.click();
            } else {
                // If logged, redirect to original page
                funt_run();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
   
    

    // regsiter button
    document.getElementById('btn_register_sub').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission by default

        IsValid=validateInput(usernameInput, username_Errorfield,regexUsername, invalid_Username_ms)&
            validateInput(emailInput, emailInput_Errorfield,regexEmail, invalid_Email_ms)&
            validateInput(passwordInput, passwordInput_Errorfield,regexPassword, invalid_Password_ms)&
            validateInput(whatsappInput, whatsappInput_Errorfield,regexWhatsapp, invalid_Whatsapp_ms)
        
        // If validation fails, show error message and stop the form submission
        if (!IsValid) 
        {   console.log('Block sumbmit:invalid input')
            // document.getElementById('error_message').textContent = 'errorMessage';
        } 
        else
        {
            console.log('AJAX: Regsiter');
           formData= new FormData(document.getElementById('RegisterForm'));
           fetch('/register',{method:'POST',
           body:formData
           }).then(response=>response.json()).then(data=>{
            if(data.success){
            //register successfully
            console.log('regsiter success');
            alert('regsiter success. User id is:'+data.user_id);
            }
           
           else{
            showMessage(document.getElementById('error_message'),data.error_message);
            }
           })
        
        // document.getElementById('RegisterForm').submit();
        }
    });
    
    
    btn_Login.addEventListener('click',function(event)
    {   event.preventDefault();
        formData=new FormData(document.getElementById('LoginForm'));
        console.log('fetch /login')
        fetch('/login',{method:'POST',body:formData}).
        then(response=>response.json()).then(data=>{
            if(data.success)
            {
                console.log('login success')
                //whether need to reload the page
                if (typeof window.IsLogRedirect !== "undefined" && window.IsLogRedirect === true) {
                    // if window.IsLogRedirect is true
                    console.log("IsLogRedirect is true");
                    window.location.reload();
                } 
                else{
                Unlogged_To_Loged_Data(data);
                LoginClose_btn.click();
                }
                
                // Unlogged_To_Loged_Data(data);
                // LoginClose_btn.click();
            }
            else
            {
                showMessage(login_failure_Errorfield,login_failure_string);
            }
            // console.log('having been requested')
            console.log('login:'+ data.success);
        })
    });

    // Elements changing in Head Area when users status convert from unlogged to logged.
    function Unlogged_To_Loged_Data(data)
    {   
        
        console.log(data.user);
        let user = JSON.parse(data.user);
        
        if(data.user_type=='owner')    
        {   
            let exhibited_array=[]
            let hidden_array=[]
            guest_ui=document.getElementById('user_link_btn_container_guest')
            user_link.innerHTML=user.username
            owner_ui=document.getElementById('user_link_btn_container');
            hidden_array.push(guest_ui)
            hidden_array.push(btn_Login_Retister)

            exhibited_array.push(owner_ui)
            exhibited_array.push(btn_log_out)
            exhibit_change(exhibited_array, hidden_array,'flex'); 
        }
        else{
            user_link_guest.innerHTML=user.username;
            let exhibited_array=[]
            let hidden_array=[]
            guest_ui=document.getElementById('user_link_btn_container_guest')
            owner_ui=document.getElementById('user_link_btn_container');
            hidden_array.push(owner_ui)
            hidden_array.push(btn_Login_Retister)
            
            exhibited_array.push(guest_ui);
            exhibited_array.push(btn_log_out);
            exhibit_change(exhibited_array, hidden_array,'flex'); 
        }
        
    }
    
    function Logged_To_Unlogged(){
        let hidden_array=[];
        let exhibit_array=[];
        
        owner_ui=document.getElementById('user_link_btn_container');
        guest_ui=document.getElementById('user_link_btn_container_guest');
        hidden_array.push(btn_log_out);
        hidden_array.push(owner_ui);
        exhibit_array.push(btn_Login_Retister);
        exhibit_array.push(guest_ui);
        exhibit_change(exhibit_array, hidden_array,'flex'); 
        user_link.innerHTML='';
        user_link_guest.innerHTML='';
        //user name on ui removed

    }


    // Myfavourite_link.addEventListener('click', function(event){
    //     event.preventDefault();
    //     const targetUrl = event.target.href;

    // })

    function redirect(url) {
   
    // 需要验证登录，发送请求查看登录状态
    fetch('/myfavorite_load')  // Flask 路由用于检查用户的登录状态
        .then(response => response.json())
        .then(data => {
            if (data.login_status === false) 
            {
                const targetUrl = event.target.href;
                 // 用户未登录，弹出登录框，并且登录后跳转到目标 URL
                login_btn_event(targetUrl);
            } 
            else 
            {
                // 用户已登录，直接跳转到目标页面
                window.location.href = url;
            }
        })
        .catch(error => {
            console.log('Error checking login status:', error);
            alert('An error occurred while checking login status.');
        });
    }
    function login_btn_event(targetUrl) 
    {
        console.log('login_btn_event')
    // Ensure that we don't add multiple event listeners
    btn_Login.removeEventListener('click', Login_Then_To_Url);
    //add the new event to btn_login, so that we can go to URL after Login
    btn_Login.addEventListener('click', Login_Then_To_Url);

    function Login_Then_To_Url(event,targetUrl) {
        console.log('lets login and url')
        event.preventDefault();
        formData=new FormData(document.getElementById('LoginForm'));

        // Send a POST request with the login form data
        fetch('/login',{method:'POST',body:formData}).
        then(response=>response.json()).then(data=>{
            if(data.success)
            {
                console.log('login success')
                Unlogged_To_Loged_Data(data);
                //after log success to redirect to targe url
                if (targetUrl) 
                {
                    // Redirect to the provided target URL
                    window.location.href = targetUrl;
                } else {
                    // If no targetUrl is provided, redirect to a default page
                    window.location.href = '/';  // Change '/defaultPage' to your desired fallback URL
                }
            }
            else
            {
                showMessage(login_failure_Errorfield,login_failure_ms);
            }
            // console.log('having been requested')
            console.log('login:'+ data.success);
        })
            .catch(error => {
                console.error('Login error:', error);
                showMessage(login_failure_Errorfield, 'An error occurred during login.');
            });
    }
    // after change the event on btn_login, trigger it to start function of login, 
    btn_Login.click();
}

function restoreLoginButton() {
    const btn_Login = document.getElementById('btn_Login');
    
    // 移除当前绑定的事件处理器
    btn_Login.removeEventListener('click', Login_Then_To_Url);
    
    // recover the original logic of 
    btn_Login.addEventListener('click', function(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('LoginForm'));
        fetch('/login', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Login success');
                    Unlogged_To_Loged_Data(data);
                    LoginClose_btn.click();
                } else {
                    showMessage(login_failure_Errorfield, login_failure_ms);
                }
            });
    });
}

window.addEventListener('load',function(){
    if (btn_log_out) {
        btn_log_out.addEventListener('click', function () {
            console.log('Button clicked!');
            console.log('win:IsToHomePage'+window.IsToHomePage)
            var istohomePage = window.IsToHomePage;
            LogOut(istohomePage)
        });
    } else {
        console.error('Button not found!');
    }
});
    

    // // Show error function
    // function showError(input, message) {
    //     let errorLabel = document.createElement('span');
    //     errorLabel.className = 'error-message';
    //     errorLabel.textContent = message;
    //     input.parentElement.appendChild(errorLabel);
    // }

    // // Remove error function
    // function removeError(input) {
    //     let errorLabel = input.parentElement.querySelector('.error-message');
    //     if (errorLabel) {
    //         errorLabel.remove();
    //     }
    // }

 