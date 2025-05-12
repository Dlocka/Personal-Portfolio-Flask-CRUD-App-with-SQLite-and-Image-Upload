from portfolio import app, db
from portfolio.models import *
from flask import Flask, request, jsonify,url_for,session,g,redirect
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
from werkzeug.utils import secure_filename
from functools import wraps
import os
from datetime import datetime

Ownerid=1002;



# Function to check allowed image
def IsAllowed_Image(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['Allowed_IMAGE_FORMAT']

# @app.before_request
# def before_request():
#     if('user_id' not in session):
#         return jsonify({'success': False, 'message': 'Please log in first'})
def VerifyLog(): 
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'});

@app.route('/')
def index():
    
    user_id = session.get('user_id')  # 从 session 获取 user_id
    if user_id:
        # 如果已登录，获取用户数据
        user = UserDAO.UserGet(user_id,db);
        return render_template('index.html', logged_in=True, user_name=user.username);
    else:
        # 如果没有登录
        return render_template('index.html', logged_in=False)

    # Using Flask uploading files
    # Documentation: https://flask.palletsprojects.com/en/stable/patterns/fileuploads/
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file', 400
    

    if file and IsAllowed_Image(file.filename):
        # Secure the filename and save the file
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER_image'], filename))
        
        # Return the URL of the uploaded image
        image_url = url_for('static', filename=f'img/{filename}')
        return f'File uploaded successfully! <br> <img src="{image_url}" alt="Uploaded Image">'

    return 'Invalid file type. Only PNG, JPG, JPEG, GIF are allowed.', 400

if __name__ == '__main__':
    app.run(debug=True)


    

@app.route("/register", methods=["POST"])
def register():
    print('start register');
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    whatsapp = request.form.get('whatsapp')
    print(f'received data:{username},{email},{password},{whatsapp}')
    userDao=UserDAO();
    new_user=userDao.Create_NewUser(email=email,password=password,whatsapp=whatsapp,username=username);
    print(f"New user ID: {new_user.user_id}")
    print(f'{new_user.created_date}');

    # return jsonify({'success': False, 'error_message': 'Username or email already exists.'});
    # IsExisting_user = db.session.query(UserORM).filter((UserORM.email == new_user.email)|(UserORM.whatsapp==new_user.whatsapp)).all();
    # print('After check email');
  
    # if( len(IsExisting_user)>0):
    #     print('existing user');
    #     return jsonify({'success': False, 'error_message': 'Username or email already exists.'});
    # else:
    #     print('Not repeated email');
    try:
            db.session.add(new_user);
            db.session.commit();
            # 输出新的 user_id
            print(f"New user ID: {new_user.user_id}")
            print('AFter commit');
            return jsonify({'success':True, 'user_id':new_user.user_id, 'error_message': 'None.'});
    except Exception as e:
            return jsonify({'success': False, 'error_message': f'Unexpected Error: {str(e)}'});

@app.route("/login", methods=["POST"])
def login():
    password = request.form.get('password');
    user_id = request.form.get('user_id');
    password_hashed=Tohash(password);
    print(f'hashed_passowrd:{password_hashed}');
    user=UserDAO.password_verifyByUserId(user_id,password_hashed,db);
    
    if(user==None):
        print('No User quered')
        response_Login = {
        'success': False,  
        'user': None
        }
        return jsonify(response_Login);
    else:
        print('some user quered');
        session['user_id']=user.user_id;
        print(f"session.user: {session['user_id']}");
        # reference form :https://stackoverflow.com/questions/45834577/turn-python-object-into-json-output
        userJson=ObjectToJson(user)
        print(userJson);
        user_type=GetUserType();
        session['user_type']=user_type;
        response_Login = {
        'success': True,  
        'user': userJson,  
        'user_type':user_type
        }
        return jsonify(response_Login);

def GetUserType():
    print('go to get type')
    print(session['user_id']);
    if(session['user_id']==Ownerid):
        print('it is owner');
        session['user_type']='owner';
        user_type='owner'
       
    else:
        print('it is guest');
        session['user_type']='guest'
        user_type='guest'
    print('user type got')
    return user_type;

@app.route('/logout', methods=['GET'])
def logout():
    print('try to log out')
    print(f"current user_id:{session['user_id']}");
    usert_type=GetUserType();
    
    # Clear session to log out the user
    session.pop('user_id', None)
    if session.get('user_id'): 
        print("After logout:user_id exist")
    else:
        print("After logout:user_id not exist")
    
    # Check the 'IsToHomepage' query parameter
    IsToHomePage = request.args.get('IsToHomePage', 'true');
    print(f'IsToHomepage:{IsToHomePage}');
    print(f'need to index:{IsToHomePage}');
    # If the flag is 'true', redirect to the homepage
    if IsToHomePage:
        return jsonify({'success': True, 'user_type':usert_type,'redirect_to': url_for('index')})
    else:
        # Stay on the current page or return a response
        return jsonify({'success': True, 'user_type':usert_type,'message': 'Logged out, stay on this page'}), 200

@app.route('/check-login', methods=['GET'])
def check_login():
    print('to log check')
    user_id = session.get('user_id')  # 获取 session 中的 user_id
    print('user id get finish')
    

    if user_id:
        print('logged');
        user=UserDAO.UserGet(user_id,db)
        user_type=GetUserType();
        print(f'usertype:{user_type}');
        print(f'logged user:{user_id}');
        return jsonify({'islogged_in': True,'user_type':user_type, 'user_name': user.username})
    else:
        return jsonify({'islogged_in': False})


def decorator_LoginVerify(f):
    @wraps(f)  # 使用 wraps 保留原函数的元数据
    def decorated_function(*args, **kwargs):
        print('decorator to verify login')
        if 'user_id' not in session: 
            print('no user id');
            return jsonify({'success':True, 'login_status':False,'error_message': 'None.'});
        print('still logged, to original request')
        return f(*args, **kwargs)  
    return decorated_function

@app.route("/MySale",methods=["GET"])
# @decorator_LoginVerify
def mySale_load():
    print('my sale load');
    
    # user_id=session['user_id'];
    productdao=ProductDAO()
    Found_products=productdao.GetProductByUser_OnSale(Ownerid,db);
    print(f'product get total:+{len(Found_products)}');
    print('products found');
    
    if 'user_id' not in session: 
        print('no user id');
        return render_template('MySale_guest.html',products=Found_products);
    
   
    if(session['user_type']=='owner'):
        return render_template('MySale.html', products=Found_products);
    elif(session['user_type']=='guest'):
        return render_template('MySale_guest.html',products=Found_products);
    else:
        return render_template('MySale_guest.html',products=Found_products);

@app.route("/MyFavorite",methods=["GET"])
# @decorator_LoginVerify
def myFavorite_load():
    print('my favorite load');
    
    # user_id=session['user_id'];
    experienceDAO=ExperienceDAO();
    found_experiences=experienceDAO.GetExperienceByOwner(Ownerid,db)
    print(f'experience get total:+{len(found_experiences)}');
    print('experiences found');
    
    if 'user_id' not in session: 
        print('no user id');
        return render_template('MyExperience_guest.html',experiences=found_experiences);
    
    if(session['user_type']=='owner'):
        return render_template('MyExperience.html', experiences=found_experiences);
    elif(session['user_type']=='guest'):
        return render_template('MyExperience_guest.html',experiences=found_experiences);
    else:
        return render_template('MyExperience_guest.html',experiences=found_experiences);



@app.route('/product_update', methods=['POST'])
def product_update():
    print('request received:product update');
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'});
    
    product_id=request.form.get('product_id')
    print(f'update product id:{product_id}')
    product = ProductDAO.getproductById(product_id,db);
    
    if not product:
        return jsonify({'success': False, 'message': 'Product not found'})
    
    product.name = request.form.get('name', product.name)  
    product.description = request.form.get('description', product.description)
    product.brand = request.form.get('brand', product.brand)
    product.price = request.form.get('price', product.price)
    product.stock_quantity = request.form.get('stock_quantity', product.stock_quantity)
    product.category_id = request.form.get('category_id', product.category_id)
    product.status_id = request.form.get('status_id', product.status_id)
    
    # Using Flask uploading files
    # Documentation: https://flask.palletsprojects.com/en/stable/patterns/fileuploads/
    file = request.files.get('image')

    if file and IsAllowed_Image(file.filename):
        image_url=file.filename;
        file_path = os.path.join(app.config['UPLOAD_FOLDER_image'], image_url)
        file.save(file_path);
        product.image_url = file.filename;

    product.updated_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f'try to change pro:{product.product_id}')

    try:  
        db.session.commit()
        return jsonify({'success': True, 'login_status':True,'message': 'Product updated successfully'})
    
    except Exception as e:
       
        db.session.rollback()
        print(f"Error updating product: {e}")
        return jsonify({'success': False, 'message': 'Error updating product'})



@app.route('/get_product_categories', methods=['GET'])
def get_product_categories():
    print('lets get categories')
    # get all categories
    categories=Product_CategoryDAO.GetProduct_Category(db);
    # categories = db.session.execute(select(CategoryConfig.category_id, CategoryConfig.category_name)).fetchall()
    category_dict = {category.category_id: category.category_name for category in categories}
    return jsonify(category_dict)

@app.route('/product_create',methods=['POST'])
def product_create():
    print('go to create product')
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'});
    name = request.form.get('name');
    description = request.form.get('description');
    brand = request.form.get('brand');
    owner_id = session['user_id'];
    price = request.form.get('price');
    stock_quantity = request.form.get('stock_quantity');
    category_id = request.form.get( 'category_id');
    
    file = request.files['image']
    # if user not upload, set a default image

    # Using Flask uploading files
    # Documentation: https://flask.palletsprojects.com/en/stable/patterns/fileuploads/
    if file and IsAllowed_Image(file.filename):
        image_url=file.filename;
        file_path = os.path.join(app.config['UPLOAD_FOLDER_image'], image_url)
        if (file and file.filename):
            file.save(file_path);

    updated_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    created_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    new_product=ProductDAO().Product_Create(name,description,brand,owner_id,price,stock_quantity,category_id,1,created_date,updated_date,file.filename)
    

    print(f'user id to add pro:{owner_id}');
    print(f'{new_product.name},{new_product.description},{new_product.brand}');
    try:
        print('try insert product');
        print(f"New Product ID: {new_product.product_id}");
        db.session.add(new_product);
        db.session.commit();
        print(f"New Product ID: {new_product.product_id}");
       
        print('AFter commit');
        productJson=ObjectToJson(new_product)
        # print(productJson);
        response = {
        'success': True, 
        'login_status':True, 
        'product': productJson  
        }
        return jsonify(response);
        
    except Exception as e:
        return jsonify({'success': False, 'error_message': f'Unexpected Error: {str(e)}'});

@app.route('/product_takedown.<int:product_id>',methods=['POST'])   
def product_takedown(product_id):
    print('go to take down product')
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'}); 
    try:
        print('try to takedown pro')
        print(f'product_id:{product_id}');
        product = ProductDAO.getproductById(product_id,db)
        print(f'try to take down product:{product.product_id}');
        if (product):
            product.status_id=2;
            db.session.commit();
            print('after commit');
            return jsonify({'success':True, 'login_status':True});
        else:
            return jsonify({'success':True, 'login_status':True,'error_message':'product null'}) 
    except Exception as e:
        return {'error_message': f'An error occurred: {str(e)}'}, 500
    
@app.route('/experience_create', methods=['POST'])
def create_experience():
    owner_id = session['user_id'];    
    company = request.form.get('company') 
    job_title=request.form.get('job_title') 
    print(request.form.get('duty')  ) ;       
    duty = request.form.get('duty')                
    start_date = request.form.get('start_date')    
    end_date = request.form.get('end_date', None)  

    experience_dao = ExperienceDAO()
    new_experience = experience_dao.create_experience(
        owner_id=owner_id,
        company=company,
        job_title=job_title,
        duty=duty,
        start_date=start_date,
        end_date=end_date
    )
    print(f"new_experience fields: {vars(new_experience)}")
    print(new_experience.experience_id)
    try:

        print('try to insert experience')
        
        # Add the new experience to the session
        db.session.add(new_experience)
        # Commit the session to persist the new record
        db.session.commit()
        db.session.refresh(new_experience)
        print(f'experience_id:{new_experience.experience_id}');
     
        experienceJson=ObjectToJson(new_experience)

        response = {
        'success': True, 
        'login_status':True, 
        'experience': experienceJson  
        }
     
        return jsonify(response);
    except Exception as e:
        # In case of an error, rollback the session
        return {'error_message': f'An error occurred: {str(e)}'}, 500

@app.route('/experience_takedown.<int:experience_id>',methods=['POST'])   
def experience_takedown(experience_id):
    print('go to take down experience')
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'}); 
    try:
        print('try to takedown pro')
        print(f'experience_id:{experience_id}');
        experience = ExperienceORM.query.get(experience_id)
        print(f'try to take down experience:{experience.experience_id}');
        if (experience):
            db.session.delete(experience)
            db.session.commit();
            print('after commit');
            return jsonify({'success':True, 'login_status':True});
        else:
            return jsonify({'success':True, 'login_status':True,'error_message':'experience null'}) 
    except Exception as e:
        return {'error_message': f'An error occurred: {str(e)}'}, 500

@app.route('/experience_update', methods=['POST'])
def experience_update():
    print('request received:product update');
    if 'user_id' not in session: 
        print('no user id');
        return jsonify({'success':True, 'login_status':False,'error_message': 'None.'});
    
    experience_id=request.form.get('experience_id')
    print(f'update experience id:{experience_id}')
    experience = ExperienceDAO.GetExperienceById(experience_id,db)

    if not experience:
        return jsonify({'success': False, 'message': 'Experience not found'})
 
    experience.start_date = request.form.get('start_date')
    experience.end_date = request.form.get('end_date')
    experience.company=request.form.get('company')
    print(request.form.get('duty'));
    experience.duty=request.form.get('duty')
    experience.job_title=request.form.get('job_title');
 
    print(f'try to change exp:{experience.experience_id}')
    try:  
        db.session.commit()
        return jsonify({'success': True, 'login_status':True,'message': 'Experience updated successfully'})
    except Exception as e:
        db.session.rollback()
        print(f"Error updating experience: {e}")
        return jsonify({'success': False, 'message': 'Error updating experience'})

@app.route("/categorypage/<category_id>")
def GotoProductCategory(category_id):
    print(f'received category_id:{category_id}');
    productdao=ProductDAO();
    foundproducts=productdao.GetProductByCategory(category_id,1,db);
    return render_template('category_page.html',products=foundproducts);

@app.route("/home")
def home_load():
    user_id = session.get('user_id')  
    if user_id:

        user = UserDAO.UserGet(user_id,db);
        return render_template('index.html', logged_in=True, user_name=user.username);
    else:

        return render_template('index.html', logged_in=False)

@app.route("/skill_search")
def skill_search():
    print('try to search skill')
    search_skill=request.args.get('searched','')
    Foundproducts=[];
    if(search_skill):
        Foundproducts=ProductDAO.search_product(searched=search_skill)
    print("searched:")
    for item in Foundproducts:
        print(item)
    return render_template('productsearch.html',products=Foundproducts);

@app.route("/language_search")
def language_search():
    print('try to search skill by language')
    search_language=request.args.get('searched','')
    print(search_language);
    Foundproducts=[];
    if(search_language):
        category_id=Product_CategoryDAO.GetCategoryIdByName(db,search_language)
        print(f'category id:{category_id}')
        if(category_id):
            productDao=ProductDAO();
            Foundproducts=productDao.GetProductByCategory(category_id,1,db)
    print("searched:")
    for item in Foundproducts:
        print(item)
    return render_template('productsearch.html',products=Foundproducts);