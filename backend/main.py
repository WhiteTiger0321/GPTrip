
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from fastapi import FastAPI, Depends, HTTPException

#
SQLALCHEMY_DATABASE_URL = "sqlite:///./authentication.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

#
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login")
def login(username, password, db):
    user = db.query(User).filter(User.username == username, User.password == password).first()
    if user:
        return {"message": "로그인 성공!"}
    else:
        raise HTTPException(status_code=400, detail="아이디 또는 비밀번호가 잘못되었습니다.")