class AccessControl(object):
    def process_request(self, request):

        if 'HTTP_ACCESS_CONTROL_REQUEST_METHOD' in request.META:
            response = http.HttpResponse()
            response["Access-Control-Allow-Origin"]= "*"
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Methods"]= "GET,HEAD,OPTIONS,POST,PUT"
            response["Access-Control-Allow-Headers"] = "Authentication , Authorization , X-CSRF-Token , Access-Control-Allow-Credentials , Access-Control-Allow-Methods , Access-Control-Allow-Origin , Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"

            return response

        return None
