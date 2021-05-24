FROM python:3.8-slim-buster

WORKDIR /app

ENV FLASK_APP=server.py

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

# EXPOSE 80

COPY . .

CMD [ "python3", "server.py"]