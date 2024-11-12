from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

db = SessionLocal()

new_user = models.User(username="testuser", password="testpassword")
db.add(new_user)
db.commit()
db.close() 
