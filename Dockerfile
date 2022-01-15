# pull official base image
FROM python:3.9.6-slim-buster

# set work directory
# WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
# RUN apk update \
#     && apk add --virtual build-deps gcc python3-dev musl-dev libpq-dev \
#     && apk add postgresql \
#     && apk add postgresql-dev \
#     && pip install psycopg2 \
#     && apk add jpeg-dev zlib-dev libjpeg \
#     && pip install Pillow \
#     && apk del build-deps
# install dependencies
# RUN pip install --upgrade pip
# COPY ./requirements.txt .
# RUN pip install -r requirements.txt

# # copy entrypoint.sh
# COPY ./entrypoint.sh .
# RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
# RUN chmod +x /usr/src/app/entrypoint.sh

# # copy project
# COPY . .

# # run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# install nginx
RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# copy source and install dependencies
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/hamerapp
RUN mkdir -p /opt/app/hamerapp/pip_cache
COPY requirements.txt start-server.sh /opt/app/hamerapp
# COPY .pip_cache /opt/app/pip_cache/
COPY . /opt/app/hamerapp/
WORKDIR /opt/app/hamerapp/
RUN pip install -r requirements.txt --cache-dir /opt/app/hamerapp/pip_cache
RUN chown -R www-data:www-data /opt/app/hamerapp

# start server
EXPOSE 8000
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]