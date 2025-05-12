from sqlalchemy import text
from sqlalchemy import Column,Integer,Table,ForeignKey,String,DateTime
from sqlalchemy.orm import Mapped,relationship,aliased
from typing import List
from portfolio import Base
from sqlalchemy import select
from sqlalchemy.orm import declarative_base
from .utility import *
import pdb
import datetime

class Users():
    def __init__(self, user_id, email, password, whatsapp, username,created_date,updated_date):
        self.user_id = user_id
        self.email = email
        self.password = password
        self.whatsapp = whatsapp
        self.username = username
        self.created_date=created_date
        self.updated_date=updated_date

class UserORM(Base):
    __tablename__ = "Users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    whatsapp = Column()
    username = Column(String(100), nullable=False)
    created_date = Column(String(50))
    updated_date = Column(String(50))

class UserDAO():
    def RegisterVerify(email,whatsapp,db):
        IsExisting_user = db.session.query(UserORM).filter(UserORM.email == email|UserORM.whatsapp==whatsapp).all();
        if(len(IsExisting_user)>0):
            return False;
        else:
            return True;
    
    def Insert_NewUser(new_user,db):
        try:
            db.session.add(new_user);
            db.session.commit();
        except Exception as e:
            return str(e);

    def Create_NewUser(self, email, password, whatsapp, username):
        hashed_password = Tohash(password);
        print(f'hashed_password:{hashed_password}');
        # create UserORM object
        created_date=datetime.datetime.utcnow();
        updated_date=datetime.datetime.utcnow();
        created_date_str = created_date.strftime('%Y-%m-%d %H:%M:%S');
        updated_date_str = updated_date.strftime('%Y-%m-%d %H:%M:%S');
        new_user = UserORM(
                           email=email, password_hash=hashed_password, whatsapp=whatsapp, 
                           created_date=created_date_str,updated_date=updated_date_str,
                           username=username);
        
        print(f'create Time:{new_user.created_date}');
        
        print(f'updateTime:{new_user.updated_date}');
        # pdb.set_trace();
        
        return new_user;
    def password_verifyByEmail(email,password_hashed,db):
        print('try to get user by password')
        stm = select(UserORM).where((UserORM.email == email)& (UserORM.password_hash == password_hashed));
        user = db.session.scalar(stm);
        print('user queried');
        return user; 

    def password_verifyByUserId(user_id,password_hashed,db):
        print('try to get user by password')
        stm = select(UserORM).where((UserORM.user_id == user_id)& (UserORM.password_hash == password_hashed));
        user = db.session.scalar(stm);
        print('user queried');
        return user;  
   
    def UserGet(user_id,db):
        stm=select(UserORM).where(UserORM.user_id==user_id);
        user=db.session.scalar(stm);
        print('user queried by id');
        return user;
    __tablename__ = "Users"
class Product_CategoryORM(Base):
    __tablename__ = 'Product_Category'

    category_id = Column(Integer, primary_key=True)
    category_name = Column(String(50), nullable=False)

class Product_CategoryDAO:
    def GetProduct_Category(db):
        # 获取所有的分类信息
        stm=select(Product_CategoryORM);
        categories=db.session.scalars(stm).all();
        return categories;

    def GetCategoryIdByName(db,name):
        stm=select(Product_CategoryORM).where(Product_CategoryORM.category_name.ilike(name));
        category=db.session.scalar(stm);
        if(category):
            return category.category_id;
        else:
            return None;

class Product_StatusORM(Base):
    __tablename__ = 'ProductStatus'
    status_id = Column(Integer, primary_key=True)  
    status_des = Column(String(20))  

class ProductORM(Base):
    __tablename__ = 'Product'
    
    # Define columns with their respective data types and constraints
    product_id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    description = Column(String(100))
    brand = Column(String(50))
    owner_id = Column(Integer, ForeignKey('Users.user_id'))
    price = Column(Integer, nullable=False)
    stock_quantity = Column(Integer, default=1, nullable=False)
    category_id = Column(Integer, ForeignKey('Product_Category.category_id'))
    status_id= Column(Integer,ForeignKey('ProductStatus.status_id'))
    image_url = Column(String(100))
    created_date = Column(String(50))
    updated_date = Column(String(50))

    category = relationship("Product_CategoryORM", backref="products")

class ProductDAO():
    # # Alias for the CategoryORM table
    # category_alias = aliased(Product_CategoryORM)

    def GetProductByUser_ByStatus(self,user_id,db,status_id):
        stm=select(ProductORM).where((ProductORM.owner_id==user_id)&(ProductORM.status_id==status_id));
        products=db.session.scalars(stm).all();
        return products;
    
    def GetProductByUser_OnSale(self,user_id,db):
        return self.GetProductByUser_ByStatus(user_id,db,1);

    def GetProductByCategory(self,category_id,status_id,db):
        stm=select(ProductORM).where((ProductORM.category_id==category_id)&(ProductORM.status_id==status_id));
        products=db.session.scalars(stm).all();
        return products;

    def Product_Update(product,name,description,brand,price,stock_quantity,category_id):
        return;
    
    def Product_Create(self,name,description,brand,owner_id,price,stock_quantity,category_id,status_id,created_date,updated_date,image_url):
        product=ProductORM(name=name,description=description,brand=brand,owner_id=owner_id,price=price,stock_quantity=stock_quantity,category_id=category_id,status_id=status_id,created_date = created_date,updated_date=updated_date,image_url=image_url);
        return product;

    def getproductById(product_id,db):
        stm=select(ProductORM).where(ProductORM.product_id==product_id);
        product=db.session.scalar(stm);
        return product
    def search_product(searched):
        products = ProductORM.query.filter(ProductORM.name.ilike(f'%{searched}%')).all();
        return products;

class ExperienceORM(Base):
    __tablename__ = 'Experience'  # Define the name of the table
        
    experience_id = Column(Integer, primary_key=True,autoincrement=True)
    owner_id = Column(Integer, ForeignKey('Users.user_id')) 
    company = Column(String(50))
    job_title=Column(String(50))
    duty = Column(String(200))
    start_date = Column(String(50))
    end_date = Column(String(50))

    owner = relationship('UserORM', backref='experiences')

class ExperienceDAO():
    def create_experience(self, owner_id, company, job_title,duty, start_date, end_date):
        # Create a new Experience instance
        new_experience = ExperienceORM(
            owner_id=owner_id,
            job_title=job_title,
            company=company,
            duty=duty,
            start_date=start_date,
            end_date=end_date
        )
        return new_experience

    def GetExperienceByOwner(self,owner_id,db):
        stm=select(ExperienceORM).where(ExperienceORM.owner_id==owner_id);
        experiences=db.session.scalars(stm).all();
        return experiences;

    def GetExperienceById(experience_id,db):
        stm=select(ExperienceORM).where(ExperienceORM.experience_id==experience_id);
        experience=db.session.scalar(stm);
        return experience;
           