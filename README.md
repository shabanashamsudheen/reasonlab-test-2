# reasonlab-test-2
steps to run the project - `docker-compose up`
APP PORT - 3011

Main Steps of code
1. calling function in every 5 minute to call the API provided, and read the file contents in the URL's of json reponse we get in API.
2. Calling another API in the app ( API created in the same project), and passing this file, name, url that we fetch from the remote API.
3. Writing the file to a folder in this service. If the file already exists, creates new file with index increment in last.( eg: filname_1 )

4. please check files folder in the root directory. there new files will be added in every 5 minute.