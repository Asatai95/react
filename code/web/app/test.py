
import requests

headers = {
    'Accept': 'application/json',
    "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNTg2MzE5ODExLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIn0.Mktr2FQdxkZ1UCO4yC9tzBpCmqVagBiFLjPVjSSQQ7Q"
}
response = requests.post('http://localhost:3031/test_api/profile/list', headers=headers)

print(response.text)