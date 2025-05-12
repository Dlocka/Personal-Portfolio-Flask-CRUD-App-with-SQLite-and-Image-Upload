## This project
   	This project is a personal digital portfolio to show aquired skills and working experiences, where the owner has the account with authorization to edit content in webpage while other users can only register guest account. As a demo for demonstration and test, the owner's account is shown below:  
User Id:1002  
	Password: owner111

## About Demo Video 
	1.The video only contains 3-minutes content, so it only show the pages for the owner where content can be edited and created. As guests, users can only scan all the items controlled by the owner of this portfolio even they register an account.  
	2.This video is recorded by Bandi, the free version, so there is a watermark 'www.Bandi.com', which is not the content of project. 
	
## Other crucial functions you can test apart from the demo video
	1. login status verfication
		Introduction:  
			Because only owner has authority to edit the content, user will be asked to login again if he try to edit when login status is removed or expired.
		How to test:  
			1.Login with Owner account and click 'My experience' or 'My Skill'. In that page, clear all cached data and cookies including sessionStorage and other stored content. Here is the step to clear them in Google Chrome
				(1). Click on the three vertical dots in the upper-right corner (menu).
				(2). Select "Settings".
				(3). Scroll down to "Privacy and Security", and then click "Clear browsing data".
				(4). In the pop-up window,  choose options like "Browsing history", "Cached images and files", "Cookies and other site data", etc. 
			2.Click relevant buttons with relevant words such as "Submit change', "Take down","Create new" to see whether the edit can be sumbmitted.  
			  
	2. The cosistency between guest's page and owner's page.
		Introduction:   
			The experiences and skills guests scan are all edited by owner of the portfolio. Therefore, the outcome of owner's edit will be shown in guest's page.
		How to test:
			1. Login with Owner account and click 'My experience' or 'My Skill' 
			2. Edit anything in these pages, and submit the change.
			3. Log out Owner account, and direct to these pages from homepage again no matter you do not login a guest account.
			4. Check whether the data of experiences and skills are as same as owner's page after successful sumbission of edit.  
			
## Requirements
- Python version: recommended 3.12.8 or above
- Virtual environment tool:.venv
- Database:SQLite

## Installation Steps
1. **Clone the repository**
	

2. **Check dependency**
	1. Navigate to root path of project in CMD or terminal and run this command to activate virtual environment:
	.venv\Scripts\activate
	2. Run this commmand to show installed dependencies:
	pip freeze
	3. check whether these dependencies coincide with repository shown by document requirements.txt.
	4. If there is any dependency missed, use the command below to install them again:
	pip install -r requirements.txt
	
3. **To debbug project**
	1. In commnad or terminal guide to the path of the project directory
	2. run the command below to activate virtual environment:
	.venv\Scripts\activate
	3. run the command to start debbug of application:
	flask --app portfolio run --debug
	the response will contain the http running on such as '*Running on http://127.0.0.1:5000‘， which is the root path of application
	4. copy this http into browser and redirect to it.


## References
[1]. Python. 2024. hashlib — Secure hashes and message digests — Python 3.8.4rc1 documentation. Available at: https://docs.python.org/3/library/hashlib.html [Accessed: 3 January 2025].  
[2]. Python Software Foundation. json — JSON encoder and decoder — Python 3.8.3rc1 documentation. Available at: https://docs.python.org/3/library/json.html [Accessed: 3 January 2025].  
[3]. State Management — SQLAlchemy 2.0 Documentation. 2024. Available at: https://docs.sqlalchemy.org/en/20/orm/session_state_management.html [Accessed: 3 January 2025].  
[4]. Uploading Files — Flask Documentation (3.1.x). 2024. Available at: https://flask.palletsprojects.com/en/stable/patterns/fileuploads/ [Accessed: 3 January 2025].
