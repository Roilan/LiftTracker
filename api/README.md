REST API V 0.1 RESOURCES
===============
----
api path

```sh
localhost:8080/api/
```
---

    
POST login
-----------
returns information of user with matching crendentials and initiates session:

* POST email : string
* POST password : stirng

---

POST signup
--------------
returns information of new user and initiates session:

* POST email : string
* POST password : stirng

---

GET profile
--------------
returns user information of user in session

---

GET logout
--------------
terminates session

---

GET user/:username
--------------
returns specified :username information

---

GET user/:username/workouts
--------------
returns specified :username's workouts

---

POST workouts
-------------
posts a new workoout to user in session and returns your workouts

---

GET allusers
--------------
returns all users information


---