FROM ubuntu:16.04

EXPOSE 80
EXPOSE 443

ENV container docker
RUN apt-get update && \
    apt-get install -y -q nginx && \
    rm -Rf /etc/nginx/sites-enabled/default && \
    rm -rf /var/lib/apt/lists/* 

RUN nginx

# VOLUME ["/etc/nginx","/var/log/nginx"]

#ARG pro_dir = /etc/nginx/
# WORKDIR ${WORKSPACE_DIR}
# ADD nginx.conf /etc/nginx
# ADD /conf/default.conf /etc/nginx/conf.d
# RUN nginx

CMD ["nginx", "-g", "daemon off;"]


