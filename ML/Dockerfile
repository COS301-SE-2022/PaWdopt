FROM continuumio/miniconda3

COPY ./requirements.txt /app/requirements.txt

ENV MLPORT=5000

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

CMD exec gunicorn --bind :$MLPORT --workers 1 --threads 8 --timeout 0 server:app

