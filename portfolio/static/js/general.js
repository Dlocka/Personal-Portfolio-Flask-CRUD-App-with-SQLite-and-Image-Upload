// in a window or father tag, hidden children elemnts while exhibit other cluster of chidren
function exhibit_change(exhibited_array, hidden_array, display_attribute) {
    console.log('Exhibit change');

    // whether exhibited_array is DOM element
    if (exhibited_array instanceof HTMLElement) {
        // if true change display directly
        console.log('Inner HTML of Exhibited Array:');
        exhibited_array.style.display = display_attribute;
    } else if (Array.isArray(exhibited_array) || exhibited_array instanceof NodeList) {
        // array or NodeList，loop and change every element's display
        exhibited_array.forEach(element => {
            if (element instanceof HTMLElement) {
                console.log('exhibit:'+element);
                element.style.display = display_attribute;
            }
        });
    } else {
        console.log("exhibited_array 不是 DOM 元素或有效的元素集合。");
    }

    // same way to deal with array needing to be hidden
    if (hidden_array instanceof HTMLElement) {
        hidden_array.style.display = 'none';
    } else if (Array.isArray(hidden_array) || hidden_array instanceof NodeList) {

        hidden_array.forEach(element => {
            if (element instanceof HTMLElement) {
                element.style.display = 'none';
            }
        });
    } else {
        console.log("hidden_array 不是 DOM 元素或有效的元素集合。");
    }
    
}
// change the text on button
function Button_changeText(button, newText) {
      button.textContent = newText; 
    
  }

function validateInput(InputTag, MessageField,regex, ErrorMessage_str) {
    console.log(`Regex value: ${regex}`);
    console.log(`Checked String: ${InputTag.value}`);
    IsValid=regex.test(InputTag.value);
    if (regex.test(InputTag.value)) {
        console.log('valid');
        RemoveMessage(MessageField);
    } else {
        console.log('invlid input');
        showMessage(MessageField, ErrorMessage_str);
    }
    return IsValid;
}
function showMessage(MessageField,Message_str)
{
    MessageField.textContent=Message_str;
}

function RemoveMessage(MessageField)
{
    MessageField.textContent='';
}

function SetErrorMessage(MessageField,Message_String)
{
    MessageField.textContent=Message_String;
}

function AddValidate_Blur(InputField,Message_Field,regex,ErrorMessage)
{
    // console.log(`Regex value: ${regex}`);
    // console.log('add validate');
    InputField.addEventListener('blur', function() {
        validateInput(InputField,Message_Field,regex, ErrorMessage);
    });
}


