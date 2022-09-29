FROM continuumio/miniconda3

COPY ./requirements.txt /app/requirements.txt

ENV MLPORT=5000

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

CMD exec gunicorn --bind=127.0.0.1 --workers=3 server:app

