function checkLoginStatus() {
    console.log('checkLoginStatus called');
    fetch('/check-login', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
        }
    })
    .then(response => response.json())  
    .then(data => {
        if (data.islogged_in) {
            console.log('User is logged in with user_name:', data.user_name);
            Unlogged_To_Loged(data.user_name,data.user_type);
            // You can redirect the user or perform other actions
        } else {
            console.log('User is not logged in');
            
            let hidden_array=[];
            let exhibit_array=[];
            exhibit_array.push(btn_Login_Retister);
            exhibit_array.push(guest_ui);

            hidden_array.push(btn_log_out);
            hidden_array.push(owner_ui);
            exhibit_change(exhibit_array,hidden_array,'flex');
            return undefined;
            // You can redirect to login page or show a message
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
        return undefined;
    });
}

window.addEventListener ('load',function()
{
    console.log('get a check function')
    checkLoginStatus()
})

