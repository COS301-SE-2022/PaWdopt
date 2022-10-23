FROM continuumio/miniconda3

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 80

CMD exec gunicorn --bind=127.0.0.1 --workers=3 server:app

