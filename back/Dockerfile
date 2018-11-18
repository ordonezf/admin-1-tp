FROM python:3.6-slim

RUN pip install --upgrade pip

RUN pip install flask flask_cors gunicorn

COPY . /opt/backend/

WORKDIR /opt/backend/

ENTRYPOINT ["gunicorn", "-w", "1", "app:app", "-b", "0.0.0.0:8000"]
