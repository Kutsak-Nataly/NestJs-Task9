<p style="text-align: center">
<img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
</p>

## Used
* Clone repository from GitHub to your computer
* Select branch Task9
* Install the dependencies
### Configuration connection to your local database
.env file<br>
<strong>edit variables:</strong><br>
TYPEORM_USERNAME=<br>
TYPEORM_PASSWORD=<br>
TYPEORM_DATABASE=<br>
### Start App for check
npm start:dev
### Add user "admin"
This is a temporary functionality that can be easily removed when the application is sent to production.
#### to test the application, you need to create a user:
***
POST:
<br>http://localhost:4000/login/add-admin<br>
{<br>
"login": "admin",<br>
"password": "admin"<br>
}
****
### Run test Authentication
npm run test:auth

### Performance testing - Artillery
Assign a value to the variable USE_FASTIFY= [false or true].
Reload the server.
##### Run test for <strong>express</strong> with script. Result in logs/result-artillery.txt
```
npm run test:artillery
```
##### Run test for <strong>fastyfy</strong> with script. Result in logs/result-artillery-fastyfy.txt
```
npm run test:artillery-fastyfy
```
## Test results table
<p>
<img src="https://github.com/Kutsak-Nataly/NestJs-Task9/tree/task9/logs/table.png" width="727" height="806" alt="table" />
</p>


